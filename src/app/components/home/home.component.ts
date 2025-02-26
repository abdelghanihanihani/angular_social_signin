import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/auth/authentication.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  ngOnInit(): void {
    this.user=this.authService.getLoggedInUser();

  }
  user :any = {};

  editProfile() {
    alert('Edit Profile Clicked!');
  }
  constructor(private authService: AuthenticationService) {
  }
  signOut() {
    this.authService.signOut();

  }
}
