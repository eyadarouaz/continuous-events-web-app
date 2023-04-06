import { UserService } from './../../services/user.service';
import { Component, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: 'profile-cmp',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
  })
  export class ProfileComponent implements OnInit {
    constructor(private userService: UserService,
      private authService: AuthService,
      public dialog: MatDialog) {}
    
    token = this.authService.userToken;
    firstName = '';
    email= '';
    lastName = '';
    birthday = '';
    mobile = '';
    role = '';

    ngOnInit() {
      if(this.token){
        return this.userService.getProfile()
        .subscribe((res:any)=> {
          if(res.statusCode){
            this.firstName = res.data.firstName;
            this.lastName = res.data.lastName;
            this.birthday = res.data.birthday;
            this.mobile = res.data.mobile;
            this.email = res.data.email;
            this.role = res.data.role;
          }
      });
      }
      return null 
    }

    get first() {
      return this.firstName
    }

    openDialog() {
      this.dialog.open(EditProfileComponent);
    }
  
  }
  
  
@Component({
  selector: 'edit-profile-cmp',
  templateUrl: './edit-profile.component.html',
  styleUrls: []
})
export class EditProfileComponent {

  constructor(private userService: UserService,
    public dialog: MatDialog,
    private toast: ToastrService) {}

  save(editForm: NgForm) {
    const {firstName, lastName, mobile, birthday} = editForm.value;
    const {currentPassword, newPassword} = editForm.value;
    const birth = new Date(birthday);
    const mob: number = +mobile;
    console.log({firstName, lastName, mob, birth});
    console.log({currentPassword, newPassword});
    this.dialog.closeAll();
    return this.userService.updateProfile({mobile})
    .subscribe((res:any)=>{
      if(res.statusCode){
        this.toast.success('Profile updated successfully')
      }
    })
    

    
  }

}