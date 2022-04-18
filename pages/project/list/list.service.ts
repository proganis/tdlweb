import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private httpClient: HttpClient) { }

  GetProject() {
    var Project = 'https://myybackend.herokuapp.com/projectInformations';
    return this.httpClient.get<any[]>(Project);
  }


}
