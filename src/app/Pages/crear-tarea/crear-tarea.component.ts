import { Component, OnInit } from '@angular/core';
import { TareaService } from 'src/Services/tarea.service';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { Itarea } from 'src/app/Models/tarea';
import Swal from 'sweetalert2';
import * as _ from 'lodash';

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.css'],
  providers: [TareaService]
})
export class TareaComponent implements OnInit {
  public subscription: Subscription;
  
  constructor(
    private TareaService: TareaService,
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

  DeleteTask(tareaId) {
     Swal.fire({  
      title: 'Are you sure want to remove?',  
      text: 'You will not be able to recover this file!',  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: 'Yes, delete it!',  
      cancelButtonText: 'No, keep it'  
    }).then((result) => {  
      if (result.value) {


        
    this.TareaService
      .DeleteTarea(tareaId)
      .subscribe(taskDeleted => {
        console.log('taskDeleted: -->', taskDeleted);
        this.tasks = this.tasks.filter( task => task.tareaId !== tareaId);
      });



        Swal.fire(  
          'Deleted!',  
          'Your task has been deleted.',  
          'success'  
        )  
      } else if (result.dismiss === Swal.DismissReason.cancel) {  
        Swal.fire(  
          'Cancelled',  
          'Your task is safe :)',  
          'error'  
        )  
      }  
    })  





  };

  GetAllTasks() {
    this.TareaService
      .GetAllTasks()
      .subscribe(allTasks => {
        console.log('allTasks: -->', allTasks);
        this.tasks = allTasks;
      });
  };

  EditTask(tareaId) {

    Swal.fire({
      title: 'Edit your task.',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Edit',
      showLoaderOnConfirm: true,
          preConfirm: (task) => {

            this.TareaService
               .EditTask( tareaId, { "descripcion": task })
               .subscribe(tarea => {
                console.log('tarea editada: -->', tarea)

                 // elmino la tarea vieja antes de pushear la tarea editada.
                 this.tasks = this.tasks.filter(task => task.tareaId != tareaId);
                 
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

                 this.tasks = _.orderBy(this.tasks, ['tareaId'], ['asc']);
          });
      },
      allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: `Task edited`,
            })
          }
        })
  };

  EditTaskStatus(task) {
    task.statusId ? task.statusId = 0 : task.statusId = 1;
    this.TareaService
      .EditTaskStatus(task.tareaId, { "descripcion": task.descripcion, "statusId": task.statusId })
      .subscribe(tarea => {
        console.log('tarea editada: -->', tarea)
      });
  };
};
