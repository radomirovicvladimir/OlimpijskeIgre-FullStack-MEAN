import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompetitionService, resultInterface } from 'src/app/competition.service';
import resultType, { Competition, CompetitionGroup, CompetitionParticipant } from 'src/app/models/competition';
import { Participant } from 'src/app/models/participant';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit {

  constructor(private competitionsService: CompetitionService, private router: Router) { }

  user: User = null;
  competitions: Competition[] = [];
  result: string = "";
  participantId: string = "";
  selectedGroup: string = "";
  group: CompetitionGroup = null;
  firstResult: number = 0;
  secondResult: number = 0;

  currIndex: number = 0;
  c: Competition = null;


  medalists: Array<string> = [];

  participant: CompetitionParticipant = null;

  message: string = "";

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loginUser'));
    if (!this.user) {
      this.router.navigateByUrl('');
    }
    // console.log(this.user);
    this.competitionsService.getDelegateCompetitions(this.user._id).subscribe((comp: Competition[]) => {
      this.competitions = comp;
      if (this.competitions.length > 0) this.c = this.competitions[0];
      console.log("current competition", this.c);
      // console.log("all competitions", this.competitions);
    })
  }

  participantSelected(c: Competition) {
    let index = c.participants.findIndex(p => p.id == this.participantId);
    this.participant = c.participants[index];
    // console.log(this.participant);
  }

  groupSelected(c: Competition) {
    this.group = c.groups[parseInt(this.selectedGroup)];
    this.firstResult = this.secondResult = 0;
    //console.log(this.group);
  }

  prettyDate(date: Date) {
    date = new Date(date);
    let prettyDate: string = "" + date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
    return prettyDate;
  }

  getResultType(type: string) {
    return resultType[type];
  }

  parseResult(result: string, type: string) {
    //console.log("parse result", type);
    let total: number;
    if (type === "time") total = this.competitionsService.parseTime(result);
    else if (type === "distance") total = this.competitionsService.parseDistance(result);
    else total = parseInt(result);
    return total;
  }


  runFinalRanking(competition: Competition) {
    if (this.medalists.length == 0) {
      this.medalists = this.competitionsService.getMedalists(this.competitionsService.finalRanking(competition));
    }
    console.log("medalists", this.medalists);
    if (this.medalists.length == 0) return;
    this.competitionsService.giveMedal(this.medalists[0], "gold").subscribe(res => {
      if (this.medalists.length == 1) return;
      this.competitionsService.giveMedal(this.medalists[1], "silver").subscribe(res => {
        if (this.medalists.length == 2) return;
        this.competitionsService.giveMedal(this.medalists[2], "bronze").subscribe(res => {
          this.competitionsService.removeCompetition(competition._id).subscribe(res => {
          window.location.reload();
          });
        });
      });
    });

  }


  inputResult(competition: Competition) {
    this.message = "";
    let now = new Date();
    let ed = new Date(competition.date);
    // if (now <= ed) {
    //   this.message = "Competition didn't start.";
    //   return;
    // }
    if (this.participantId == "" || this.result == "") {
      this.message = "All fields required";
      return;
    }
    let result = this.parseResult(this.result, competition.form.resultType);
    //console.log("result", result);
    let index = competition.participants.findIndex(p => p.id == this.participantId);
    if (index < 0) return; // error
    if (competition.form.roundRanking == "bestResult") {
      if (competition.form.finalRanking == "sortMin" && competition.participants[index].result == -1) competition.participants[index].result = result;
      else if ((competition.form.finalRanking == "sortMin" && result < competition.participants[index].result)
        || (competition.form.finalRanking == "sortMax" && result > competition.participants[index].result)) {
        competition.participants[index].result = result;
      }
    } else if (competition.form.roundRanking == "sumPoints") {
      competition.participants[index].result += result;
    } else {
      competition.participants[index].result = result;
    }
    competition.participants[index].hasResult = true;
    this.result = "";
    // update database
    this.competitionsService.updateResult(competition._id, competition.participants[index].id, competition.participants[index].result).subscribe(res => {
      console.log(res.message);
      let allResults = true;
      for (var i = 0; i < competition.participants.length; i++) {
        if (!competition.participants[i].hasResult) {
          allResults = false;
          break;
        }
      }
      if (!allResults) return;
      // check if there are medalists with equal result

      //console.log("same result", check);
      if (competition.currentRound == 1) {
        let check = this.checkSameResult(competition);
        if (check) {
          console.log("Participant with same result");
          competition.hasSchedule = false;
          this.competitionsService.updateParticipants(competition._id, competition.participants).subscribe(res => {
            console.log(res);
            this.competitionsService.setCompetitionSchedule(competition._id, false).subscribe(res => {
              console.log(res);
              return;
            });
          });
        } else {
          console.log("No participants with same result");
          competition.currentRound--;
          // decrement current round in database, set hasSchedule=false and numResults=0 if currentRound > 0
          this.competitionsService.decrementRound(competition._id).subscribe(res => {
            console.log(res);
            if (competition.currentRound > 0) {
              competition.hasSchedule = false;
              for (var i = 0; i < competition.participants.length; i++) {
                competition.participants[i].hasResult = false;
              }
              this.competitionsService.updateParticipants(competition._id, competition.participants).subscribe(res => {
                console.log(res);
              })
              // round ranking
            }
          })
        }
      } else {
        competition.currentRound--;
        // decrement current round in database, set hasSchedule=false and numResults=0 if currentRound > 0
        this.competitionsService.decrementRound(competition._id).subscribe(res => {
          console.log(res);
          if (competition.currentRound > 0) {
            competition.hasSchedule = false;
            for (var i = 0; i < competition.participants.length; i++) {
              competition.participants[i].hasResult = false;
            }
            this.competitionsService.updateParticipants(competition._id, competition.participants).subscribe(res => {
              console.log(res);
            })
            // round ranking
          }
        })
      }
    }); // end of updateResult
  } // end of inputResult

  checkSameResult(competition: Competition) {
    console.log("Check same result");
    let results: resultInterface[] = this.competitionsService.finalRanking(competition);
    console.log("results", results);
    let sameResult = false;
    for (var i = 0; i < results.length - 1; i++) {
      for (var j = i + 1; j < results.length; j++) {
        if (results[i].result == results[j].result) {
          let p1 = competition.participants.findIndex(p => p.id == results[i]._id);
          let p2 = competition.participants.findIndex(p => p.id == results[j]._id);
          console.log("same results", i, j);
          competition.participants[p1].hasResult = false;
          competition.participants[p2].hasResult = false;
          sameResult = true;
        }
      }
    }
    return sameResult;
  }

  startCompetition(competition: Competition) {
    console.log("Start competition");
    this.competitionsService.firstGrouping(competition);
    // this.competitionsService.firstGrouping2(competition);
    this.competitionsService.updateGroups(competition._id, competition.groups).subscribe(res => {
      console.log(res);
    });
  }

  secondGrouping(competition: Competition) {
    console.log("second grouping");
    this.competitionsService.secondGrouping(competition);
    this.competitionsService.updateGroups(competition._id, competition.groups).subscribe(res => {
      console.log(res);
    });
  }


  eliminateParticipants(competition: Competition) {
    console.log("eliminate participants", competition.participants);
    let participants = [];
    for (var i = 0; i < competition.groups.length; i++) {
      if (competition.groups[i].first.result > competition.groups[i].second.result) {
        participants.push(competition.groups[i].first);
      } else {
        participants.push(competition.groups[i].second);
      }
    }
    competition.participants = participants;
    console.log(competition.participants);
    this.competitionsService.updateParticipants(competition._id, competition.participants).subscribe(res => {
      console.log(res);
    });
  }

  groupFinals(competition: Competition) {
    console.log("group finals");
    this.competitionsService.groupFinals(competition);
    this.competitionsService.updateGroups(competition._id, competition.groups).subscribe(res => {
      console.log(res);
    });
  }

  inputGroupResult(competition: Competition) {
    this.message = "";
    console.log("input group results");
    if (this.firstResult > competition.form.winnerPoints || this.firstResult < 0 || this.secondResult > competition.form.winnerPoints || this.secondResult < 0 || 
        (this.firstResult != competition.form.winnerPoints && this.secondResult != competition.form.winnerPoints) || (this.firstResult == this.secondResult)) {
      this.message = "Invalid results.";
      return;
    }
    let winnerIndex = -1;
    if (this.firstResult == competition.form.winnerPoints) {
      winnerIndex = competition.participants.findIndex(p => p.id == this.group.first.id);
      this.group.first.result += competition.currentRound;
    } else if (this.secondResult == competition.form.winnerPoints) {
      winnerIndex = competition.participants.findIndex(p => p.id == this.group.second.id);
      this.group.second.result += competition.currentRound;
    }
    if (winnerIndex < 0) return; // error

    // update result
    this.group.hasResult = true;
    competition.participants[winnerIndex].result += competition.currentRound;
    console.log("winner result", competition.participants[winnerIndex]);

    // update result in database
    this.competitionsService.updateResult(competition._id, competition.participants[winnerIndex].id, competition.participants[winnerIndex].result).subscribe(res => {
      console.log(res.message);
      let groupIndex = competition.groups.findIndex(g => (g.first.id == this.group.first.id));
      console.log("Group index", groupIndex);
      console.log(this.group);
      this.competitionsService.updateGroupResults(competition._id, groupIndex, this.group).subscribe(res => {
        console.log(res.message);
      })
    });
    let allResults = true;
    for (var i = 0; i < competition.groups.length; i++) {
      if (!competition.groups[i].hasResult) {
        allResults = false;
        break;
      }
    }
    if (!allResults) return;
    if (competition.currentRound > 2) {
      this.eliminateParticipants(competition);
      this.secondGrouping(competition);
    } else { // quarterfinal -> semifinal & final
      this.groupFinals(competition);
    }
    competition.currentRound--;
    for (var i = 0; i < competition.groups.length; i++) {
      competition.groups[i].schedule = null;
      competition.groups[i].hasResult = false;
    }
    this.competitionsService.decrementRound(competition._id).subscribe(res => { // currentRound-- + hasSchedule = false
      console.log("Round decremented");
      competition.hasSchedule = false;
      this.competitionsService.updateGroups(competition._id, competition.groups).subscribe(res => {
        console.log(res);
      })
    })
    console.log("competition state", competition);

  }


  next() {
    if (this.currIndex == this.competitions.length - 1) return;
    this.currIndex++;
    this.c = this.competitions[this.currIndex];
  }

  prev() {
    if (this.currIndex == 0) return;
    this.currIndex--;
    this.c = this.competitions[this.currIndex];
  }


}

