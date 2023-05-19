import { Poll } from './../../../../core/models/poll.interface';
import { SurveyService } from './../../../../core/services/survey.service';
import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { FormControl } from '@angular/forms';
import { AddPollComponent } from './add-poll/add-poll.component';
import { EditPollComponent } from './edit-poll/edit-poll.component';
import { NotificationService } from '../../../../core/services/notification.service';


@Component({
  selector: 'app-manage-polls',
  templateUrl: './manage-polls.component.html',
  styleUrls: []
})
  export class ManagePollsComponent implements OnInit {

    polls: Poll[] = [];
    selectedId = 0;
    dataSource = new MatTableDataSource(this.polls);
    columns = [
      {
        name: 'id',
        header: 'ID',
        cell: (poll: Poll) => `${poll.id}`
      },
      {
        name: 'question',
        header: 'Question',
        cell: (poll: Poll) => `${poll.question}`,
      },
      {
        name: 'due',
        header: 'Due Date',
        cell: (poll: Poll) => `${poll.dueDate}`,
      },
      {
          name: 'votes',
          header: 'Votes',
          cell: (poll: Poll) => `${poll.votes}`,
      },
      {
        name: 'actions',
        header: 'Actions',
        cell: () => '',
      },
    ]
    displayedColumns = this.columns.map(c => c.name);
    clickedRows = new Set<Poll>();
    status = new FormControl('All');

    constructor(
      private surveyService: SurveyService,
      public dialog: MatDialog,
      private notificationService: NotificationService
    ) {}

  ngOnInit(): void {
    this.surveyService.getSurveys()
    .subscribe((res: any) => {
      res.data.list.forEach((element: any) => {
        this.surveyService.getVotes(element.id)
        .subscribe((res: any)=> {
          this.polls.push({ id: element.id, question: element.question, 
          dueDate: new Date(element.dueDate).toLocaleDateString(), votes: res.data.count});
          this.dataSource = new MatTableDataSource(this.polls);
        });
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  changed(status: FormControl) {
    const statusValue = status.value;
    this.dataSource.filter = statusValue;
  }

  refresh() {
    this.polls = []
    this.surveyService.getSurveys()
    .subscribe((res: any) => {
      res.data.list.forEach((element: any) => {
        this.surveyService.getVotes(element.id)
        .subscribe((res: any)=> {
          this.polls.push({ id: element.id, question: element.question, 
            dueDate: new Date(element.dueDate).toLocaleDateString(), votes: res.data.count});
          this.dataSource = new MatTableDataSource(this.polls);
        });
      });
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddPollComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.waitRefresh()
    })
  }

  openEditDialog(): void {
      const dialogRef = this.dialog.open(EditPollComponent, {
          height: '500px',
          data: { selectedId: this.selectedId }
      });
      dialogRef.afterClosed().subscribe(() => {
        this.waitRefresh()
      })
  }

  deletePoll(id: any) {
    this.surveyService.deleteSurvey(id)
    .subscribe(() => {
      this.notificationService.showSuccess('Poll deleted successfully');
    })
  }

  waitRefresh() {
    setTimeout(() => {
      this.refresh();
   }, 1000);
  }
    
}