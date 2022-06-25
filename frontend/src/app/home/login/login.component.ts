import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  username: string = "";
  password: string = "";
  message: string = "";

  ngOnInit(): void {
  }

  login() {
    this.message = "";
    if (this.username == "" || this.password == "") {
      this.message = "All fields required!";
      return;
    }
    this.userService.login(this.username, this.password).subscribe(res=> {
      this.message = res.message;
      if (res.user) {
        localStorage.setItem("loginUser", JSON.stringify(res.user));
        this.router.navigateByUrl("/" + res.user.type);
      } else {
        this.message = "User not registered";
      }
    })
  }

}
