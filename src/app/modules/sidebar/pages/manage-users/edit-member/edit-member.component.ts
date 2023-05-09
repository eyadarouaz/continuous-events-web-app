import { Component, Inject, OnInit } from "@angular/core";
import { UserService } from "../../../../../core/services/user.service";
import { ManageMembersComponent } from "../manage-members.component";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: 'edit-member-cmp',
    templateUrl: './edit-member.html',
  })
  export class EditMemberComponent {
    constructor(private userService: UserService,
      @Inject(MAT_DIALOG_DATA) public data: ManageMembersComponent,
      public toast: ToastrService,) { }


    editUserForm = new FormGroup({
      username: new FormControl(this.users.find(element => element.id == this.id)?.username),
      password: new FormControl(),
      confirm_password : new FormControl(),
    })

    confirmPassword(editUserForm: FormGroup) {
      const { password, confirm_password } = editUserForm.value;
      if (password == confirm_password) {
        return true
      } return false
    }
  
    get id() {
      return this.data.selectedId
    }

    get users() {
      return this.data.users
    }
  
    onSubmit(editUserForm: FormGroup) {
      if (this.confirmPassword(editUserForm)) {
        const { username, password } = editUserForm.value;
        console.log({ username, password });
        return this.userService.updateUser(this.id, { username, password })
          .subscribe((res: any) => {
            this.toast.success('User updated successfully')
          })
      } return
    }
  }