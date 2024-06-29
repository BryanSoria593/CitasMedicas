import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog'
import { AssignMedicationComponent } from '../assign-medication/assign-medication.component'

@Component({
  selector: 'app-details-cite',
  templateUrl: './details-cite.component.html',
})
export class DetailsCiteComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AssignMedicationComponent>
  ) { }

  ngOnInit(): void { }

  assignMedicines(): void {
    const dialog = this.dialog.open(AssignMedicationComponent, {
      data: {
        idCite: this.data.cite.id
      },
      width: '720px',
    })

    dialog.afterClosed().subscribe(() => {
      this.dialogRef.close()
    })
  }
}
