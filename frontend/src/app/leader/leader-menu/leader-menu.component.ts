import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leader-menu',
  templateUrl: './leader-menu.component.html',
  styleUrls: ['./leader-menu.component.css']
})
export class LeaderMenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl("/home");
  }

}
