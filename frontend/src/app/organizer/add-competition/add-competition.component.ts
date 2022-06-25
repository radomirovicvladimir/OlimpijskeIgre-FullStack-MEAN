import { Component, OnInit } from '@angular/core';
import { CompetitionService } from 'src/app/competition.service';
import { CompetitionForm } from 'src/app/models/competition';
import { Participant } from 'src/app/models/participant';
import { Sport } from 'src/app/models/sport';
import { User } from 'src/app/models/user';
import { ParticipantService } from 'src/app/participant.service';
import { SportService } from 'src/app/sport.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-add-competition',
  templateUrl: './add-competition.component.html',
  styleUrls: ['./add-competition.component.css']
})
export class AddCompetitionComponent implements OnInit {

  constructor(private sportService: SportService, private userService: UserService, private participantService: ParticipantService, private competitionService: CompetitionService) { }

  message: string = "";

  sport: string = "";
  discipline: string = "";
  gender: string = "";
  startDate: string = "";
  endDate: string = "";
  locations: Array<string> = [];
  delegates: string[] = [];
  participants: string[] = [];
  // form
  type: string = "";
  resultType: string = "";
  numRounds: number = 1;
  roundRanking: string = "";
  finalRanking: string = "";
  minPlayers: number = 3;
  maxPlayers: number = 8;
  winnerPoints: number = 2;
  //

  allSports: Sport[] = [];
  allDelegates: User[] = [];
  disciplines: Sport[] = [];
  allParticipants: Participant[] = [];

  selectLocations = ["Sapporo Odori Park", "Saitama Super Arena", 
                      "Kokugikan Arena", "Ariake Arena", "Tatsumi Water Polo Centre", 
                      "Izu Velodrome"];

  ngOnInit(): void {
    this.sportService.getAllSports("individual").subscribe((sports: Sport[]) => {
      this.allSports = sports;
      this.userService.getDelegates().subscribe((d: User[]) => {
        this.allDelegates = d.filter(delegate => delegate.competitions.length < 3);
      })
    });
  }

  loadDisciplines() {
    if (this.sport == "") return;
    this.sportService.getDisciplines(this.sport, "individual").subscribe((disc: Sport[]) => {
      this.disciplines = disc;
      //console.log(this.disciplines);
      if (this.disciplines.length == 1) {
        this.participantService.search("", "", "", this.sport, "", this.gender).subscribe((p: Participant[]) => { this.allParticipants = p; })
      }
    });
  }


  loadParticipants() {
    // console.log(this.discipline);
    this.participantService.search("", "", "", this.sport, this.discipline, this.gender).subscribe((p: Participant[]) => {
        this.allParticipants = p; 
    });
  }

  PowerofTwo(x:number){
    return ((x != 0) && !(x & (x - 1)));
  }

  addCompetition() {
    this.message = "";
    if (this.startDate == "" || this.endDate == "" || this.gender == "" || this.sport == "") {
      this.message = "All fields required!";
      return;
    }
    console.log(this.startDate, this.endDate);
    let sd:Date = new Date(this.startDate);
    let ed:Date = new Date(this.endDate);
    let today:Date = new Date();
    sd.setHours(0, 0, 0, 0);
    ed.setHours(24, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    if ((sd.getTime() < today.getTime())|| sd.getTime() > ed.getTime()) {
      //console.log(sd, ed, today);
      this.message = "Date invalid!";
      return;
    }
    if (this.type != "all" && (!this.PowerofTwo(this.minPlayers) || !this.PowerofTwo(this.maxPlayers) || !this.PowerofTwo(this.participants.length))) {
      this.message = "Number of players must be a power of two."
      return;
    }
    if (this.minPlayers > this.maxPlayers || this.participants.length > this.maxPlayers || this.participants.length < this.minPlayers) {
      this.message = "Invalid number of players."
      return;
    }
    if (this.locations.length == 0) {
      this.message = "Location required";
      return;
    }

    if (this.type == "all" && this.locations.length !== 1) {
      this.message = "Select one location.";
      return;
    }

    if (this.type == "one-on-one") {
      if (this.minPlayers < 4) {
        this.message = "Invalid number of players."
        return;
      }
      this.finalRanking = "sortMax";
      this.numRounds = Math.log2(this.participants.length);
    }

    let cform: CompetitionForm = {
      type: this.type,
      numRounds: this.numRounds,
      roundRanking: this.roundRanking,
      finalRanking: this.finalRanking,
      minPlayers: this.minPlayers,
      maxPlayers: this.maxPlayers,
      resultType: this.resultType,
      winnerPoints: this.winnerPoints
    };

    let data = {
      sport: this.sport,
      discipline: this.discipline,
      gender: this.gender,
      startDate: sd,
      endDate: ed,
      locations: this.locations,
      delegates: this.delegates,
      participants: this.participants,
      form: cform
    }

    this.competitionService.addCompetition(data).subscribe(res=> {
      console.log(res);
      this.message = res.message;
    })


  } // end of addCompetition

}
