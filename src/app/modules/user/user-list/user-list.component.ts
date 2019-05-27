import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[];
  constructor(
    private userService: UserService,
    private router: Router,
    private data: DataService
  ) { }

  ngOnInit() {
    this.data.changeTitle('User');
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  editUser(userId) {
    this.router.navigate(['/edit-user'], { queryParams: { userId } });
  }

  deleteUser(userId) {
    this.userService.deleteUser(userId).subscribe(() => {
      const postIndex = this.users.findIndex((user) => user.id === userId);
      this.users.splice(postIndex, 1);
    });
  }
}
