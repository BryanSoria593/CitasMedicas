import { Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { AuthService } from 'src/app/modules/auth/services/auth.service'

import { AppState } from 'src/app/state/app.state'
import { selectDataUser } from 'src/app/state/selectors/user.selector'
import { UserModel } from '../../models/user/user.interface'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})

export class HeaderComponent implements OnInit {
  @Input() title: string
  user$: Observable<UserModel> = new Observable<UserModel>()

  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.dataUser()
  }

  dataUser() {
    this.user$ = this.store.select(selectDataUser)
  }

  logout() {
    this.authService.logout()
  }
}
