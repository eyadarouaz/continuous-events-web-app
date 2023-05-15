import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChatComponent } from './chat.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule
  ],
})
export class ChatModule {}
