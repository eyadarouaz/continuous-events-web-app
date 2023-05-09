import { Component, OnInit} from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/services/auth.service";


@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: []
  })
export class ResetPasswordComponent implements OnInit{
  public verifCode: string|null = ''
  public token: string|null = ''
    constructor(private authService: AuthService,
      private router: Router) {} 

   email = localStorage.getItem('email');
   newPass = new FormControl('', [Validators.required, Validators.minLength(7)]);
   confirmPass = new FormControl('', [Validators.required]);

    ngOnInit() {
      this.verifCode = localStorage.getItem('reset_code');
      this.token = localStorage.getItem('reset_token');
      this.router.navigate(
        ['/reset-password'],
        { queryParams: { verifycode: this.verifCode, token: this.token } });
    }

    reset(){
      const newPass  = this.newPass.getRawValue();
      const confirmPass  = this.confirmPass.getRawValue();
      if (newPass === confirmPass) {
        return this.authService.resetPassword(newPass, this.verifCode, this.token);
      }
    }

    getErrorMessage() {
      return this.newPass.getRawValue.length < 7 ? 'Password must contain at least 7 characters.': '';
    }

}