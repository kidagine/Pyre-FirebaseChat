import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();

  newUser: any;

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private router: Router) { }

  getUser(): string {
    return this.afAuth.auth.currentUser.displayName;
  }

  isUserLoggedIn() {
    this.afAuth.auth.onAuthStateChanged(function(user) {
      if (user){
        console.log('a');
        return true;
      }
      console.log('b');
      return false;
    })
    console.log('s');
  }
  
  login(user: User) {
    this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .catch(error => {
        var errorMessage = this.getLoginErrorMessage(error.code);
        alert(errorMessage);
      })
      .then(userCredential => {
        if(userCredential) {
          this.router.navigate(['/chat']);
        }
      })
  }

  register(user: User) {
    this.afAuth.auth.createUserWithEmailAndPassword( user.email, user.password).then(result => {
      return this.db.collection('users').doc(result.user.uid).set({
        username: user.username,
        password: user.password,
        email: user.email
      });
    })
    .then((result) => {
      this.router.navigate(['/chat']);
    })
    .catch((error) => {
      var errorMessage = this.getLoginErrorMessage(error.code);
      alert(errorMessage);
    })
  }

  logOut() {
    this.afAuth.auth.signOut()
      .then(userCredential => this.router.navigate(['/login']))
  }

  resetPassword(email: string) {
    this.afAuth.auth.sendPasswordResetEmail(email).then(function() {
      alert("Reset password email sent to: " + email);
    }).catch(function(error) {
      alert("Email: " + email + "doesn't exist.");
    }); 
  }

  getLoggedInUsers(){
    // this.afAuth.auth.onAuthStateChanged(function(user) {
    //   if (user) {
    //     console.log("signed");
    //   }
    //   else {
    //     console.log("not signed")
    //   }
    // })
  }

  getLoginErrorMessage(error: any){
    switch (error) {
      case 'auth/invalid-email' : {
        return 'Email is invalid or does not exist.'
      }
      case 'auth/wrong-password' : {
        return 'Password is invalid or does not exist.'
      }
      case 'auth/weak-password' : {
        return 'Password is too weak.'
      }
      case 'auth/user-not-found' : {
        return 'User was not found.'
      }
      default: {
        console.log(error);
        return 'There has been an error, try again later.'
      }
    }
  }
}