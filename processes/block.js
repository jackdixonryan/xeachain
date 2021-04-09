
// set seconds in the call to adjust the frequency of the mine.
const block = (function createBlock(seconds) {
  
  let transactionCache = [];
  const blockTime = seconds * 1000;

  return {
    // to be done once every n seconds
    block() {
      setTimeout(() => {

        

      }, blockTime);
    },
    digestAndSaveBlock() {
      const block = {
        // TODO: reindex
        index: 0,
        timestamp: null,
        transactions: [],
        proof: 4,
        previousHash: 12
      };
      // "XECAMT "
      // tx chain is "123.323 USR-12345 JOB-123456 CTR-123456 ISS-123456 2021-04-08T20:07:29" 
      let totalXec = 0;
      let ledger = 0;


      transactionCache.forEach((transaction) => {
        const elements = transaction.split(" ");
        const amount = parseFloat(elements[0]);
        const userGuid = elements[1];
        const job = elements[2];
        const contract = elements[3];
        const issuer = elements[4];
        const timestamp = elements[5];

        totalXec += ` ${transaction} `;

        
      });
      // write block to "chain";
      transactionCache = [];
    },
    writeTransaction(transaction) {
      transactionCache.push(transaction);
    }
  }
})(10);

export default block;
