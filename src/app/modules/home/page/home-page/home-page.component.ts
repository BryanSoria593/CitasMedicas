import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import {  selectDataUser, selectIdUser, selectLoading, selectOptions } from 'src/app/state/selectors/items.selector';
import * as CitesActions from 'src/app/state/actions/cites.action';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CitesService } from 'src/app/modules/cites/services/cites.service';
import { selectCites } from 'src/app/state/selectors/cites.selector';
import { CitesModel } from 'src/app/core/models/cites/cites.interface';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  loading$: Observable<any>;
  menuOptions$: Observable<any>;
  fullNames$ : Observable<any>;
  id_usuario$: number = null;
  data: CitesModel[] = [];
  constructor(
    private authService: AuthService,
    private citesService: CitesService,
    private store: Store<AppState>,
 

  ) { }

  ngOnInit(): void {
    // this.authService.checkToken();
    this.store.select(selectIdUser).subscribe({
      next: (data) => {
        if (data) {
          this.id_usuario$ = data;
          this.store.dispatch( CitesActions.loadCitesPendingRequest({ id_usuario: this.id_usuario$ }) );
          this.getData();                              
        }
      }
    })
  }
  getData() {
    this.store.select(selectCites).subscribe({
      next: (data) => {
        if (data) {
          this.data = data;
        }}
      })   
    }
}
