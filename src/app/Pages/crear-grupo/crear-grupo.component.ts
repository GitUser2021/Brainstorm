import { Component, OnInit } from '@angular/core';
import { GrupoServiceService } from 'src/Services/grupo.service';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

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
    console.log('crear grupo...')
    this.GrupoService
      .SendGrupo(this.infoForm.value)
      .subscribe(grupo => console.log('grupo: -->', grupo));
  }
}
