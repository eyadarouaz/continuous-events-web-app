import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { AuthService } from "./../../../core/services/auth.service";

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['../login/login.component.css']
  })
  export class ForgotPasswordComponent {
  
    constructor(private authService: AuthService,) {}
  
    emailAddress = new FormControl('', [Validators.email]);
  
    sendLink(){
      const email  = this.emailAddress.getRawValue();
      if(email){
        return this.authService.forgotPassword(email);
      }
    }
  
    getErrorMessage() {
      return this.emailAddress.hasError('email') ? 'Email not valid' : '';
    }
  }