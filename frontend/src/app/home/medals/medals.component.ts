import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/country.service';
import { Country } from 'src/app/models/country';

@Component({
  selector: 'app-medals',
  templateUrl: './medals.component.html',
  styleUrls: ['./medals.component.css']
})
export class MedalsComponent implements OnInit {

  constructor(private countryService: CountryService) { }
  countries: Country[] = [];
  countriesList: Country[] = [];

  paginationSize: number = 10;
  start:number  = 0;
  end: number = 10;

  compare (a: Country, b: Country) {
    let a_total = a.medals.gold + a.medals.silver + a.medals.bronze;
    let b_total = b.medals.gold + b.medals.silver + b.medals.bronze;
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  }

  ngOnInit(): void {
    this.countryService.getAllCountries().subscribe((c: Country[]) => {
      this.countries = c;
      this.countries.sort(this.compare);
      if (c.length < 10) this.end = c.length;
      this.countriesList = this.countries.slice(this.start, this.end);
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
