import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(public authService: AuthService, private alertfy: AlertifyService) { }

  ngOnInit() {
  }

  login()
  {
    this.authService.login(this.model).subscribe(next => {
      this.alertfy.success('Logged in sucessfully');
    }, error => {
      this.alertfy.error(error);
    });
  }

  loggedIn()
  {
    return this.authService.loggedIn();
  }

  logout()
  {
    localStorage.removeItem('token');
    this.alertfy.message('logged out');
  }
}
