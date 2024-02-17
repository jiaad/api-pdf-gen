import express, { Request, Response } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./src/routes/index";
import usersRouter from "./src/routes/users";
import { PrismaClient } from "@prisma/client";
import { genPdf } from "./src/utils/pdfGen";
import { json } from "stream/consumers";

const app = express();
const prisma = new PrismaClient();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
//app.use("/users", usersRouter);

app.get(
  "/api/v1/generate-pdf/:facture_id",
  async (req: Request, res: Response) => {
    try {
      const facture = await prisma.facture.findUnique({
        include: { client: true },
        where: { id: req.params.facture_id },
      });
      if (!facture) {
        return res
          .status(500)
          .json({ success: false, msg: "Facture not found" });
      }
      const [title, error] = await genPdf({
        factureId: facture.id,
        firstName: facture?.client.firstName || "",
        lastName: facture?.client.lastName || "",
        address: facture?.client.address || "",
        title: facture.title || "",
        description: facture.description,
        total: facture.total,
      });

      if (error) {
        return res.status(500).json({ success: false, msg: "Server error" });
      }
      return res.json({ success: true, title });
    } catch (e: any) {
      return res.json({ success: false, e: e.message });
    }
  }
);

app.listen(1010, () => {
  console.log("server started");
});
