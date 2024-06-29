import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { AppState } from 'src/app/state/app.state'
import { Observable } from 'rxjs/internal/Observable'
import { selectDoctors, selectSpecialitys, selectTurns } from 'src/app/state/selectors/appointmentInfo.selector'
import { FormBuilder, Validators } from '@angular/forms'
import { DoctorsModel, SpecialityModel, TurnsModel } from 'src/app/core/models/speciality/speciality.interface'
import { combineLatest } from 'rxjs'
import { selectIdUser } from 'src/app/state/selectors/user.selector'
import { newCiteRequest } from 'src/app/state/actions/cites.action'
import { MatDialog } from '@angular/material/dialog'
import { ConfirmCiteComponent } from 'src/app/core/components/mat-dialogs/confirm-cite/confirm-cite.component'
import { loadDoctorByAreaRequest, loadSpecialityRequest, loadTurnsRequest } from 'src/app/state/actions/appointmentInfo'

@Component({
  selector: 'app-register-cite',
  templateUrl: './register-cite.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterCiteComponent implements OnInit {
  minDate = new Date()
  specialitys$: Observable<SpecialityModel[]> = new Observable<SpecialityModel[]>()
  doctors$: Observable<DoctorsModel[]> = new Observable<DoctorsModel[]>()
  turns$: Observable<TurnsModel[]> = new Observable<TurnsModel[]>()
  idUsuario: number

  // Bloquear los sábados y domingos
  filterDays = (date: Date | null): boolean => {
    const day = (date || new Date()).getDay()
    return day !== 0 && day !== 6
  }

  formArea = this._formBuilder.group({ objectArea: ['', Validators.required] })
  formDoctor = this._formBuilder.group({ objectDoctor: ['', Validators.required] })
  formDate = this._formBuilder.group({ date: ['', Validators.required] })
  formTurn = this._formBuilder.group({ objectTurno: ['', Validators.required] })

  objectCiteSelect = {
    nameDoc: null,
    speciality: null,
    date: null,
    initialHour: null,
    finishHour: null
  }

  constructor(
    private store: Store<AppState>,
    private _formBuilder: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadSpecialityRequest())
    this.specialitys$ = this.store.select(selectSpecialitys)
    this.store.select(selectIdUser).subscribe(idUser => this.idUsuario = idUser)
  }

  searchDoctorBySpeciality(id_area: number) {
    this.resetValues()
    this.store.dispatch(loadDoctorByAreaRequest({ id_area }))
    this.doctors$ = this.store.select(selectDoctors)
  }

  onDateChange() {
    if (
      (this.formDate.value.date === null || this.formDate.value.date === '' || this.formDate.value.date === undefined)
      || (this.formDoctor.value.objectDoctor === null || this.formDoctor.value.objectDoctor === '' || this.formDoctor.value.objectDoctor === undefined)
    ) return

    const date = this.formDate.value.date
    // const id_doctor = this.formDoctor.value.objectDoctor['id_doctor']
    const formattedDate = new Date(date).toISOString().split('T')[0].replace(/-/g, '-')

    this.store.dispatch(loadTurnsRequest({
      date: formattedDate,
      id_doctor: this.formDoctor.value.objectDoctor['id_doctor']
    }))
    this.turns$ = this.store.select(selectTurns)
  }

  getObjectForId() {
    const date = this.formDate.value.date
    const formattedDate = new Date(date).toISOString().split('T')[0].replace(/-/g, '-')
    const objectForId = {
      idSpeciality: this.formArea.value.objectArea['id_area'],
      idUser: this.idUsuario,
      idDoctor: this.formDoctor.value.objectDoctor['id_doctor'],
      date: formattedDate,
      idTurn: this.formTurn.value.objectTurno['id_disponibilidad']
    }
    return objectForId
  }


  addInfoSelectedToObject() {
    const date = this.formDate.value.date
    const formattedDate = new Date(date).toISOString().split('T')[0].replace(/-/g, '-')
    this.objectCiteSelect.date = formattedDate

    combineLatest([
      this.specialitys$,
      this.doctors$,
      this.turns$
    ]).subscribe(([specialities, doctors, turns]) => {
      const speciality = specialities.find(speciality => speciality.id_area === this.formArea.value.objectArea['id_area'])
      const selectedDoctor = doctors.find(doctor => doctor.id_doctor === this.formDoctor.value.objectDoctor['id_doctor'])
      const selectedTurn = turns.find(turn => turn.id_turno === this.formTurn.value.objectTurno['id_turno'])

      if (speciality) {
        this.objectCiteSelect.speciality = speciality.nombre
      }

      if (selectedDoctor) {
        this.objectCiteSelect.nameDoc = `${selectedDoctor.nombres} ${selectedDoctor.apellidos}`
      }

      if (selectedTurn) {
        this.objectCiteSelect.initialHour = selectedTurn.hora_inicio
        this.objectCiteSelect.finishHour = selectedTurn.hora_final
      }
    })
  }

  resetValues() {
    // Reset the values when the user marks new speciality
    this.formDoctor.patchValue({ objectDoctor: '' })
    this.formDate.patchValue({ date: '' })
    this.formTurn.patchValue({ objectTurno: '' })
  }

  resetDate() {
    // Reset the values when the user marks new doctor
    this.formDate.patchValue({ date: '' })
    this.formTurn.patchValue({ objectTurno: '' })
  }

  newCiteRequest() {
    const objectForId = this.getObjectForId()
    this.addInfoSelectedToObject()
    this.openDialog().subscribe(resp => resp ? this.store.dispatch(newCiteRequest({ newCite: objectForId })) : null)
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmCiteComponent, {
      width: '350px',
      data: {
        title: 'Datos de la cita a agendar',
        object: this.objectCiteSelect
      }
    })
    return dialogRef.afterClosed()
  }
}