import { Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/services/auth.service";
import { UserService } from "src/app/core/services/user.service";

@Component({
    selector: 'app-nav',
    templateUrl: './navbar.component.html',
    styleUrls: []
  })
  export class NavbarComponent {

    constructor(private authService: AuthService,
      private userService: UserService,
      private router: Router,) {
        const token = this.authService.userToken;
        if(token){
          this.userService.getProfile()
          .subscribe((res:any)=> {
            if(res.statusCode){
              this.id = res.data.id;
              if(res.data.image!='')
                this.image = `http://localhost:3000/user/${this.id}/profile-photo`
            }
        });
        
        }
      }
      id = ''
      image='assets/images/default_profile_image.webp'

    profile() {
      this.router.navigateByUrl('/profile')
    }

    logout() {
      this.authService.logout();
    }
  }