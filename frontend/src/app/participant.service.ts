import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Participant } from './models/participant';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  participantsPerCountry() {
    return this.http.get<[{country: string, total: number}]>(`${this.uri}/participants/participantsPerCountry`);
  }

  addParticipant(firstname: string, lastname: string, country: string, gender: string, sport: string, discipline: string, type: string) {
    const data = {
      firstname: firstname,
      lastname: lastname,
      country: country,
      gender: gender,
      sport: sport,
      discipline: discipline,
      type: type
    }
    return this.http.post<{message: string}>(`${this.uri}/participants/addParticipant`, data);
  }

  getAllParticipants() {
    return this.http.get<[Participant]>(`${this.uri}/participants/allParticipants`);
  }

  getParticipantById(_id: string) {
    const data = {
      _id: _id
    }
    return this.http.post(`${this.uri}/participants/getParticipantById`, data);
  }

  search(firstname: string, lastname: string, country: string, sport: string, discipline: string, gender: string) {
    const data = {
      firstname: firstname,
      lastname: lastname,
      country: country,
      sport: sport,
      disciplines: [discipline],
      gender: gender
    }
    console.log(data);
    return this.http.post<[Participant]>(`${this.uri}/participants/search`, data);
  }
}
