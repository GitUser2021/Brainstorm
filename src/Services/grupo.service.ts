import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Igrupo } from '../app/Models/grupo';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root'
})
  
export class GrupoServiceService {
  constructor(private _http: HttpClient,private TokenService : TokenService) { }
  

tokenStruct = this.TokenService.getToken();
  JWT = this.tokenStruct.body.id_token;

HEADERS = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': 'false',
    'Authorization': 'Bearer ' + this.JWT
  })
}

  SendGrupo(obj: any): Observable<Igrupo> {
    return this._http.post<Igrupo>('/api/grupos', obj, this.HEADERS)
  }

  GetAllGroups() {
    return this._http.get<Igrupo[]>('/api/grupos');
  };
}
