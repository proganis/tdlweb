import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private httpClient: HttpClient) { }

  Getcallinfo() {
    var callinfoList = 'https://myybackend.herokuapp.com/CallInformations/';
    return this.httpClient.get<any[]>(callinfoList);
  }
}
