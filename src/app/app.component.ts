import { Component } from '@angular/core';
import {AuthenticationService} from "./services/auth/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular_social_signin';
  constructor() {

  }


}
