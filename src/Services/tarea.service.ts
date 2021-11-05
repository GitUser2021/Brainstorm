import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IsubTarea } from '../app/Models/subTarea';
import { Itarea } from '../app/Models/tarea';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})

export class TareaService {
  constructor(private _http: HttpClient, private TokenService: TokenService) { }

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

  SendTarea(obj: any): Observable<Itarea> {
    console.log('jwt:', this.JWT)
    return this._http.post<Itarea>('/api/tareas', obj, this.HEADERS)
  };

    SendSubTarea(obj: any): Observable<Itarea> {
    console.log('jwt:', this.JWT)
    return this._http.post<Itarea>('/api/subtareas', obj, this.HEADERS)
  };

   GetAllSubTasks() {
    localStorage.setItem('JWT', this.JWT)
    return this._http.get<IsubTarea[]>('/api/subtareas');
  };

  DeleteTarea(tareaId: number): Observable<Itarea> {
    return this._http.delete<Itarea>('/api/tareas/' + tareaId, this.HEADERS);
  };

  GetAllTasks() {
    localStorage.setItem('JWT', this.JWT)
    return this._http.get<Itarea[]>('/api/tareas');
  };

   GetAllTasksGroup() {
    localStorage.setItem('JWT', this.JWT)
    return this._http.get<Itarea[]>('/api/tareasGrupo');
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
