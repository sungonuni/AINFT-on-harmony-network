import { useEffect, useState } from "react";
import { connectWallet, getConnectedWallet, mintNFT } from "./utils/interact.js";
import logo from './ainetworklogo.png'

const Minter = (props) => {

  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");

  function WalletListener() { // Update wallet status in real time.
    if (window.ethereum) {
      window.ethereum.on("accountChanged", (accounts) => {
        if(accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          {" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  useEffect(async () => { //Keep Wallet connected
    const {address, status} = await getConnectedWallet();
    setWallet(address);
    setStatus(status);

    WalletListener();
  }, []);

  const connectWalletPressed = async () => { //Wallet connect button 
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onMintPressed = async () => { //Mint Button
    const { status } = await mintNFT(url, name, description);
    setStatus(status);
  };

  return (
    <div className="Minter">
      <img src={logo} alt="logo" />
      <br></br>
      <br></br>
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <br></br>
      <br></br>
      <h1 id="title">NFT Minter on Harmony Testnet</h1>
      <p>
        Please enter the asset on Pinata and NFT name, Description.
      </p>
      <form>
      <br></br>
        <h2>Asset Link: </h2>
        <input
          type="text"
          placeholder="ex) https://gateway.pinata.cloud/ipfs/<hash>"
          onChange={(event) => setURL(event.target.value)}
        />
        <h2>NFT name: </h2>
        <input
          type="text"
          placeholder="ex) My NFT"
          onChange={(event) => setName(event.target.value)}
        />
        <h2>Description: </h2>
        <input
          type="text"
          placeholder="ex) NFT with AI"
          onChange={(event) => setDescription(event.target.value)}
        />
      </form>
      <button id="mintButton" onClick={onMintPressed}>
        Mint NFT
      </button>
      <p id="status">
        {status}
      </p>
    </div>
  );
};

export default Minter;
