import { Component, OnInit } from "@angular/core";
import { FormControl } from '@angular/forms';
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { NotificationService } from "../../../../core/services/notification.service";
import { Events } from '../../../../core/models/event.interface';
import { EventService } from './../../../../core/services/event.service';
import { AddEventComponent } from './add-events/add-events.component';
import { EditEventComponent } from './edit-events/edit-events.component';


@Component({
  selector: 'app-manage-events',
  templateUrl: './manage-events.component.html',
  styleUrls: ['./manage-events.component.css']
})
export class ManageEventsComponent implements OnInit {

  events: Events[] = [];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
  };
  selectedId = 0;
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
  evs: object[] = [];

  constructor(
    private eventService: EventService,
    public dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.eventService.getEvents()
    .subscribe((res: any) => {
      res.data.list.forEach((element: any) => {
        this.eventService.getAttendees(element.id)
        .subscribe((res: any)=> {
          this.events.push({ id: element.id, title: element.title,
          startDate: new Date(element.startDate).toLocaleDateString(), 
          endDate: new Date(element.endDate).toLocaleDateString(),  
          location: element.location, status: element.status,attendees: res.data.count});
          this.dataSource = new MatTableDataSource(this.events);
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
    this.events = []
    this.eventService.getEvents()
    .subscribe((res: any) => {
      res.data.list.forEach((element: any) => {
        this.eventService.getAttendees(element.id)
        .subscribe((res: any)=> {
          this.events.push({ id: element.id, title: element.title,
          startDate: new Date(element.startDate).toLocaleDateString(), 
          endDate: new Date(element.endDate).toLocaleDateString(), 
          location: element.location, status: element.status,attendees: res.data.count});
          this.dataSource = new MatTableDataSource(this.events);
        });
      });
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddEventComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.waitRefresh()
    })
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditEventComponent, {
      height: '500px',
      data: { selectedId: this.selectedId }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.waitRefresh()
    })
  }

  deleteEvent(id: any) {
    this.eventService.deleteEvent(id)
    .subscribe(() => {
      this.notificationService.showSuccess('Event deleted successfully');
    })
  }

  waitRefresh() {
    setTimeout(() => {
      this.refresh();
   }, 1000);
  }
    
}