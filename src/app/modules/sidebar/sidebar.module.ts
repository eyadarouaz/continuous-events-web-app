import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchPipe } from './../../core/pipes/search.pipe';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { EventsComponent } from './pages/events/events.component';
import { FeedComponent } from './pages/feed/feed.component';
import { AddEventComponent } from './pages/manage-events/add-events/add-events.component';
import { EditEventComponent } from './pages/manage-events/edit-events/edit-events.component';
import { ManageEventsComponent } from './pages/manage-events/manage-events.component';
import { AddPollComponent } from './pages/manage-polls/add-poll/add-poll.component';
import { EditPollComponent } from './pages/manage-polls/edit-poll/edit-poll.component';
import { ManagePollsComponent } from './pages/manage-polls/manage-polls.component';
import { AddMemberComponent } from './pages/manage-users/add-member/add-member.component';
import { EditMemberComponent } from './pages/manage-users/edit-member/edit-member.component';
import { ManageMembersComponent } from './pages/manage-users/manage-members.component';
import { PollsComponent } from './pages/polls/polls.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SidebarComponent } from './sidebar.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SidebarComponent,
    ProfileComponent,
    AnalyticsComponent,
    ManageMembersComponent,
    EditMemberComponent,
    AddMemberComponent,
    ManageEventsComponent,
    FeedComponent,
    EventsComponent,
    EditEventComponent,
    AddEventComponent,
    PollsComponent,
    ManagePollsComponent,
    AddPollComponent,
    EditPollComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MatExpansionModule,
    MatTableModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    FullCalendarModule,
    MatDividerModule,
    TranslateModule,
  ],
  exports: [
    SidebarComponent
  ]
})
export class SidebarModule { }
