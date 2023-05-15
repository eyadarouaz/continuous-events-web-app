import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ChatService } from "src/app/core/services/chat.service";
import { UserService } from "src/app/core/services/user.service";

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: []
  })
  export class ChatComponent implements OnInit{
  
    constructor(
      private chatService: ChatService,
      private userService: UserService
    ) {}

  messages: Array<any> = [];
  members: Array<any> = [];
  currentUsername = '';
  messageForm = new FormGroup({
    message: new FormControl('')
  });

  ngOnInit() {
    this.chatService.getMessages()
    .subscribe((res: any) => {
      res.forEach((element:any) => {
        this.messages.push({content: element.content, user: element.user})
      });
    })
    this.chatService.recieveMessages(this.messages);

    this.userService.getUsers()
    .subscribe((res: any) => {
      res.data.list.forEach((element: any) => {
        let pic = 'assets/images/default_profile_image.webp'
        if (element.profileImage) {
          pic = `http://localhost:3000/user/${element.id}/profile-photo`;
        }
        this.members.push({ id: element.id, firstName: element.firstName, image: pic, username: element.username, birthday: element.birthday});
      });
    });
  }
  
  sendMessage(form: FormGroup) {
    console.log(form.value.message)
    this.chatService.sendMessage(form.value.message);
    form.reset();
  }

}