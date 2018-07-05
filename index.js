let Block = require('./models/block')
let Transaction = require('./models/transaction')
let Blockchain = require('./models/blockchain')
let Wallet = require('./models/wallet')

var walletManager = new Wallet();

let wallet = walletManager.loadWalletFromPrivKey('12b0f93cfa1bcb2141f8866b4ad08bb587007b566f2dd2c7b66e4c6576ffd04b');

console.log(wallet.publicAddress);

/*
// create genesis block
let genesisBlock = new Block()
let blockchain = new Blockchain(genesisBlock)

for(var i = 0; i < 10; i++){
    let transaction = new Transaction('Waller','Adam',i)
    let block = blockchain.getNextBlock([transaction])
    blockchain.addBlock(block)
}


console.log("Proof Of Concept -- PotatoCoin -- Alpha");
console.log(JSON.stringify(blockchain, null, 2));
*/