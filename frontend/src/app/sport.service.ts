import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SportService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  addSport(sport:string, discipline:string, min_players:number, max_players:number) {
    const data = {
      sport: sport,
      discipline: discipline,
      min_players: min_players,
      max_players: max_players
    }
    return this.http.post<{message: string}>(`${this.uri}/sports/addSport`, data);
  }

  getAllSports(type:string) {
    if (type) return this.http.get(`${this.uri}/sports/allSports/` + type);
    return this.http.get(`${this.uri}/sports/allSports/all`);
  }

  getDisciplines(sport:string, type: string) {
    const data = {
      sport: sport,
      type: type
    }
    return this.http.post(`${this.uri}/sports/getDisciplines`, data);
  }
}
