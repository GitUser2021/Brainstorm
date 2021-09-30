import { Component, OnInit } from '@angular/core';
import { GrupoServiceService } from 'src/Services/grupo.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Igrupo } from 'src/app/Models/grupo';
import { TareaService } from 'src/Services/tarea.service';

@Component({
  selector: 'app-mis-grupo',
  templateUrl: './mis-grupos.component.html',
  styleUrls: ['./mis-grupos.component.css'],
  providers: [GrupoServiceService]
})
export class MisGruposComponent implements OnInit {
  showForm: boolean;

  constructor(
    private GrupoService: GrupoServiceService,
    private fb: FormBuilder,private TareaService:TareaService
  ) {}
  Groups: Igrupo[];
  inputTodo: string = '';

  ngOnInit(): void {
    this.Groups = []; 
    this.GetAllGroups();
    this.showForm = false;
  }

  receiveMessage($event){
    this.showForm = $event;
  }

  receiveGroupList($event) {
    this.Groups = $event;
  };

  ShowForm():void {
    this.showForm = true;
  };

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

  GetAllGroups(){
    this.GrupoService
    .GetAllGroups()
    .subscribe(allGroups => {
      console.log('allGroups: -->', allGroups);
      this.Groups = allGroups;
    });
  };
}
