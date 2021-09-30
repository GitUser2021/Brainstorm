import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
export class CrearTareaComponent implements OnInit {
  public subscription: Subscription;

  constructor(private TareaService: TareaService, private fb: FormBuilder) {}

  nickNameRecibido: string = '';
  today = new Date().getDate();
  tasks: Itarea[];
  inputTask: string = '';
  isChecked: number = 0;
  flag: string = '';

  ngOnInit(): void {
    this.tasks = [];
    this.GetAllTasks();
  }

  @Output() showForm: EventEmitter<boolean> = new EventEmitter();
  @Output() tasksList: EventEmitter<any> = new EventEmitter();

  HideForm() {
    this.showForm.emit(false);
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
  }

  CrearTarea() {
    this.TareaService.SendTarea(this.infoForm.value).subscribe(tarea => {
      console.log('tarea: -->', tarea);
      this.PushTask(tarea);
      this.tasksList.emit(this.tasks);
    });
    this.inputTask = '';
  }

  DeleteTask(tareaId) {
    this.DeleteTaskModal(tareaId)
  }

  private DeleteTaskModal(tareaId: any) {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(result => {
      if (result.value) {
        this.TareaService.DeleteTarea(tareaId).subscribe(taskDeleted => {
          this.tasks = this.tasks.filter(task => task.tareaId !== tareaId);
        });
        Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your task is safe :)', 'error');
      }
    });
  }

  GetAllTasks() {
    this.TareaService.GetAllTasks().subscribe(allTasks => {
      console.log('allTasks: -->', allTasks);
      this.tasks = allTasks;
    });
  }

  EditTask(tareaId) {
    this.TareaService.GetTaskById(tareaId).subscribe(taskById => {
      this.flag = taskById.descripcion;
      this.ResultTaskEdit(tareaId);
    });
  }

  private ResultTaskEdit(tareaId: any) {
    this.EditTaskModal(tareaId).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Task edited`
        });
      }
    });
  }

  private EditTaskModal(tareaId: any) {
    return Swal.fire({
      title: 'Edit your task.',
      input: 'text',
      inputValue: this.flag.toString(),
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Edit',
      showLoaderOnConfirm: true,
      preConfirm: task => {
        this.PreConfirmTask(tareaId, task);
      },
      allowOutsideClick: () => !Swal.isLoading()
    });
  }

  private PreConfirmTask(tareaId: any, task: any) {
    this.TareaService.EditTask(tareaId, { descripcion: task }).subscribe(
      tarea => {
        this.tasks = this.tasks.filter(task => task.tareaId != tareaId);
        this.PushTask(tarea);
        this.tasks = _.orderBy(this.tasks, ['tareaId'], ['asc']);
      }
    );
  }

  private PushTask(tarea: Itarea) {
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
  }

  EditTaskStatus(task) {
    task.statusId ? (task.statusId = 0) : (task.statusId = 1);
    this.TareaService.EditTaskStatus(task.tareaId, {
      descripcion: task.descripcion,
      statusId: task.statusId
    }).subscribe(tarea => {
      console.log('tarea editada: -->', tarea);
    });
  }
}
