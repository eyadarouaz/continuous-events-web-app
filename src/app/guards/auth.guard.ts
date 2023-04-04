import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {
  
  
    constructor(private router: Router, private authService: AuthService) {
    }
    canActivate(
      next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if(!this.authService.userToken){
          this.router.navigateByUrl('/login').then();
          return false;
        }
        return true;
      }
    
    }
  