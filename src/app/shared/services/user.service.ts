import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private angularFirestore: AngularFirestore) { }

  getUsers():Observable<User[]> {
    return this.angularFirestore.collection<User>('users', ref => ref.orderBy('username','asc')).snapshotChanges().pipe(
      map(documents => {
        const userArray: User[] = [];
        documents.forEach(doc => {
          const prod = doc.payload.doc.data();
          userArray.push({
            id: doc.payload.doc.id,
            email: prod.email,
            password: prod.password,
            username: prod.username,
            usernameColor: prod.usernameColor
          });
        });
        return userArray;
      })
    );
  }

  deleteUser(user: User){
    this.angularFirestore.collection("users").doc(user.id).delete().then(function() {
      console.log("Documented deleted");
    }).catch(function(error) {
      console.error("Error removing ", error);
    });
  }

  editUser(user: User) {
    this.angularFirestore.collection('users').doc(user.id).set({
      username: user.username,
      usernameColor: user.usernameColor
    })
  }
}
