import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../core/services/user.service";
import { Menu } from "./../../core/models/menu.interface";



@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
    animations: [
      trigger('rotatedState', [
        state('rotated', style({ transform: 'rotate(0)' })),
        state('default', style({ transform: 'rotate(90deg)' })),
        transition('rotated => default', animate('400ms ease-out')),
        transition('default => rotated', animate('400ms ease-in'))
      ])
  ]
  })
export class SidebarComponent implements OnInit{

  menus: Menu[] = [
    {
      id: 1,
      icon: "home",
      name: "Home",
      route: "/home",
      active: false,
      menus: []
    },
    {
      id: 2,
      icon: "account_circle",
      name: "Profile",
      route: "/profile",
      active: false,
      menus: []
    },
    {
      id: 3,
      icon: "event",
      name: "Events",
      route: '/events',
      active: false,
      menus: []
    },
    {
      id: 4,
      icon: "bar_chart",
      name: "Polls",
      route: '/polls',
      active: false,
      menus: []
    },
    {
      id: 5,
      icon: "chat",
      name: "Chat Room",
      route: '/chat',
      active: false,
      menus: []
    },
    {
      id: 6,
      icon: "dashboard",
      name: "Dashboard",
      route: '',
      active: false,
      menus: [
        {
          id: 7,
          icon: '',
          name: 'Analytics',
          route: '/analytics',
          active: false,
          menus: []
        },
        {
          id: 8,
          icon: '',
          name: 'Manage members',
          route: '/manage-members',
          active: false,
          menus: []
        },
        {
          id: 9,
          icon: '',
          name: 'Manage events',
          route: '/manage-events',
          active: false,
          menus: []
        },
        {
          id: 10,
          icon: '',
          name: 'Manage polls',
          route: '/manage-polls',
          active: false,
          menus: []
        }
      ]
    },
  ];
  firstName = '';
  lastName = '';
  role= '';
  state = 'default';

  constructor(
    private userService: UserService, 
    public router: Router, 
    public route: ActivatedRoute) {
    this.menus.map(menu => {
      if (menu.name == localStorage.getItem('activeRoute')) {menu.active = true;}
      else if (this.hasMenus(menu)) {
        menu.menus.map(sub => {
          if (sub.name == localStorage.getItem('activeRoute')) {sub.active = true;}
        });
      }
    });
  }

  ngOnInit() {
    return this.userService.getProfile()
    .subscribe((res:any)=> {
      this.firstName = res.data.firstName;
      this.lastName = res.data.lastName;
      this.role = res.data.role;
    });
  }

  rotate() {
    this.state = (this.state === 'default' ? 'rotated' : 'default');
  }

  hasMenus(menu: Menu): boolean {
    return menu.menus.length > 0;
  }

  activate(id: any, name: any): void {
    localStorage.setItem('activeRoute', name);
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