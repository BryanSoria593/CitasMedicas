import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './components/header/header.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AuthService } from '../modules/auth/services/auth.service'; 
import { RouterModule } from '@angular/router';
import { CitesComponent } from './components/cites/cites.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { OrderModule } from 'ngx-order-pipe';


@NgModule({
  declarations: [
    MenuComponent,
    HeaderComponent,
    NotfoundComponent,
    CitesComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    RouterModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    OrderModule
  ],
  exports:[
    MenuComponent,
    HeaderComponent,
    OrderModule,
    CitesComponent


  ],
  providers: [
    AuthService
  ]
})
export class CoreModule { }
