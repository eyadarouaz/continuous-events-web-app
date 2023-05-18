import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/services/auth.service";
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
      private userService: UserService,
      private authService: AuthService,
    ) {}

  messages: Array<any> = [];
  members: Array<any> = [];
  currentUsername = '';
  messageForm = new FormGroup({
    message: new FormControl('', Validators.required)
  });

  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;


  ngOnInit() {
    this.scrollToBottom();    
    this.authService.currentUser(localStorage.getItem('token'))
    .subscribe((res: any) => {
      this.currentUsername = res.data.user.username;
    })
    this.chatService.getMessages()
    .subscribe((res: any) => {
      res.forEach((element:any) => {
        this.messages.push({content: element.content, user: element.user, 
          time: new Date(element.createdAt).getHours() + ':' + (new Date(element.createdAt).getMinutes()<10?'0':'')+new Date(element.createdAt).getMinutes()})
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

  ngAfterViewChecked() {        
    this.scrollToBottom();        
  } 

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) {}              
  }
  
  sendMessage(form: FormGroup) {
    console.log(form.value.message)
    this.chatService.sendMessage(form.value.message);
    form.reset();
  }

}