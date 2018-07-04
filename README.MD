# PotatoCoin

## Project Description.
A bare basics blockchain implementation written in javascript.


## Example Usage
Create a genesis block to initiate the blockchain

```
// Create genesis block.
let genesisBlock = new Block()
// Use Genesis block to initiate blockchain.
let blockchain = new Blockchain(genesisBlock)
```

Create a loop to add a transaction per block for a total of 10 blocks.

```
for(var i = 0; i < 10; i++){
    let transaction = new Transaction('To','From',i)
    let block = blockchain.getNextBlock([transaction])
    blockchain.addBlock(block)
}
```

Output the generated blockchain to console.

```
console.log(JSON.stringify(blockchain, null, 2));
```
## Exaample Execution
Start using `npm` by running the command.
```
npm start
```

Start using `yarn` by running the command.
```
yarn start
```
## Todo
-- Wallets need to be implemented.

-- Interactive console needs to be implemented.

-- JSON RPC Needs to be implemented.

-- Basic Stock Block Explorer to be implemented.

-- Mining needs to be implemented.

-- Consensus algorithm needs to be implemented.

## Notes
-- Basic functionality is to be seen as a proof of concept.
