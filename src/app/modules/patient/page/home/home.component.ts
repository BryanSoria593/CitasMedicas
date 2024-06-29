import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { SpecialityModel } from 'src/app/core/models/speciality/speciality.interface'
import { AppState } from 'src/app/state/app.state'
import { loadSpecialityRequest } from 'src/app/state/actions/appointmentInfo'
import { selectLoadingSpecialitys, selectSpecialitys } from 'src/app/state/selectors/appointmentInfo.selector'
import { selectIdRol, selectIdUser, } from 'src/app/state/selectors/user.selector'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  loading$: Observable<boolean> = new Observable<boolean>()
  id_usuario$: Observable<number> = new Observable<number>()
  user_rol$:Observable<number> = new Observable<number>()
  specialitys$: Observable<SpecialityModel[]> = new Observable<SpecialityModel[]>()
  showToggle='hidden'

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadSpecialityRequest())
    this.specialitys$ = this.store.select(selectSpecialitys)
    this.id_usuario$ = this.store.select(selectIdUser)
    this.user_rol$ = this.store.select(selectIdRol)
    this.loading$ =  this.store.select(selectLoadingSpecialitys)
  }
}