import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Igrupo } from '../app/Models/grupo';

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

export class GrupoServiceService {
  constructor(private _http: HttpClient) { }

  SendGrupo(obj: any): Observable<Igrupo> {
    return this._http.post<Igrupo>('/api/grupos', obj, HEADERS)
  }

  GetAllGroups() {
    return this._http.get<Igrupo[]>('/api/grupos');
  };
}
