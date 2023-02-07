# SnapaMoto Bitcoin snap

Snapamoto enables user to send bitcoin transaction via metamask wallet extension. It does so by sharing user's public key and validating transaction over blockchain Network.

## Accomplashiment:

This snap enables to control non-EVM accounts and assets within MetaMask. It is able to derive BIP-32 and BIP-44 keypairs based on the secret recovery phrase without exposing it. This gives developers the ability to build snaps that support a variety of blockchain protocols, allowing them to integrate non-EVM tokens like BTC into their dashboard browser using snaps. The snap utilizes snapgetbit32 entropy to achieve this.

## Explaination:

### 1. Guide: 

Connect the website to the metamask Flask and install the snap dependencies. Select Bitcoin Download button.


### 2. Backend process: 

To start a Bitcoin transaction using a Bip32PublicKey. The system uses a single address that is converted to a p2wpkh segwit key, which then generates a segwit address. The testnet API URL is used in this example, but this can be extended to any URL. The system fetches data including the balance, transaction, and returns all data to the front end.

In order to send the Bitcoin, the private key must be fetched from Metamask. The fees are estimated from the previously generated address. Then, the unspent transaction output (utxo) is calculated, and a check is done to confirm if the user has sufficient funds. The fees are calculated using a deko transaction.

After receiving confirmation from the Metamask wallet, the transaction is posted to a public node validator, and the response is returned. It should be noted that Bitcoin transactions typically take 10 minutes to process, and the transaction will be confirmed in the next block.


## SnapaMoto 2.0 : Phase 2 Implementation

### Enable other coins to be implemented over top of it. 

