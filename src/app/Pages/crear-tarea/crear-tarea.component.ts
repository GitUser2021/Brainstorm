import { Component, OnInit } from '@angular/core';
import { CrearTareaService } from 'src/Services/crearTarea.service';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { Itarea } from 'src/app/Models/tarea';
import { ActivatedRoute } from '@angular/router';

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
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}
  nickNameRecibido: string = "";

  today = new Date().getDate();
  todos: Itarea[];
  inputTodo: string = '';

  ngOnInit(): void {
    this.todos = [];
    
  }

  infoForm = this.fb.group({
    descripcion: ['', [Validators.required, Validators.minLength(3)]]
  });

  get descripcion() {
    return this.infoForm.get('descripcion');
  }

  CrearTarea() {
    console.log('tarea...');
    this.crearTareaService
      .SendTarea(this.infoForm.value)
      .subscribe(tarea => console.log('tarea: -->', tarea));
    this.todos.push({
      tarea_id: null,
      created_at: null,
      descripcion: this.inputTodo,
      fecha_comprometida: this.today + 10,
      icono_id: null,
      prioridad: null,
      puntaje: null,
      responsable: null,
      status_id: null,
      updated_at: null
    });
    this.inputTodo = '';
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((v, i) => i !== id);
  }
}
