import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../core/services/auth.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService, public dialog: MatDialog) {}


  login(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }
    const {login, password} = loginForm.value;
    this.authService.login(login, password);
    return loginForm.reset();
  }

  openDialog() {
    this.dialog.open(ForgotPasswordComponent);
  }

}
