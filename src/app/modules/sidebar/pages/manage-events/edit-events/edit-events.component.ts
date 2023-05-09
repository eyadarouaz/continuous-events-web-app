import { Component, Inject, OnInit } from "@angular/core";
import { UserService } from "src/app/core/services/user.service";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormControl, FormGroup, NgForm } from "@angular/forms";
import { ManageEventsComponent } from "../manage-events.component";
import { EventService } from "src/app/core/services/event.service";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: 'edit-event-cmp',
    templateUrl: './edit-events.component.html',
  })
  export class EditEventComponent implements OnInit{
    constructor(private userService: UserService, private eventService: EventService,
      @Inject(MAT_DIALOG_DATA) public data: ManageEventsComponent,
      public toast: ToastrService,) {}

      editEventForm = new FormGroup({
        title: new FormControl(),
        description: new FormControl(),
        startDate: new FormControl(),
        endDate: new FormControl(),
        location: new FormControl(),
      });
      status = '';
      

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
  
    get id() {
      return this.data.selectedId
    }

    onSubmit(editEventForm: FormGroup) {
      const data = editEventForm.value;
      return this.eventService.updateEvent(this.id, data)
        .subscribe((res: any) => {
          this.toast.success('Event updated successfully')
        })
    }
  }