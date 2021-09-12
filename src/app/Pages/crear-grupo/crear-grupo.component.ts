import { Component, OnInit } from '@angular/core';
import { CrearGrupoServiceService } from 'src/Services/crearGrupo.service';

@Component({
  selector: 'app-crear-grupo',
  templateUrl: './crear-grupo.component.html',
  styleUrls: ['./crear-grupo.component.css'],
  providers: [CrearGrupoServiceService]
})
export class CrearGrupoComponent implements OnInit {

  constructor(private crearGrupoService: CrearGrupoServiceService) { }

  ngOnInit(): void {

  }

  CrearGrupo() {
    this.crearGrupoService.SendGrupo({
    "grupoId": null,
    "creadorId": null,
    "tareaId": null,
    "descripcion": "Test 00",
    "iconoId": null
    })
      .subscribe(grupo => console.log('grupo: -->', grupo));
  }
}
