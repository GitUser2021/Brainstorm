import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  public profileJson: string = "";
  public profileInfo: any;
  constructor(public auth: AuthService) {
  }

  ngOnInit(): void {
    this.auth.user$
      .subscribe((profile) => {
        console.log(profile);
        this.profileInfo = profile;
        this.profileJson = JSON.stringify(profile, null, 2)
      });
  }
}
