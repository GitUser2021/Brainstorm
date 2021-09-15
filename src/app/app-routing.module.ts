import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { HomeComponent } from './Pages/home/home.component';
import {EnviaMailComponent} from './Pages/envia-mail/envia-mail.component'
import { GrupoComponent } from './Pages/crear-grupo/crear-grupo.component';
import { MarketingComponent } from './Pages/marketing/marketing.component';
import { TareaComponent } from './Pages/crear-tarea/crear-tarea.component';
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'EnviaMail',
    component: EnviaMailComponent,
    canActivate: [AuthGuard]
  }
  , 
  {
    path: 'CrearGrupo',
    component: GrupoComponent,
    canActivate: [AuthGuard]
  }, 
  {
    path: 'CrearTarea',
    component: TareaComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
