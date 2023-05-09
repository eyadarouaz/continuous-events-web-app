import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from "../../../../core/services/auth.service";
import { UserService } from "./../../../../core/services/user.service";

@Component({
    selector: 'profile-cmp',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
  })
  export class ProfileComponent {

    constructor(private userService: UserService,
      private authService: AuthService,
      public dialog: MatDialog,
      public toast: ToastrService,
      private formBuilder: FormBuilder) {
        const token = this.authService.userToken;
        if(token){
          this.userService.getProfile()
          .subscribe((res:any)=> {
            if(res.statusCode){
              this.id = res.data.id;
              this.username = res.data.username;
              this.firstName = res.data.firstName;
              this.lastName = res.data.lastName;
              this.editInfoForm.setControl('username', new FormControl(res.data.username));
              this.editInfoForm.setControl('firstName', new FormControl(res.data.firstName));
              this.editInfoForm.setControl('lastName', new FormControl(res.data.lastName));
              const birthday = new Date(res.data.birthday);
              this.editInfoForm.setControl('birthday', new FormControl(birthday.getFullYear()+'-'+('0'+(birthday.getMonth()+1)).slice(-2)+'-'+ ('0'+birthday.getDate()).slice(-2)));
              this.editInfoForm.setControl('email', new FormControl(res.data.email));
              this.editInfoForm.setControl('mobile', new FormControl(res.data.mobile));
              if(res.data.image!='')
                this.image = `http://localhost:3000/user/${this.id}/profile-photo`
            }
        });
        this.editPhotoForm = this.formBuilder.group({image: ['']});
        }
      }
    
    
    id = '';
    username = ''
    firstName = '';
    lastName = '';
    role = '';
    image='assets/images/default_profile_image.webp';

    editPhotoForm!: FormGroup;

    editInfoForm = new FormGroup({
      username: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      birthday: new FormControl(),
      mobile: new FormControl(),
    });

    editPwdForm = new FormGroup({
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
    });

    updateProfile(form: FormGroup) {
      const bday: Date = new Date(form.value.birthday);
      const data = {username: form.value.username, email: form.value.email, 
        firstName: form.value.firstName, lastName: form.value.lastName, mobile: form.value.mobile?.toString(),
        birthday: bday}
      return this.userService.updateProfile(data) 
      .subscribe((res:any) => {
        this.toast.success('Profile updated successfully');
      },
      // (err: any) => {
      //   this.toast.error('Profile was not updated');
      // }
      )
    }

    changePassword(form: FormGroup) {
      return this.userService.changePassword(form.value.currentPassword, form.value.newPassword)
      .subscribe((res: any) => {
          this.toast.success('Password changed successfully');
          form.reset()
        },
        (err: any) => {
          this.toast.error('Incorrect password');
          form.reset()
        }
      )
      
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
  
      this.userService.updatePhoto(formData).subscribe(
        (req) => console.log(req),
        (err) => console.log(err)
      );
    }

    // openDialog() {
    //   const dialogRef = this.dialog.open(EditProfileComponent, {
    //     data: {}
    //   });
    // }


  
  }