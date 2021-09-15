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

export class TareaService {
  constructor(private _http: HttpClient) { }

  SendTarea(obj: any): Observable<Itarea> {
    return this._http.post<Itarea>('/api/tareas', obj, HEADERS)
  };

  DeleteTarea(tareaId: number): Observable<Itarea> {
    return this._http.delete<Itarea>('/api/tareas/' + tareaId);
  };

  GetAllTasks() {
    return this._http.get<Itarea[]>('/api/tareas');
  };

  EditTask(tareaId: number, obj: any): Observable<Itarea> {
    return this._http.put<Itarea>('/api/tareas/' + tareaId, obj, HEADERS);
  };

  EditTaskStatus(tareaId: number, obj: any): Observable<Itarea> {
    console.log('asdsa')
    if (obj.statuId) {
      obj.statusId = 1;
    } else {
      obj.statusId = 0;
    };
    return this._http.put<Itarea>('/api/tareas/' + tareaId, obj, HEADERS);
  };
}
