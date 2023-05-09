import { EventService } from './../../../../core/services/event.service';
import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { Events } from '../../../../core/models/event.interface';
import { FormControl } from '@angular/forms';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AddEventComponent } from './add-events/add-events.component';
import { EditEventComponent } from './edit-events/edit-events.component';
import { ToastrService } from 'ngx-toastr';
import { C } from '@fullcalendar/core/internal-common';


  @Component({
    selector: 'app-manage-events',
    templateUrl: './manage-events.component.html',
    styleUrls: ['./manage-events.component.css']
  })
  export class ManageEventsComponent implements OnInit {
    constructor(private eventService: EventService,
      public dialog: MatDialog,
      public toast: ToastrService,) {
        this.eventService.updateStatus();
      }

  events: Events[] = [];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
  };
  selectedId: number = 0;
  dataSource = new MatTableDataSource(this.events);
  columns = [
    {
      name: 'id',
      header: 'ID',
      cell: (event: Events) => `${event.id}`
    },
    {
      name: 'event',
      header: 'Event',
      cell: (event: Events) => `${event.title}`,
    },
    {
      name: 'start',
      header: 'Event Start',
      cell: (event: Events) => `${event.startDate}`,
    },
    {
      name: 'end',
      header: 'Event End',
      cell: (event: Events) => `${event.endDate}`,
    },
    {
        name: 'location',
        header: 'Location',
        cell: (event: Events) => `${event.location}`,
    },
    {
        name: 'attendees',
        header: 'Attendees',
        cell: (event: Events) => `${event.attendees}`,
    },
    {
        name: 'status',
        header: 'Status',
        cell: (event: Events) => `${event.status}`,
    },
    {
      name: 'actions',
      header: 'Actions',
      cell: () => '',
    },
  ]
  displayedColumns = this.columns.map(c => c.name);
  clickedRows = new Set<Events>();
  status = new FormControl('All');
  evs: Object[] = [];

  ngOnInit(): void {
    this.eventService.getEvents()
      .subscribe((res: any) => {
        if (res.statusCode) {
            res.data.list.forEach((element: any) => {
                this.eventService.getAttendees(element.id)
                .subscribe((res: any)=> {
                    if(res.statusCode) {
                        this.events.push({ id: element.id, title: element.title,
                            startDate: element.startDate, endDate: element.endDate, 
                            location: element.location, status: element.status,attendees: res.data.count});
                      }
                    this.dataSource = new MatTableDataSource(this.events);
                });
                this.evs.push({title: element.title, start: element.startDate, end: element.endDate}); 
                
                setTimeout(() => {
                  this.calendarOptions = {
                    initialView: 'dayGridMonth',
                    firstDay: 1,
                    events: this.evs,
                    weekends: true,
                    editable: true,
                    selectable: true,
                    selectMirror: true,
                    dayMaxEvents: true
                  };
                }, 2500);
            });
        }
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
    this.eventService.getEvents().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.data.list);
    })
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddEventComponent);
  }

  openEditDialog(): void {
      const dialogRef = this.dialog.open(EditEventComponent, {
          height: '500px',
          data: { selectedId: this.selectedId }
      });
  }

  deleteEvent(id: any) {
    this.eventService.deleteEvent(id)
    .subscribe((res: any) => {
      this.toast.success('Event deleted successfully');
    })
  }
    
}