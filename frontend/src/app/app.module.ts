import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './home/menu/menu.component';
import { HomepageComponent } from './home/homepage/homepage.component';
import { RegisterComponent } from './home/register/register.component';
import { LoginComponent } from './home/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HomeMainComponent } from './home/home-main/home-main.component';
import { MedalsComponent } from './home/medals/medals.component';
import { OrganizerMainComponent } from './organizer/organizer-main/organizer-main.component';
import { DelegateMainComponent } from './delegate/delegate-main/delegate-main.component';
import { LeaderMainComponent } from './leader/leader-main/leader-main.component';
import { DelegateMenuComponent } from './delegate/delegate-menu/delegate-menu.component';
import { OrganizerMenuComponent } from './organizer/organizer-menu/organizer-menu.component';
import { LeaderMenuComponent } from './leader/leader-menu/leader-menu.component';
import { UserRequestsComponent } from './organizer/user-requests/user-requests.component';
import { AddSportComponent } from './organizer/add-sport/add-sport.component';
import { AddCompetitionComponent } from './organizer/add-competition/add-competition.component';
import { AddParticipantComponent } from './leader/add-participant/add-participant.component';
import { ParticipantsComponent } from './home/participants/participants.component';
import { SearchComponent } from './home/search/search.component';
import { CompetitionsComponent } from './delegate/competitions/competitions.component';
import { ScheduleComponent } from './delegate/schedule/schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomepageComponent,
    RegisterComponent,
    LoginComponent,
    HomeMainComponent,
    MedalsComponent,
    OrganizerMainComponent,
    DelegateMainComponent,
    LeaderMainComponent,
    DelegateMenuComponent,
    OrganizerMenuComponent,
    LeaderMenuComponent,
    UserRequestsComponent,
    AddSportComponent,
    AddCompetitionComponent,
    AddParticipantComponent,
    ParticipantsComponent,
    SearchComponent,
    CompetitionsComponent,
    ScheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
