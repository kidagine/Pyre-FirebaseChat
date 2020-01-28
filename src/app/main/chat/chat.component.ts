import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { User } from 'firebase';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  private messageCollection: AngularFirestoreCollection<Message>;
  messages: Observable<Message[]>;
  checkoutForm;
  user: String;

  messageForm = new FormGroup({
    text: new FormControl('')
  });

  constructor(private afs: AngularFirestore, private authenticationService: AuthenticationService) {
    this.messageCollection = afs.collection<Message>('messages');
    this.messages = afs.collection<Message>('messages').valueChanges();
  }
  ngOnInit() {
    this.user = this.authenticationService.getUser();
    console.log(this.user);
    //var user =  this.authenticationService.getUser();
    // if (user) {
    //   this.use = user;
    // }
  }

  sendMessage(message: Message){
    this.messageCollection.add(message);
  }

  logOut(){
    this.authenticationService.logOut();
  }

}
