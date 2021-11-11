import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TareaService } from 'src/Services/tarea.service';
import { Itarea } from 'src/app/Models/tarea';
import { MisGruposComponent } from '../../Grupo/mis-grupos/mis-grupos.component';
import { MisTareasComponent } from '../mis-tareas/mis-tareas.component';
import Swal from 'sweetalert2';
import * as _ from 'lodash';
import { IsubTarea } from '../../../Models/subTarea';

@Component({
  selector: 'app-ver-tareas',
  templateUrl: './ver-tareas.component.html',
  styleUrls: ['./ver-tareas.component.css'],
  providers: [TareaService]
})
export class VerTareasComponent implements OnInit {
  showForm: boolean;
  groupName: string;
  oldName: string = '';
  oldDate: string = '';
  groupId: any;
  tasks: Itarea[];
  subTasks: IsubTarea[];
  user: any;

  constructor(private router: Router, private TareaService: TareaService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.subTasks = [];
    this.groupName = this.router.url.replace('/Tareas/', '');
    this.groupId = MisGruposComponent.groupId;
    localStorage.setItem('grupoId', this.groupId);
    this.tasks = this.getTareasByGroupId(this.groupId);
  }



  public getTareasByGroupId(id: number) {
    let grupos = this.user.listaGruposCreados;

    for (var i = 0; i < grupos.length; i++) {
      if (grupos[i].grupoId == id) {
        this.tasks = grupos[i].listaTareas;
        break;
      }
    }
    return this.tasks;
  }

  //**********************  FALTA LA RELACION ENTRE EL GRUPO Y LAS TAREAS POR GRUPOID...
  GetTaskById() {
    //this.TareaService
    //  .GetTaskById(this.groupId)
    //  .subscribe(allTasks => {
    //    console.log('allTasks: -->', allTasks);
    //    this.tasks = allTasks;

    //    setTimeout(() => {
    //      MisTareasComponent.SetEvents();
    //    }, 0)
    //  });
  };

  GetAllTaskGroup() {
    this.TareaService
      .GetAllTasksGroup()
      .subscribe(allTasksGroup => {
        console.log('allTasksGroup: -->', allTasksGroup);
        this.tasks = allTasksGroup;

        //  setTimeout(() => {
        //    MisTareasComponent.SetEvents();
        //    let tareas = document.getElementsByClassName('task-card').length;
        //    for (let i = 0; i < tareas; i++) {
        //      //(<HTMLHtmlElement>document.getElementsByClassName('task-card')[i]).style.backgroundColor = this.colors[Math.floor(Math.random()*7)]
        //      (<HTMLHtmlElement>document.getElementsByClassName('task-card')[i]).style.backgroundColor = this.colors[i]
        //    };
        //}, 0)
      });
  }

  GetAllSubTasks() {
    this.TareaService
      .GetAllSubTasks()
      .subscribe(allSubTasks => {
        console.log('allSubTasks: -->', allSubTasks);
        this.subTasks = allSubTasks;

        //  setTimeout(() => {
        //    MisTareasComponent.SetEvents();
        //    let tareas = document.getElementsByClassName('task-card').length;
        //    for (let i = 0; i < tareas; i++) {
        //      //(<HTMLHtmlElement>document.getElementsByClassName('task-card')[i]).style.backgroundColor = this.colors[Math.floor(Math.random()*7)]
        //      (<HTMLHtmlElement>document.getElementsByClassName('task-card')[i]).style.backgroundColor = this.colors[i]
        //    };
        //}, 0)
      });
  };



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

  static SetEvents() {
    for (let i = 0; i < document.getElementsByClassName('task-card').length; i++) {
      document.getElementsByClassName('task-card')[i].addEventListener('mouseenter', e => {
        let id = (<HTMLInputElement>e.currentTarget).dataset.id;
        document.getElementById('icons-' + id).style.display = 'block'
      })
    }

    for (let i = 0; i < document.getElementsByClassName('task-card').length; i++) {
      document.getElementsByClassName('task-card')[i].addEventListener('mouseleave', e => {
        let id = (<HTMLInputElement>e.currentTarget).dataset.id;
        document.getElementById('icons-' + id).style.display = 'none';
      })
    }
  }


  EditTask(tareaId, oldName, oldFechaComprometida) {
    this.oldName = oldName;
    this.oldDate = oldFechaComprometida?.toString().split('T')[0];
    this.ResultTaskEdit(tareaId);
  }

  private ResultTaskEdit(tareaId: any) {
    this.EditTaskModal(tareaId).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Task edited`
        });

        console.log('result: ', result)
      }
    });
  }

  private EditTaskModal(tareaId: any) {
    return Swal.fire({
      title: 'Edit your task.',
      html: `<div style="display:flex;flex-direction:column;"><label>Name:</label><input id="swal-input1" style="margin:5px;" class="swal2-input" value="${this.oldName?.toString()}">
            <label>Due date:</label><input id="swal-input2" style="margin:5px;" class="swal2-input" value="${this.oldDate?.toString()}">
            <input type="hidden" id="swal-input3" value="${tareaId}">`,
      showCancelButton: true,
      confirmButtonText: 'Edit',
      showLoaderOnConfirm: true,
      preConfirm: task => {
        this.PreConfirmTask(tareaId, {
          descripcion: (<HTMLInputElement>document.getElementById('swal-input1')).value,
          fechaComprometida: (<HTMLInputElement>document.getElementById('swal-input2')).value,
          tareaId: (<HTMLInputElement>document.getElementById('swal-input3')).value
        });
      },
      allowOutsideClick: () => !Swal.isLoading()
    });
  }

  private PreConfirmTask(tareaId: any, task: any) {
    this.TareaService.EditTask(tareaId, task).subscribe(
      tarea => {
        this.tasks = this.tasks.filter(task => task.tareaId != tareaId);
        this.tasks.push(tarea);
        this.tasks = _.orderBy(this.tasks, ['tareaId'], ['asc']);
        setTimeout(() => {
          MisTareasComponent.SetEvents();
        }, 0)
      }
    );
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

  receiveMessage($event) {
    this.showForm = $event;
  }


  receiveTaskList($event) {
    this.tasks.push($event);
  }

  ShowForm(): void {
    this.showForm = true;
    document.getElementById('popup-tarea-backshadow').style.display = 'block';
  };
}
