
import ledgerStuff from "./ledger.js";

const ledger = (function buildOrReadLedger() {

  const { Ledger } = ledgerStuff;
  const serverLedger = new Ledger({});
  console.log("Development ledger has been crafted.");
  serverLedger.newBlock(1, 1);
  return serverLedger;

})();

export default ledger;