import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delegate-menu',
  templateUrl: './delegate-menu.component.html',
  styleUrls: ['./delegate-menu.component.css']
})
export class DelegateMenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl("/home");
  }

}
