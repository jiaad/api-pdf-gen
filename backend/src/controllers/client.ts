import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export async function getClients(req: Request, res: Response) {
  try {
    console.log(req.body);
    const data = await prisma.client.findMany({ include: { facture: true } });
    return res.status(200).json({ success: true, data });
  } catch (e: any) {
    console.log(e)
    return res.status(200).json({ success: false, msg: e ?? "error" });
  }
}

export async function addClient(req: Request, res: Response) {
  try {
    console.log(req.body, process.env);
    const data = await prisma.client.create({ data: req.body });
    return res.status(200).json({ success: true, data });
  } catch (e: any) {
    return res.status(200).json({ success: false, msg: e ?? "error" });
  }
}

export async function deleteClient(req: Request, res: Response) {
  try {
    console.log(req.body);
    const data = await prisma.client.delete({ where: { id: req.params.id } });
    return res.status(200).json({ success: true, data });
  } catch (e: any) {
    console.log(e.message);
    if (e.code)
      return res.status(400).json({
        success: false,
        msg: "Vous ne pouvez pas supprimer un client avec des factures",
      });
    return res.status(200).json({ success: false, msg: e.message ?? "error" });
  }
}
