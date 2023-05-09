import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.css']
})
export class MemberProfileComponent {
    constructor(private userService: UserService,
    private authService: AuthService, public dialog: MatDialog, route: ActivatedRoute) {
        const token = this.authService.userToken;
        if(token){
            this.userService.getByUsername(route.snapshot.paramMap.get('username'))
            .subscribe((res:any)=> {
            if(res.statusCode){
                this.id = res.data.id;
                this.username = res.data.username;
                this.firstName = res.data.firstName;
                this.lastName = res.data.lastName;
                const birthday = new Date(res.data.birthday);
                this.birthday = birthday.getFullYear()+'-'+('0'+birthday.getMonth()).slice(-2)+'-'+ ('0'+birthday.getDate()).slice(-2)
                console.log(this.birthday)
                this.mobile = res.data.mobile;
                this.email = res.data.email;
                this.role = res.data.role;
                if(res.data.profileImage)
                this.image = `http://localhost:3000/user/${this.id}/profile-photo`
            }
        });
        }
    }
    
    
    id = '';
    username = ''
    firstName = '';
    email= '';
    lastName = '';
    birthday = '';
    mobile = '';
    role = '';
    image='assets/images/default_profile_image.webp'

    ngOnInit() {
        return null 
    }
}
