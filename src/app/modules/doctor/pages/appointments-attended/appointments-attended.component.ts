import { Component, OnInit } from '@angular/core'
import { Observable, combineLatest } from 'rxjs'
import { AppState } from 'src/app/state/app.state'
import { Store } from '@ngrx/store'
import { selectIdRol, selectIdUser, selectLoading } from 'src/app/state/selectors/user.selector'
import { loadCitesAssistedRequest } from 'src/app/state/actions/cites.action'

@Component({
  selector: 'app-appointments-attended',
  templateUrl: './appointments-attended.component.html',
})
export class AppointmentsAttendedComponent implements OnInit {

  id_usuario$: Observable<number> = new Observable<number>()
  userRol$: Observable<number> = new Observable<number>()
  loading$: Observable<boolean> = new Observable()

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.id_usuario$ = this.store.select(selectIdUser)
    this.userRol$ = this.store.select(selectIdRol)
    this.loading$ = this.store.select(selectLoading)
    this.getCites()
  }

  getCites() {
    combineLatest([
      this.id_usuario$,
      this.userRol$
    ]).subscribe(([idUser, userRol]) => {
      (idUser !== null && userRol !== null) && this.store.dispatch(loadCitesAssistedRequest({ idUser, userRol }))
    }
    )
  }
}