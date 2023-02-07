# Vertical Wallet Snap

## Hypothesis
We won’t all just be using MetaMask in a few years if it dosn't adapt on time.

## Reasoning behind Hypothesis

1) In the history of cryptocurrency, the distribution of user personas is at its most diverse. More and more people were added to the ecosystem with each innovation cycle. Even while all of these groups are similar, their preferences are highly diverse.

2) People were drawn to 2009 (the OGs) by stateless money and cutting-edge P2P computing. High-caliber software developers became interested in the emerging smart contracts design space in 2014.

3) Tech-savvy financial professionals keen to test out DeFi arrived in 2017. Additionally, the most recent wave drew more gamers, online makers, digital artists, and retail customers who were purchasing their first and only NFT.

4) These organizations all interact with quite different kinds of applications. The logical extension is that they use their wallet as their primary, interoperable web3 UI to search out various goods.

5) An NFT trader, for instance, would probably want a wallet that displays their collection and keeps track of floor pricing. A degen probably wants to know the state of their staking APYs, the health of their leverage positions across various protocols, etc.
 
6) Additionally, mainstream consumers who are interested in experimenting with web3 social are presumably looking for a slick, clear UI with nothing like what I outlined above to interfere with their user experience; it will also probably be instructional. Mass retail likely wants separate wallets so that personal financial information is not shared.

7) Although not a 1:1 example, the tendency is clear: traditionally, users have turned to a UI that specifically meets their needs when a larger base of users seeks a highly specialized product experience. Why might wallets differ from other items?

**Conclusion:** When a wider base of users seek a very specific product experience, they have historically gone to a UI matching that particular need.

## What We've Built

The product is a way to organize the dapp ecosystem related to Metamask. For the Dapps, it'll facilitate the marketing and publicity of dapps at one place, catalyzing the growth of the whole ecosystem. For the end user, it makes the usage of different services (provided by dapps) simpler and transparent as all important things are authenticated and organized at one place. Just by one click the user will be able to go to the authentic dapp site ready to use the service. If the user wants to install specific snaps, they can do so from this site ensuring transparency. They could also organize their most used dapps in this site.

## Features


# SnapaMoto Bitcoin snap

Snapamoto allows users to send Bitcoin transactions via the MetaMask wallet extension. This is achieved by sharing the user's public key and validating the transaction over the blockchain network.

## Accomplishment:

This snap allows for the control of non-EVM accounts and assets within MetaMask. It can derive BIP-32 key pairs based on the secret recovery phrase without exposing it. This gives developers the ability to build snaps that support various blockchain protocols and integrate non-EVM tokens, such as BTC, into their browser dashboards using snaps. This is made possible through the use of the snap_getBip32Entropy entropy.

## Explanation:

### 1. Guide: 

To use the snap, connect the website to the MetaMask Flask and install the snap dependencies. Then, select the Bitcoin Download button.


### 2. Backend process: 

To initiate a Bitcoin transaction, the system uses a Bip32PublicKey. It converts the single address to a p2wpkh segwit key, generating a segwit address. In this example, the testnet API URL is used, but it can be extended to any URL. The system retrieves balance and transaction data and returns it to the front end.

To send the Bitcoin, the private key must be retrieved from MetaMask. The system fetches the unspent transaction output (utxo) from the API URL and checks if the user has sufficient balance. The fees are calculated using a dummy transaction. The transaction's validity is then verified.

After receiving confirmation from the MetaMask wallet, the transaction is posted to a public node validator, and the response is returned. It should be noted that Bitcoin transactions typically take 10 minutes to process and will be confirmed in the next block.


## SnapaMoto 2.0 : Phase 2 Implementation

### Enables the integration of other coins.
### Utilizes BIP-32 to generate multiple addresses for the user.

