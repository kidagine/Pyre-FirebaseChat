import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Message } from 'src/app/shared/models/message.model';
import { User } from 'src/app/shared/models/user.model';
import { MessageService } from 'src/app/shared/services/message.service';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  private userCollection: AngularFirestoreCollection<User>;
  messages: Observable<Message[]>;
  users: Observable<User[]>;
  user: User;
  message: Message;
  userAmount: String;
  editUsername: String;
  previousUsername: String;
  previousPostTime: Date;
  usernameColor:String = "white";

  messageForm = new FormGroup({
    text: new FormControl('')
  });
  userForm = new FormGroup({
    username: new FormControl(''),
    usernameColor: new FormControl('')
  });

  constructor(private afs: AngularFirestore, private authService: AuthService, private userService: UserService, private messageService: MessageService) {
    this.userCollection = afs.collection<User>('users');
    this.messages = messageService.getMessages();
    this.users = userService.getUsers();
    this.getUsersAmount();

    this.userCollection.doc(this.authService.getUserId()).ref.get().then((doc) => {
      if (doc.exists) {
        this.user = <User>doc.data();
      }
      else{
        console.log("username doesn't exist");
      } 
    })
  }
  ngOnInit() {
  }

  sendMessage(message: Message){
    this.messageForm.reset();
    message.username = this.user.username;
    message.usernameColor = this.user.usernameColor;
    var today = new Date();
    message.postTime = today;
    this.messageService.addMessage(message);
  }

  timeConverter(timestamp){
    var a = new Date(timestamp.seconds * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var minute = a.getMinutes();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + minute;
    return time;
  }

  getUsersAmount(){
    this.users.subscribe(result => {this.userAmount = result.length.toString()});
    return this.userAmount;
  }

  logOut(){
    this.authService.logOut();
  }

  editUser(user: User){
    this.userService.editUser(user);
    this.user.username = user.username
  }

  isPreviousUsernameEqual(currentUsername: String, setPrevious?: boolean){
    if (this.previousUsername === currentUsername || this.previousUsername === ""){
      if (setPrevious){
        this.previousUsername = currentUsername;
      }
      return true;
    }
    if (setPrevious){
      this.previousUsername = currentUsername;
    }
    return false
  }

}