import { Component, OnInit } from '@angular/core';
import { CrearTareaService } from 'src/Services/crearTarea.service';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

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
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  infoForm = this.fb.group({
    descripcion: ['', [Validators.required, Validators.minLength(3)]]
  });

  get descripcion() {
    return this.infoForm.get('descripcion');
  }
  
  CrearTarea() {
    console.log('tarea...')
    this.crearTareaService
      .SendTarea(this.infoForm.value)
      .subscribe(tarea => console.log('tarea: -->', tarea));
  }
}
