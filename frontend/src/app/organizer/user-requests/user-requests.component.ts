import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-user-requests',
  templateUrl: './user-requests.component.html',
  styleUrls: ['./user-requests.component.css']
})
export class UserRequestsComponent implements OnInit {

  constructor(private userService: UserService) { }

  users: User[] = [];
  message: String = "";

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users: User[])=> {
      this.users = users.filter(u => u.type !== "organizer");
    });
  }

  approveUser(user: User) {
    this.message = "";
    console.log("user", user);
    this.userService.approveUser(user).subscribe((res:string)=> {
      if (res){
        this.message = res;
      } else {
        user.status = "approved";
      }
    });
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user).subscribe(res=> {
      this.users = this.users.filter(u => u.username !== user.username);
    });
  }

}
