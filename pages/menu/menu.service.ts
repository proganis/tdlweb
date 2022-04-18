import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../@common/base.service';
import { environment as env } from '../../../environments/environment';
import { Menu } from './menu';

@Injectable({ providedIn: 'root' })
export class MenuService extends BaseService {

    constructor(public http: HttpClient) {
        super('/menu', http);
    }

    GetMenus() {
        var menuList = 'https://myybackend.herokuapp.com/module_menus/';
        return this.http.get<any[]>(menuList);
      }

    getTreeByModuleId(id: number) {
        var menuList = 'https://myybackend.herokuapp.com/module_menus/';
        return this.http.get<any[]>(menuList);
        //return this.http.get(env.apiHost + env.apiPrefix + '/menu/' + id + ':tree');
    }

    getListByModuleId(id: number) {
        var menuList = 'https://myybackend.herokuapp.com/module_menus/';
        return this.http.get<any[]>(menuList);
        //return this.http.get(env.apiHost + env.apiPrefix + '/menu/' + id + ':list');
    }

    getMenuByModule(moduleId: number) {
        return this.http.get(this.apiURL + '/' + moduleId + ':bymodule');
    }

    saveMenuOrdering(menu: Menu) {
        return this.http.post(this.apiURL + '/' + menu.moduleId + '/ordering', menu);
    }

}
