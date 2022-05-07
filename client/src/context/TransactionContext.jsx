import { useEffect, useState } from "react";
import React from 'react';
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";
export const TransactionsContext = React.createContext();
import MetaMaskOnboarding from '@metamask/onboarding';

const { ethereum } = window;

const getEthereumContract = () => {
    const provider =new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionContract;

    // console.log({
    //     provider,
    //     signer,
    //     transactionContract
    // })
}

export const TransactionProvider = ({ children }) => {
    // accounts
    const [ currentAccount, setCurrentAccount ] = useState('');
    // formdata
    const [formData, setFormData] = useState({ addressTo: '', amount: '', message: '', keyword: '' });
    // loader state
    const [isLoading, setIsLoading] = useState(false);
    // transaction count
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    // transactions
    const [transactions, setTransactions] = useState([])


    // set handleChange func
    const handleChange = (e, name) => {
        // when we re updating to new state using the old state we to have callback func with prevState param
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }))
    }
    // get all trans
    const getAllTransactions = async () => {
        try {
            if(!ethereum) return alert("please install metaMask");
            const transactionContract = getEthereumContract();
            const availableTransactions = await transactionContract.getAllTransactions();

            const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleDateString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
            }))
            setTransactions(structuredTransactions);
            console.log({'vail trans:' : structuredTransactions})
        } catch (error) {
            console.log(error)
        }
    }

    // check if user has metaMask
    const checkIfWalletIsConnected = async () => {
        try {
            if(!ethereum) {
                // const onboarding = new MetaMaskOnboarding();
                // onboarding.startOnboarding();
                return alert("please install metaMask")
            };

            // if connected
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            // set current account
            if(accounts.length) {
                setCurrentAccount(accounts[0]);

            // get all trans
            getAllTransactions()
            } else {
                console.log('no account found')
            }
            
            // check if account changed
            ethereum.on('accountsChanged', (accounts) => {
                setCurrentAccount(accounts[0]);
            });

        } catch (error) {
            console.log(error)
            
        }
    };
    // check if trns exists
    const checkIfTransactionsExist = async () => {
        try {
            const transactionContract = getEthereumContract();
            // number of trans
            const transactionCount = await transactionContract.getTransactionCount();

            window.localStorage.setItem("transactionCount", transactionCount);
        } catch (error) {
            console.log(error)
        }
    }

    // connect wallet
    const connectWallet = async () => {
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
            // setCurrentAccount(accounts[0]);
            if(accounts.length) {
                setCurrentAccount(accounts[0]);

            }
        } catch (error) {
            if(error.code === -32002) {
                alert("metamask is already open look at the bottom of your screen ")
            }

            console.log(error)
        }
    }

    // send transaction
    const sendTransaction = async () => {
        try {
            if(!ethereum) return alert("please install metaMask");
            const { addressTo, amount, keyword, message } = formData;
            // send contract
            const transactionContract = getEthereumContract();
            // convert amount to wei or hex
            const parsedAmount = ethers.utils.parseEther(amount);
            // send transaction
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', 
                    value: parsedAmount._hex,
                }]
            })
            // store transaction
            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
            // wait for transaction
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash} `);
            await transactionHash.wait();
            setIsLoading(false)
            console.log(`Successful - ${transactionHash.hash} `);
            
            // get transaction count
            const transactionCount = await transactionContract.getTransactionCount();
            // store trans count in localstorage
            setTransactionCount(transactionCount.toNumber());
            // reload page one's transaction is done successfully
            location.reload();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
    }, []);

    return (
        <TransactionsContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, isLoading, transactions, handleChange, sendTransaction }}>
            { children }
        </TransactionsContext.Provider>
    )
}