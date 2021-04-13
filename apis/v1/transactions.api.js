import express from "express";
import ledger from "../../xemi/ledger/init.js";
import ledgerClasses from "../../xemi/ledger/ledger.js";

const transactionApi = (function api() {
  "use strict";

  const { Transaction } = ledgerClasses;

  function roughSizeOfObject( object ) {
    const objectList = [];
    const stack = [ object ];
    let bytes = 0;
    while ( stack.length ) {
      let value = stack.pop();
      if ( typeof value === 'boolean' ) {
        bytes += 4;
      } else if ( typeof value === 'string' ) {
        bytes += value.length * 2;
      } else if ( typeof value === 'number' ) {
        bytes += 8;
      } else if (typeof value === 'object' && objectList.indexOf( value ) === -1) {
        objectList.push(value);
        for(let i in value) {
          stack.push(value[i]);
        }
      }
    }
    return bytes;
  }

  const router = express.Router();
  // send not implemented until... well, implemented.
  async function getTransactions(req, res, next) {
    const transactions = ledger.transactions;
    transactions.forEach((transaction) => {
      transaction.size = roughSizeOfObject(transaction);
    })
    res.send({ transactions });
  }

  async function postTransactions(req, res, next) {
    const { body } = req;
    const { transactions } = body;
    let index;
    if (!transactions) {
      res.status(400).send({ message: "Transactions array is required. " });
    } else {
      transactions.forEach((transaction) => {
        try {
          const t = new Transaction(transaction);
          index = ledger.transact(transaction);
        } catch (error) {
          console.log(error);
          res.status(400).send({ message: "amount, sender, and amount are required fields.", transaction });
        }
      });
      res.status(201).send({
        transactionsReceived: transactions.length,
        blockIndex: index
      });
    }
  }

  async function patchTransaction(req, res, next) {
    res.sendStatus(501);
  }

  async function deleteTransaction(req, res, next) {
    res.sendStatus(501);
  }

  router.get('/transactions', getTransactions);
  router.post('/transactions', postTransactions);
  // I see no reason why transactions can't be updated prior to getting blocked. Obviously, once in a block, it's too late.
  router.patch('/transactions/:transactionId', patchTransaction);
  router.delete('/transactions/:transactionId', deleteTransaction);

  return router;
})();

export default transactionApi;