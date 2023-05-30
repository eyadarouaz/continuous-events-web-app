import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from "./../../core/services/auth.service";
import { UserService } from "./../../core/services/user.service";

@Component({
    selector: 'app-nav',
    templateUrl: './navbar.component.html',
    styles: ['.mat-button-toggle-checked {background-color: #4169E1;color: #ffff;font-weight: 600}']
  })
  export class NavbarComponent {

    id = ''
    image='assets/images/default_profile_image.webp'

    constructor(
      private authService: AuthService,
      private userService: UserService,
      private router: Router,
      public translate: TranslateService) {
      this.userService.getProfile()
      .subscribe((res:any)=> {
        this.id = res.data.id;
        if(res.data.profileImage)
          this.image = `http://localhost:3000/user/${this.id}/profile-photo` 
      });
      translate.addLangs(['en', 'fr']);
      translate.setDefaultLang('en');
      translate.use(localStorage.getItem('lang')? localStorage.getItem('lang')+"" : "en");
    }

    changeLanguage(value: any) {
      localStorage.setItem('lang', value)
      location.reload();
    }

    getCurrentLanguage(lang: string) {
      return localStorage.getItem('lang') === lang;
    }

    profile() {
      this.router.navigateByUrl('/profile')
    }

    logout() {
      this.authService.logout();
    }
  }