import {CanActivate, CanActivateFn, Router} from '@angular/router';
import {AuthenticationService} from "../services/auth/authentication.service";
import {map, Observable} from "rxjs";
import {inject, Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthenticationService); // Correct: Use inject()
  private router = inject(Router); // Correct: Use inject()
  // constructor(private authService: AuthenticationService,private  router : Router) {
  // }
  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {

      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }

  }
}
