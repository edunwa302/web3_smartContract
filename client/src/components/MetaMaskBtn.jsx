import MetaMaskOnboarding from '@metamask/onboarding';
import React from 'react';
import { useState, useEffect } from "react";

const ONBOARD_TEXT = 'Click here to install MetaMask!';
const CONNECT_TEXT = 'Connect Wallet';
const CONNECTED_TEXT = 'Connected';

const MetaMaskBtn = () => {
    const [buttonText, setButtonText] = React.useState(ONBOARD_TEXT);
    const [isDisabled, setDisabled] = React.useState(false);
    const [accounts, setAccounts] = React.useState([]);
    const onboarding = React.useRef();

    useEffect(() => {
        if (!onboarding.current) {
            onboarding.current = new MetaMaskOnboarding();
        }

        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
            .then((newAccounts) => {
                setAccounts(newAccounts);
            })
        }

    }, []);

    useEffect(() => {
        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            if (accounts.length > 0) {
                setButtonText(CONNECTED_TEXT);
                setDisabled(true);
                onboarding.current.stopOnboarding();
            } else {
                setButtonText(CONNECT_TEXT);
                setDisabled(false);
            }
        }
    }, [accounts]);

    const onClick = () => {
        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
        window.ethereum
            .request({ method: 'eth_requestAccounts' })
            .then((newAccounts) => {
                setAccounts(newAccounts);
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
    return (
            <>
                <button disabled={isDisabled} onClick={onClick}
                    className="flex flex-row justify-center items-center text-gray-300 my-5 bg-[#2952e3] hover:bg-[#7081eb] p-3 rounded-full cursor-ponter hover:bg-[#2546b]"
                    >
                    {buttonText}
                </button>
            </>
        );
    }

export default MetaMaskBtn;