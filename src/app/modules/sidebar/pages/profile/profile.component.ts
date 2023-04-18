import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from "src/app/core/services/auth.service";
import { UserService } from "./../../../../core/services/user.service";

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
    username = ''
    firstName = '';
    email= '';
    lastName = '';
    birthday = '';
    mobile = '';
    role = '';
    image = '';

    ngOnInit() {
      if(this.token){
        return this.userService.getProfile()
        .subscribe((res:any)=> {
          if(res.statusCode){
            this.username = res.data.username;
            this.firstName = res.data.firstName;
            this.lastName = res.data.lastName;
            this.birthday = res.data.birthday;
            this.mobile = res.data.mobile;
            this.email = res.data.email;
            this.role = res.data.role;
          }
      }),this.userService.getProfilePicture()
      .subscribe((res: any)=> {
        if(res.statusCode){
          this.image= res.data.stream.path
        }
      })
      }
      return null 
    }

    // openDialog() {
    //   const dialogRef = this.dialog.open(EditProfileComponent, {
    //     data: {}
    //   });
    // }
  
  }
  
  
// @Component({
//   selector: 'edit-profile-cmp',
//   templateUrl: './edit-profile.component.html',
//   styleUrls: []
// })
// export class EditProfileComponent {

//   constructor(private userService: UserService,
//     public dialog: MatDialog,
//     private toast: ToastrService,
//     private formBuilder: FormBuilder) {}

//     editProfileForm!: FormGroup;

//   ngOnInit() {
//     this.editProfileForm = this.formBuilder.group({
//       image: ['']
//     });
//   }

//   onFileSelect(event: any) {
//     if (event.target.files.length > 0) {
//       const file = event.target.files[0];
//       this.editProfileForm.get('image')?.setValue(file);
//     }
//   }

//   onSubmit() {
//     const formData = new FormData();
//     formData.append('image', this.editProfileForm.get('image')?.value);

//     this.userService.updatePhoto(formData).subscribe(
//       (req) => console.log(req),
//       (err) => console.log(err)
//     );
//   }


//   // save(editForm: NgForm) {
//   //   const {firstName, lastName, mobile, birthday} = editForm.value;
//   //   const {currentPassword, newPassword} = editForm.value;
//   //   const birth = new Date(birthday);
//   //   const mob: number = +mobile;
//   //   console.log({firstName, lastName, mob, birth});
//   //   console.log({currentPassword, newPassword});
//   //   this.dialog.closeAll();
//   //   return this.userService.updatePhoto({mobile})
//   //   .subscribe((res:any)=>{
//   //     if(res.statusCode){
//   //       this.toast.success('Profile updated successfully')
//   //     }
//   //   })
//   // }

// }