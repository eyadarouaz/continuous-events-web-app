import { Component, OnInit, Renderer2 } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { Events } from '../../../../core/models/event.interface';
import { EventService } from '../../../../core/services/event.service';
import { UserService } from "../../../../core/services/user.service";
import { PostService } from './../../../../core/services/post.service';
//@ts-ignore
import * as confetti from 'canvas-confetti';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.css']
  })
export class FeedComponent implements OnInit{

  posts: Array<any> = [];
  members: Array<any> = [];
  postedOn: Date = new Date(2023,0o3,22,20,50)
  diffMin = 0;
  diffHour = 0;
  diffDay = 0;
  events: Array<any> = []
  birthday = {
    firstName : '',
    username: '',
    image: ''
  } 
  canvas = document.getElementById('custom-canvas');

  constructor( 
    private eventService: EventService,
    private userService: UserService,
    private postService: PostService,
    public dialog: MatDialog,
    public renderer2: Renderer2
  ) {}

  ngOnInit(): void {
    const today: Date = new Date();

    this.eventService.getEvents()
    .subscribe((res: any) => {
      const tab: Events[] = new Array(...res.data.list);
      const tab2 = tab.filter(element => new Date(element.startDate) > today).slice(0,3);
      tab2.forEach(element => this.events.push({id: element.id, title: element.title, 
        startDate: element.startDate, date: new Date(element.startDate).getDate(), 
        month: new Date(element.startDate).toDateString().slice(4,7).toUpperCase(), 
        location: element.location})
      );
      this.events.sort((a, b) => {
        const da = new Date(a.startDate);
        const db = new Date(b.startDate);
        return da.valueOf() - db.valueOf()
      }); 
    });

    this.userService.getUsers()
    .subscribe((res: any) => {
      res.data.list.forEach((element: any) => {
        let pic = 'assets/images/default_profile_image.webp'
        if (element.profileImage) {
          pic = `http://localhost:3000/user/${element.id}/profile-photo`;
        }
        this.members.push({ id: element.id, image: pic, username: element.username});
      });
      const tab2 = this.members.find(element => this.formatDate(new Date(element.birthday)) == this.formatDate(today));
      this.birthday.firstName = tab2?.firstName;
      this.birthday.username = tab2?.username;
      this.birthday.image = tab2?.profileImage != ''  ? `http://localhost:3000/user/${tab2?.id}/profile-photo`: 'assets/images/default_profile_image.webp' ;
    });

    this.postService.getPosts()
    .subscribe((res: any)=> {
      res.data.forEach((element:any) => {
        this.postService.getLikes(element.id)
        .subscribe((res: any) => {
          this.posts.push({...element, postedOn: this.timePosted(new Date(element.createdAt)), 
            nbLikes: res.data.count, users: res.data.list});
        });
      });
    });
  }
    
  timePosted(time: Date) {
    const now = new Date()
    const diffMin = Math.trunc((now.getTime() - time.getTime())/60000);
    const diffHour = Math.trunc(diffMin/60);
    const diffDay = Math.trunc(diffHour/24)
    if(diffMin < 60) {
      return diffMin + ' minutes ago'
    }else if (diffMin >= 60 && diffMin < 1440){
      return diffHour + ' hours ago'
    }else {
      return diffDay + ' days ago'
    }
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
  
  