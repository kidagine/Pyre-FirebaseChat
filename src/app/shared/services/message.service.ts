import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

import { Message } from '../models/message.model';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private angularFirestore: AngularFirestore) { }

  getMessages(): Observable<Message[]> {
    return this.angularFirestore.collection<Message>('messages', ref => ref.orderBy('postTime','asc')).valueChanges();
  }

  addMessage(message: Message) {
    this.angularFirestore.collection<Message>('messages').add(message);
  }
}
