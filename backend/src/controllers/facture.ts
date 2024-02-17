import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getFactures(req: Request, res: Response) {
  const data = await prisma.facture.findMany({
    include: {
      client: { include: { facture: { include: { client: true } } } },
    },
  });
  return res.status(200).json({ data });
}

export async function addFactures(req: Request, res: Response) {
  try {
    const client = await prisma.client.findUnique({
      where: {
        id: req.body.clientId,
      },
    });
    if (client === null) {
      return res.json({ success: false, msg: "Client not found" });
    }

    const data = await prisma.facture.create({
      data: {
        client: { connect: { id: client.id } },
        companyName: req.body.companyName,
        total: req.body.total,
        title: req.body.title,
        description: req.body.description,
      },
    });
    return res.status(200).json({ data });
  } catch (e: any) {
    console.log(e);
    return res.status(200).json({ success: false, msg: e.message ?? "error" });
  }
}
