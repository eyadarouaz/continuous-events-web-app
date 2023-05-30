import { AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { Events } from '../../../../core/models/event.interface';
import { EventService } from '../../../../core/services/event.service';
import { UserService } from "../../../../core/services/user.service";
import { AuthService } from "./../../../../core/services/auth.service";
import { PostService } from './../../../../core/services/post.service';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.css']
  })
export class FeedComponent implements AfterViewInit{

  currentUser = {
    id: 0,
    username: '', 
    image: 'assets/images/default_profile_image.webp'
  };
  posts: Array<any> = [];
  likedPosts: Array<any> = []
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
  commentForm = new FormGroup({
    body: new FormControl()
  })

  @ViewChildren('like', {read: ElementRef}) likes!: QueryList<ElementRef>;

  constructor( 
    private eventService: EventService,
    private userService: UserService,
    private postService: PostService,
    public dialog: MatDialog,
    public renderer2: Renderer2,
    private authService: AuthService,
  ) {}

  ngAfterViewInit(): void {
    const today: Date = new Date();

    this.authService.currentUser(localStorage.getItem('token'))
    .subscribe((res:any) => {
      this.currentUser.image = `http://localhost:3000/user/${res.data.user.id}/profile-photo`;
      this.currentUser.username = res.data.user.username;
      this.currentUser.id = res.data.user.id;
    })

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
        this.members.push({ id: element.id, firstName: element.firstName, image: pic, username: element.username, birthday: element.birthday});
      });
      this.members = this.members.filter((element: any) => element.username != this.currentUser.username)
      const tab2 = this.members.find(element => this.formatDate(new Date(element.birthday)) == this.formatDate(today));
      this.birthday.firstName = tab2?.firstName;
      this.birthday.username = tab2?.username;
      this.birthday.image = tab2?.profileImage != ''  ? `http://localhost:3000/user/${tab2?.id}/profile-photo`: 'assets/images/default_profile_image.webp' ;
    });

    this.postService.getPosts()
    .subscribe((res: any)=> {
      res.data.forEach((element:any) => {
        let pic = "assets/images/default-event.jpg"
        if(element.eventPost){
          if(element.eventPost.image)
            pic = `http://localhost:3000/event/${element.eventPost.id}/image`
        }

        this.postService.getCommentsPerPost(element.id)
        .subscribe((res: any) => {
          const comments = res.data;

          this.postService.getLikesPerPost(element.id)
          .subscribe((res: any) => {
            this.posts.push({...element, postedOn: this.timePosted(new Date(element.createdAt)), 
              image: pic, nbLikes: res.data.count, firstUsers: res.data.list.slice(0,3), 
              users: res.data.list, comments: comments});
            this.posts.sort((a, b) => {
              const da = new Date(a.createdAt);
              const db = new Date(b.createdAt);
              return db.valueOf() - da.valueOf() 
            });
          });
        });

        this.postService.canLike(element.id) 
        .subscribe((res: any) => {
          if (!Array.isArray(res.data)) {
            this.likedPosts.push({id: res.data.post.id});
            this.likedPosts.forEach((el: any)=> {
              this.likes.changes.subscribe(a => {
                a.forEach((b: any) => {
                  if(b.nativeElement.id === 'post'+el.id){
                    b.nativeElement.children[2].innerHTML = 'Liked';
                    b.nativeElement.style.color = '#4169E1'
                  }
                })
              });
            })
          }
        });
      });
    });
  }


  likeOrUnlike(id: any) {
    const element = document.getElementById(`post${id}`);
    const buttonText = element?.children[2];
    if(!this.isLiked(id)) {
      this.postService.likePost(id)
      .subscribe(() => {
        const res = this.posts.find((obj:any) => {
          return obj.id === id
        })
        const indx = this.posts.indexOf(res)
        this.posts[indx].nbLikes ++;
      });
      
      if(element && buttonText) {
        element.style.color = "#4c73e8";
        buttonText.innerHTML = 'Liked'
      }
    }else {
      this.postService.unlikePost(id)
      .subscribe(() => {
        const res = this.posts.find((obj:any) => {
          return obj.id === id
        })
        const indx = this.posts.indexOf(res)
        this.posts[indx].nbLikes --;
      });
      
      if(element && buttonText) {
        element.style.color = "black";
        buttonText.innerHTML = 'Like'
      }
    }  
  } 

  addComment(id: any) {
    const body = this.commentForm.value;
    this.postService.addComment(id, body)
    .subscribe(() => {
      const res = this.posts.find((obj:any) => {
        return obj.id === id
      })
      const indx = this.posts.indexOf(res)
      this.posts[indx].comments.push({body: body.body, user: {id: this.currentUser.id}});
      this.commentForm.reset()
    })
  }

  isLiked(id: any) {
    return this.likedPosts.some(el => el.id === id)
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

    // if(this.canvas) {
    //   const myConfetti = confetti.create(this.canvas, {
    //     resize: true,
    //     spread: 70,
    //     origin: {
    //         y: 1.2
    //     }
    //   });
    //   myConfetti();
    // }
  }
}
  
  