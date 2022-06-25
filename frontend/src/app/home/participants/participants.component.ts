import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/country.service';
import { Country } from 'src/app/models/country';
import { ParticipantService } from 'src/app/participant.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {

  constructor(private countryService: CountryService, private participantService: ParticipantService) { }

  countries: Country[] = [];
  countriesList: Country[] = [];

  paginationSize: number = 10;
  start:number  = 0;
  end: number = 10;

  ngOnInit(): void {
    this.participantService.participantsPerCountry().subscribe(data => {
      this.countryService.getAllCountries().subscribe((c: Country[])=> {
        this.countries = c;
        for (var i = 0; i < this.countries.length; i++) {
          this.countries[i].total = 0;
        }
        for (var i = 0; i < data.length; i++) {
          let index = this.countries.findIndex(country => country.name == data[i].country);
          this.countries[index].total = data[i].total;
        }
        if (c.length < 10) this.end = c.length;
        this.countriesList = this.countries.slice(this.start, this.end);
        //console.log(this.countries);
      })
    })
  }

  next() {
    console.log("next");
    this.start = this.end;
    this.end = (this.start + this.paginationSize > this.countries.length) ? this.countries.length : this.start + this.paginationSize;
    this.countriesList = this.countries.slice(this.start, this.end);
    console.log(this.countriesList);
  }

  prev() {
    console.log("prev");
    this.end = this.start;
    this.start = (this.end - this.paginationSize < 0) ? 0 : this.end - this.paginationSize;
    this.countriesList = this.countries.slice(this.start, this.end);
    console.log(this.countriesList);
  }

}
