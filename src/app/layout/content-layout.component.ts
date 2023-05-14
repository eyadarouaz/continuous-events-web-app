import { Component } from "@angular/core";
import { AuthService } from "./../core/services/auth.service";

@Component({
    selector: 'app-content-layout',
    templateUrl: './content-layout.component.html',
    styleUrls: []
  })
export class ContentLayoutComponent {

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
    
}