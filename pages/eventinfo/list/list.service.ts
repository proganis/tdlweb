import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private httpClient: HttpClient) { }

  Geteventinfo() {
    var eventinfoList = 'https://myybackend.herokuapp.com/eventInformations/';
    return this.httpClient.get<any[]>(eventinfoList);
  }
}
