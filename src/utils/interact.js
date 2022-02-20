import {pinJSONToIPFS} from './pinata.js'
import { ethers } from 'ethers';

require('dotenv').config();

const contractABI = require('../harmonyNFTabi.json'); // Contact ABI file (Created by hardhat)
const contractAddress = "0x317695d9c06beaaf1a0f48fa2495398dd9172e53" // Contract address, test contract in Harmony for AInetwork

export const connectWallet = async () => { // Connect wallet from metamask
    if(window.ethereum) {
        try {
            const addressArray = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const obj = {
                status: "👆🏽 Write a message in the text-field above.",
                address: addressArray[0],
            };
            return obj;
        } catch (err){
            return {
                address: "",
                status: err.message,
            };
        }
    } else {
        return {
            address: "",
            status: (
                <span>
                    <p>
                        {" "}
                        {" "}
                        <a target="_blank" href={'https://metamask.io/download.html'}>
                            You must install Metamask, Eth wallet, in your browser.
                        </a>
                    </p>
                </span>
            ), 
        };
    }
    
};

export const getConnectedWallet = async () => { // Get info of wallet
    if(window.ethereum) {
        try{ // Get currunt account by eth api
            const addressArray = await window.ethereum.request({
                method: "eth_accounts",
            });
            if (addressArray.length > 0) {
                return {
                    address: addressArray[0],
                    status: "Write a message in the text-field above.",
                };
            } else {
                return {
                    address: "",
                    status: "Please Connect to Metamask using the top right button.",
                };
            }
        } catch (err) { // if fail to get account info,  
            return {
                address: "",
                status: err.message,
            };
        }
    } else { // if metamask doesn't installed,
        return {
            address: "",
            status: (
                <span>
                    <p>
                        {" "}
                        {" "}
                        <a target="_blank" href={'https://metamask.io/download.html'}>
                        You must install Metamask, a virtual Ethereum wallet, in your browser.
                        </a>
                    </p>
                </span>
            ),
        };
    }
};

export const mintNFT = async(url, name, description) => {
    if (url.trim() == "" || (name.trim() == "" || description.trim() == "")) {
        return {
            success: false,
            status: "Please make sure all fields are completed before minting.",
        }
    }

    // make metadata
    const metadata = new Object();
    metadata.name = name;
    metadata.image = url;
    metadata.description = description;

    // Upload metadata JSON to IPFS(Pinata)
    const pinataResponse = await pinJSONToIPFS(metadata); 
    if (!pinataResponse.success) {
        return {
            success: false,
            status: "😢 Something went wrong while uploading your tokenURI.",
        }
    } 
    const tokenURI = pinataResponse.pinataUrl; // Get tokenURI from pinata

    const provider = new ethers.providers.Web3Provider(window.ethereum); // Set up contract provider from ethereum network
    const singer = provider.getSigner(); // Get address of contract's developer
    const connectedContract = new ethers.Contract( // Create instance of contract
        contractAddress,
        contractABI,
        singer
    );

    const recipient = window.ethereum.selectedAddress;
    //const recipient = `0x6A88bdCc62C317519b52977BAE8437ff29fF8Da1`;
    try {
        const mintNFTTx = await connectedContract.mintNFT(recipient, tokenURI); // Excute mint function, This function is defined in uploded contract code.  
        return {
            success: true,
            status: "✅ Check out your transaction on harmony: https://explorer.pops.one/address/" + mintNFTTx.hash
        }
    } catch (error) {
        return {
            success: false,
            status: "😥 Something went wrong: " + error.message + "\n"
        }
    }
    
}
