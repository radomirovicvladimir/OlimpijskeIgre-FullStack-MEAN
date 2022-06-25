import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CompetitionsComponent } from './delegate/competitions/competitions.component';
import { DelegateMainComponent } from './delegate/delegate-main/delegate-main.component';
import { ScheduleComponent } from './delegate/schedule/schedule.component';
import { HomeMainComponent } from './home/home-main/home-main.component';
import { HomepageComponent } from './home/homepage/homepage.component';
import { LoginComponent } from './home/login/login.component';
import { MedalsComponent } from './home/medals/medals.component';
import { ParticipantsComponent } from './home/participants/participants.component';
import { RegisterComponent } from './home/register/register.component';
import { SearchComponent } from './home/search/search.component';
import { AddParticipantComponent } from './leader/add-participant/add-participant.component';
import { LeaderMainComponent } from './leader/leader-main/leader-main.component';
import { AddCompetitionComponent } from './organizer/add-competition/add-competition.component';
import { AddSportComponent } from './organizer/add-sport/add-sport.component';
import { OrganizerMainComponent } from './organizer/organizer-main/organizer-main.component';
import { UserRequestsComponent } from './organizer/user-requests/user-requests.component';

const routes: Routes = [
  {
    path: '',
    component: HomeMainComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomepageComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'medals',
        component: MedalsComponent
      },
      {
        path: 'participants',
        component: ParticipantsComponent
      },
      {
        path: 'search',
        component: SearchComponent
      }
    ]
  },
  {
    path: 'organizer',
    component: OrganizerMainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'user-requests',
        pathMatch: 'full'

      },
      {
        path: "user-requests",
        component: UserRequestsComponent
      }, 
      {
        path: 'add-sport',
        component: AddSportComponent
      },
      {
        path: 'add-competition',
        component: AddCompetitionComponent
      }
    ]
  },
  {
    path: 'delegate',
    component: DelegateMainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'competitions',
        pathMatch: 'full'

      },
      {
        path: 'competitions',
        component: CompetitionsComponent
      },
      {
        path: 'schedule',
        component: ScheduleComponent
      }
    ]
  },
  {
    path: 'leader',
    component: LeaderMainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: "add-participant",
        pathMatch: 'full'
      },
      {
        path: 'add-participant',
        component: AddParticipantComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
