import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../@common/base.service';

@Injectable({ providedIn: 'root' })
export class OrganizationService extends BaseService {

    constructor(public http: HttpClient) {
        super('/org', http);
    }
}
