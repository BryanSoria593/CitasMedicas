import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-confirm-generic',
  templateUrl: './confirm-generic.component.html',
})

export class ConfirmGenericComponent {

  constructor(
    private dialogRef: MatDialogRef<ConfirmGenericComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {}

  close(){
    this.dialogRef.close()
  }
}
