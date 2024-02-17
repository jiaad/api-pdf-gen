import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();


export async function getClients(req: Request, res: Response) {
  try {
    const data = await prisma.client.findMany({ include: { facture: true } });
    return res.status(200).json({ data });
  } catch (e: any) {
    return res.status(200).json({ success: false, msg: e ?? "error" });
  }
}

export async function addClient(req: Request, res: Response) {
  try {
    console.log(req.body);
    const data = await prisma.client.create({ data: req.body });
    return res.status(200).json({ success: true, data });
  } catch (e: any) {
    return res.status(200).json({ success: false, msg: e ?? "error" });
  }
}
