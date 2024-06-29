import { Component, OnInit, ViewChild } from '@angular/core'
import { selectCites } from 'src/app/state/selectors/cites.selector'
import { Store } from '@ngrx/store'
import { AppState } from 'src/app/state/app.state'
import { Observable } from 'rxjs'

import { MatPaginator } from '@angular/material/paginator'
import { CitesModel } from 'src/app/core/models/cites/cites.interface'
import { deleteCiteRequest } from 'src/app/state/actions/cites.action'
import { GeneralService } from 'src/app/shared/services/general.service'
import { MatDialog } from '@angular/material/dialog'
import { EditCiteComponent } from '../mat-dialogs/edit-cite/edit-cite.component'
import { InfoHistorialComponent } from '../mat-dialogs/info-historial/info-historial.component'
import { selectIdRol } from 'src/app/state/selectors/user.selector'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { PdfGenerateService } from 'src/app/modules/patient/services/pdf-generate.service'
import { getHistorialError, getHistorialRequest } from 'src/app/state/actions/history.action'
import { HistoryService } from 'src/app/modules/patient/services/history.service'

@Component({
  selector: 'app-cites',
  templateUrl: './cites.component.html',
  styleUrls: ['./cites.component.scss']
})
export class CitesComponent implements OnInit {

  displayedColumns: string[] = ['fecha', 'hora', 'turno', 'doctor', 'paciente', 'area', 'estado', 'actions']

  dataSource: MatTableDataSource<CitesModel> = new MatTableDataSource<CitesModel>()

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator | null = null
  @ViewChild(MatSort, { static: false }) sort: MatSort | null = null

  cites$: Observable<CitesModel[]> = new Observable<CitesModel[]>()
  idRolUser$: Observable<number> = new Observable<number>()
  pageSize: number = 7
  hasCite: boolean = false

  constructor(
    private store: Store<AppState>,
    private generalService: GeneralService,
    private dialog: MatDialog,
    private pdfService: PdfGenerateService,
    private historyService: HistoryService,
  ) { }

  ngOnInit(): void {
    this.cites$ = this.store.select(selectCites)
    this.idRolUser$ = this.store.select(selectIdRol)

    this.cites$.subscribe(resp => {
      this.dataSource.data = resp
      if (this.paginator && this.dataSource) {
        this.dataSource.paginator = this.paginator
        this.paginator.length = this.hasCite ? resp.length : 0
      }
    })
  }

  ngAfterViewInit() {
    if (this.paginator && this.dataSource) {
      this.dataSource.paginator = this.paginator
    }
    if (this.sort && this.dataSource) {
      this.dataSource.sort = this.sort
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement)?.value
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }

  deleteCite(idCite: number) {
    const dialogRef = this.generalService.openDialogConfirm('¿Estás seguro de cancelar la cita?', 'No puedes deshacerte del cambio', 'fa-solid fa-question', 'text-blue-500')
    dialogRef.subscribe(resp => resp ? this.store.dispatch(deleteCiteRequest({ id_cita: idCite })) : null)
  }

  editCite(cite: any) {
    const dialog = this.dialog.open(EditCiteComponent, {
      data: { cite },
      width: '550px'
    })

  }

  showHistorial(cite: any) {
    const dialogRef = this.dialog.open(InfoHistorialComponent, {
      data: { cite },
      width: '800px'
    })
    dialogRef.afterClosed()
  }

  generateComprobantPDF(cite: CitesModel) {
    this.pdfService.generateComprobantPdf(cite)
  }

  generateHistoryPDF(cite: CitesModel) {
    const idCite = cite.id_cita
    this.store.dispatch(getHistorialRequest({ idCite }))
    this.historyService.getHistoryByCite(idCite).subscribe({
      next: (resp) => {
        this.pdfService.generateHistoryPdf(cite, resp.history)
      },
      error: (err) => {
        this.store.dispatch(getHistorialError({ error: err.error.msg }))
      },
    })
  }
}