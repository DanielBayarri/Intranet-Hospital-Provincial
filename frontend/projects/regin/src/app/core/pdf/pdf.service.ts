import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { logoBase64 } from './logo';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor() {}

  generateIncidenciasPDF(data: any[], textoFechas: string) {
    const columns = [
      'Fecha',
      'Hora Inicio',
      'Título',
      'Comentario',
      'Tipo',
      'Subtipo',
      'Usuario',
      'Grupo',
      'Turno',
    ];

    const tableBody = [
      columns.map((col) => ({ text: col, style: 'tableHeader' })),
    ];

    // Agrega los datos a la tabla
    data.forEach((row: any) => {
      tableBody.push([
        row.fecha,
        row.horaInicio,
        row.titulo,
        row.comentario,
        row.tipo.nombre,
        row.subtipo.nombre,
        `${row.usuario.nombre} ${row.usuario.apellidos}`,
        row.grupo.nombre,
        row.turno.nombre,
      ]);
    });

    // Definición del contenido del PDF
    const pdfContent = [
      // Encabezado con imagen y texto
      {
        columns: [
          {
            image: logoBase64,
            width: 250,
          },

          {
            text: textoFechas,
            alignment: 'right',
            margin: [0, 20, 0, 0],
          },
        ],
      },
      {
        text: 'Registro de Incidencias',
        style: 'header',
        alignment: 'center',
        margin: [0, 20, 0, 0],
      },

      {
        table: {
          headerRows: 1,
          widths: columns.map(() => 'auto'),
          body: tableBody,
          alignment: 'center',
        },
        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5,
          hLineColor: () => '#ddd',
          vLineColor: () => '#ddd',
        },
        margin: [0, 10, 0, 0],
      },
    ];

    // Estilos y configuración general del PDF
    const docDefinition: any = {
      content: pdfContent,
      styles: {
        header: {
          fontSize: 16,
          bold: true,
          margin: [0, 0, 0, 10],
          color: '#0d9488',
        },
        tableHeader: {
          bold: true,
          fontSize: 8,
          color: 'white',
          fillColor: '#0d9488',
          alignment: 'center',
        },
      },
      defaultStyle: {
        fontSize: 7,
      },
      pageSize: 'A4',
      pageMargins: [40, 60, 40, 60],
      images: {
        logo: logoBase64,
      },
    };

    pdfMake.createPdf(docDefinition).download('registro_incidencias.pdf');
  }

  generateGuardiasPDF(data: any[], textoFechas: string) {
    // Columnas
    const columns = [
      'Fecha',
      'Hora Inicio',
      'Hora Fin',
      'Usuario',
      'Grupo',
      'Comentario',
    ];

    const tableBody = [
      columns.map((col) => ({ text: col, style: 'tableHeader' })),
    ];

    // Agrega los datos
    data.forEach((row: any) => {
      tableBody.push([
        row.fecha,
        row.horaInicio,
        row.horaFin,
        `${row.usuario.nombre} ${row.usuario.apellidos}`,
        row.grupo.nombre,
        row.comentario,
      ]);
    });

    const pdfContent = [
      {
        columns: [
          {
            image: logoBase64,
            width: 250,
          },

          {
            text: textoFechas,
            alignment: 'right',
            margin: [0, 20, 0, 0],
          },
        ],
      },
      {
        text: 'Registro de Guardias Localizadas',
        style: 'header',
        alignment: 'center',
        margin: [0, 20, 0, 0],
      },
      {
        table: {
          headerRows: 1,
          widths: columns.map(() => 'auto'),
          body: tableBody,
          alignment: 'center',
        },
        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5,
          hLineColor: () => '#ddd',
          vLineColor: () => '#ddd',
        },
        margin: [0, 10, 0, 0],
      },
    ];

    // Estilos y configuración general del PDF
    const docDefinition: any = {
      content: pdfContent,
      styles: {
        header: {
          fontSize: 16,
          bold: true,
          margin: [0, 0, 0, 10],
          color: '#0d9488',
        },
        tableHeader: {
          bold: true,
          fontSize: 8,
          color: 'white',
          fillColor: '#0d9488',
          alignment: 'center',
        },
      },
      defaultStyle: {
        fontSize: 7,
      },
      pageSize: 'A4',
      pageMargins: [40, 60, 40, 60],
      images: {
        logo: logoBase64,
      },
    };

    pdfMake
      .createPdf(docDefinition)
      .download('registro_guardias_localizadas.pdf');
  }
}
