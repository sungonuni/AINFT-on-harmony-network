# Sample NFT minter on Harmony network 

AINFT on Harmony network 
This is simple NFT minter dapp, which will mint image NFT on Harmony network. The image must be uploaded at Pinata IPFS(https://app.pinata.cloud/pinmanager). 

## How to use

![alt text](https://files.slack.com/files-pri/TA4UHCN7K-F034AEQLSE4/image.png)



1. ```Git clone ``` this repo.
2. ```npm install ``` to setup all dependancy.
3. Please create ```.env``` and copy all lines below. 

```
REACT_APP_PINATA_KEY = <PINATA PUBLIC KEY HERE>
REACT_APP_PINATA_SECRET = <PINATA SECRET KEY HERE>
```
4. ```npm start ``` to start local server.
5. Connect wallet with Metamask. Make sure that you are connected with Harmony testnet.
How to connect with Harmony testnet: https://docs.harmony.one/home/network/wallets/browser-extensions-wallets/metamask-wallet/adding-harmony
6. Enter image address uploaded at Pinata.
7. Enter NFT's name
8. Enter NFT's decription.
9. Press mint button to mint NFT!







