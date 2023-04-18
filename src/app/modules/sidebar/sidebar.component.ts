import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { UserService } from "src/app/core/services/user.service";
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Menu } from "./../../core/models/menu.interface";



@Component({
    selector: 'sidebar-cmp',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
    animations: [
      trigger('rotatedState', [
        state('default', style({ transform: 'rotate(0)' })),
        state('rotated', style({ transform: 'rotate(90deg)' })),
        transition('rotated => default', animate('400ms ease-out')),
        transition('default => rotated', animate('400ms ease-in'))
      ])
  ]
  })
export class SidebarComponent implements OnInit{

  active: string = 'dash'
  menus: Menu[] = [
    {
      id: 1,
      icon: "home",
      name: "Activity Stream",
      route: "/home",
      active: true,
      menus: []
    },
    {
      id: 2,
      icon: "account_circle",
      name: "Profile",
      route: "/home/profile",
      active: false,
      menus: []
    },
    {
      id: 3,
      icon: "event",
      name: "Events",
      route: '/home',
      active: false,
      menus: []
    },
    {
      id: 4,
      icon: "dashboard",
      name: "Dashboard",
      route: '',
      active: false,
      menus: [
        {
          id: 5,
          icon: '',
          name: 'Analytics',
          route: '/home/dashboard',
          active: false,
          menus: []
        },
        {
          id: 6,
          icon: '',
          name: 'Manage members',
          route: '/home/manage-members',
          active: false,
          menus: []
        },
        {
          id: 7,
          icon: '',
          name: 'Manage events',
          route: '/home',
          active: false,
          menus: []
        },
        {
          id: 8,
          icon: '',
          name: 'Manage polls',
          route: '/home',
          active: false,
          menus: []
        }
      ]
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
  state: string = 'default';
    rotate() {
        this.state = (this.state === 'default' ? 'rotated' : 'default');
    }

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

  hasMenus(menu: Menu): boolean {
    return menu.menus.length > 0;
  }

  activate(id: any): void {
    this.menus = this.menus.map(menu => {
      if(this.hasMenus(menu)){
        menu.menus.map(sub => {
          if(sub.id === id) {
            sub.active = true;
          }else {
            sub.active = false;
          }
        })
      } else {
        if (menu.id === id) {
          menu.active = true;
        } else {
          menu.active = false;
        }
      }
      return menu;
    })
  }
}