export interface Menu {
    id: any;
    icon: string;
    name: string;
    route: string;
    active: boolean;
    menus: Menu[];
  }