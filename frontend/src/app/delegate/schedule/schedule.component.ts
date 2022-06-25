import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompetitionService } from 'src/app/competition.service';
import { Competition, CompetitionGroup } from 'src/app/models/competition';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  constructor(private competitionsService: CompetitionService, private router: Router) { }

  user: User = null;
  competitions: Competition[] = [];
  message: string = "";

  group: CompetitionGroup = null;
  selectedGroup: string = "";

  date: string = "";

  groupDate: string = "";
  groupLocation: string = "";

  currIndex: number = 0;
  c: Competition = null;
  

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loginUser'));
    if (!this.user) {
      this.router.navigateByUrl('');
    }
    // console.log(this.user);
    this.competitionsService.getDelegateCompetitions(this.user._id).subscribe((comp: Competition[]) => {
      this.competitions = comp;
      if (this.competitions.length > 0) this.c = this.competitions[0];
      // console.log(this.competitions);
    })
  }

  groupSelected(c: Competition) {
    this.group = c.groups[parseInt(this.selectedGroup)];
    //console.log(this.group);
  }

  setSchedule(competition: Competition) {
    this.message = "";
    let now = new Date();
    if (competition.form.type == "one-on-one") { // tennis
      let selDate = new Date(this.groupDate);
      let sd = new Date(competition.startDate); 
      let ed = new Date(competition.endDate);
      if ((selDate < sd && selDate.getDate() != sd.getDate()) || (selDate > ed && selDate.getDate() != ed.getDate()) || (selDate < now)) {
        this.message = "Invalid date/time";
        return;
      }
      if (this.groupLocation == "") {
        this.message = "All fields required";
        return;
      }
      this.group.schedule = {
        date: selDate,
        location: this.groupLocation
      }
      let allSchedules = true;
      for (var i = 0; i < competition.groups.length; i++) {
        if (!competition.groups[i].schedule) {
          allSchedules = false;
          break;
        }
      }
      this.competitionsService.setGroupSchedule(competition._id, this.group, allSchedules).subscribe(res=> {
        //console.log(res.message);
        if (res.message === "Date taken.") {
          this.message = res.message;
          this.group.schedule = null;
        } else {
          competition.hasSchedule = allSchedules;
        }
      });
    } else {
      let selDate = new Date(this.date);
      let sd = new Date(competition.startDate); 
      let ed = new Date(competition.endDate);
      console.log(sd, ed, selDate);
      if ((selDate < sd && selDate.getDate() != sd.getDate()) || (selDate > ed && selDate.getDate() != ed.getDate()) || (selDate < now)) {
        this.message = "Invalid date/time";
        return;
      }
      this.competitionsService.setSchedule(competition, this.date).subscribe(res=> {
        console.log(res.message);
        if (res.message === "Date taken.") {
          this.message = res.message;
        } else {
          competition.hasSchedule = true;
        }
      });
    }
  }

  prettyDate(date: Date) {
    date = new Date(date);
    let prettyDate: string = "" + date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear();
    return prettyDate;
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
