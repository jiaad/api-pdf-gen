import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { genPdf } from "../utils/pdfGen";

const prisma = new PrismaClient();

export async function getFactures(req: Request, res: Response) {
  try {
    const data = await prisma.facture.findMany({
      include: {
        client: { include: { facture: { include: { client: true } } } },
      },
    });
    return res.status(200).json({ success: true, data });
  } catch (e) {
    return res.status(404).json({ success: false, msg: "not found" });
  }
}

export async function addFactures(req: Request, res: Response) {
  try {
    console.log({ body: req.body });
    const client = await prisma.client.findUnique({
      where: {
        id: req.body.clientId,
      },
    });
    if (client === null) {
      return res.json({ success: false, msg: "Client not found" });
    }

    let data = await prisma.facture.create({
      data: {
        client: { connect: { id: client.id } },
        companyName: req.body.companyName,
        total: String(req.body.total),
        title: req.body.title,
        description: req.body.description,
      },
    });
    const pdf = await genPdf({
        firstName: client.firstName,
        lastName: client.lastName,
        address: client.address,
        total: data.total,
        description: data.description,
        title: data.title,
        factureId: data.id,
    })
    data = await prisma.facture.update({
        where: {id: data.id},
        data: {
            pdf: `${data.title}_${data.id}.pdf`
        }
    })
    return res.status(200).json({success: true, data });
  } catch (e: any) {
    console.log(e);
    return res.status(200).json({ success: false, msg: e.message ?? "error" });
  }
}
