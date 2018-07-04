let Block = require('./models/block')
let Transaction = require('./models/transaction')
let Blockchain = require('./models/blockchain')

// create genesis block
let genesisBlock = new Block()
let blockchain = new Blockchain(genesisBlock)

// create a transaction
let transaction = new Transaction('Waller','Adam',100)
let block = blockchain.getNextBlock([transaction])
blockchain.addBlock(block)

let anotherTransaction = new Transaction("Waller","Daz",10)

let block1 = blockchain.getNextBlock([anotherTransaction])
blockchain.addBlock(block1)

console.log("Proof Of Concept -- PotatoCoin -- Alpha");
console.log(JSON.stringify(blockchain, null, 2));