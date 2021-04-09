import userApi from "./users.api.js";
import ledgerApi from "./ledger.api.js";
import express from "express";

const router = express.Router();
router.use(userApi);
router.use(ledgerApi);

export default router;


