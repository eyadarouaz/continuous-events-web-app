import { LoginComponent } from './modules/auth/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { ManageMembersComponent } from './modules/sidebar/pages/manage-users/manage-members.component';
import { ContentLayoutComponent } from './layout/content-layout.component';
import { AnalyticsComponent } from './modules/sidebar/pages/analytics/analytics.component';
import { ProfileComponent } from './modules/sidebar/pages/profile/profile.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ManageEventsComponent } from './modules/sidebar/pages/manage-events/manage-events.component';
import { FeedComponent } from './modules/sidebar/pages/feed/feed.component';
import { AdminGuard } from './core/guards/admin.guard';
import { ProfileGuard } from './core/guards/profile.guard';
import { MemberProfileComponent } from './modules/member-profile/member-profile.component';
import { ResetPasswordComponent } from './modules/auth/reset-password/reset-password.component';
import { EventsComponent } from './modules/sidebar/pages/events/events.component';
import { EventPageComponent } from './modules/event-page/event-page.component';
import { ManagePollsComponent } from './modules/sidebar/pages/manage-polls/manage-polls.component';
import { PollsComponent } from './modules/sidebar/pages/polls/polls.component';
import { PollPageComponent } from './modules/poll-page/poll-page.component';
import { ChatComponent } from './modules/chat/chat.component';

const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '', redirectTo:'home', pathMatch: 'full' },
  { path: '', component: ContentLayoutComponent, 
  children: [
    {path: 'home', component: FeedComponent},
    {path: 'chat', component: ChatComponent},
    {path: 'analytics', component: AnalyticsComponent, canActivate: [AdminGuard]},
    {path: 'manage-members', component: ManageMembersComponent, canActivate: [AdminGuard]},
    {path: 'manage-events', component: ManageEventsComponent, canActivate: [AdminGuard]},
    {path: 'manage-polls', component: ManagePollsComponent, canActivate: [AdminGuard]},
    {path: 'profile', component: ProfileComponent},
    {path: 'events', component: EventsComponent},
    {path: 'events/:id', component: EventPageComponent},
    {path: 'polls', component: PollsComponent},
    {path: 'polls/:id', component: PollPageComponent},
    {path: ':username', component: MemberProfileComponent, canActivate: [ProfileGuard]},
  ],
  canActivate: [AuthGuard] },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
