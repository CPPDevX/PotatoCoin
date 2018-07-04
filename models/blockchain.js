let Block = require('./block')
var SHA512 = require("crypto-js/sha512");

class Blockchain {

    constructor(genesisBlock) {
        this.blocks = []
        this.addBlock(genesisBlock)
    }

    addBlock(block) {

        if (this.blocks.length == 0) {
            block.previousHash = "0000000000000000"
            block.hash = this.generateHash(block)
        }

        this.blocks.push(block)
    }

    getNextBlock(transactions) {

        let block = new Block()

        transactions.forEach(function (transaction) {
            block.addTransaction(transaction)
        })

        let previousBlock = this.getPreviousBlock()
        block.index = this.blocks.length
        block.previousHash = previousBlock.hash
        block.hash = this.generateHash(block)
        return block
    }

    generateHash(block) {
        let hash = SHA512(block.key).toString()
        return hash

    }

    getPreviousBlock() {
        return this.blocks[this.blocks.length - 1]
    }

}

module.exports = Blockchain