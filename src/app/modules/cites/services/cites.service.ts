import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CitesService {

    private readonly URL = environment.api;
  

  constructor(
    private http: HttpClient,    
  ) { }
  
  getAllCites( id_usuario: number ): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    const body={
        id_usuario
    }
    return this.http.post(`${this.URL}/events/citesByPatient`, body, { headers })    
  }

  getCitesPending( id_usuario: number ): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    const body={
      id_usuario
    }
    return this.http.post(`${this.URL}/events/pendingByPatient`, body, { headers })
    
  }







}
