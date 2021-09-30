import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TareaService } from 'src/Services/tarea.service';
import { Itarea } from 'src/app/Models/tarea';

@Component({
  selector: 'app-mis-tareas',
  templateUrl: './mis-tareas.component.html',
  styleUrls: ['./mis-tareas.component.css'],
  providers: [TareaService]
})
export class MisTareasComponent implements OnInit {
  showForm: boolean;

  constructor(
    private fb: FormBuilder,private TareaService:TareaService
  ) {}
  tasks: Itarea[];
  inputTodo: string = '';

  ngOnInit(): void {
    this.tasks = [];
    this.GetAllTasks();
    this.showForm = false;
  }

  receiveMessage($event){
    this.showForm = $event;
  }

  receiveTaskList($event) {
    this.tasks = $event;
  }

  ShowForm():void {
    this.showForm = true;
  };

  infoForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    descripcion: ['', [Validators.required, Validators.minLength(3)]]
  });

  get nombre() {
    return this.infoForm.get('nombre');
  }
  get descripcion() {
    return this.infoForm.get('descripcion');
  };

  CrearTarea() {
    this.TareaService
      .SendTarea(this.infoForm.value)
      .subscribe(tarea => {
        console.log('tarea: -->', tarea)

        this.tasks.push({
          tareaId: tarea.tareaId,
          createdAt: tarea.createdAt,
          descripcion: tarea.descripcion,
          fechaComprometida: tarea.fechaComprometida,
          iconoId: null,
          prioridad: null,
          puntaje: null,
          responsable: null,
          statusId: tarea.statusId,
          updatedAt: tarea.updatedAt
        });
      });
      this.inputTodo = '';
  };

  GetAllTasks() {
    this.TareaService
      .GetAllTasks()
      .subscribe(allTasks => {
        console.log('allTasks: -->', allTasks);
        this.tasks = allTasks;
      });
  };

}
