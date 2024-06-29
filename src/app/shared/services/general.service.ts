import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ConfirmGenericComponent } from 'src/app/core/components/mat-dialogs/confirm-generic/confirm-generic.component'
import { GenericComponent } from 'src/app/core/components/mat-dialogs/generic/generic.component'
import { LoadingComponent } from 'src/app/core/components/mat-dialogs/loading/loading.component'

@Injectable({
  providedIn: 'root'
})

export class GeneralService {

  constructor(
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  openDialogLoading() {
    const dialogRef = this.dialog.open(LoadingComponent, {
      width: '350px',
    })
    return dialogRef
  }

  openSnackBar(message: string, action: string, duration: number = 3000) {
    this._snackBar.open(message, action, {
      duration
    })
  }

  /* in the second argument, place a class that specifies a logo in fontawesome and 
  the color in taildwind */
  openDialogSuccess(title: string, logo: string, color: string, timeOut: number = 2000) {
    const dialogRef = this.dialog.open(GenericComponent, {
      width: '350px',
      data: {
        title,
        logo,
        color
      },
    })

    setTimeout(() => {
      dialogRef.close()
    }, timeOut)
  }

  openDialogConfirm(title: string, description: string, logo: string, color: string) {
    const dialogRef = this.dialog.open(ConfirmGenericComponent, {
      width: '350px',
      data: {
        title,
        description,
        logo,
        color
      },
    })
    return dialogRef.afterClosed()
  }
}