import PDFDocument from "pdfkit";
import fs from "fs";
import { title } from "process";

type PdfInfoType = {
  firstName: string;
  lastName: string;
  address: string;
  total: string;
  description: string;
  title: string;
  factureId: string;
};
export async function genPdf(info: PdfInfoType) {
  console.log("----------------- start");
  // Create a document
  const doc = new PDFDocument();
  try {
    const docTitle = `public/factures/${info.title}_${info.factureId}.pdf`;
    doc.pipe(fs.createWriteStream(docTitle));

    doc.fontSize(12).text(
      `
    ${info.firstName} ${info.lastName}
    ${info.address} 
    `,
      100,
      100
    );

    doc.fontSize(12).text(
      `
   Hetic
   3 rue bidon 
   montreuil 
    `,
      450,
      150
    );

    doc.fontSize(12).text(
      `
   ${info.title} : ${info.description} 
   ------------------------------------------------------------
   ${info.total}
    `,
      100,
      300
    );
    return [docTitle, null];
  } catch (e) {
    return [null, true];
  } finally {
    doc.end();
  }
}
