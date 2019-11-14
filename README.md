eth-private-faucet
======
**eth-private-faucet** is a simple faucet that pays out a configurable amount of Ether to an ETH address provided as a URL parameter.

The faucet does not pay out ether if the sender already has more Ether than the payout amount.

## Usage
Simply send a request to
```
http://localhost:3333/<eth-address>
```
and the faucet will pay out the configured amount from a pre-funded address

## Setup
```
npm i
```
```
cp config.json.example config.json
```
Edit config.json by adding the private key of a pre-funded address and the RPC URL of your private network.
You can also change ``amount`` to any other amount of Ether. 

Finally, run 

```
npm run start
``` 
to start the faucet.