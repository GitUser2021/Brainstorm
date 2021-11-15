import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TareaService } from 'src/Services/tarea.service';
import { Itarea } from 'src/app/Models/tarea';
import Swal from 'sweetalert2';
import * as _ from 'lodash';
import { IsubTarea } from '../../../Models/subTarea';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-tareas',
  templateUrl: './mis-tareas.component.html',
  styleUrls: ['./mis-tareas.component.css'],
  providers: [TareaService]
})

export class MisTareasComponent implements OnInit {
  showForm: boolean;
  showFormSubTask: boolean;
  
  colors = ['red', 'greenyellow', 'pink', 'blueviolet', 'gray', 'aqua', 'bisque']; 
  randomColor: string;

  constructor(
    private fb: FormBuilder, private TareaService:TareaService, private router: Router
  ) { }

  tasks: Itarea[];
  subTasks: IsubTarea[];
  inputTodo: string = '';
  oldName: string = '';
  oldDate: string = '';
  oldSubTaskName: string = '';

  ngOnInit(): void {
    this.tasks = [];
    this.subTasks = [];
    this.GetAllTasks();
    this.GetAllSubTasks();
    this.showForm = false;
    this.showFormSubTask = false;
    //this.randomColor = this.colors[Math.floor(Math.random() * 7)];
    this.randomColor = this.colors[2];
  }

  receiveMessage($event){
    this.showForm = $event;
  }

  receiveTaskList($event) {
    this.tasks.push($event);
  }

  receiveMessageSubTask($event){
    this.showFormSubTask = $event;
  }

  receiveSubTaskList($event) {
    this.subTasks.push($event);
  }

  ShowForm():void {
    this.showForm = true;
    document.getElementById('popup-tarea-backshadow').style.display = 'block';
  };

  ShowFormSubTask():void {
    this.showFormSubTask = true;
    document.getElementById('popup-subtarea-backshadow').style.display = 'block';
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

  //*************** TAREAS ***************//

  // GET TAREAS
  GetAllTasks() {
    this.TareaService
      .GetAllTasks()
      .subscribe(allTasks => {
        console.log('allTasks: -->', allTasks);
        this.tasks = allTasks;

        setTimeout(() => {
          MisTareasComponent.SetEvents();
          let tareas = document.getElementsByClassName('task-card').length;
          for (let i = 0; i < tareas; i++) {
            (<HTMLHtmlElement>document.getElementsByClassName('task-card')[i]).style.backgroundColor = this.colors[i]
          };

          this.setCheckboxEvents();
        }, 0)
      });
  };

  // DELETE TAREAS
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

  // EVENTS TAREAS
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

    for (let i = 0; i < document.getElementsByClassName('subtask-container').length; i++) {
      document.getElementsByClassName('subtask-container')[i].addEventListener('mouseenter', e => {
        let id = (<HTMLInputElement>e.currentTarget).dataset.id;
        document.getElementById('sub-icons-' + id).style.display = 'block'
      })
    }

    for (let i = 0; i < document.getElementsByClassName('subtask-container').length; i++) {
      document.getElementsByClassName('subtask-container')[i].addEventListener('mouseleave', e => {
        let id = (<HTMLInputElement>e.currentTarget).dataset.id;
        document.getElementById('sub-icons-' + id).style.display = 'none';
      })
    }
  }
  private setCheckboxEvents() {
    console.log('eventoo');
    for (let i = 0; i < document.getElementsByClassName('checkbox-tarea').length; i++) {
      document.getElementsByClassName('checkbox-tarea')[i].addEventListener('click', e => {
        
      })
    }
  }

  // EDIT TAREAS
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
            <label>Due date:</label><input type="date" id="swal-input2" style="margin:5px;" class="swal2-input" value="${this.oldDate?.toString()}">
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
  

//*************** SUB-TAREAS ***************//

  // GET SUB-TAREAS
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

  // ADD SUB-TAREAS
  AddSubTask(tareaId, task) {
    console.log('click -->', tareaId);
    document.getElementById(`input-${tareaId}`).style.display = 'block';
    document.getElementById(`btn-save-${tareaId}`).style.display = 'block';
    document.getElementById(`btn-cancel-${tareaId}`).style.display = 'block';
    document.getElementById(`label-add-${tareaId}`).style.display = 'none';
    
    document.getElementById(`btn-save-${tareaId}`).addEventListener('click', e => {
      debugger
      let subTareaName = (<HTMLInputElement>document.getElementById(`input-${tareaId}`)).value;
      console.log('click -->', subTareaName);

      this.TareaService
        .SendSubTarea({ 'descripcion': subTareaName , 'estado': 'Nueva', 'fechaComprometida': null, 'tareaCreadora': task} )
      .subscribe(allSubTasks => {
        console.log('allSubTasks: -->', allSubTasks);
        document.getElementById(`input-${tareaId}`).style.display = 'none';
        document.getElementById(`btn-save-${tareaId}`).style.display = 'none';
        document.getElementById(`btn-cancel-${tareaId}`).style.display = 'none';
        document.getElementById(`label-add-${tareaId}`).style.display = 'block';
        this.subTasks.push(allSubTasks);
        //// *********************** NO FUNKA  *************this.router.navigateByUrl('/MisTareas');
      });
    });

    document.getElementById(`btn-cancel-${tareaId}`).addEventListener('click', e => {
      (<HTMLInputElement>document.getElementById(`input-${tareaId}`)).value = '';
      document.getElementById(`input-${tareaId}`).style.display = 'none';
      document.getElementById(`btn-save-${tareaId}`).style.display = 'none';
      document.getElementById(`btn-cancel-${tareaId}`).style.display = 'none';
      document.getElementById(`label-add-${tareaId}`).style.display = 'block';
    });

  }

  // DELETE SUB-TAREAS
  DeleteSubTask(subtareaId) {
    this.DeleteSubTaskModal(subtareaId)
  }

  private DeleteSubTaskModal(subtareaId: any) {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(result => {
      if (result.value) {
        this.TareaService.DeleteSubTarea(subtareaId).subscribe(subtaskDeleted => {
          this.subTasks = this.subTasks.filter(subtask => subtask.subTareaId !== subtareaId);
        });
        Swal.fire('Deleted!', 'Your subtask has been deleted.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your subtask is safe :)', 'error');
      }
    });
  }

  // EDIT SUB-TAREAS
  EditSubTask(subtareaId, oldName) {
    this.oldSubTaskName = oldName;
    this.ResultSubTaskEdit(subtareaId);
  }

  private ResultSubTaskEdit(subtareaId: any) {
    this.EditSubTaskModal(subtareaId).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `SubTask edited`
        });
        console.log('result: ', result)
      }
    });
  }

  private EditSubTaskModal(subtareaId: any) {
    debugger
    return Swal.fire({
     title: 'Edit your subtask.',
     html: `<div style="display:flex;flex-direction:column;"><label>Name:</label><input id="swal-input1" style="margin:5px;" class="swal2-input" value="${this.oldSubTaskName?.toString()}">
            <input type="hidden" id="swal-input3" value="${subtareaId}">`,
      showCancelButton: true,
      confirmButtonText: 'Edit',
      showLoaderOnConfirm: true,
      preConfirm: subtask => {
        this.PreConfirmSubTask(subtareaId, {
          descripcion: (<HTMLInputElement>document.getElementById('swal-input1')).value,
          subTareaId: (<HTMLInputElement>document.getElementById('swal-input3')).value,
        });
      },
      allowOutsideClick: () => !Swal.isLoading()
    });
  }

  private PreConfirmSubTask(subtareaId: any, task: any) {
    this.TareaService.EditSubTask(subtareaId, task).subscribe(
      subtarea => {
        this.subTasks = this.subTasks.filter(subtask => subtask.subTareaId != subtareaId);
        this.subTasks.push(subtarea);
        this.subTasks = _.orderBy(this.subTasks, ['subtareaId'], ['asc']);
        setTimeout(() => {
          MisTareasComponent.SetEvents();
        }, 0)
      }
    );
  }

  EditSubTaskStatus(subTask) {
    subTask.statusId ? (subTask.statusId = 0) : (subTask.statusId = 1);
    this.TareaService.EditSubTaskStatus(subTask.tareaId, {
      descripcion: subTask.descripcion,
      statusId: subTask.statusId
    }).subscribe(subtarea => {
      console.log('subtarea editada: -->', subtarea);
    });
  }
}
