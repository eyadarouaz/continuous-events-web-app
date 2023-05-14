import { NgModule } from '@angular/core';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SharedModule } from './../../../app/shared/shared.module';

@NgModule({
  declarations: [
    ForgotPasswordComponent,
    LoginComponent,
    ResetPasswordComponent
  ],
  imports: [
    SharedModule
  ],
})
export class AuthModule { }
