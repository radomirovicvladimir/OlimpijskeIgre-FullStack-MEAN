import { Component, OnInit } from '@angular/core';
import { SportService } from 'src/app/sport.service';

@Component({
  selector: 'app-add-sport',
  templateUrl: './add-sport.component.html',
  styleUrls: ['./add-sport.component.css']
})
export class AddSportComponent implements OnInit {

  constructor(private sportService: SportService) { }

  message: string = "";

  sport: string = "";
  discipline: string = "";
  type: string = "";
  min_players: number = 1;
  max_players: number = 1;

  ngOnInit(): void {
  }


  addSport() {
    this.message = "";
    if (this.sport == "") {
      this.message = "Sport name required!";
      return;
    }
    if (this.type == "") {
      this.message = "Sport type required!";
      return;
    }
    if (this.type == "team" &&
      (this.min_players > this.max_players || this.min_players <= 0 || this.max_players <= 0)) {
      this.message = "Invalid number of players";
      return;
    }
    this.sportService.addSport(this.sport, this.discipline, this.min_players, this.max_players).subscribe(res=> {
      this.message = res.message;
    })
  }

}
