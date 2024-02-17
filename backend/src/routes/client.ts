import express from "express";

import { addClient, getClients } from "../controllers/client";
const router = express.Router();

router.route("/").get(getClients).post(addClient);
export default router