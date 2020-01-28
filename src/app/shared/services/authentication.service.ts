import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();

  newUser: any;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router) { }

  getUser(): string {
    return this.afAuth.auth.currentUser.displayName;
  }
  

  login(user: User) {
    this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .catch(error => {
        this.eventAuthError.next(error);
      })
      .then(userCredential => {
        if(userCredential) {
          this.router.navigate(['/chat']);
        }
      })
  }

  register(user: User) {
    console.log(user);
    this.afAuth.auth.createUserWithEmailAndPassword( user.email, user.password).then(function(result) {
      return result.user.updateProfile({
        displayName: user.username
      });
    })
  }

  logOut() {
    this.afAuth.auth.signOut()
      .then(userCredential => this.router.navigate(['/login']))
  }
}