let Block = require('./block')

class GenesisBlock extends Block{
    constructor(){
        super();
        this.previousHash = null;
        this.timestamp = + new Date();
        this.transactions = [];
        this.hash = super.calculateHash();
    }
}

module.exports = GenesisBlock