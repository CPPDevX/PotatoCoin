let Block = require('./block')
let Transaction = require('./transaction')
let Genesis = require('./genesisblock')

class Blockchain {
    constructor() {
        let genesisBlock = new Genesis();
        this.chain = [genesisBlock]
        this.difficulty = 2;

        this.pendingTransactions = [];
        this.miningReward = 10;
    }

    getNewestBlockHeight() {
        return this.chain[this.chain.length - 1];
    }
    getCurrentWorkHeight() {
        return this.chain.length;
    }

    createTx(transaction) {
        if(this.isChainValid === false){
            console.log("Chain has been invalidated, closing PotatoCoind.");
            close();

        }

        if(this.getAddressBalance(transaction.fromAddress) >= transaction.amount){
            this.pendingTransactions.push(transaction);
        }else{
            console.log("Not Enough funds in " + transaction.fromAddress + " To complete transaction.");
        }
    }

    mineTxPool(miningRewardAddress) {
        // Create new block with all pending transactions and mine it..
        let block = new Block(Date.now(), this.pendingTransactions, this.getNewestBlockHeight().hash);
        block.mineBlock(this.difficulty);

        // Add the newly mined block to the chain
        this.chain.push(block);

        // Reset the pending transactions and send the mining reward
        this.pendingTransactions = [
            new Transaction('spudbase', miningRewardAddress, this.miningReward)
        ];
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }

    getAddressBalance(address) {
        let balance = 0; // you start at zero!
        // Loop over each block and each transaction inside the block
        for (const block of this.chain) {
            for (const trans of block.transactions) {

                // If the given address is the sender -> reduce the balance
                if (trans.fromAddress == address) {
                    balance -= trans.amount;
                }

                // If the given address is the receiver -> increase the balance
                if (trans.toAddress == address) {
                    balance += trans.amount;
                }
        }
    }
    
        return balance;
    }
}

module.exports = Blockchain