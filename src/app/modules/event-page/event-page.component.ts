import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: [],
})
export class EventPageComponent implements OnInit{
    constructor(private eventService: EventService,
        private authService: AuthService, public route: ActivatedRoute,
        private formBuilder: FormBuilder) {
        this.eventService.updateStatus();
    }
  ngOnInit(): void {
    const token = this.authService.userToken;
        if(token){
            this.eventService.getEventById(this.route.snapshot.paramMap.get('id'))
            .subscribe((res:any)=> {
            if(res.statusCode){
                this.id = res.data.id;
                this.title = res.data.title;
                this.description = res.data.description;
                this.start = new Date(res.data.startDate).toDateString();
                this.end = new Date(res.data.endDate).toDateString();
                this.location = res.data.location;
                this.status = res.data.status;
                if(res.data.image)
                this.image = `http://localhost:3000/event/${this.id}/image`;
                this.eventService.getAttendees(this.id)
                .subscribe((res: any)=> {
                    this.attendees = res.data.list;
                    this.attendeesNumber = this.attendees.length-3
                })
            }
            });
            this.editPhotoForm = this.formBuilder.group({image: ['']});
        }
        this.role = localStorage.getItem('role');
  }

  editPhotoForm!: FormGroup;
  role: string | null = '';
  id = '';
  attendees: Array<any> = [];
  attendeesNumber = 0;
  title = '';
  description = ''
  start = '';
  end = '';
  location = '';
  status = '';
  image = 'assets/images/default-event.jpg';
  memberImage = 'assets/images/default_profile_image.webp'
  registered = false;

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
    this.eventService.uploadPhoto(this.id, formData).subscribe(
      (req) => console.log(req),
      (err) => console.log(err)
    );
  }

  register() {
    this.eventService.registerEvent(this.route.snapshot.paramMap.get('id'))
    .subscribe(res => console.log('registered'))
  }
    
}