import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable, combineLatest} from 'rxjs'
import { AppState } from 'src/app/state/app.state'
import { selectIdRol, selectIdUser, selectLoading } from 'src/app/state/selectors/user.selector'
import { loadCitesPendingRequest } from 'src/app/state/actions/cites.action'
import { selectCites } from 'src/app/state/selectors/cites.selector'
import { CitesModel } from 'src/app/core/models/cites/cites.interface'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnInit {

  idUser$: Observable<number> = new Observable<number>()
  userRol$:Observable<number> = new Observable<number>()
  loading$:Observable<boolean> = new Observable<boolean>()
  cites$: Observable<CitesModel[]> = new Observable<CitesModel[]>()
  
  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.idUser$ = this.store.select(selectIdUser)
    this.userRol$ = this.store.select(selectIdRol)
    this.loading$ = this.store.select(selectLoading)
    this.getData()
  }

  getData( ){
    combineLatest([
      this.idUser$,
      this.userRol$
    ]).subscribe(([idUser,userRol])=>{
      (idUser !== null && userRol !== null) && this.store.dispatch(loadCitesPendingRequest({ idUser, userRol }))
    })
    this.cites$ = this.store.select(selectCites)
  }
}
