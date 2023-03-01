const express =require('express');
const app = express();
const port = 8999;
const Web3 = require('web3');

let cors = require('cors')

app.use(cors()) // Use this after the variable declaration


function getWeb3() {
   // const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
   const web3 = new Web3(new Web3.providers.HttpProvider('https://goerli.infura.io/v3/8f0f6f1d3eba4554818d7e69ef83053f'));
    return web3;
}

async function getAccounts() {
    try {
        const accounts = await getWeb3().eth.getAccounts();
        console.log(accounts);
        return accounts;
    } catch (e) {
        console.log(e);
        return e;
    }
}


async function getBlock() {
    try {
        const getBlock = await getWeb3().eth.getBlock("latest");
        console.log("getBlock",getBlock);
        console.log("length",getBlock.length);
        console.log("typeof",typeof(getBlock));
        console.log("getBlock[number]",getBlock["number"]);
        console.log("baseFeePerGas",getBlock["baseFeePerGas"]);
        console.log("miner",getBlock["miner"]);
        return getBlock;
    } catch (e) {
        console.log(e);
        return e;
    }
}

async function getRecentBlocks() {
    try {
        const latestBlockNumber = await getWeb3().eth.getBlockNumber();
        const blocks = [];
        for (let i = 0; i < 10; i++) {
            const block = await getWeb3().eth.getBlock(latestBlockNumber - i);
            blocks.push(block);
        }
        console.log(blocks);
        return blocks;
    } catch (e) {
        console.log(e);
        return e;
    }
}

async function getGasPrice() {
    try {
        const gasPrice = await getWeb3().eth.getGasPrice();
        console.log(gasPrice);
        return gasPrice;
    } catch (e) {
        console.log(e);
        return e;
    }
}

app.get('/gasprice', (req, res) => {
    getGasPrice().then((gasPrice) => {
        res.send(gasPrice);
    })
})


app.get('/getblock', (req, res) => {
    getBlock().then((getBlock) => {
        res.send(getBlock);
    })
})

app.get('/recentblocks', (req, res) => {
    getRecentBlocks().then((blocks) => {
        res.send(blocks);
    })
})

app.get('/', (req, res) => {
    getAccounts().then((accounts) => {
        res.send(accounts);
    })
});
app.listen(port, () => {
	console.log('Listening...');
});


