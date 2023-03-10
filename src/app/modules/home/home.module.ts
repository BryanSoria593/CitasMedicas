import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MatCardModule,} from '@angular/material/card';


@NgModule({
  declarations: [  ],
  imports: [
    CommonModule,
    HomeRoutingModule, 
    MatCardModule,
  ],
  providers: [
  ]
  
})
export class HomeModule { }
