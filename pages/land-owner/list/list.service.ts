import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private httpClient: HttpClient) { }

  GetLandOwner() {
    var landownerList = 'https://myybackend.herokuapp.com/landowners/';
    return this.httpClient.get<any[]>(landownerList);
  }
}
