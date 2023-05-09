import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MemberProfileComponent } from './member-profile.component';

@NgModule({
  declarations: [
    MemberProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
})
export class MemberProfileModule { }
