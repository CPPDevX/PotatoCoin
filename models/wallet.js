var Bip38 = require('bip38');
let CoinKey = require('coinkey');

let WalletGenHelper = require('../lib/helpers/genhelper');
let helper = new WalletGenHelper();

class Wallet {
    createNewWallet() {
        let wallet = new Object();
        wallet.privateKey = helper.generatePrivateKey();
        wallet.publicKey = helper.createPublicKey(wallet.privateKey)
        wallet.privateKeyWIF = helper.createPrivateKeyWIF(wallet.privateKey.toString('hex'))
        wallet.publicKeyHash = helper.createPublicKeyHash(wallet.publicKey)
        wallet.publicAddress = helper.createPublicAddress(wallet.publicKeyHash.toString('hex'))
        return wallet;
    }

    loadWalletFromWIF(privatekeyWIF){
        let wallet = new Object();
        let key = new CoinKey.fromWif(privatekeyWIF);
        wallet.privateKey = key.privateKey;
        wallet.publicKey = key.publicKey
        wallet.privateKeyWIF = privatekeyWIF;
        wallet.publicKeyHash = key.publicHash;
        wallet.publicAddress = key.publicAddress;
        return wallet;
    }

    loadWalletFromPrivKey(privateKey){
        let wallet = new Object();
        let key = new CoinKey(new Buffer.from(privateKey, 'hex'))
        wallet.privateKey = key.privateKey;
        wallet.publicKey = key.publicKey
        wallet.privateKeyWIF = helper.createPrivateKeyWIF(privateKey);
        wallet.publicKeyHash = key.publicHash;
        wallet.publicAddress = key.publicAddress;
        return wallet;
    }

    encryptWallet(privateKeyWIF, publicAddress, passPhrase){
        let buf = Buffer.from(privateKeyWIF, 'utf8');
        return Bip38.encrypt(buf, true, passPhrase, publicAddress);
    }

    decryptWallet(EncryptedWIF, passPhrase){
        return Bip38.decrypt(EncryptedWIF, passPhrase);
    }
}
module.exports = Wallet