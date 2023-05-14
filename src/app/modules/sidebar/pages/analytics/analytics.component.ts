import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { EventService } from "../../../../core/services/event.service";
import { SurveyService } from "../../../../core/services/survey.service";
import { UserService } from "../../../../core/services/user.service";


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  today = new Date();
  month = this.today.getFullYear() + '/' + (this.today.getMonth());  

  membersCount = new Number;
  eventsCount = new Number;
  surveysCount = new Number;

  membersThisMonth:Array<any> = [];
  eventsThisMonth:Array<any> = [];
  pollsThisMonth:Array<any> = [];

  @ViewChild(MatSort) sort = new MatSort;

  constructor(
    private userService: UserService,
    private eventService: EventService,
    private surveyService: SurveyService
  ) {}

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
      });
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
      });
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
      });
    });

  }

  route(id: any) {
    localStorage.setItem('activeRoute', id);
  }

}