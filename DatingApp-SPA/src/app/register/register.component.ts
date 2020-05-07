import { AuthService } from './../_services/auth.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private authServices: AuthService, private alertfy: AlertifyService) { }

  ngOnInit() {
  }

  register(){
   this.authServices.register(this.model).subscribe(() => {
    this.alertfy.success('registeration successful');
   }, error => {
     this.alertfy.error(error);
   });
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
