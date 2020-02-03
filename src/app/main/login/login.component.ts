import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authenticationService: AuthenticationService) {}
  ngOnInit() {
  }

  login(user: User) {
    this.authenticationService.login(user);
  }

  resetPassword(user: User){
    this.authenticationService.resetPassword(user.email);
  }

}