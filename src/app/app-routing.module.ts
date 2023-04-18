import { LoginComponent } from './modules/auth/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { ManageMembersComponent } from './modules/sidebar/pages/manage-users/manage-members.component';
import { ContentLayoutComponent } from './layout/content-layout.component';
import { AnalyticsComponent } from './modules/sidebar/pages/analytics/analytics.component';
import { ProfileComponent } from './modules/sidebar/pages/profile/profile.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: ContentLayoutComponent, 
  children: [
    {path: 'analytics', component: AnalyticsComponent},
    {path: 'manage-members', component: ManageMembersComponent},
    {path: 'profile', component: ProfileComponent}
  ],
  canActivate: [AuthGuard] },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
