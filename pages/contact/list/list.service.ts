import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private httpClient: HttpClient) { }

  GetContact() {
    var Contact = 'https://myybackend.herokuapp.com/contacts/';
    return this.httpClient.get<any[]>(Contact);
  }


}
