import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Socket, SocketIoConfig } from "ngx-socket-io";
import { environment as env } from "src/environment";
import { AuthService } from "./../../core/services/auth.service";
import { ChatService } from "./../../core/services/chat.service";
import { UserService } from "./../../core/services/user.service";

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: []
  })
  export class ChatComponent implements OnInit, AfterViewChecked, OnDestroy{

    messages: Array<any> = [];
    members: Array<any> = [];
    currentUsername = '';
    messageForm = new FormGroup({
      message: new FormControl('', Validators.required)
    });

    @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

    config: SocketIoConfig = { url: env.apiBaseUrl, options: {
        query: {
            token: localStorage.getItem('token')
        }}
    };
    socket: any
  
    constructor(
      private chatService: ChatService,
      private userService: UserService,
      private authService: AuthService,
    ) {this.socket = new Socket(this.config)}

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
    this.recieveMessages(this.messages);
    this.userService.getUsers()
    .subscribe((res: any) => {
      res.data.list.forEach((element: any) => {
        let pic = 'assets/images/default_profile_image.webp'
        if (element.profileImage) {
          pic = `http://localhost:3000/user/${element.id}/profile-photo`;
        }
        this.members.push({ id: element.id, firstName: element.firstName, image: pic, username: element.username, birthday: element.birthday, isActive: element.status});
      });
      this.members = this.members.filter((element: any) => element.username != this.currentUsername)
    });
  }

  ngOnDestroy(): void {
    this.socket.disconnect()
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
  } 

  scrollToBottom(): void {
    try{
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;            
    }catch {
      return;
    }
  }
  
  sendMessage(form: FormGroup) {
    this.socket.emit('sendMessage', form.value.message)
    form.reset();
  }

  recieveMessages(messages: Array<any>) {
    this.socket.on('recMessage', (message: any) => {
        messages.push(message)
    })
  }
}