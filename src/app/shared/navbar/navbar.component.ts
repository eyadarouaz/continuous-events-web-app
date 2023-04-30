import { Component, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AuthService } from "src/app/core/services/auth.service";
import { UserService } from "src/app/core/services/user.service";
import { ProfileComponent } from "src/app/modules/sidebar/pages/profile/profile.component";

@Component({
    selector: 'nav-cmp',
    templateUrl: './navbar.component.html',
    styleUrls: []
  })
  export class NavbarComponent {

    constructor(private authService: AuthService,
      private userService: UserService,) {
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

    logout() {
      this.authService.logout();
    }
  }