import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { PollPageComponent } from './poll-page.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    PollPageComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    MatProgressBarModule,
    MatButtonToggleModule
  ],
})
export class PollPageModule { }