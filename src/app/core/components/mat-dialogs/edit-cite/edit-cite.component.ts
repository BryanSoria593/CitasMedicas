import { Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { TurnsModel } from 'src/app/core/models/speciality/speciality.interface'
import { AppState } from 'src/app/state/app.state'
import { selectTurns } from 'src/app/state/selectors/appointmentInfo.selector'
import { loadTurnsRequest } from 'src/app/state/actions/appointmentInfo'
import { selectIdRol } from 'src/app/state/selectors/user.selector'
import { updateCiteRequest } from 'src/app/state/actions/cites.action'
import { UpdateCiteModel } from 'src/app/core/models/cites/cites.interface'
import { GeneralService } from 'src/app/shared/services/general.service'

@Component({
  selector: 'app-edit-cite',
  templateUrl: './edit-cite.component.html',
})
export class EditCiteComponent implements OnInit {

  minDate = new Date()
  newCite: UpdateCiteModel = {
    date: '',
    idTurn: null,
    idCite: this.data.cite.id_cita,
    idUser: this.data.cite.id_usuario,
    userRol: null
  }
  turns$: Observable<TurnsModel[]>

  filterDays = (date: Date | null): boolean => {
    const day = (date || new Date()).getDay()
    // Bloquear los sábados y domingos
    return day !== 0 && day !== 6
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<AppState>,
    private generalService: GeneralService,
    public dialogRef: MatDialogRef<EditCiteComponent>
  ) { }

  ngOnInit(): void {
    this.turns$ = this.store.select(selectTurns)
    this.store.select(selectIdRol).subscribe(rol => this.newCite.userRol = rol)
  }

  onDateChange(event: any) {
    const id_doctor = this.data.cite.id_doctor
    const formattedDate = new Date(event).toISOString().split('T')[0].replace(/-/g, '-')
    this.newCite.date = formattedDate
    this.store.dispatch(loadTurnsRequest({ date: formattedDate, id_doctor }))
  }

  updateCite() {
    const dialog = this.generalService.openDialogConfirm('¿Estás seguro de actualizar la cita?', 'Una vez actualizada no se podrá deshacer', 'fas fa-exclamation-triangle', 'text-yellow-500')
    dialog.subscribe(resp => {
      if (resp) {        
        this.store.dispatch(updateCiteRequest({ updatedCite: this.newCite }))
        this.dialogRef.close()
      }
    })
  }
}