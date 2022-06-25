import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/country.service';
import { Country } from 'src/app/models/country';
import { Participant } from 'src/app/models/participant';
import { Sport } from 'src/app/models/sport';
import { ParticipantService } from 'src/app/participant.service';
import { SportService } from 'src/app/sport.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private sportService: SportService, private countryService: CountryService, private participantService: ParticipantService) { }

  message: string = "";

  name: string = "";
  country: string = "";
  sport: string = "";
  discipline: string = "";
  gender:string = "";
  wonMedals:boolean = false;


  allSports:Sport[] = []
  disciplines:Sport[] = []
  countries: Country[] = [];
  participants: Participant[] = [];
  participantList: Participant[] = [];

  paginationSize: number = 10;
  start:number  = 0;
  end: number = 10;
  selectSize = "10";

  ngOnInit(): void {
    this.sportService.getAllSports(null).subscribe((sports:Sport[])=>{
      this.allSports = sports;
      this.countryService.getAllCountries().subscribe((docs: Country[])=> {
        this.countries = docs;
        this.participantService.getAllParticipants().subscribe(p => {
          this.participants = p;
          if (p.length < 10) this.end = p.length;
          this.participantList = this.participants.slice(this.start, this.end);
          console.log(this.participantList);
        });
      });
    });
  }

  updateResult() {
    this.start = 0;
    this.end = (this.start + this.paginationSize > this.participants.length) ? this.participants.length : this.start + this.paginationSize;
    this.participantList = this.participants.slice(this.start, this.end);
    console.log(this.participantList);
  }

  loadDisciplines() {
    if (this.sport == "") return;
    this.sportService.getDisciplines(this.sport, null).subscribe((disc:Sport[])=> {
      this.disciplines = disc;
    });
  }

  medalistFilter() {
    this.participants = this.participants.filter(p => (p.medals.gold + p.medals.silver + p.medals.bronze) > 0);
  }

  search() {
    this.message = "";
    let firstname = "";
    let lastname = "";
    if (this.name != "") {
      this.name = this.name.replace(/\s\s+/g, ' ');
      console.log(this.name);
      let split_array = this.name.split(' ');
      if (split_array.length == 2) {
        firstname = this.name.split(' ')[0];
        lastname = this.name.split(' ')[1];
      } else {
        this.message = "Invalid name!";
        return;
      }
    }
    if (firstname == "" && lastname == "" && this.country == "" && this.sport == "" && this.discipline == "" && this.gender == "") {
      this.participantService.getAllParticipants().subscribe(p => {
        this.participants = p;
        if (this.wonMedals) this.medalistFilter();
        this.updateResult(); 
      });
    } else {
      this.participantService.search(firstname, lastname, this.country, this.sport, this.discipline, this.gender).subscribe(p=> {
        console.log(p);
        this.participants = p;
        if (this.wonMedals) this.medalistFilter();
        this.updateResult(); 
      });
    }
    
  }

  changeSize() {
    this.paginationSize = parseInt(this.selectSize);
    this.start = 0;
    this.end = (this.start + this.paginationSize > this.participants.length) ? this.participants.length : this.start + this.paginationSize;
    this.participantList = this.participants.slice(this.start, this.end);
  }


  next() {
    console.log("next");
    this.start = this.end;
    this.end = (this.start + this.paginationSize > this.participants.length) ? this.participants.length : this.start + this.paginationSize;
    this.participantList = this.participants.slice(this.start, this.end);
    console.log(this.participantList);
  }

  prev() {
    console.log("prev");
    this.end = this.start;
    this.start = (this.end - this.paginationSize < 0) ? 0 : this.end - this.paginationSize;
    this.participantList = this.participants.slice(this.start, this.end);
    console.log(this.participantList);
  }

}
