import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Igrupo } from '../app/Models/grupo';

const Token_key = '@@auth0spajs@@::NZlshn18g6678aJBSzkior1rI8sOzkGh::default::openid profile email offline_access';

@Injectable({
  providedIn: 'root'
})
  
export class GrupoServiceService {
  constructor(private _http: HttpClient) { }
  
setToken(token: string) {
    window.localStorage.removeItem(Token_key);
    window.localStorage.setItem(Token_key, token);
  }

 getToken() {
    const token = JSON.parse(window.localStorage.getItem(Token_key));
    return token;
}
tokenStruct = this.getToken();
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
