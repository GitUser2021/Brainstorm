import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { HomeComponent } from './Pages/home/home.component';
import {EnviaMailComponent} from './Pages/envia-mail/envia-mail.component'
import { CrearGrupoComponent } from './Pages/crear-grupo/crear-grupo.component';
import { MarketingComponent } from './Pages/marketing/marketing.component';
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
    component: CrearGrupoComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
