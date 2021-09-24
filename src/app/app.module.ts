import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/login/login.component';

import { AuthModule } from '@auth0/auth0-angular';                   // <-- agregar esto.
import { environment as env } from '../environments/environment';
import { LoginButtonComponent } from './Components/login-button/login-button.component';    // <-- agregar esto.
import { LogoutButtonComponent } from './Components/logout-button/logout-button.component';
import { NavbarComponent } from './Components/navbar/navbar.component'
import { HomeComponent } from './Pages/home/home.component';
import {EnviaMailComponent} from './Pages/envia-mail/envia-mail.component';
import { GrupoComponent } from './Pages/crear-grupo/crear-grupo.component';
import { MarketingComponent } from './Pages/marketing/marketing.component';
import { TareaComponent } from './Pages/crear-tarea/crear-tarea.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    HomeComponent,
    LoginComponent,
    EnviaMailComponent,
    NavbarComponent,
    GrupoComponent,
    MarketingComponent,
    TareaComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AuthModule.forRoot({ // <-- agregar esto.
      ...env.auth,       // <-- agregar esto.
    cacheLocation: 'localstorage',
    useRefreshTokens: true
    }),                  // <-- agregar esto.
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
