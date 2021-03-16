var express =  require("express");
var app = express();

const Web3 = require("web3");
const eggABI = require("./abi/eggToken.json");
const BigNumber = require("bignumber.js");
const { getTVL } = require("./getTVL.js")

const web3 = new Web3('https://bsc-dataseed.binance.org/');
const contract = new web3.eth.Contract(eggABI, '0x50d809c74e0b8e49e7b4c65bb3109abe3ff4c1c1');

app.get('/totalSupply', async (req, res) => {
  try {
      const totalSupply = await contract.methods.totalSupply().call();
      const burnt = await contract.methods.balanceOf('0x000000000000000000000000000000000000dead').call();
      const circ = new BigNumber(totalSupply).minus(new BigNumber(burnt));
      res.json({
        data: circ.shiftedBy(-18).toNumber().toString()
      })
  } catch (e) {
    console.log(e)
    res.json({
      error: e
    })
  }
})

app.get('/circulatingSupply', async (req, res) => {
  try {
      const totalSupply = await contract.methods.totalSupply().call();
      const burnt = await contract.methods.balanceOf('0x000000000000000000000000000000000000dead').call();
      const circ = new BigNumber(totalSupply).minus(new BigNumber(burnt));
      return success(circ.shiftedBy(-18).toNumber().toString());
      res.json({
        data: circ.shiftedBy(-18).toNumber().toString()
      })
  } catch (e) {
    console.log(e)
    res.json({
      error: e
    })
  }
})

app.get('/tvl', async (req, res) => {
  try {
      const TVL = await getTVL()
      res.json({
        data: TVL.toString()
      })
  } catch (e) {
    console.log(e)
    res.json({
      error: e
    })
  }
})

app.listen(8080)
