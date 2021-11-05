import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { GrupoService } from 'src/Services/grupo.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  public profileJson: string = "";
  public profileInfo: any;
  constructor(public auth: AuthService, private GrupoService: GrupoService,
) {
  }

  ngOnInit(): void {
    this.auth.user$
      .subscribe((profile) => {
        console.log(profile);
        console.log('email: ', profile.email);
        this.SendEmailIfExist(profile.email);
        this.profileInfo = profile;
        this.profileJson = JSON.stringify(profile, null, 2)
      });
  }

  SendEmailIfExist(email: any) {
    this.GrupoService.SendEmailIfExist(email).subscribe( email => {
      console.log('email if exists: -->', email);
    });
  };
}
