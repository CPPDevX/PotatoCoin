const secureRandom = require('secure-random');
const ec = require('elliptic').ec;
const ecdsa = new ec('secp256k1');
const sha256 = require('js-sha256');
const ripemd160 = require('ripemd160');
const base58 = require('bs58');

class GenHelper {
    generatePrivateKey() {
        let max = Buffer.from("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140".toString('hex'), 'hex');
        let isInvalid = true;
        let privateKey;
        while (isInvalid) {
            privateKey = secureRandom.randomBuffer(32);
            if (Buffer.compare(max, privateKey) === 1) {
                isInvalid = false;
            }
        }
        return privateKey;
    }

    createPublicKey(privateKey) {
        let keys = ecdsa.keyFromPrivate(privateKey.toString('hex'));
        return keys.getPublic('hex');
    }

    createPublicKeyHash(publicKey) {
        let hash = sha256(Buffer.from(publicKey, 'hex'));
        return new ripemd160().update(Buffer.from(hash, 'hex')).digest();
    }

    createPublicAddress(publicKeyHash) {
        let _t1 = Buffer.from("00" + publicKeyHash, 'hex');
        let _t2 = sha256(_t1);
        let _t3 = sha256(Buffer.from(_t2, 'hex'));
        let checksum = _t3.substring(0, 8);
        let _t4 = _t1.toString('hex') + checksum;
        return base58.encode(Buffer.from(_t4, 'hex'));
    }

    createPrivateKeyWIF(privateKey) {
        let _t1 = Buffer.from("80" + privateKey.toString('hex'), 'hex');
        let _t2 = sha256(_t1);
        let _t3 = sha256(Buffer.from(_t2, 'hex'));
        let checksum = _t3.substring(0, 8);
        let _t4 = _t1.toString('hex') + checksum;
        return base58.encode(Buffer.from(_t4, 'hex'));
    }
}

module.exports = GenHelper