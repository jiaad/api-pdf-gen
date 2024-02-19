import express from "express";

import { addClient, deleteClient, getClients } from "../controllers/client";
const router = express.Router();

router.route("/").get(getClients).post(addClient);
router.route("/:id").delete(deleteClient);
export default router;
