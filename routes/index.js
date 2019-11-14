var express = require('express');
var router = express.Router();
var web3 = require('web3');
var config = require('../config.json');
var HDWalletProvider = require('@truffle/hdwallet-provider');

let provider = new HDWalletProvider([config.privateKey], config.rpc, 0, 1);
var web3js = new web3(provider);

router.get('/:to',async (req,res) => {
  let toAddress = req.params.to;
  if(!web3js.utils.isAddress(toAddress)){
    res.send("Invalid address");
    return;
  }
  let amount = web3.utils.toWei(config.amount)
  let balance = await web3js.eth.getBalance(toAddress);
  if(balance >= amount){
    res.send("You already have enough ETH");
    return;
  }

  let count = await web3js.eth.getTransactionCount(provider.getAddress(0))

  var rawTransaction = {
    from:provider.getAddress(0),
    gasPrice:web3js.utils.toHex(20* 1e9),
    gasLimit:web3js.utils.toHex(210000),
    to:toAddress,
    value:web3js.utils.toHex(amount),
    data:"0x0",
    //chainId: web3js.utils.toHex('2101993'),
    nonce:web3js.utils.toHex(count)
  };

  web3js.eth.sendTransaction(rawTransaction);
  res.send(amount / Math.pow(10, 18) + " ETH transferred to " + toAddress)
});

module.exports = router;
