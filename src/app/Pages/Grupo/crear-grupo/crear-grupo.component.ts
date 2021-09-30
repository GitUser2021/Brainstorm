import { Component, EventEmitter,Output, OnInit } from '@angular/core';
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

export class CrearGrupoComponent implements OnInit {
  public subscription: Subscription;
 
  constructor(
    private GrupoService: GrupoServiceService,
    private fb: FormBuilder, private TareaService: TareaService
  ) { }

  Groups: Igrupo[];
  tasks: Itarea[];
  inputName: string = '';
  inputDescription: string = '';

  ngOnInit(): void {
    this.Groups = []; 
    this.getAllGroups();
  }

  @Output() showForm: EventEmitter<boolean> = new EventEmitter();
  @Output() groupList: EventEmitter<any> = new EventEmitter();

  HideForm() {
    this.showForm.emit(false);
  };

  infoForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(3)]]
  });

  get nombre() {
    return this.infoForm.get('nombre');
  }
  get description() {
    return this.infoForm.get('description');
  };
  
  CrearGrupo() {
    this.GrupoService.SendGrupo(this.infoForm.value).subscribe(grupo => {
      console.log('grupo: -->', grupo);
      this.PushGroup(grupo);
      this.groupList.emit(this.Groups);
    });
    this.inputName = "";
    this.inputDescription = "";
  };

  getAllGroups(){
    this.GrupoService
    .GetAllGroups()
    .subscribe(allGroups => {
      console.log('allGroups: -->', allGroups);
      this.Groups = allGroups;
    });
  };

  private PushGroup(grupo: Igrupo) {
    this.Groups.push({
       grupo_id: null,
       creador_id: null,
       descripcion: grupo.descripcion,
       icono_id: null,
       tarea_id: null,
       nombre: grupo.nombre
    });
  }
}
