import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Store, } from '@ngrx/store'
import { AppState } from 'src/app/state/app.state'
import { Observable, combineLatest } from 'rxjs'
import { selectEmailUser, selectLastNameUser, selectNameUser } from 'src/app/state/selectors/user.selector'
import { GeneralService } from 'src/app/shared/services/general.service'
import { updatePasswordFromProfileRequest, updateProfileRequest } from 'src/app/state/actions/auth.action'
import { SharedService } from '../services/shared.service'

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
})

export class EditProfileComponent implements OnInit {

  name$: Observable<string> = new Observable<string>()
  lastName$: Observable<string> = new Observable<string>()
  mail$: Observable<string> = new Observable<string>()

  form: FormGroup = new FormGroup({})
  formUpdateInfo: FormGroup = new FormGroup({})
  formUpdatePassword: FormGroup = new FormGroup({})

  constructor(
    private store: Store<AppState>,
    private generalService: GeneralService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.getInfoForUser()
    this.verifyDataUserAndCreateForm()
  }

  verifyDataUserAndCreateForm(): void {  
    combineLatest([this.name$, this.lastName$, this.mail$]).subscribe(([name, lastName, mail]) => {
      this.newFormGroup()
      this.setValuesInFormInfoUser(name, lastName, mail)
    })
  }

  newFormGroup(): void {
    this.formUpdateInfo = new FormGroup(
      {
        name: new FormControl('', [
          Validators.required,
        ]),
        lastName: new FormControl('', [
          Validators.required,
        ]),
        email: new FormControl('', [
          Validators.email,
          Validators.required
        ]),
        password: new FormControl('', [
          Validators.required,
        ]),
      }
    )
    this.formUpdatePassword = new FormGroup({
      currentPassword: new FormControl('', [
        Validators.required,
      ]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
      ]),
    }, {
      validators: [
        this.sharedService.checkPasswords,
        this.sharedService.checkPatternPassword
      ]
    })
  }

  getInfoForUser(): void {
    this.name$ = this.store.select(selectNameUser)
    this.lastName$ = this.store.select(selectLastNameUser)
    this.mail$ = this.store.select(selectEmailUser)
  }
  
  currentInfoUser(): { currentName: string, currentLastName: string, currentMail: string } {
    let currentName = ''
    let currentLastName = ''
    let currentMail = ''

    combineLatest([this.name$, this.lastName$, this.mail$]).subscribe(([name, lastName, mail]) => {
      currentName = name
      currentLastName = lastName
      currentMail = mail
    })
    return { currentName, currentLastName, currentMail }
  }

  setValuesInFormInfoUser(name: string, lastName: string, mail: string): void {
    this.formUpdateInfo.get('name')?.setValue(name)
    this.formUpdateInfo.get('lastName')?.setValue(lastName)
    this.formUpdateInfo.get('email')?.setValue(mail)
  }

  updateProfile(): void {
    if (this.formUpdateInfo.invalid) {
      this.generalService.openDialogSuccess('Debes completar todos los campos', 'fa-solid fa-xmark', 'text-red-500', 3000)
      return
    }

    const { currentName, currentLastName, currentMail } = this.currentInfoUser()
    const { name, lastName, email, password } = this.formUpdateInfo.value

    if (currentName !== name || currentLastName !== lastName || currentMail !== email) {
      const dialogRef = this.generalService.openDialogConfirm('Actualizar perfil', '¿Estás seguro de actualizar el perfil?', 'fa-solid fa-question', 'text-blue-500')
      dialogRef.subscribe((result) => {
        if (result) {
          this.store.dispatch(updateProfileRequest({
            credentials: {
              nombres: name,
              apellidos: lastName,
              email: email,
              password: password
            }
          }))
        }
      })
    } else {
      this.generalService.openDialogSuccess('No se ha realizado ningún cambio', 'fa-solid fa-xmark', 'text-red-500')
    }
  }

  updatePassword(): void {
    if (this.formUpdatePassword.invalid) {
      this.generalService.openDialogSuccess('Debes completar todos los campos', 'fa-solid fa-xmark', 'text-red-500', 3000)
      return
    }
    const dialogRef = this.generalService.openDialogConfirm('Actualizar contraseña', '¿Estás seguro de actualizar la contraseña?', 'fa-solid fa-question', 'text-blue-500')
    const { currentMail } = this.currentInfoUser()

    dialogRef.subscribe((result) => {
      if (result) {
        this.store.dispatch(updatePasswordFromProfileRequest({
          credentials: {
            email: currentMail,
            currentPassword: this.formUpdatePassword.value.currentPassword,
            newPassword: this.formUpdatePassword.value.newPassword,
            confirmPassword: this.formUpdatePassword.value.confirmPassword
          }
        }))
      }
    })
  }
}