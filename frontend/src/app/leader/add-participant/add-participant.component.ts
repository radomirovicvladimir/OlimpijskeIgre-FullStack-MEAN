import { Component, OnInit } from '@angular/core';
import { Sport } from 'src/app/models/sport';
import { User } from 'src/app/models/user';
import { ParticipantService } from 'src/app/participant.service';
import { SportService } from 'src/app/sport.service';

@Component({
  selector: 'app-add-participant',
  templateUrl: './add-participant.component.html',
  styleUrls: ['./add-participant.component.css']
})
export class AddParticipantComponent implements OnInit {

  constructor(private sportService: SportService, private participantService: ParticipantService) { }

  message: string = "";

  firstname: string = "";
  lastname: string = "";
  country: string = "Serbia";
  type: string = "individual";
  sport: string = "";
  discipline: string = "";
  gender:string = "";

  allSports:Sport[] = []
  disciplines:Sport[] = []


  ngOnInit(): void {
    
    let user:User = JSON.parse(localStorage.getItem("loginUser"));
    if (user) {
      this.country = user.country;
    }
    this.sportService.getAllSports("individual").subscribe((sports:Sport[])=>{
      this.allSports = sports;
    });
  }

  loadDisciplines() {
    if (this.sport == "") return;
    this.sportService.getDisciplines(this.sport, "individual").subscribe((disc:Sport[])=> {
      this.disciplines = disc;
    });
  }

  addParticipant() {
    this.message = "";
    if (this.firstname == "" || this.lastname == "" || this.sport == "" || this.gender == "" || (this.discipline == "" && this.disciplines.length > 0)){
      this.message = "All fields required!";
      return;
    }
    this.participantService.addParticipant(this.firstname, this.lastname, this.country, this.gender, this.sport, this.discipline, this.type).subscribe(res => {
      console.log(res);
      this.message = res.message;
    });
  }

}
