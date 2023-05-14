import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';

@Injectable({
    providedIn: 'root'
  })
  export class ProfileGuard implements CanActivate {
    isValid = false
    constructor(private router: Router, private userService: UserService) {}
    canActivate(
      next: ActivatedRouteSnapshot): Observable<boolean> {
        return new Observable<boolean>(obs => {
            this.userService.getByUsername(next.paramMap.get('username'))
            .subscribe((res: any)=> {
                if(res.data.username) {
                    obs.next(true)
                } else {
                    this.router.navigateByUrl('/page-not-found').then()
                }
            });
        })
    }
}
  