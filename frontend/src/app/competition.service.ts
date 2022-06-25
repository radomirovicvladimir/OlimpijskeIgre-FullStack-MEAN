import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Competition, CompetitionGroup, CompetitionParticipant } from './models/competition';
import { Participant } from './models/participant';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  addCompetition(data) {
    return this.http.post<{ message: string }>(`${this.uri}/competitions/addCompetition`, data);
  }

  getDelegateCompetitions(delegateId: string) {
    const data = {
      delegateId: delegateId
    }
    return this.http.post(`${this.uri}/competitions/getDelegateCompetitions`, data);
  }

  updateResult(_id: string, participant: string, result: number) {
    const data = {
      _id: _id,
      participantId: participant,
      result: result
    }
    return this.http.post<{ message: string }>(`${this.uri}/competitions/updateResult`, data);
  }

  updateGroupResults(_id: string, groupIndex: number, group: CompetitionGroup) {
    const data = {
      _id: _id,
      groupIndex: groupIndex,
      group: group
    }
    return this.http.post<{ message: string }>(`${this.uri}/competitions/updateGroupResults`, data);
  }

  updateGroups(_id: string, groups: Array<CompetitionGroup>) {
    const data = {
      _id: _id,
      groups: groups
    }
    return this.http.post<{ message: string }>(`${this.uri}/competitions/updateGroups`, data);
  }

  updateParticipants(_id: string, participants: Array<CompetitionParticipant>) {
    const data = {
      _id: _id,
      participants: participants
    }
    return this.http.post<{ message: string }>(`${this.uri}/competitions/updateParticipants`, data);
  }

  decrementRound(_id: string) {
    const data = {
      _id: _id
    }
    return this.http.post(`${this.uri}/competitions/decrementRound`, data);
  }

  removeCompetition(_id: string) {
    const data = {
      _id: _id
    }
    return this.http.post(`${this.uri}/competitions/remove`, data);
  }

  giveMedal(_id: string, medal: string) {
    const data = {
      _id: _id,
      medal: medal
    }
    return this.http.post(`${this.uri}/competitions/giveMedal`, data);
  }

  parseTime(result: string) {
    //console.log("parse time");
    let total = 0;
    let mult = 100;
    result = result.replace(/\s/g, '');
    let arr = result.split(',');
    if (arr.length == 0) return -1;
    let left_side = arr[0].split(':').reverse(); // -> [ss:mm:hh]
    for (var i = 0; i < left_side.length; i++) {
      total += mult * parseInt(left_side[i]);
      mult *= 60;
    }
    if (arr.length == 2) total += parseInt(arr[1]);
    return total;
  }

  parseDistance(result: string) {
    //console.log("parse distance");
    let total: number = 0;
    result = result.replace(/\s/g, '');
    let arr = result.split(',');
    if (arr.length == 0) return -1;
    if (arr.length == 1) return parseInt(arr[0]) * 100;
    arr = arr.reverse();
    total += parseInt(arr[0]);
    if (arr.length == 1) return total;
    total += parseInt(arr[1]) * 100;
    console.log("distance", total);
    return total;
  }

  firstGrouping(competition: Competition) {
    competition.groups = [];
    let left = [], right = [];
    for (var i = 0; i < competition.participants.length; i++) {
      if (i % 2 == 0) {
        left.push(competition.participants[i]);
      } else {
        right.push(competition.participants[i]);
      }
    }
    left.sort(() => (Math.random() > 0.5) ? 1 : -1);
    for (var i = 0; i < left.length - 1; i+=2) {
      let group: CompetitionGroup = {
        first: left[i],
        second: left[i + 1],
        hasResult: false,
        schedule: null
      }
      competition.groups.push(group);
    }
    right.sort(() => (Math.random() > 0.5) ? 1 : -1);
    for (var i = 0; i < right.length - 1; i+=2) {
      let group: CompetitionGroup = {
        first: right[i],
        second: right[i + 1],
        hasResult: false,
        schedule: null
      }
      competition.groups.push(group);
    }
    console.log(competition.groups);
  }


  firstGrouping2(competition: Competition) {
    let leftGroups = [];
    let rightGroups = [];
    let leftIndex: number = 0;
    let rightIndex: number = competition.participants.length / 4;
    competition.groups = [];
    for (var i = 0; i < competition.participants.length / 2; i++) {
      let g:CompetitionGroup = {
        first: null,
        second: null,
        hasResult: false,
        schedule: null
      }
      if (i % 2 == 0) leftGroups.push(g);
      else rightGroups.push(g);
      competition.groups.push(g);
    }
    for (var i = 0; i < competition.participants.length - 1; i += 2) {
      let q = Math.random();
      leftGroups.sort(() => (Math.random() > 0.5) ? 1 : -1);
      rightGroups.sort(() => (Math.random() > 0.5) ? 1 : -1);
      if (q <= 0.5) {
        if (leftGroups[0].first) leftGroups[0].second = competition.participants[i];
        else leftGroups[0].first = competition.participants[i];
        if (rightGroups[0]. first) rightGroups[0].second = competition.participants[i + 1];
        else rightGroups[0].first = competition.participants[i + 1];
      } else {
        if (leftGroups[0].first) leftGroups[0].second = competition.participants[i + 1];
        else leftGroups[0].first = competition.participants[i + 1];
        if (rightGroups[0]. first) rightGroups[0].second = competition.participants[i];
        else rightGroups[0].first = competition.participants[i];
      }
      console.log(i, leftGroups[0], rightGroups[0]);
      if (leftGroups[0].first && leftGroups[0].second) competition.groups[leftIndex++] = leftGroups.shift();
      if (rightGroups[0].first && rightGroups[0].second) competition.groups[rightIndex++] = rightGroups.shift();
    }
    console.log("groups", competition.groups);
  }

  secondGrouping(competition: Competition) {
    console.log("participants", competition.participants);
    competition.groups = [];
    for (var i = 0; i < competition.participants.length - 1; i += 2) {
      let group: CompetitionGroup = {
        first: competition.participants[i],
        second: competition.participants[i + 1],
        hasResult: false,
        schedule: null
      }
      competition.groups.push(group);
    }
    console.log("groups", competition.groups);
  }


  groupFinals(competition: Competition) {
    let finals: CompetitionGroup = {
      first: null,
      second: null,
      hasResult: false,
      schedule: null
    }
    let semifinals: CompetitionGroup = {
      first: null,
      second: null,
      hasResult: false,
      schedule: null
    }
    console.log("before", competition.groups);
    if (competition.groups[0].first.result > competition.groups[0].second.result) {
      finals.first = competition.groups[0].first;
      semifinals.first = competition.groups[0].second;
    } else {
      finals.first = competition.groups[0].second;
      semifinals.first = competition.groups[0].first;
    }

    if (competition.groups[1].first.result > competition.groups[1].second.result) {
      finals.second = competition.groups[1].first;
      semifinals.second = competition.groups[1].second;
    } else {
      finals.second = competition.groups[1].second;
      semifinals.second = competition.groups[1].first;
    }
    competition.groups = [];
    competition.groups.push(semifinals);
    competition.groups.push(finals);

    console.log("finals", competition.groups);

  }

  setSchedule(competition: Competition, date: string) {
    const data = {
      competition: competition,
      date: date
    }
    console.log(date);
    return this.http.post<{ message: string }>(`${this.uri}/competitions/setSchedule`, data);
  }

  setGroupSchedule(_id: string, group: CompetitionGroup, hasSchedule: boolean) {
    const data = {
      _id: _id,
      group: group,
      hasSchedule: hasSchedule
    }
    return this.http.post<{ message: string }>(`${this.uri}/competitions/setGroupSchedule`, data);
  }

  setCompetitionSchedule(_id: string, hasSchedule: boolean) {
    const data = {
      _id: _id,
      hasSchedule: hasSchedule
    }
    return this.http.post<{ message: string }>(`${this.uri}/competitions/setCompetitionSchedule`, data);
  }

  sortResultsAscending(a: resultInterface, b: resultInterface) {
    if (a.result > b.result) return 1;
    if (a.result < b.result) return -1;
    return 0;
  }

  sortResultsDescending(a: resultInterface, b: resultInterface) {
    if (a.result < b.result) return 1;
    if (a.result > b.result) return -1;
    return 0;
  }

  finalRanking(competition: Competition) {
    let results: resultInterface[] = [];
    for (var i = 0; i < competition.participants.length; i++) {
      results.push({
        _id: competition.participants[i].id,
        result: competition.participants[i].result
      });
    };
    if (competition.form.finalRanking == "sortMin") {
      results = results.sort(this.sortResultsAscending);
      //console.log(results);
    } else if (competition.form.finalRanking == "sortMax") {
      results = results.sort(this.sortResultsDescending);
      //console.log(results);
    }
    return results;
  }

  getMedalists(results: resultInterface[]) {
    let medalists = [];
    for (var i = 0; i < 3 && i < results.length; i++) {
      medalists.push(results[i]._id);
    }
    return medalists;
  }

}


export interface resultInterface {
  _id: string,
  result: number
}
