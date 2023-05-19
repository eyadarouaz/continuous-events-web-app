import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { EventService } from "../../../../../core/services/event.service";
import { NotificationService } from "../../../../../core/services/notification.service";
import { ManageEventsComponent } from "../manage-events.component";

@Component({
    selector: 'app-edit-event',
    templateUrl: './edit-events.component.html',
  })
  export class EditEventComponent implements OnInit{

    editEventForm = new FormGroup({
      title: new FormControl(),
      description: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      location: new FormControl(),
    });
    status = '';

    get id() {
      return this.data.selectedId
    }

    constructor(
      private eventService: EventService,
      @Inject(MAT_DIALOG_DATA) public data: ManageEventsComponent,
      private notificationService: NotificationService
    ) {}

    ngOnInit(): void {
      this.eventService.getEventById(this.id)
      .subscribe((res: any) => {
        this.status = res.data.status;
        this.editEventForm.setControl('title', new FormControl(res.data.title));
        this.editEventForm.setControl('description', new FormControl(res.data.description));
        this.editEventForm.setControl('startDate', new FormControl(res.data.startDate.replace('Z', '')));
        this.editEventForm.setControl('endDate', new FormControl(res.data.endDate.replace('Z', '')));
        this.editEventForm.setControl('location', new FormControl(res.data.location));
      })
      const today = this.formatDate(new Date())
      document.getElementById('start')?.setAttribute("min", today);
      document.getElementById('end')?.setAttribute("min", today);
    }

    padTo2Digits(num: number) {
      return num.toString().padStart(2, '0');
    }

    formatDate(date: Date) {
      return (
        [
          date.getFullYear(),
          this.padTo2Digits(date.getMonth() + 1),
          this.padTo2Digits(date.getDate()),
        ].join('-') +
        'T' +
        [
          this.padTo2Digits(date.getHours()),
          this.padTo2Digits(date.getMinutes()),
          this.padTo2Digits(date.getSeconds()),
        ].join(':')
      );
    }
  
    getError(control: string) {
      return this.editEventForm.get(control)?.hasError('required');
    }

    onSubmit(editEventForm: FormGroup) {
      const data = editEventForm.value;
      return this.eventService.updateEvent(this.id, data)
        .subscribe(() => {
          this.notificationService.showSuccess('Event updated successfully')
        })
    }
  }