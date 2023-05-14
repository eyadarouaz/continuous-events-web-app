import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChatComponent } from './chat.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
  ],
})
export class ChatModule {}
