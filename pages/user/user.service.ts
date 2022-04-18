import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../@common/base.service';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {

    constructor(public http: HttpClient) {
        super('/users', http);
    }

    GetUser() {
        var userlist = 'https://myybackend.herokuapp.com/users/all';
        return this.http.get<any[]>(userlist);
      }


}
