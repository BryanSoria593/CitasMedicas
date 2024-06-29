import { Component, Inject } from '@angular/core'
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm-cite.component.html',
})

export class ConfirmCiteComponent {
  
  constructor(
    private dialogRef: MatDialogRef<ConfirmCiteComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {}

  close(){
    this.dialogRef.close()
  }
}
