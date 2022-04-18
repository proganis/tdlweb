import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { BaseService } from '../../@common/base.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModuleService extends BaseService {

    constructor(public http: HttpClient) {
        super('/module', http);
    }

    getUsers(moduleId: any, orgId: any) {
        return this.http.get(this.apiURL + '/' + moduleId + '/org/' + orgId + '/users');
    }

    saveMapping(moduleId: any, orgId: any, data: any): Observable<HttpResponse<Object>> {
        return this.http.post(this.apiURL + '/' + moduleId + '/org/' + orgId + '/mappings/', data,
            { observe: 'response' });
    }
    getActive(){
        var modulelist = 'https://myybackend.herokuapp.com/modules/';
        return this.http.get<any[]>(modulelist);
    }
}
