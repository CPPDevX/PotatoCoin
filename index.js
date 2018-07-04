let Block = require('./models/block')
let Transaction = require('./models/transaction')
let Blockchain = require('./models/blockchain')

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