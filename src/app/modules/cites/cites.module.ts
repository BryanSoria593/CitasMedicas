import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {CitesRoutingModule  } from './cites-routing.module';
import { RegisterCiteComponents } from './page/register-cite/register-cite.component';
import { CoreModule } from 'src/app/core/core.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { OrderModule } from 'ngx-order-pipe';
import { AppointmentsComponent } from './page/appointments/appointments.component';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [RegisterCiteComponents, AppointmentsComponent],
  imports: [
    CommonModule,
    CitesRoutingModule,
    CoreModule,        
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    OrderModule,
    MatCardModule
    
  ],
  exports: [
    OrderModule
  ]

})
export class CitesModule { }
