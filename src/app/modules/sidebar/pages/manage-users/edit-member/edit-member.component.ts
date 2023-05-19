import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NotificationService } from "../../../../../core/services/notification.service";
import { UserService } from "../../../../../core/services/user.service";
import { ManageMembersComponent } from "../manage-members.component";

@Component({
    selector: 'app-edit-member',
    templateUrl: './edit-member.html',
  })
  export class EditMemberComponent {

    editUserForm = new FormGroup({
      username: new FormControl(this.users.find(element => element.id == this.id)?.username),
      password: new FormControl(),
      confirm_password : new FormControl(),
    })

    get id() {
      return this.data.selectedId
    }

    get users() {
      return this.data.users
    }

    constructor(
      private userService: UserService,
      @Inject(MAT_DIALOG_DATA) public data: ManageMembersComponent,
      private notificationService: NotificationService
    ) {}

    confirmPassword(editUserForm: FormGroup) {
      const { password, confirm_password } = editUserForm.value;
      if (password == confirm_password) {
        return true
      } return false
    }
  
    onSubmit(editUserForm: FormGroup) {
      if (this.confirmPassword(editUserForm)) {
        const { username, password } = editUserForm.value;
        console.log({ username, password });
        return this.userService.updateUser(this.id, { username, password })
          .subscribe(() => {
            this.notificationService.showSuccess('Member updated successfully')
          })
      } return
    }
  }