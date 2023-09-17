import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor() {
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
  }

  generatePDF(data: any, headerCol: any): void {
    const documentDefinition = {
      content: [
        { text: 'Sample PDF', style: 'header' },
        {
          table: {
            headerRows: 1,
            body: [
              [headerCol],
              ...data.map((item: any) => [item.debit_to, item.company_name]),
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
      },
    };
    pdfMake.createPdf(documentDefinition).download('sample.pdf');
  }
}
