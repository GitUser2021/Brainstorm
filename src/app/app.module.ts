import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { AuthModule } from '@auth0/auth0-angular';                   // <-- agregar esto.
import { environment as env } from '../environments/environment';
import { LoginButtonComponent } from './login-button/login-button.component';    // <-- agregar esto.
import { HomeComponent } from './home/home.component';
import { LogoutButtonComponent } from './logout-button/logout-button.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AuthModule.forRoot({ // <-- agregar esto.
      ...env.auth,       // <-- agregar esto.
    }),                  // <-- agregar esto.

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
