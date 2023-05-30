import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../core/services/auth.service';
import { EventService } from './../../core/services/event.service';
import { NotificationService } from './../../core/services/notification.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css'],
})
export class EventPageComponent implements OnInit {
  
  currentUser = 0;
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
  isRegistered = false;
  clicked = false;
  
  constructor(
    private eventService: EventService,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService){ 
      this.eventService.updateStatus(); 
  }

  ngOnInit(): void {
    this.eventService.getEventById(this.route.snapshot.paramMap.get('id'))
    .subscribe(
      (res:any)=> {
        this.id = res.data.id;
        this.title = res.data.title;
        this.description = res.data.description;
        this.start = new Date(res.data.startDate).toDateString()+ ' at ' + new Date(res.data.startDate).getHours() + ':' +new Date(res.data.startDate).getMinutes()+(new Date(res.data.startDate).getMinutes()<10?'0':'');
        this.end = new Date(res.data.endDate).toDateString()+ ' at ' + new Date(res.data.endDate).getHours() + ':' +new Date(res.data.endDate).getMinutes()+(new Date(res.data.endDate).getMinutes()<10?'0':'');
        this.location = res.data.location;
        this.status = res.data.status;
        if(res.data.image) this.image = `http://localhost:3000/event/${this.id}/image`;

        this.eventService.getAttendees(this.id)
        .subscribe((res: any)=> {
          this.attendees = res.data.list;
          this.attendeesNumber = this.attendees.length-3;
          this.authService.currentUser(localStorage.getItem('token'))
          .subscribe((res: any) => {
            this.currentUser = res.data.user.id;
            if (this.attendees.some(element => element.user.id === this.currentUser)){
              this.isRegistered = true;
            }
          })
        });

        const splitDate = this.start.split(' ');
        this.topDate = splitDate[0] +' '+ splitDate[2];
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
    this.eventService.uploadPhoto(this.id, formData)
    .subscribe(res => console.log(res));
  }

  register() {
    this.clicked = true;
    this.eventService.registerEvent(this.route.snapshot.paramMap.get('id'))
    .subscribe(() => this.notificationService.showSuccess('Registered successfully'));
  }
}