import { AiFillAlipayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { useContext, useState, useEffect } from "react";
import { TransactionsContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { Loader } from './';
import { MetaMaskBtn } from './';


const commonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({placeholder, name, type, value, handleChange }) => {
    return <input 
                placeholder={placeholder} 
                type={type}
                step="0.0001"
                value = {value}
                onChange={(e) => handleChange(e, name)} 
                className= "my-2 w-full rounded-md p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
            />
};

const Welcome = () => {
    const { connectWallet, currentAccount, formData, isLoading, handleChange, sendTransaction } = useContext(TransactionsContext);
    const [formValidation, setFormValidation] = useState(false)
    const { addressTo, amount, keyword, message } = formData;

    const handleSubmit =  (e) => {
        // const { addressTo, amount, keyword, message } = formData;
        e.preventDefault();

        if(!addressTo || !amount || !keyword || !message ) {
            return setFormValidation(true)
        };
        // send transactions
        sendTransaction();
    };
    
    useEffect(() => {
        setFormValidation(false)
    }, [addressTo, amount, keyword, message ])
    

    return (
        <div className="flex w-full justify-center">
            <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 sm:py-20 px-4">
                {/* left col */}
                <div className="flex flex-1 justify-start flex-col mf:mr-10">
                    <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">send crpto <br/> across the world</h1>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">Explore the cryptocurrency world buy nd sell easly with Decentralized </p>
                    {!currentAccount && (
                        <>
                            <MetaMaskBtn/>
                        </>
                    )}

                
                    {/* blocks */}
                    <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                        <div className={`rounded-tl-2xl ${commonStyles}`}>
                            Realiability
                        </div>
                        <div className={commonStyles}>
                            Security
                        </div>
                        <div className={`sm:rounded-tr-2xl ${commonStyles}`}>
                            Etheruem
                        </div>
                        <div className={`sm:rounded-bl-2xl ${commonStyles}`}>
                            Web 3.0
                        </div>
                        <div className={commonStyles}>
                            Low fees
                        </div>
                        <div className={`rounded-br-2xl ${commonStyles}`}>
                            Blockchain
                        </div>
                    </div>
                </div>
                {/* right col */}
                <div className="flex flex-col flex-1 w-full items-center justify-start mf:mt-10 mt-10">
                    <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glsssmorphism">
                        <div className="flex justify-between flex-col w-full h-full">
                            <div className="flex justify-between items-center">
                                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                    <SiEthereum fontSize={21} color='#fff' />
                                </div>
                                <BsInfoCircle fontSize={21} color="#fff"/>
                            </div>
                            <div>
                                <p className="text-white font-light text-sm">
                                    {shortenAddress(currentAccount)}
                                </p>
                                <p className="text-white font-light text-sm mt-1">
                                    Ethereum
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* form */}
                    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                        <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
                        <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
                        <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} />
                        <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />
                        <div className="h-[1px] w-full bg-gray-600 my-2"/>
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <button 
                                onClick={handleSubmit}
                                type="button"
                                className="text-gray-600 hover:bg-[#7081eb] w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
                            >Submit</button>
                        )}
                        {formValidation && (
                            <div className="mt-2 ">
                                <p className="text-red-600 text-center animate-ping text-xs">Oops! all fileds are required</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default Welcome;