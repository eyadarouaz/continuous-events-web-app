import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.css']
})
export class MemberProfileComponent implements OnInit{

    id = '';
    username = ''
    firstName = '';
    email= '';
    lastName = '';
    birthday = '';
    mobile = '';
    role = '';
    image='assets/images/default_profile_image.webp'
    
    constructor(
        private userService: UserService,
        public dialog: MatDialog, 
        public route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.userService.getByUsername(this.route.snapshot.paramMap.get('username'))
        .subscribe((res:any)=> {
            this.id = res.data.id;
            this.username = res.data.username;
            this.firstName = res.data.firstName;
            this.lastName = res.data.lastName;
            const birthday = new Date(res.data.birthday);
            this.birthday = birthday.getFullYear()+'-'+('0'+birthday.getMonth()).slice(-2)+'-'+ ('0'+birthday.getDate()).slice(-2);
            this.mobile = res.data.mobile;
            this.email = res.data.email;
            this.role = res.data.role;
            if(res.data.profileImage)
            this.image = `http://localhost:3000/user/${this.id}/profile-photo`;
        });
    }
}
