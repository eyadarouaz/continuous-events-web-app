import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NotificationService } from "../../../../../core/services/notification.service";
import { UserService } from "../../../../../core/services/user.service";

@Component({
    selector: 'app-add-member',
    templateUrl: './add-member.component.html',
  })
  export class AddMemberComponent {
  
    selectedRole = 'User';

    addMemberForm = new FormGroup({
      role: new FormControl('User', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.minLength(7)),
      confirmPassword: new FormControl(''),
    });

    constructor(
      private userService: UserService,
      private notificationService: NotificationService
    ) { }
  
    confirmPassword(addUserForm: FormGroup) {
      const password = addUserForm.value.password;
      const confirmPassword = addUserForm.value.confirmPassword;
      if (confirmPassword === "" || password == confirmPassword) {
        return true
      } return false
    }
  
    save(addUserForm: FormGroup) {
      if (this.confirmPassword(addUserForm)) {
        const data = {role: addUserForm.value.role, username: addUserForm.value.username,
        email: addUserForm.value.email, password: addUserForm.value.password};
        console.log(data)
        return this.userService.addUser(data)
          .subscribe(() => {
            this.notificationService.showSuccess('Member added successfully')
          })
      } return
    }

    getRequiredError(control: string) {
      return this.addMemberForm.get(control)?.hasError('required');
    }

    getEmailError() {
      return this.addMemberForm.get('email')?.hasError('email');
    }

    getLengthError() {
      return this.addMemberForm.get('password')?.hasError('minlength');
    }
  
  }