import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { UserService } from "src/app/services/user.service";

export interface Menu {
  id: any;
  icon: string;
  name: string;
  route: string;
  active: boolean;
}

@Component({
    selector: 'sidebar-cmp',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
  })
export class SidebarComponent implements OnInit{

  menus: Menu[] = [
    {
      id: 1,
      icon: "list",
      name: "Activity Stream",
      route: "/home",
      active: false,
    },
    {
      id: 2,
      icon: "dashboard",
      name: "Dashboard",
      route: '/home/dashboard',
      active: true,
    },
    {
      id: 3,
      icon: "bookmark",
      name: "Estatisticas",
      route: '/home',
      active: false,
    },
  ];

  constructor(private userService: UserService) {
  }
  public toggled = false;

  @Output()
  public onToggle: EventEmitter<boolean> = new EventEmitter();

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

  toggle() {
    this.toggled = !this.toggled;
    this.onToggle.emit(this.toggled)
  }

  activate(id: any): void {
    this.menus = this.menus.map(menu => {

      if (menu.id === id) {
        menu.active = !menu.active;
      } else {
        menu.active = false;
      }
      return menu;
    })
  }

}