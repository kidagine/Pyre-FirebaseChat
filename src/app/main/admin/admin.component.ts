import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users: Observable<User[]>;

  constructor(private afs: AngularFirestore, private authService: AuthService, private userService: UserService) {
    this.users = userService.getUsers();
    console.log(this.users);
  }

  ngOnInit() {
  }

  deleteUser(user: User) {
    console.log(user);
    this.userService.deleteUser(user);
  }
}
