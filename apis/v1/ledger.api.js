import express from "express";
import ledger from "../../xemi/ledger/init.js";
import ledgerClasses from "../../xemi/ledger/ledger.js";

const ledgerApi = (function buildApi() {
  "use strict";

  const { Transaction } = ledgerClasses;

  async function mine(req, res, next) {
    const lastBlock = ledger.lastBlock;
    const lastProof = lastBlock.get('proof');
    const proof = ledger.proofOfWork(lastProof);

    ledger.transact({
      sender: "Xemithus Economic Authority",
      recipient: "you",
      amount: 1
    });

    const previousHash = ledger.hash(lastBlock);
    const block = ledger.newBlock(previousHash, proof);

    res.status(201)
      .send({
        message: "The XEA thanks you for your service. You have received one Ztoken for your effort.",
        index: block.get('index'),
        transactions: block.get('transactions'),
        proof: block.get('proof'),
        previousHash: block.get('previousHash')
      });
  }

  async function chain(req, res, next) {
    // the blocks will not directly translate to JSON a la objects, they must be transformed into objects, then sent..
    const chain = ledger.chain.map((block) => {
      const obj = Object.fromEntries(block);
      return obj;
    })
    res.send({
      chain,
      length: ledger.chain.length,
      valid: ledger.validChain
    });
  }

  async function go(req, res, next) {
    res.send({
      message: 'you betcha'
    })
  }

  const router = express.Router();

  router.get("/mine", mine);
  router.get('/chain', chain);

  return router;
})();

export default ledgerApi;