import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventPageComponent } from './event-page.component';

@NgModule({
  declarations: [
    EventPageComponent
  ],
  imports: [
    SharedModule,
    CommonModule
  ],
})
export class EventPageModule { }