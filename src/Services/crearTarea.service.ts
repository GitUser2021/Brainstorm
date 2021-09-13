import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Itarea } from '../app/Models/tarea';

const HEADERS = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': 'false'
  })
}

@Injectable({
  providedIn: 'root'
})

export class CrearTareaService {
  constructor(private _http: HttpClient) { }

  SendTarea(obj: any): Observable<Itarea> {
    return this._http.post<Itarea>('/api/tareas', obj, HEADERS)
  }
}
