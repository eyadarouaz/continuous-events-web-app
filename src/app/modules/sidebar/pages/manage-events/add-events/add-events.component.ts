import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { EventService } from "src/app/core/services/event.service";

@Component({
    selector: 'app-add-event',
    templateUrl: './add-events.component.html',
    styleUrls: ['./add-events.component.css']
  })
  export class AddEventComponent implements OnInit{

    today = this.formatDate(new Date());
    notSelected = false;
    minStartDate = ''
    minEndDate = ''
    myModel = ''

    addEventForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
    });
  
    constructor(
      private eventService:EventService,
      public toast: ToastrService
    ) {}
  
    ngOnInit(): void {
      const today = new Date();
      document.getElementById('start')?.setAttribute("min", this.formatDate(today));
      document.getElementById('end')?.setAttribute("min", this.formatDate(today));
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
          '12',
          '00',
          '00'
        ].join(':')
      );
    }

  
    onSubmit (form: FormGroup) {
      const start: Date = new Date(form.value.startDate);
      const end: Date = new Date(form.value.endDate)
      const data = {title: form.value.title, description: form.value.description, 
        startDate: start, endDate: end, location : form.value.location}
      return this.eventService.addEvent(data)
      .subscribe(() => {
        this.toast.success('Event added successfully');
      }
      )
    }

    onStartChange() {
      // console.log(searchValue)
    }

    valuechange(newValue: any) {
      document.getElementById('end')?.setAttribute("min", newValue);

    }
  
  }