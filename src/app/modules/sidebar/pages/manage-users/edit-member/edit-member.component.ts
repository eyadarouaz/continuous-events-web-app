import { Component, Inject } from "@angular/core";
import { UserService } from "src/app/core/services/user.service";
import { ManageMembersComponent } from "../manage-members.component";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NgForm } from "@angular/forms";

@Component({
    selector: 'edit-member-cmp',
    templateUrl: './edit-member.html',
  })
  export class EditMemberComponent {
    constructor(private userService: UserService,
      @Inject(MAT_DIALOG_DATA) public data: ManageMembersComponent,) { }
  
    confirmPassword(editUserForm: NgForm) {
      const { password, confirm_password } = editUserForm.value;
      if (password == confirm_password) {
        return true
      } return false
    }
  
    get id() {
      return this.data.selectedId
    }
  
    save(editUserForm: NgForm) {
      if (this.confirmPassword(editUserForm)) {
        const { username, password } = editUserForm.value;
        console.log({ username, password });
        return this.userService.updateUser(this.id, { username, password })
          .subscribe((res: any) => {
            console.log('user updated');
          })
      } return
    }
  }