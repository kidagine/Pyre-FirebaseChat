import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  private userCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;

  constructor(private afs: AngularFirestore, private authenticationService: AuthenticationService) {
    this.userCollection = afs.collection<User>('users');
    this.users = this.afs.collection<User>('users', ref => ref.orderBy('username','asc')).valueChanges();
  }

  ngOnInit() {
  }

  deleteUser(user: User) {
    console.log(user);
    this.authenticationService.deleteUser(user);
  }
}
