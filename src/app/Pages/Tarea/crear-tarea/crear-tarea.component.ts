import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TareaService } from 'src/Services/tarea.service';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { MisTareasComponent } from '../mis-tareas/mis-tareas.component';

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
  inputTask: string = '';
  isChecked: number = 0;

  ngOnInit(): void {
  }

  @Output() showForm: EventEmitter<boolean> = new EventEmitter();
  @Output() tasksList: EventEmitter<any> = new EventEmitter();

  HideForm() {
    this.showForm.emit(false);
    document.getElementById('popup-tarea-backshadow').style.display = 'none';
  };

  infoForm = this.fb.group({
    fechaComprometida: ['', [Validators.required, Validators.minLength(3)]],
    descripcion: ['', [Validators.required, Validators.minLength(3)]],
  });

  get fechaComprometida() {
    return this.infoForm.get('fechaComprometida');
  }
  get descripcion() {
    return this.infoForm.get('descripcion');
  }

  CrearTarea() {
    this.infoForm.value.usuarioCreador = JSON.parse(localStorage.getItem('user'));
    this.infoForm.value.estado = 'Nueva';
    this.infoForm.value.grupoCreador = JSON.parse(localStorage.getItem('grupo'));
    this.TareaService.SendTarea(this.infoForm.value).subscribe(tarea => {
      console.log('tarea: -->', tarea);
      let user = JSON.parse(localStorage.getItem('user'));
      user.grupoDefault.push(tarea);
      localStorage.setItem('user', JSON.stringify(user));

      this.tasksList.emit(tarea);

      this.inputTask = '';
      setTimeout(() => {
        MisTareasComponent.SetEvents();
      }, 0)
    });
  }
}
