import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { logout } from 'src/app/state/actions/auth.action';
import { clearCites } from 'src/app/state/actions/cites.action';
// import { logout } from 'src/app/state/actions/auth.action';
import { AppState } from 'src/app/state/app.state';
import { selectDataUser } from 'src/app/state/selectors/items.selector';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  user$: any

  // user$: any;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private cookie: CookieService,
    private authService: AuthService,

  ) { }

  ngOnInit(): void {
    
    this.dataUser()
  }


  dataUser() {
    // this.user$ = this.store.select(selectDataUser)
    this.store.select(selectDataUser).subscribe((data) => {
      this.user$ = data;
    });
  }

  logout() {

    this.store.dispatch(logout());
    this.store.dispatch(clearCites());
    this.cookie.delete('token', '/');
    this.router.navigate(['/auth/login']);



    // this.store.dispatch(logout());
  }
}
