import { Component } from '@angular/core';
import {AuthenticationService} from "../../services/auth/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthenticationService) {

  }

  googleSignIn() {
    // this.authService.login().then((result) => console.log(result));
    this.authService.googleSignIn();
  }
  facebookSignIn() {
    // this.authService.login().then((result) => console.log(result));
    this.authService.facebookSignIn();
  }
}
