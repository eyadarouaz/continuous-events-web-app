import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
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