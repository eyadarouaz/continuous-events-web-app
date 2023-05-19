import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
    providedIn: 'root'
  })
  export class AdminGuard implements CanActivate {
  
  
    constructor(private router: Router, private authService: AuthService) {
    }
    canActivate(): boolean {

        if(this.authService.userRole !=='Admin'){
            console.log(this.authService.userRole)
          this.router.navigateByUrl('/page-not-found').then();
          return false;
        }
        return true;
      }
    
    }
  