import { Component, OnInit } from '@angular/core';
import { GrupoServiceService } from 'src/Services/grupo.service';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { Igrupo } from 'src/app/Models/grupo';
import { TareaService } from 'src/Services/tarea.service';
import { Itarea } from 'src/app/Models/tarea';

@Component({
  selector: 'app-crear-grupo',
  templateUrl: './crear-grupo.component.html',
  styleUrls: ['./crear-grupo.component.css'],
  providers: [GrupoServiceService]
})
export class GrupoComponent implements OnInit {
  public subscription: Subscription;

  constructor(
    private GrupoService: GrupoServiceService,
    private fb: FormBuilder,private TareaService:TareaService
  ) {}
  Groups: Igrupo[];
  tasks: Itarea[];
  inputTodo: string = '';


  ngOnInit(): void {
    this.Groups = []; 
    this.getAllGroups()
    this.tasks = [];
    this.GetAllTasks()

  }

  infoForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]]
  });

  
  infoFormTask = this.fb.group({
    descripcion: ['', [Validators.required, Validators.minLength(3)]]
  });

  get nombre() {
    return this.infoForm.get('nombre');
  }
  get descripcion() {
    return this.infoForm.get('descripcion');
  };
  
  CrearGrupo() {
    console.log('crear grupo...')
    this.GrupoService
      .SendGrupo(this.infoForm.value)
      .subscribe(grupo => console.log('grupo: -->', grupo));
  }

  getAllGroups(){
    this.GrupoService
    .GetAllGroups()
    .subscribe(allGroups => {
      console.log('allTasks: -->', allGroups);
      this.Groups = allGroups;
    });
  };

  CrearTarea() {
    this.TareaService
      .SendTarea(this.infoFormTask.value)
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
