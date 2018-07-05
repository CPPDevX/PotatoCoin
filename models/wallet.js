let WalletGenHelper = require('../lib/crypto/wallet/genhelper');
let helper = new WalletGenHelper();
let CoinKey = require('coinkey');


class Wallet {
    createNewWallet() {
        let wallet = new Object();
        wallet.privateKey = helper.generatePrivateKey();
        wallet.publicKey = helper.createPublicKey(wallet.privateKey)
        wallet.privateKeyWIF = helper.createPrivateKeyWIF(wallet.privateKey)
        wallet.publicKeyHash = helper.createPublicKeyHash(wallet.publicKey)
        wallet.publicAddress = helper.createPublicAddress(wallet.publicKeyHash.toString('hex'))
        return wallet;
    }
    loadWalletFromWIF(privatekeyWIF){
        let wallet = new Object();
        let key = new CoinKey.fromWif(privatekeyWIF);
        wallet.privateKey = key.privateKey;
        wallet.publicKey = key.publicKey
        wallet.privateKeyWIF = key.privateWIF;
        wallet.publicKeyHash = key.publicHash;
        wallet.publicAddress = key.publicAddress;
        return wallet;
    }
    loadWalletFromPrivKey(privateKey){
        let wallet = new Object();
        let key = new CoinKey(new Buffer.from(privateKey, 'hex'))
        wallet.privateKey = key.privateKey;
        wallet.publicKey = key.publicKey
        wallet.privateKeyWIF = key.privateWIF;
        wallet.publicKeyHash = key.publicHash;
        wallet.publicAddress = key.publicAddress;
        return wallet;
    }
}
module.exports = Wallet