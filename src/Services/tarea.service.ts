import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Itarea } from '../app/Models/tarea';

const Token_key = '@@auth0spajs@@::NZlshn18g6678aJBSzkior1rI8sOzkGh::default::openid profile email offline_access';

@Injectable({
  providedIn: 'root'
})

export class TareaService {
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

  SendTarea(obj: any): Observable<Itarea> {
    console.log('jwt:', this.JWT)
    return this._http.post<Itarea>('/api/tareas', obj, this.HEADERS)
  };

  DeleteTarea(tareaId: number): Observable<Itarea> {
    return this._http.delete<Itarea>('/api/tareas/' + tareaId);
  };

  GetAllTasks() {
    localStorage.setItem('JWT', this.JWT)
    return this._http.get<Itarea[]>('/api/tareas');
  };

  GetTaskById(tareaId: number) {
    return this._http.get<Itarea>('/api/tareas/' + tareaId);
  };

  EditTask(tareaId: number, obj: any): Observable<Itarea> {
    return this._http.put<Itarea>('/api/tareas/' + tareaId, obj, this.HEADERS);
  };

  EditTaskStatus(tareaId: number, obj: any): Observable<Itarea> {
    return this._http.put<Itarea>('/api/tareas/' + tareaId, obj, this.HEADERS);
  };
}
