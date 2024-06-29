import { Component, Input, OnInit } from '@angular/core'
import { CalendarOptions } from '@fullcalendar/core'
import timeGridPlugin from '@fullcalendar/timegrid'
import esLocale from '@fullcalendar/core/locales/es'
import { CitesModel } from 'src/app/core/models/cites/cites.interface'
import { Observable } from 'rxjs'
import { MatDialog } from '@angular/material/dialog'
import { DetailsCiteComponent } from 'src/app/core/components/mat-dialogs/details-cite/details-cite.component'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {

  @Input() cites$: Observable<CitesModel[]> = new Observable<CitesModel[]>()

  constructor( private dialog: MatDialog ) { }

  ngOnInit(): void {
    this.getCites()
  }

  getCites() {
    this.cites$.subscribe((cites: CitesModel[]) => {
      const events = cites.map(cite => ({                
        title: cite.paciente,
        date: cite.fecha,
        start: `${cite.fecha}T${cite.hora_inicio}`,
        end: `${cite.fecha}T${cite.hora_final}`,
        cite: {
          id: cite.id_cita,
          paciente: cite.paciente,
          cedula: cite.dni,
          fecha: cite.fecha,
          hora_inicio: cite.hora_inicio,
          hora_final: cite.hora_final,
          doctor: cite.doctor,
          estado: cite.estado,
          turno: cite.turno,
        }
      }))
      this.calendarOptions.events = events
    })
  }

  calendarOptions: CalendarOptions = {
    timeZone: 'UTC',
    initialView: 'timeGridWeek',
    plugins: [timeGridPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridWeek,timeGridDay',
    },
    locale: esLocale,
    eventClick: this.handleDateClick.bind(this),
    slotMinTime: '07:00:00',
    slotMaxTime: '19:00:00',
    events: [], // This events provided by the store
    allDaySlot: false,
    height: 'auto',
    slotLabelFormat: [
      { hour: 'numeric', minute: '2-digit', hourCycle: 'h12' }
    ],
    allDayClassNames: 'all-day-slot',
  }

  handleDateClick(arg) {
    const dialogRef = this.dialog.open(DetailsCiteComponent, {
      data: {
        cite: arg.event.extendedProps.cite
      },
      width: '550px',
    })

    dialogRef.afterClosed().subscribe(() => {
      this.dialog.closeAll()
    })
  }
}