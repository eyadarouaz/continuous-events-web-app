import { Component, OnInit } from "@angular/core";
import { ChatService } from "src/app/core/services/chat.service";

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: []
  })
  export class ChatComponent implements OnInit{
  
    constructor(private chatService: ChatService) {}

  messages: Array<any> = [];

  ngOnInit() {
    this.chatService.getMessages()
    .subscribe((res: any) => {
      res.forEach((element:any) => {
        this.messages.push({username: element.user.username, content: element.content})
      });
    })
  }
  
}