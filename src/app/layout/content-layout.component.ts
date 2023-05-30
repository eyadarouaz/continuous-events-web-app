import { Component, OnDestroy } from "@angular/core";
import { Socket, SocketIoConfig } from "ngx-socket-io";
import { environment as env } from "src/environment";
import { AuthService } from "./../core/services/auth.service";

@Component({
    selector: 'app-content-layout',
    templateUrl: './content-layout.component.html',
    styleUrls: []
  })
export class ContentLayoutComponent implements OnDestroy{

  config: SocketIoConfig = { url: env.apiBaseUrl, options: {
    query: {
      token: localStorage.getItem('token')
    }
  } };

  socket: any

  constructor(private authService: AuthService) {
    this.socket = new Socket(this.config)
  }

  ngOnDestroy(): void {
    this.socket.disconnect()
  }

  logout() {
    this.authService.logout();
  }
    
}