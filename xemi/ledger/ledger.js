import crypto from "crypto";

class Ledger {
  constructor(args) {
    this.chain = [];
    this.transactions = [];
  }

  newBlock(previousHash, proof) {
    const newBlock = this.block({
      index: this.lastBlock ? this.lastBlock.get('index') + 1 : 0,
      timestamp: new Date().getTime(),
      transactions: this.transactions,
      proof: proof,
      // with the || for the genesis block.
      previousHash: this.lastBlock ? this.lastBlock.get('hash') : previousHash,
    });

    // now that's done, reset transactions and add the block to the chain.
    this.transactions = [];
    this.chain.push(newBlock);
    return newBlock;
  }


  // don't forget this returns a map, object methods have no power here.
  block(args) {
    const { index, timestamp, transactions, proof, previousHash } = args;

    let block = new Map();
    block.set('index', index);
    block.set('timestamp', timestamp);
    block.set('transactions', transactions);
    block.set('proof', proof);
    block.set('previousHash', previousHash);
    const hash = this.hash(block);
    block.set('hash', hash);

    return block;
  }

  transact(args) {
    const transaction = new Transaction(args);
    this.transactions.push(transaction);
    // return the index of the block that _will_ contain this transaction (not yet mined.)
    const lastIndex = this.lastBlock.get('index');
    return lastIndex + 1;
  }

  hash(block) {
    // to ORDER the object? I don't know if I understand this. The article I'm following is for Python and they're using json.dumps with a sortKeys fn.
    const blockString = JSON.stringify(block);
    // generates a hash for the stringified map
    const hash = crypto.createHash("sha256", blockString);
    return hash.digest("hex");
  }

  // ie, the most recent block.
  get lastBlock() {
    return this.chain[this.chain.length - 1] || null;
  }

  proofOfWork(lastProof) {
    console.time("prove");
    let proof = 0;
    while (!this.validProof(lastProof, proof)) {
      proof += 1;
      if (proof % 1000000 === 0) {
        console.log(`${proof} combinations tried.`)
      }
    }
    console.timeEnd("prove");
    return proof;
  }

  validProof(lastProof, proof) {
    const guess = `${lastProof}${proof}`;
    const guessHash = crypto.createHash("sha256");
    const hexDigest = guessHash.update(guess).digest("hex");
    const firstFour = hexDigest.slice(0, 6);
    if (firstFour === "000000") {
      console.log(proof);
      return true;
    } else {
      return false;
    }
  }
}

class Transaction {
  constructor(args) {
    const { sender, recipient, amount, job, contract } = args;
    if (!sender || !recipient || !amount) {
      throw new Error("Sender, Recipient, and Amount are all required transaction fields.");
    }
    this.sender = sender;
    this.recipient = recipient;
    this.amount = amount;
    this.job = job || null;
    this.contract = contract || null;
  }
}

export default { Ledger, Transaction };
