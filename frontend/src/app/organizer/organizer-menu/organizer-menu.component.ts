import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organizer-menu',
  templateUrl: './organizer-menu.component.html',
  styleUrls: ['./organizer-menu.component.css']
})
export class OrganizerMenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl("/home");
  }

}
