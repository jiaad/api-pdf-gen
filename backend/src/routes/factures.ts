import { PrismaClient } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import { addFactures, getFactures } from "../controllers/facture";

const router = express.Router();

const prisma = new PrismaClient();

router.route("/").get(getFactures).post(addFactures);

export default router;
