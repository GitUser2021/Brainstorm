import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-tareas',
  templateUrl: './ver-tareas.component.html',
  styleUrls: ['./ver-tareas.component.css']
})
export class VerTareasComponent implements OnInit {
  showForm: boolean;
  groupName: string;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.groupName = this.router.url.replace('/Tareas/', '');
  }
    
  receiveMessage($event){
    this.showForm = $event;
  }

  ShowForm():void {
    this.showForm = true;
  };
}
