import { DatePipe } from '@angular/common'
import { Injectable } from '@angular/core'

import { CitesModel } from 'src/app/core/models/cites/cites.interface'
import { HistoryModel } from 'src/app/core/models/cites/history.interface'

import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"
import { GeneralService } from 'src/app/shared/services/general.service'

pdfMake.vfs = pdfFonts.pdfMake.vfs

@Injectable({
  providedIn: 'root'
})
export class PdfGenerateService {

  private datePipe: DatePipe

  logo: string = 'assets/img/shared/logo.webp'
  currentToday = new Date()
  date = `${this.currentToday.getDate()}/${this.currentToday.getMonth() + 1}/${this.currentToday.getFullYear()}`

  constructor(
    private generalService: GeneralService,
  ) { this.datePipe = new DatePipe('en-US') }

  async generateComprobantPdf(cite: CitesModel) {
    const dialog = this.generalService.openDialogLoading()
    const pdf = {
      header: {
        columns: [
          {
            stack: [
              'Clínica Vitalia',
              'Instituto Soria Group S.A.S',
              'Av. 19 Calle 134 La Libertad, Santa Elena, Ecuador',
            ],
            margin: [0, 6, 0, 0],
            alignment: 'center',
          },
          {
            stack: [
              {
                image: await this.getBase64ImageFromURL(this.logo),
                width: 30,
                height: 26,
                margin: [0, 5, -50, 0],
              },
              {
                text: 'Clínica Vitalia',
                margin: [0, 0, -100, 0],
                color: '#03005b',
              },
            ],
          },
        ],
        fontSize: 7,
        alignment: 'center',
        bold: true,
      },
      content: [
        {
          text: 'Comprobante de agendamiento de cita médica',
          margin: [0, 10, 0, 0],
          fontSize: 14,
          alignment: 'center',
          bold: true,
        },
        {
          text: 'Datos del paciente',
          margin: [0, 10, 0, 10],
          fontSize: 13,
          alignment: 'left',
          bold: true,
        },
        {
          table: {
            body: [
              [{ text: 'Nombre:', fillColor: '#E8F5E9', bold: true }, { text: cite.paciente }],
              [{ text: 'DNI:', fillColor: '#E8F5E9', bold: true }, { text: cite.dni }],
            ],
          },
          fontSize: 10,
        },
        {
          text: 'Datos de la cita',
          margin: [0, 10, 0, 10],
          fontSize: 13,
          alignment: 'left',
          bold: true,
        },
        {
          table: {
            body: [
              [{ text: 'Fecha:', fillColor: '#E8F5E9', bold: true }, { text: cite.fecha }],
              [{ text: 'Hora:', fillColor: '#E8F5E9', bold: true }, { text: `${cite.hora_inicio} - ${cite.hora_final}` }],
              [{ text: 'Turno:', fillColor: '#E8F5E9', bold: true }, { text: cite.turno }],
              [{ text: 'Doctor:', fillColor: '#E8F5E9', bold: true }, { text: cite.doctor }],
              [{ text: 'Área:', fillColor: '#E8F5E9', bold: true }, { text: cite.area }],
            ],
          },
          fontSize: 10,
        },
        {
          text: 'Por favor, acudir a su cita médica 30 minutos antes de la hora agendada',
          alignment: 'center',
          margin: [0, 20],
          fontSize: 10,
          bold: true,
        },
      ],
      footer: {
        columns: [{ text: 'Instituto Soria Group S.A.S' }, { text: 'Clínica Vitalia', color: '#03005b' }],
        alignment: 'center',
        fontSize: 8,
        bold: true,
      },
    }

    dialog.close()
    pdfMake.createPdf(pdf).download(`Comprobante ${cite.paciente} - ${this.date}.pdf`)
  }

  async generateHistoryPdf(cite: CitesModel, history: HistoryModel) {
    const imagePromises = history.images.map(async (image: any) => {
      const base64Image = await this.getBase64ImageFromURL(image.url)
      return { image: base64Image, width: 500, height: 750, alignment: 'center', margin: [0, 15] }
    })

    const imageResults = await Promise.all(imagePromises)

    const pdf = {
      header: {
        columns: [
          {
            stack: [
              'Clínica Vitalia',
              'Instituto Soria Group S.A.S',
              'Av. 19 Calle 134 La Libertad, Santa Elena, Ecuador',
            ],
            margin: [0, 6, 0, 0],
            alignment: 'center',
            fontSize: 8,
          },
          {
            stack: [
              {
                image: await this.getBase64ImageFromURL(this.logo),
                width: 30,
                height: 26,
                margin: [0, 5, -50, 0],
              },
              {
                text: 'Clínica Vitalia',
                margin: [0, 0, -100, 0],
                color: '#03005b',
                fontSize: 7,
              },
            ],
          },
        ],
        alignment: 'center',
        bold: true,
      },
      content: [
        {
          text: 'Historial médico',
          margin: [0, 20],
          fontSize: 16,
          alignment: 'center',
          bold: true,
        },
        {
          text: 'Datos del paciente',
          margin: [0, 10],
          fontSize: 14,
          bold: true,
        },
        {
          table: {
            widths: ['auto', '*'],
            body: [
              [{ text: 'Nombre:', fillColor: '#E8F5E9', bold: true }, { text: cite.paciente }],
              [{ text: 'DNI:', fillColor: '#E8F5E9', bold: true }, { text: cite.dni }],
            ],
          },
        },
        {
          text: 'Datos de la cita',
          margin: [0, 10],
          fontSize: 14,
          bold: true,
        },
        {
          table: {
            widths: ['auto', '*'],
            body: [
              [{ text: 'Fecha de la cita:', fillColor: '#E8F5E9', bold: true }, { text: cite.fecha }],
              [{ text: 'Hora de la cita:', fillColor: '#E8F5E9', bold: true }, { text: `${cite.hora_inicio} - ${cite.hora_final}` }],
              [{ text: 'Turno:', fillColor: '#E8F5E9', bold: true }, { text: cite.turno }],
              [{ text: 'Doctor:', fillColor: '#E8F5E9', bold: true }, { text: cite.doctor }],
              [{ text: 'Área:', fillColor: '#E8F5E9', bold: true }, { text: cite.area }],
              [{ text: 'Fecha de atención:', fillColor: '#E8F5E9', bold: true }, { text: this.datePipe.transform(history.info.fecha_atencion, 'dd/MM/yyyy HH:mm a') }],
            ],
          },
        },
        {
          text: 'Receta',
          margin: [0, 10],
          fontSize: 14,
          bold: true,
        },
        {
          table: {
            widths: ['auto', '*'],
            body: [
              [
                { text: 'Medicamento', bold: true, fillColor: '#E8F5E9', alignment: 'center' },
                { text: 'Indicación', bold: true, fillColor: '#E8F5E9', alignment: 'center' }
              ],
              ...history.medicaments.map(medicament => {
                return [
                  { text: medicament.medicamento, bold: true },
                  { text: medicament.indicacion },
                ];
              })
            ]
          }
        },
        {
          text: 'Información adicional',
          margin: [0, 10],
          fontSize: 14,
          bold: true,
        },
        {
          text: history.info.extra_info,
          margin: [0, 5],
        },
        {
          ul: imageResults,
        },
      ],
      footer: {
        columns: [{ text: 'Instituto Soria Group S.A.S' }, { text: 'Clínica Vitalia', color: '#03005b' }],
        alignment: 'center',
        fontSize: 8,
        bold: true,
      },
    }

    pdfMake.createPdf(pdf).download(`Historial ${cite.paciente} - ${this.date}.pdf`)
  }

  getBase64ImageFromURL(url: string) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.setAttribute("crossOrigin", "anonymous")

      img.onload = () => {
        const canvas = document.createElement("canvas")
        canvas.width = img.width
        canvas.height = img.height

        const ctx = canvas.getContext("2d")
        ctx.drawImage(img, 0, 0)

        const dataURL = canvas.toDataURL("image/png")

        resolve(dataURL)
      }
      img.onerror = error => {
        reject(error)
      }
      img.src = url
    })
  }
}