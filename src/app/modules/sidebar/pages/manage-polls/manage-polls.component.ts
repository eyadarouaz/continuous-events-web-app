import { Poll } from './../../../../core/models/poll.interface';
import { SurveyService } from './../../../../core/services/survey.service';
import { EventService } from './../../../../core/services/event.service';
import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { Events } from '../../../../core/models/event.interface';
import { FormControl } from '@angular/forms';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

import { ToastrService } from 'ngx-toastr';
import { AddPollComponent } from './add-poll/add-poll.component';
import { EditPollComponent } from './edit-poll/edit-poll.component';


  @Component({
    selector: 'app-manage-polls',
    templateUrl: './manage-polls.component.html',
    styleUrls: []
  })
  export class ManagePollsComponent implements OnInit {
    constructor(private surveyService: SurveyService,
      public dialog: MatDialog,
      public toast: ToastrService,) {}

  polls: Poll[] = [];
  selectedId: number = 0;
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

  ngOnInit(): void {
    this.surveyService.getSurveys()
      .subscribe((res: any) => {
        if (res.statusCode) {
            res.data.list.forEach((element: any) => {
                this.surveyService.getVotes(element.id)
                .subscribe((res: any)=> {
                    if(res.statusCode) {
                        this.polls.push({ id: element.id, question: element.question, 
                            dueDate: element.dueDate, votes: res.data.count});
                      }
                    this.dataSource = new MatTableDataSource(this.polls);
                });
            });
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  changed(status: FormControl) {
    let statusValue = status.value;
    this.dataSource.filter = statusValue;
  }

  refresh() {
    this.polls = []
    this.surveyService.getSurveys()
    .subscribe((res: any) => {
      if (res.statusCode) {
        res.data.list.forEach((element: any) => {
            this.surveyService.getVotes(element.id)
            .subscribe((res: any)=> {
                if(res.statusCode) {
                    this.polls.push({ id: element.id, question: element.question, 
                        dueDate: element.dueDate, votes: res.data.count});
                  }
                this.dataSource = new MatTableDataSource(this.polls);
            });
        });
      }
      console.log('refreshed')
    })
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
    .subscribe((res: any) => {
      this.toast.success('Poll deleted successfully');
    })
  }

  waitRefresh() {
    setTimeout(() => {
      this.refresh();
   }, 1000);
  }
    
}