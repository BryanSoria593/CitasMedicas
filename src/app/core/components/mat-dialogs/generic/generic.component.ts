import { Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ConfirmCiteComponent } from '../confirm-cite/confirm-cite.component'

@Component({
  selector: 'app-generic',
  templateUrl: './generic.component.html',
})
export class GenericComponent implements OnInit {
  
  constructor(    
    private dialogRef: MatDialogRef<ConfirmCiteComponent>,
    @Inject(MAT_DIALOG_DATA) public message:any
  ) { }

  ngOnInit(): void {
  }
  close(){
    this.dialogRef.close()
  }
}
