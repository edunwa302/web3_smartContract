import MetaMaskOnboarding from '@metamask/onboarding';
import React from 'react';
import { useContext, useState, useEffect } from "react";
import { TransactionsContext } from "../context/TransactionContext";


const ONBOARD_TEXT = 'Click here to install MetaMask!';
const CONNECT_TEXT = 'Connect Wallet';
const CONNECTED_TEXT = 'Connected';

const MetaMaskBtn = () => {
    const { currentAccount } = useContext(TransactionsContext);

    const [buttonText, setButtonText] = React.useState(ONBOARD_TEXT);
    const [isDisabled, setDisabled] = React.useState(false);
    const [accounts, setAccounts] = React.useState([]);
    const [noMetaMask, setNoMetaMask] = useState(true)
    const onboarding = React.useRef();

    useEffect(() => {
        if (!onboarding.current) {
            onboarding.current = new MetaMaskOnboarding();
        }

        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
            .then((newAccounts) => {
                setAccounts(newAccounts);
                setNoMetaMask(false);
                // setCurrentAccount(newAccounts[0]);
            })
        }

    }, []);

    useEffect(() => {
        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            if (accounts.length > 0) {
                setButtonText(CONNECTED_TEXT);
                // setNoMetaMask(false);
                setDisabled(true);
                onboarding.current.stopOnboarding();
            } else {
                setButtonText(CONNECT_TEXT);
                // setNoMetaMask(true);
                setDisabled(false);
            }
        }
    }, [accounts]);

    // useEffect(() => {
    //     function handleNewAccounts(newAccounts) {
    //         setAccounts(newAccounts);
    //         setCurrentAccount(newAccounts[0]);
    //     }
    //     if (MetaMaskOnboarding.isMetaMaskInstalled()) {
    //     window.ethereum
    //         .request({ method: 'eth_requestAccounts' })
    //         .then(handleNewAccounts);
    //     window.ethereum.on('accountsChanged', handleNewAccounts);
    //     return () => {
    //         window.ethereum.off('accountsChanged', handleNewAccounts);
    //     };
    //     }
    // }, []);

    // useEffect(() => {
    //     if (MetaMaskOnboarding.isMetaMaskInstalled()) {
    //         window.ethereum.request({ method: 'eth_requestAccounts' })
    //         .then((newAccounts) => {
    //             setAccounts(newAccounts);
    //             setNoMetaMask(false);
    //             // setCurrentAccount(newAccounts[0]);
    //         })
    //     }
    // }, [])

    const onClick = () => {
        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
        window.ethereum
            .request({ method: 'eth_requestAccounts' })
            .then((newAccounts) => {
                setAccounts(newAccounts);
                // setCurrentAccount(newAccounts[0]);
            })
            .catch(function (error) {
                if(error.code === -32002) {
                    alert("Oops! MetaMask is already open look at the bottom of your screen")
                }
            });
        } else {
            onboarding.current.startOnboarding();
        }
    };
    console.log({'state of meta': noMetaMask})
    return (
            <>
                {/* {!accounts.length  &&  (
                    <button disabled={isDisabled} onClick={onClick}
                        className="flex flex-row justify-center items-center text-gray-300 my-5 bg-[#2952e3] hover:bg-[#7081eb] p-3 rounded-full cursor-ponter hover:bg-[#2546b]"
                        >
                        {buttonText}
                    </button>
                )} */}
                {/* { !accounts.length && noMetaMask ?
                    <button disabled={isDisabled} onClick={onClick}
                        className="flex flex-row justify-center items-center text-gray-300 my-5 bg-[#2952e3] hover:bg-[#7081eb] p-3 rounded-full cursor-ponter hover:bg-[#2546b]"
                        >
                        {buttonText}
                    </button>
                    : '' } */}
                {/* {!currentAccount && (
                    <button disabled={isDisabled} onClick={onClick}
                        className="flex flex-row justify-center items-center text-gray-300 my-5 bg-[#2952e3] hover:bg-[#7081eb] p-3 rounded-full cursor-ponter hover:bg-[#2546b]"
                        >
                        {buttonText}
                    </button>
                )} */}

                <button disabled={isDisabled} onClick={onClick}
                    className="flex flex-row justify-center items-center text-gray-300 my-5 bg-[#2952e3] hover:bg-[#7081eb] p-3 rounded-full cursor-ponter hover:bg-[#2546b]"
                    >
                    {buttonText}
                </button>
            </>
        );
    }

export default MetaMaskBtn;