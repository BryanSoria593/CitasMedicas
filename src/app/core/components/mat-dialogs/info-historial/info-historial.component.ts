import { Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import {getHistorialRequest} from 'src/app/state/actions/history.action'
import { selectImages, selectInfOfCite, selectMedicaments } from 'src/app/state/selectors/history.selector'
import { Store } from '@ngrx/store'
import { AppState } from 'src/app/state/app.state'
import { ImagesHistoryModel, InfoModel, MedicamentHistoryModel } from 'src/app/core/models/cites/history.interface'
import { Observable } from 'rxjs'
import { selectLoading } from 'src/app/state/selectors/history.selector'

@Component({
  selector: 'app-info-historial',
  templateUrl: './info-historial.component.html',
  styleUrls: ['./info-historial.component.scss'],
})

export class InfoHistorialComponent implements OnInit {

  infOfCite$: Observable<InfoModel> = new Observable<InfoModel>()
  medicaments$: Observable<MedicamentHistoryModel[]> = new Observable<MedicamentHistoryModel[]>()
  images$: Observable<ImagesHistoryModel[]> = new Observable<ImagesHistoryModel[]>()
  loading$: Observable<boolean> = new Observable<boolean>()

  classOfImage: 'clicked'

  constructor(
    @Inject(MAT_DIALOG_DATA) public cite: any,
    private store: Store<AppState>,
    private dialogRef: MatDialogRef<InfoHistorialComponent>,
  ) { }

  ngOnInit(): void {
    const idCite = this.cite.cite.id_cita
    this.dispatchForGetHistorial(idCite)
    this.getInfOfCite()
    this.getMedicaments()
    this.getImages()
  }

  dispatchForGetHistorial(idCite: number) {
    this.store.dispatch(getHistorialRequest({ idCite }))
    this.loading$ = this.store.select(selectLoading)
  }

  getInfOfCite() {
    this.infOfCite$ = this.store.select(selectInfOfCite)
  }

  getMedicaments() {
    this.medicaments$ = this.store.select(selectMedicaments)
  }

  getImages() {
    this.images$ = this.store.select(selectImages)
  }

  close(): void {
    this.dialogRef.close()
  }

  onImageClick(event: MouseEvent): void {
    const clickedImage = event.target as HTMLElement
    const isClicked = clickedImage.classList.contains('clicked')
    const allImages = document.querySelectorAll('.clicked')

    allImages.forEach((img) => img.classList.remove('clicked'))

    if (!isClicked) {
      clickedImage.classList.add('clicked')
    }
  }
}
