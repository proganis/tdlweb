import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../@common/base.service';

@Injectable({ providedIn: 'root' })
export class RoleService extends BaseService {

    constructor(public http: HttpClient) {
        super('/roles', http);
    }

    GetRoles() {
        var roleList = 'https://myybackend.herokuapp.com/roles/';
        return this.http.get<any[]>(roleList);
      }

    getAllRoles() {
        return this.http.get(this.apiURL);
    }

    getRolesByModule(moduleId: number[]) {
        return this.http.get(this.apiURL + '/' + moduleId + ':bymodule');
    }
}
