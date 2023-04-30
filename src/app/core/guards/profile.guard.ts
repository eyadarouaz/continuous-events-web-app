import { UserService } from 'src/app/core/services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class ProfileGuard implements CanActivate {
    isValid = false
    constructor(private router: Router, private userService: UserService) {}
    canActivate(
      next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return new Observable<boolean>(obs => {
            this.userService.getByUsername(next.paramMap.get('username'))
            .subscribe((res: any)=> {
                if(res.statusCode) {
                    if(res.data.username) {
                        obs.next(true)
                    } else {this.router.navigateByUrl('/page-not-found').then()}
                } else {
                    obs.next(false);
                    this.router.navigateByUrl('/page-not-found').then()
                }
            })
        })
    }
}
  