import {inject, Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { getAuth, signInWithPopup, GoogleAuthProvider,FacebookAuthProvider } from "firebase/auth";
import {initializeApp} from "firebase/app";
import {environment} from "../../../environments/environment";
import {Auth, signOut, user} from "@angular/fire/auth";
import {map, Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
   app = initializeApp(environment.firebase);

  private auth=getAuth();

  private oauthToken: string | undefined;

  constructor(public fireAuth: AngularFireAuth,private router:Router) {
    // this.user$ = user(this.auth); // Initialize the user observable

  }
  googleSignIn() {
    if (!this.auth.currentUser) {
      const provider = new GoogleAuthProvider();
      // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      signInWithPopup(this.auth, provider)
        .then( (result)=> {
          if (!result) return;
          const credential = GoogleAuthProvider.credentialFromResult(result);

          // This gives you a Google Access Token. You can use it to access the Google API.
          const token = credential?.accessToken;
          // The signed-in user info.
          const user = result.user;

          console.log(user)
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('isLoggedIn', 'true');

          this.router.navigate(['/home']);
          // this.oauthToken.textContent = token ?? '';
        })
        .catch(function (error) {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          const credential = error.credential;
          if (errorCode === 'auth/account-exists-with-different-credential') {
            alert(
              'You have already signed up with a different auth provider for that email.',
            );
            // If you are using multiple auth providers on your app you should handle linking
            // the user's accounts here.
          } else {
            // console.error(error);
          }
        });
    }

  }
  facebookSignIn() {
    if (!this.auth.currentUser) {
      const provider = new FacebookAuthProvider();
      // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      signInWithPopup(this.auth, provider)
        .then( (result) =>{
          if (!result) return;
          const credential = FacebookAuthProvider.credentialFromResult(result);

          // This gives you a Google Access Token. You can use it to access the Google API.
          const token = credential?.accessToken;
          // The signed-in user info.
          const user = result.user;

          console.log(user)
          localStorage.setItem('user', JSON.stringify(user));

          localStorage.setItem('isLoggedIn', 'true');

          this.router.navigate(['/home']);

          // this.oauthToken.textContent = token ?? '';
        })
        .catch(function (error) {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          const credential = error.credential;
          if (errorCode === 'auth/account-exists-with-different-credential') {
            alert(
              'You have already signed up with a different auth provider for that email.',
            );
            // If you are using multiple auth providers on your app you should handle linking
            // the user's accounts here.
          } else {
            // console.error(error);
          }
        });
    }

  }

  signOut() {
    signOut(this.auth);
    console.log("signout")
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');

    this.router.navigate(['/login']);
  }


  isLoggedIn() :boolean {
    return localStorage.getItem('isLoggedIn')==='true';


  }
  getLoggedInUser()
  {
    const item = localStorage.getItem("user");

  if (item)
  {
    return JSON.parse(item);
  }else {
    return {
      displayName: 'John Doe',
      email: 'john.doe@example.com',
      location: 'Dubai, UAE',
      photoURL: 'https://via.placeholder.com/150'
    };
  }
  }
}
