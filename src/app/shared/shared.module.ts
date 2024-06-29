import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatSnackBarModule,  
  ],
    
})
export class SharedModule { }
