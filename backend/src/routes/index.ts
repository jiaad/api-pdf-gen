import express, { NextFunction, Request, Response } from "express";
const router = express.Router();

import clients from "./client";
import factures from "./factures";

/* GET home page. */
router.use("/api/v1/clients", clients);
router.use("/api/v1/factures", factures);
export default router;
