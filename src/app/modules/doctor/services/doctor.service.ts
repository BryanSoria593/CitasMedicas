import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Image, Medicament } from 'src/app/core/models/cites/cites.interface'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private readonly URL = environment.api
  private readonly headers = new HttpHeaders({ 'Content-type': 'application/json' })

  constructor(private http: HttpClient) { }

  postHistorialByCite(idCite: number, medicaments: Medicament[], images: Image[] = [], extraInfo: string = ''): Observable<any> {
    const body = {
      id_cita: idCite,
      medicaments,
      images,
      extraInfo
    }

    return this.http.post(`${this.URL}/cites/newMedicamentByCite`, body, { headers: this.headers })
  }

  getAttendedByDoctor(id_usuario: number, user_rol: number): any {
    const body = {
      id_usuario,
      user_rol
    }
    return this.http.post(`${this.URL}/doctor/attendedByDoctor`, body, { headers: this.headers })
  }
}
