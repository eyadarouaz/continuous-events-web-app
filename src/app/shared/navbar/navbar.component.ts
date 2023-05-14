import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/services/auth.service";
import { UserService } from "src/app/core/services/user.service";

@Component({
    selector: 'app-nav',
    templateUrl: './navbar.component.html',
    styleUrls: []
  })
  export class NavbarComponent {

    id = ''
    image='assets/images/default_profile_image.webp'

    constructor(
      private authService: AuthService,
      private userService: UserService,
      private router: Router,) {
      this.userService.getProfile()
      .subscribe((res:any)=> {
        this.id = res.data.id;
        if(res.data.profileImage)
          this.image = `http://localhost:3000/user/${this.id}/profile-photo` 
      });
    }

    profile() {
      this.router.navigateByUrl('/profile')
    }

    logout() {
      this.authService.logout();
    }
  }