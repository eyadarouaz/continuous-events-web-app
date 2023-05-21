import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../core/services/auth.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService, public dialog: MatDialog, public translate: TranslateService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    translate.use(localStorage.getItem('lang')+"");
  }

  login(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }
    const {login, password} = loginForm.value;
    this.authService.login(login, password);
  }

  openDialog() {
    this.dialog.open(ForgotPasswordComponent);
  }

  changeLanguage(value: any) {
    localStorage.setItem('lang', value)
  }

  getCurrentLanguage(lang: string) {
    return localStorage.getItem('lang') === lang;
  }

}
