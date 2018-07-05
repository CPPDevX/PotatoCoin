let SHA512 = require("crypto-js/sha512")

class Transaction {
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        this.timestamp = + new Date();
        this.txid = this.calculateHash();
    }

    calculateHash(){
        let preTxid = SHA512(this.fromAddress + this.timestamp + this.toAddress + this.amount).toString();
        return SHA512(preTxid).toString();
    }
}

module.exports = Transaction