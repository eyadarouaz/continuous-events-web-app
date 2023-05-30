import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { AuthService } from "./../../../core/services/auth.service";
import { NotificationService } from "./../../../core/services/notification.service";

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['../login/login.component.css']
  })
  export class ForgotPasswordComponent {
  
    constructor(private authService: AuthService, private notificationService: NotificationService) {}
  
    emailAddress = new FormControl('', [Validators.email]);
  
    sendLink(){
      const email  = this.emailAddress.getRawValue();
      if(email){
        this.authService.forgotPassword(email)
        .subscribe({next: (res: any) => {
          this.notificationService.showSuccess('Email sent')
          localStorage.setItem('reset_token', res.data.token);
          localStorage.setItem('reset_code', res.data.verif_code);
          localStorage.setItem('email', email); 
        }, error: () => this.notificationService.showError('Account not found')})
      }
    }
  
    getErrorMessage() {
      return this.emailAddress.hasError('email') ? 'Email not valid' : '';
    }
  }