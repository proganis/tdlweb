import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AssignPriceSetService {

  constructor(private http: HttpClient) { }

  getAllProjects(){
    
      return this.http.get<any>("https://myybackend.herokuapp.com/projectInformations/");
    
  }

  getAllSalesMan():any{
    let allSalesMan=new Array();
    this.http.get("https://myybackend.herokuapp.com/users/all").subscribe((res:any) => {    
      
      for(let i=0;i<res.user.length;i++){
         if(res.user[i].role=="user"){
              allSalesMan.push(res.user[i]);
             
         }
      }
                 
    });
    return allSalesMan;
 }


}

