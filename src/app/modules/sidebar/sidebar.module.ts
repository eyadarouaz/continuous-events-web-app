import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { EditMemberComponent } from './pages/manage-users/edit-member/edit-member.component';
import { AddMemberComponent } from './pages/manage-users/add-member/add-member.component';
import { ManageMembersComponent } from './pages/manage-users/manage-members.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [
    SidebarComponent,
    ProfileComponent,
    AnalyticsComponent,
    ManageMembersComponent,
    EditMemberComponent,
    AddMemberComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MatExpansionModule,
    MatTableModule,
  ],
  exports: [
    SidebarComponent
  ]
})
export class SidebarModule { }
