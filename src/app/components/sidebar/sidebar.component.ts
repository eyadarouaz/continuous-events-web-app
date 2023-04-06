import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'sidebar-cmp',
    templateUrl: './sidebar.component.html',
    styleUrls: []
  })
  export class SidebarComponent implements OnInit{
    constructor(private userService: UserService) {
    }

    firstName = '';
    lastName = '';
    role= '';

    ngOnInit() {
      return this.userService.getProfile()
        .subscribe((res:any)=> {
          if(res.statusCode){
            this.firstName = res.data.firstName;
            this.lastName = res.data.lastName;
            this.role = res.data.role;
          }
      });
    }
    


  }