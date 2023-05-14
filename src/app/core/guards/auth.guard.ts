import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {
  
  
    constructor(private router: Router, private authService: AuthService) {
    }
    canActivate(): boolean {

        if(!this.authService.userToken){
          this.router.navigateByUrl('/login').then();
          return false;
        }else {
          return true;
        }
      }
    
    }
  