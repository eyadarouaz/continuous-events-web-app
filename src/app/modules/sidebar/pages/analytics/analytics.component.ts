import { AfterViewInit, Component, Inject, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ToastrService } from "ngx-toastr";
import { EventService } from "../../../../core/services/event.service";
import { SurveyService } from "../../../../core/services/survey.service";
import { UserService } from "../../../../core/services/user.service";
import { ManageMembersComponent } from "../manage-users/manage-members.component";


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  @ViewChild(MatSort) sort = new MatSort;

  constructor(private userService: UserService,
    private eventService: EventService,
    private surveyService: SurveyService,
    private toast: ToastrService) { }

  membersCount = new Number;
  eventsCount = new Number;
  surveysCount = new Number;


  events: Event[] = []


  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe((res: any) => {
        if (res.statusCode) {
          //Number of users (panel)
          this.membersCount = res.data.count;
        }
      });
    this.eventService.getEvents()
      .subscribe((res: any) => {
        if (res.statusCode) {
          //Number of events (panel)
          this.eventsCount = res.data.count;
          //Events (table)
        }
      });
    this.surveyService.getSurveys()
      .subscribe((res: any) => {
        if (res.statusCode) {
          //Number of polls (panel)
          this.surveysCount = res.data.count;
        }
      });

  }

  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort;
  // }

  
}