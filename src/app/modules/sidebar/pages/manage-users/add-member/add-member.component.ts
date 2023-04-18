import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UserService } from "src/app/core/services/user.service";

@Component({
    selector: 'add-member-cmp',
    templateUrl: './add-member.component.html',
  })
  export class AddMemberComponent {
  
    constructor(private userService: UserService) { }
  
    selectedRole = 'User';
  
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
          .subscribe((res: any) => {
            console.log('user added');
          })
      } return
    }
  
  }