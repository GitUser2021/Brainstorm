import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TareaService } from 'src/Services/tarea.service';
import { Itarea } from 'src/app/Models/tarea';
import Swal from 'sweetalert2';
import * as _ from 'lodash';
import { MisTareasComponent } from '../Tarea/mis-tareas/mis-tareas.component';
import { IsubTarea } from '../../Models/subTarea';


@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.css']
})
export class MarketingComponent implements OnInit {
  showForm: boolean;
  colors = ['red', 'greenyellow', 'pink', 'blueviolet', 'gray', 'aqua', 'bisque']; 
  randomColor: string;

  constructor(
    private fb: FormBuilder,private TareaService:TareaService
  ) { }

  tasks: Itarea[];
  subTasks: IsubTarea[];
  inputTodo: string = '';
  oldName: string = '';
  oldDate: string = '';
  hoy:any = new Date();
  fechaVencimiento: any = new Date(`${this.hoy.getMonth() + 1}-${this.hoy.getDate() - 2}-${this.hoy.getFullYear()}`);
  //fechaVencimiento: any = new Date(`10-20-21`);

  ngOnInit(): void {
    this.tasks = [];
    this.GetAllTasks();
    this.GetAllSubTasks();
    this.showForm = false;
    //this.randomColor = this.colors[Math.floor(Math.random() * 7)];
    this.randomColor = this.colors[2];
    console.log('fechaVencimiento: ', this.fechaVencimiento);
  }

  ConvertDate(string) {
    let res;
    res = new Date(string);
    return res;
  }

  receiveMessage($event){
    this.showForm = $event;
  }

  receiveTaskList($event) {
    this.tasks.push($event);
  }

  ShowForm():void {
    this.showForm = true;
    document.getElementById('popup-tarea-backshadow').style.display = 'block';
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

  GetAllTasks() {
    this.TareaService
      .GetAllTasks()
      .subscribe(allTasks => {
        console.log('allTasks a vencer: -->', allTasks);
        this.tasks = allTasks;

         setTimeout(() => {
          MisTareasComponent.SetEvents();
          let tareas = document.getElementsByClassName('task-card').length;
          for (let i = 0; i < tareas; i++) {
            //(<HTMLHtmlElement>document.getElementsByClassName('task-card')[i]).style.backgroundColor = this.colors[Math.floor(Math.random()*7)]
            (<HTMLHtmlElement>document.getElementsByClassName('task-card')[i]).style.backgroundColor = this.colors[i]
          };
      }, 0)
      });
  };

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
    this.TareaService.GetTaskById(tareaId).subscribe(taskById => {
      this.oldName = oldName;
      this.oldDate = oldFechaComprometida?.toString().split('T')[0];
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

  //private EditTaskModal(tareaId: any) {
  //  return Swal.fire({
  //   title: 'Edit your task.',
  //   html: `<input id="swal-input1" class="swal2-input" value="${this.oldName?.toString()}">
  //          <input id="swal-input2" class="swal2-input" value="${this.oldDate?.toString()}">`,
  //    showCancelButton: true,
  //    confirmButtonText: 'Edit',
  //    showLoaderOnConfirm: true,
  //    preConfirm: task => {
  //      this.PreConfirmTask(tareaId, task);
  //    },
  //    allowOutsideClick: () => !Swal.isLoading()
  //  });
  //}

   private EditTaskModal(tareaId: any) {
    return Swal.fire({
      title: 'Edit your task.',
     html: `<div style="display:flex;flex-direction:column;"><label>Name:</label><input id="swal-input1" style="margin:5px;" class="swal2-input" value="${this.oldName?.toString()}">
            <label>Due date:</label><input type="date" id="swal-input2" style="margin:5px;" class="swal2-input" value="${this.oldDate?.toString()}">`,
      showCancelButton: true,
      confirmButtonText: 'Edit',
      showLoaderOnConfirm: true,
      preConfirm: task => {
        this.PreConfirmTask(tareaId, {
          descripcion: (<HTMLInputElement>document.getElementById('swal-input1')).value,
          fechaComprometida: (<HTMLInputElement>document.getElementById('swal-input2')).value,
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


}
