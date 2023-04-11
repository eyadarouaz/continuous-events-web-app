import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ToastrService } from "ngx-toastr";
import { EventService } from "src/app/services/event.service";
import { SurveyService } from "src/app/services/survey.service";
import { UserService } from "src/app/services/user.service";

export interface Panel {
    id: any;
    name: string;
    icon: string;
    value: any;
  }

export interface User {
    id: number;
    username: string;
    email: string;
    joinedOn: Date;
  }

@Component({
    selector: 'dashboard-cmp',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
  })
export class DashboardComponent implements AfterViewInit, OnInit{

    @ViewChild(MatSort) sort = new MatSort;

    constructor(private userService: UserService,
      private eventService: EventService,
      private surveyService: SurveyService,
      public dialog: MatDialog,
      private toast: ToastrService) {}

    membersCount = new Number;
    eventsCount = new Number;
    surveysCount = new Number;
    panels: Panel[] = [];
    users: User[] = []
    dataSource = new MatTableDataSource(this.users);
    columns = [
      {
        name: 'id',
        header: 'ID',
        cell: (user: User) => `${user.id}`
      },
      {
        name: 'username',
        header: 'Username',
        cell: (user: User) => `${user.username}`,
      },
      {
        name: 'email',
        header: 'Email Address',
        cell: (user: User) => `${user.email}`,
      },
      {
        name: 'joinedOn',
        header: 'Joined On',
        cell: (user: User) => `${user.joinedOn}`,
      },
      {
        name: 'edit',
        header: '',
        cell: () => '',
      },
      {
        name: 'delete',
        header: '',
        cell: () => '',
      },
    ]
    displayedColumns = this.columns.map(c => c.name);
    selectedId: number = 0;

    ngOnInit(): void {
      this.userService.getUsers()
      .subscribe((res: any) => {
        if(res.statusCode){
          //Number of users (panel)
          this.membersCount = res.data.count;
          this.panels.push({id:1, name: 'Members', icon: 'assets/images/members.png', value: this.membersCount},);
          //Users (table)
          res.data.list.forEach((element: any) => {
            this.users.push({id: element.id, username: element.username, email: element.email, joinedOn: element.createdAt});
          });
          this.dataSource = new MatTableDataSource(this.users);
        }
      });
      this.eventService.getEvents()
      .subscribe((res: any) => {
        if(res.statusCode){
          this.eventsCount = res.data.count;
          this.panels.push({id:2, name: 'Events', icon: 'assets/images/events.png', value: this.eventsCount},)
        }
      });
      this.surveyService.getSurveys()
      .subscribe((res: any) => {
        if(res.statusCode){
          this.surveysCount = res.data.count;
          this.panels.push({id:3, name: 'Polls', icon: 'assets/images/polls.png', value: this.surveysCount},)
        }
      });

    }

    ngAfterViewInit() {
      this.dataSource.sort = this.sort;
    }

    deleteUser(id: number) {
      this.userService.deleteUser(id)
      .subscribe((res: any)=> {
        if(res.statusCode){
          this.toast.success('User deleted successfully')
        }
      })
    }

    openDialog() {
      const dialogRef = this.dialog.open(AddMemberComponent);
    }
}

@Component({
  selector: 'add-member-cmp',
  templateUrl: './templates/add-member.html',
})
export class AddMemberComponent {

  constructor(private userService: UserService) {}

  save(addUserForm: NgForm) {
    const {username, email, password} = addUserForm.value;
    console.log({username, email, password});
    // return this.userService.addUser({username, email, password})
    // .subscribe((res:any)=> {
    //   console.log('user added');
    // })
  }
}