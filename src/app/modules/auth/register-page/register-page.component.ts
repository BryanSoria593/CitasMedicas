import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterModel } from 'src/app/core/models/user/user.interface';
import { AuthService } from '../services/auth.service';

import { GeneralService } from 'src/app/shared/services/general.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  formRegister: FormGroup = new FormGroup({});
  // files: "";
  // urlImage: string = "";


  constructor(
    private authService: AuthService,
    private generalService: GeneralService,
    private router: Router,

  ) {
    this.newFormGroup();

  }

  ngOnInit(): void {
  }

  async sendRegister() {
    const credentials: RegisterModel = {


      cedula: this.formRegister.value.dni,
      email: this.formRegister.value.email,
      nombres: this.formRegister.value.names,
      apellidos: this.formRegister.value.lastName,
      fecha: this.formRegister.value.date,
      ciudad: this.formRegister.value.city,
      sexo: this.formRegister.value.sex,
      password: this.formRegister.value.password,
      passwordConfirm: this.formRegister.value.passwordConfirm,


    }

    // FIRST AWAIT THE IMAGE TO BE UPLOADED TO CLOUDINARY

    // await this.generalService.uploadImageToCloudinary(this.files)
    //   .then((url) => {
    //     this.urlImage = url;
    //   })
    //   .catch((error) => {
    //     this.generalService.openSnackBar(error, 'error');
    //   })

    // NEXT, SEND THE REGISTER DATA TO THE BACKEND
    this.authService.register(credentials).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigateByUrl('/auth/login');
        this.generalService.openSnackBar('Usuario registrado correctamente, Inicie sesión', 'success');
      },
      error: (error) => {
        this.generalService.openSnackBar(error.error.msg, 'error');
      }
    })
  }

  newFormGroup() {
    this.formRegister = new FormGroup(
      {
        names: new FormControl('', [Validators.required,]),
        lastName: new FormControl('', [Validators.required,]),
        dni: new FormControl('', [Validators.required,]),
        date: new FormControl('', [Validators.required,]),
        sex: new FormControl('', [Validators.required,]),
        city: new FormControl('', [Validators.required,]),
        email: new FormControl('', [Validators.required, Validators.email,]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        passwordConfirm: new FormControl('', [Validators.required,]),
      }
    )
  }


  // selectImage({ target }) {
  //   this.files = target.files[0];
  // }

}
