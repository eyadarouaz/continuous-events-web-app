import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, 
    private router: Router,
    public dialog: MatDialog) {}

  ngOnInit() {
    
  }

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

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./login.component.css']
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
