import { useContext } from "react";
import { TransactionsContext } from "../context/TransactionContext";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";
import useFetch from "../hooks/useFetch";
import { Loader } from './';

// transactions card comp
const TransactionCard = ({ addressTo, addressFrom, timestamp, message, keyword, amount }) => {
    const gifUrl = useFetch({ keyword });

    return (
        <div 
            className="bg-[#181918]
            m-4 flex flex-1  
            2xl:max-w-[450px]
            sm:min-w-[270px]
            sm:max-w-[300px]
            flex-col p-3 rounded-md hover:shadow-2xl 
        ">
            <div className="flex flex-col items-center w-full mt-3">
                <div className="justify-start w-full mb-6 p-2">
                    <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="noponer noreferrer" className="">
                        <p className="text-white text-base rounded-md p-1 bg-gray-600 mb-1">From: {shortenAddress(addressFrom)}</p>
                    </a>
                    <a href={`https://ropsten.etherscan.io/address/${addressTo}`} target="_blank" rel="noponer noreferrer" className="">
                        <p className="text-white text-base rounded-md p-1 bg-gray-600">To: {shortenAddress(addressTo)}</p>
                    </a>
                    <p className="text-white text-base">Amount: {amount} eth</p>
                    {message && (
                        <>
                            <p className="text-white">Message: {message}</p>
                        </>
                    )}
                </div>
                {/* gif */}
                
                <div>
                    <img src={gifUrl} alt="gif" className="w-full h-56 2x:h-96 rounded-md shadow-lg"/>
                </div>

                <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
                    <p className="text-[#37c7da] font-bolder">{timestamp}</p>
                </div>
            </div>
        </div>
    )
};


const Transactions = () => {
    const { currentAccount, transactions } = useContext(TransactionsContext);
    return (
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
            <div className="flex flex-col md:p-12 sm:py-12 px-4">
                {currentAccount ? (
                    <h1 className="text-white text-center my-2 text-xl">Latest Trasnsactions</h1>
                ) : (
                    <h1 className="text-white text-center my-2 text-xl">Connect your account to see the lastest chain</h1>
                )}
                {/* latest trns */}

                {/* <div className="flex flex-wrap justify-center items-center mt-10">
                    {dummyData.reverse().map((Transaction, i) => (
                        <TransactionCard key={i} {...Transaction }/>
                    ))}
                </div> */}
                {transactions.length ? (
                    <div className="flex flex-wrap justify-center items-center mt-10">
                        {transactions.reverse().map((Transaction, i) => (
                            <TransactionCard key={i} {...Transaction }/>
                        ))}
                    </div>
                ) : <>
                        <Loader/>
                        <p className="text-center text-white text-xs">Please wait...</p>
                    </>
                }
            </div>
        </div>
    )
}

export default Transactions;