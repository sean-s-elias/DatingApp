import { AuthService } from './../_services/auth.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private authServices: AuthService) { }

  ngOnInit() {
  }

  register(){
   this.authServices.register(this.model).subscribe(() => {
      console.log('registeration successful');
   }, error => {
     console.log(error);
   });
  }

  cancel(){
    this.cancelRegister.emit(false);
    console.log('Cancelled');
  }

}