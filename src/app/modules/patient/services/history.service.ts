import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})

export class HistoryService {

  private readonly URL = environment.api
  private readonly headers = new HttpHeaders({ 'Content-type': 'application/json' })

  constructor(private http: HttpClient) { }

  getHistoryByCite(idCite: number): Observable<any> {
    const body = { idCite }
    return this.http.post(`${this.URL}/medicalHistory/getHistorialByCite`, body, { headers: this.headers })
  }
}