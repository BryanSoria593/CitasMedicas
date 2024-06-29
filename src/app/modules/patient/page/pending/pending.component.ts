import { Component, OnInit } from '@angular/core'
import {Observable, combineLatest} from 'rxjs'
import { Store } from '@ngrx/store'
import { AppState } from 'src/app/state/app.state'
import { selectIdRol, selectIdUser } from 'src/app/state/selectors/user.selector'
import { loadCitesPendingRequest } from 'src/app/state/actions/cites.action'
import { selectLoading } from 'src/app/state/selectors/cites.selector'

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
})

export class PendingComponent implements OnInit {

  idUser$: Observable<number> = new Observable<number>()
  userRol$:Observable<number> = new Observable<number>()
  loading$:Observable<boolean> = new Observable<boolean>()
  
  constructor(private store: Store<AppState>) { }

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
      (idUser!== null && userRol!==null) && this.store.dispatch(loadCitesPendingRequest({  idUser, userRol }))
    })    
  }
}



