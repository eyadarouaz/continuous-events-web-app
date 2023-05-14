import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UserService } from "../../../../../core/services/user.service";

@Component({
    selector: 'app-add-member',
    templateUrl: './add-member.component.html',
  })
  export class AddMemberComponent {
  
    selectedRole = 'User';

    constructor(private userService: UserService) { }
  
    confirmPassword(addUserForm: NgForm) {
      const { password, confirm_password } = addUserForm.value;
      if (password == confirm_password) {
        return true
      } return false
    }
  
    save(addUserForm: NgForm) {
      if (this.confirmPassword(addUserForm)) {
        const { username, email, password } = addUserForm.value;
        const role = this.selectedRole
        console.log({ username, email, password, role });
        return this.userService.addUser({ username, email, role, password })
          .subscribe(() => {
            // notify
          })
      } return
    }
  
  }