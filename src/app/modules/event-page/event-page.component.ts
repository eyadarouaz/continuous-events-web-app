import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventService } from './../../core/services/event.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css'],
})
export class EventPageComponent implements OnInit {
  
  editPhotoForm!: FormGroup;
  role: string | null = '';
  id = '';
  attendees: Array<any> = [];
  attendeesNumber = 0;
  title = '';
  description = ''
  start = '';
  end = '';
  topDate = '';
  location = '';
  status = '';
  image = 'assets/images/default-event.jpg';
  memberImage = 'assets/images/default_profile_image.webp'
  registered = false;
  
  constructor(
    private eventService: EventService,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder){ 
      this.eventService.updateStatus(); 
  }

  ngOnInit(): void {
    this.eventService.getEventById(this.route.snapshot.paramMap.get('id'))
    .subscribe(
      (res:any)=> {
        this.id = res.data.id;
        this.title = res.data.title;
        this.description = res.data.description;
        this.start = new Date(res.data.startDate).toDateString();
        this.end = new Date(res.data.endDate).toDateString();
        this.location = res.data.location;
        this.status = res.data.status;
        if(res.data.image) this.image = `http://localhost:3000/event/${this.id}/image`;

        this.eventService.getAttendees(this.id)
        .subscribe((res: any)=> {
            this.attendees = res.data.list;
            this.attendeesNumber = this.attendees.length-3
        });

        const splitDate = this.start.split(' ');
        this.topDate = splitDate[0] +' '+ splitDate[2];
        console.log(this.topDate);
      }
    );

    this.editPhotoForm = this.formBuilder.group({image: ['']});
    this.role = localStorage.getItem('role');
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.editPhotoForm.get('image')?.setValue(file);
    }
  }

  submitPhoto() {
    const formData = new FormData();
    formData.append('image', this.editPhotoForm.get('image')?.value);
    console.log(this.id)
    this.eventService.uploadPhoto(this.id, formData);
  }

  register() {
    this.eventService.registerEvent(this.route.snapshot.paramMap.get('id'));
  }
    
}