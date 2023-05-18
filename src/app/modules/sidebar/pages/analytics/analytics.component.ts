import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { EventService } from "../../../../core/services/event.service";
import { SurveyService } from "../../../../core/services/survey.service";
import { UserService } from "../../../../core/services/user.service";
import { AuthService } from "src/app/core/services/auth.service";
import { PostService } from "src/app/core/services/post.service";


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  today = new Date();
  month = this.today.getFullYear() + '/' + (this.today.getMonth());  

  membersCount = 0;
  eventsCount = 0;
  surveysCount = 0;
  likesCount = 0;

  membersThisMonth = 0;
  eventsThisMonth = 0;
  pollsThisMonth = 0;
  likesThisMonth = 0;

  currentUser = '';

  @ViewChild(MatSort) sort = new MatSort;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private postService: PostService,
    private eventService: EventService,
    private surveyService: SurveyService
  ) {
    this.authService.currentUser(localStorage.getItem('token'))
    .subscribe((res: any) => {
      this.currentUser = res.data.user.firstName;
    })
  }

  ngOnInit() {
    this.userService.getUsers()
    .subscribe((res: any) => {
      //Number of users (total)
      this.membersCount = res.data.count;
      //Number of users (this month)
      this.membersThisMonth = res.data.list.filter((element: any) => {
        const created = new Date(element.createdAt);
        const createdDate = created.getFullYear() + '/' + created.getMonth();
        return createdDate == this.month;
      }).length;
    });

    this.eventService.getEvents()
    .subscribe((res: any) => {
      //Number of events (total)
      this.eventsCount = res.data.count;
      //Number of events (this month)
      this.eventsThisMonth = res.data.list.filter((element: any) => {
        const created = new Date(element.createdAt);
        const createdDate = created.getFullYear() + '/' + created.getMonth();
        return createdDate == this.month;
      }).length;
    });

    this.surveyService.getSurveys()
    .subscribe((res: any) => {
      //Number of polls (total)
      this.surveysCount = res.data.count;
      //Number of polls (this month)
      this.pollsThisMonth = res.data.list.filter((element: any) => {
        const created = new Date(element.createdAt);
        const createdDate = created.getFullYear() + '/' + created.getMonth();
        return createdDate == this.month;
      }).length;
    });

    this.postService.getLikes()
    .subscribe((res: any) => {
      //Number of polls (total)
      this.likesCount = res.data.length;
      //Number of polls (this month)
      this.likesThisMonth = res.data.filter((element: any) => {
        const created = new Date(element.createdAt);
        const createdDate = created.getFullYear() + '/' + created.getMonth();
        return createdDate == this.month;
      }).length;
    })

  }

  route(id: any) {
    localStorage.setItem('activeRoute', id);
  }

}