import { Component, OnInit } from '@angular/core';
import { CrearGrupoServiceService } from 'src/Services/crearGrupo.service';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-grupo',
  templateUrl: './crear-grupo.component.html',
  styleUrls: ['./crear-grupo.component.css'],
  providers: [CrearGrupoServiceService]
})
export class CrearGrupoComponent implements OnInit {
  public subscription: Subscription;

  constructor(
    private crearGrupoService: CrearGrupoServiceService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  infoForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]]
  });

  get nombre() {
    return this.infoForm.get('nombre');
  }
  
  CrearGrupo() {
    this.crearGrupoService
      .SendGrupo(this.infoForm.value)
      .subscribe(grupo => console.log('grupo: -->', grupo));
  }
}
