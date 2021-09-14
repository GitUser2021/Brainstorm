import { Component, OnInit } from '@angular/core';
import { CrearTareaService } from 'src/Services/crearTarea.service';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { Itarea } from 'src/app/Models/tarea';

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.css'],
  providers: [CrearTareaService]
})
export class CrearTareaComponent implements OnInit {
  public subscription: Subscription;
  
  constructor(
    private crearTareaService: CrearTareaService,
    private fb: FormBuilder,
  ) { };

  nickNameRecibido: string = "";
  today = new Date().getDate();
  tasks: Itarea[];
  inputTodo: string = '';
  isChecked: number = 0;

  ngOnInit(): void {
    this.tasks = [];
    this.GetAllTasks();
  };

  infoForm = this.fb.group({
    descripcion: ['', [Validators.required, Validators.minLength(3)]]
  });

  get descripcion() {
    return this.infoForm.get('descripcion');
  };

  CrearTarea() {
    this.crearTareaService
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

  DeleteTask(tareaId) {
    this.crearTareaService
      .DeleteTarea(tareaId)
      .subscribe(taskDeleted => {
        console.log('taskDeleted: -->', taskDeleted);
        this.tasks = this.tasks.filter( task => task.tareaId !== tareaId);
      });
  };

  GetAllTasks() {
    this.crearTareaService
      .GetAllTasks()
      .subscribe(allTasks => {
        console.log('allTasks: -->', allTasks);
        this.tasks = allTasks;
      });
  };

  EditTask(tareaId) {

  };
};
