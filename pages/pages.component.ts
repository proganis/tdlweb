import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { AssignedModule, ProfileService } from '../@core/service';
import { MenuService } from './menu/menu.service';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'ngx-admin-panel',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent implements OnInit {

  menu = MENU_ITEMS;
  mod: AssignedModule;

  constructor(private menuService: MenuService, private profile: ProfileService) {
    // this.menu = [];
  }

  ngOnInit(): void {
    // this.mod = this.profile.getActiveModule();
    // this.menuService.getMenuByModule(this.mod.id).subscribe((resp: NbMenuItem[]) => {
    //   // this.menu = resp;
    // });
  }
}