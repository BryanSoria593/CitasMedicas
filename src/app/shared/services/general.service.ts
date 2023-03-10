import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { Observable, tap } from 'rxjs';
// import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  durationInSeconds = 3;
  constructor(
    private _snackBar: MatSnackBar,
    private http: HttpClient
  ) { }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
      panelClass: ['snackbar', 'snackbar-success']

    });

  }

  // async uploadImageToCloudinary(file) {
  //   const api = environment.apiCloudinay;
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   formData.append('upload_preset', 'app-citamedica');
  //   try {
  //     const resp = await fetch(api, {
  //       method: 'POST',
  //       body: formData
  //     })
  //     if (!resp.ok) {
  //       this.openSnackBar('Error al subir la imagen', 'error');
  //     }
  //     const cloudResp = await resp.json();
  //     return cloudResp.secure_url;    
  //   } catch (error) {
  //     this.openSnackBar('Error al subir la imagen', 'error');
    
  //   } 
  // }

}


