import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private angularFirestore: AngularFirestore) { }

  getUsers():Observable<User[]> {
    return this.angularFirestore.collection<User>('users', ref => ref.orderBy('username','asc')).valueChanges();
  }
}
