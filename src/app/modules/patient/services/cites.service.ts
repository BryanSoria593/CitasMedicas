import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { NewCiteModel } from 'src/app/core/models/cites/cites.interface'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})

export class CitesService {

  private readonly URL = environment.api
  private readonly headers = new HttpHeaders({ 'Content-type': 'application/json' })

  constructor(
    private http: HttpClient,
  ) { }

  getAllCites(id_usuario: number, user_rol:number): Observable<any> {
    const body = {
      id_usuario,
      user_rol
    }
    return this.http.post(`${this.URL}/cites/citesByPatient`, body, { headers: this.headers })
  }

  getCitesPending(id_usuario: number, user_rol:number): Observable<any> {
    const body = {
      id_usuario,
      user_rol
    }
    return this.http.post(`${this.URL}/cites/pendingByPatient`, body, { headers: this.headers })
  }

  getHistoryCites(id_usuario: number, user_rol:number): Observable<any> {
    const body = {
      id_usuario,
      user_rol
    }
    return this.http.post(`${this.URL}/cites/getAssistedCites`, body, { headers: this.headers })    
  }

  deleteCite(idCite: number): Observable<any> {        
    return this.http.patch(`${this.URL}/cites/cite/${idCite}`, { headers: this.headers })
  }

  getSpeciality(): Observable<any> {
    return this.http.get(`${this.URL}/available/`, { headers: this.headers })
  }

  getDoctorBySpeciality(id_area: number): Observable<any> {
    return this.http.post(`${this.URL}/doctor/getDoctorsBySpeciality`, { id_area }, { headers: this.headers })
  }

  getTurns(date: string, id_doctor: number): Observable<any> {
    return this.http.post(`${this.URL}/available/turns`,  { date, id_doctor }, { headers: this.headers })
  }

  postNewCite(cite: NewCiteModel): Observable<any> {
    const {
      date: fecha,
      idUser: id_usuario,
      idDoctor: id_doctor,
      idTurn: id_disponibilidad
    } = cite

    return this.http.post(`${this.URL}/cites/newCite`, { fecha, id_usuario, id_doctor, id_disponibilidad }, { headers: this.headers })
  }

  updateCite(newData: any): Observable<any> {
    const {
      idCite: id_cita,
      date: fecha,
      idTurn: id_disponibilidad
    } = newData

    return this.http.patch(`${this.URL}/cites/updateCite`, { id_cita, fecha, id_disponibilidad }, { headers: this.headers })
  }


}
