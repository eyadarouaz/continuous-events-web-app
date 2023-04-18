import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

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
