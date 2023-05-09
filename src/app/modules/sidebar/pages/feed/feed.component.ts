import { EventService } from '../../../../core/services/event.service';
import { Component, ElementRef, OnInit, Renderer2 } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { UserService } from "../../../../core/services/user.service";
import { Events } from '../../../../core/models/event.interface';
//@ts-ignore
import * as confetti from 'canvas-confetti'
import { AuthService } from '../../../../core/services/auth.service';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.css']
  })
  export class FeedComponent implements OnInit{
    constructor( private eventService: EventService,
      private userService: UserService,
      public dialog: MatDialog,
      public renderer2: Renderer2, private authService: AuthService
      ) {
        const now = new Date()
        this.diffMin = Math.trunc((now.getTime() - this.postedOn.getTime())/60000);
        this.diffHour = Math.trunc(this.diffMin/60);
        this.diffDay = Math.trunc(this.diffHour/24)
      }

    members: Array<any> = [];
    postedOn: Date = new Date(2023,0o3,22,20,50)
    diffMin: number = 0;
    diffHour: number = 0;
    diffDay: number = 0;
    events: Array<any> = []
    birthday = {
      firstName : '',
      image: ''
    } 

    ngOnInit(): void {
      const today: Date = new Date();
      this.eventService.getEvents()
      .subscribe((res: any) => {
        const tab: Events[] = new Array(...res.data.list);
        const tab2 = tab.filter(element => new Date(element.startDate) > today).slice(0,3);
        tab2.forEach(element => this.events.push({id: element.id, title: element.title, 
          date: new Date(element.startDate).getDate(), month: new Date(element.startDate).toDateString().slice(4,7).toUpperCase(), 
          location: element.location}))
      })
      this.userService.getUsers()
      .subscribe((res: any) => {
        this.members = new Array(...res.data.list);
        const tab2 = this.members.find(element => this.formatDate(new Date(element.birthday)) == this.formatDate(today));
        this.birthday.firstName = tab2?.firstName;
        this.birthday.image = tab2?.profileImage != ''  ? `http://localhost:3000/user/${tab2?.id}/profile-photo`: 'assets/images/default_profile_image.webp' ;
      })
      
    }
     
    padTo2Digits(num: number) {
      return num.toString().padStart(2, '0');
    }

    formatDate(date: Date) {
      return (
        [
          this.padTo2Digits(date.getMonth() + 1),
          this.padTo2Digits(date.getDate()),
        ].join('/')
      );
    }

  canvas = document.getElementById('custom-canvas');

surprise() {
  const myConfetti = confetti.create(this.canvas, {
    resize: true,
    spread: 70,
    origin: {
        y: 1.2
    }
  });
  myConfetti();
}
  
    
   
    

  }
  
  