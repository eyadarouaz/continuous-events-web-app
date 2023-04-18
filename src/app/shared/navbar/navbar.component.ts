import { Component } from "@angular/core";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
    selector: 'nav-cmp',
    templateUrl: './navbar.component.html',
    styleUrls: []
  })
  export class NavbarComponent {

    constructor(private authService: AuthService) {}

    logout() {
      this.authService.logout();
    }
  }