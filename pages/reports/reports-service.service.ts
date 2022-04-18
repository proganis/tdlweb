import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from './model/contact';
import { Project } from './model/project';
import { Sales } from './model/sales';
import { Offer } from './model/offer';
import { SalePerformance } from './model/salePerformance';


@Injectable({
  providedIn: 'root'
})
export class ReportsServiceService {

  constructor(private httpClient: HttpClient) { }

  GetContact() {
    var Contact = 'https://myybackend.herokuapp.com/contacts/';
    return this.httpClient.get<Contact[]>(Contact);
  }

  GetProject() {
    
    var Project = 'https://myybackend.herokuapp.com/projectInformations';
  //   let products: Product[] = [];
  //   for(var i = 1; i <= Project.length; i++) {
  //     products.push({ 
  //         ProductID: i,
  //         ProductName: "Product " + i,
  //         UnitPrice: Math.floor(Math.random() * 1000) + 1,
  //         Quantity: 0,
  //         Amount: 0,
  //         OrderCount: 0
  //     });
  // }
  
    return this.httpClient.get<Project[]>(Project);
  }

  GetSales() {
    var Sales = 'https://myybackend.herokuapp.com/SalesInvoices/';
    return this.httpClient.get<Sales[]>(Sales);
  }

  GetOffer() {
    var Offer = 'https://myybackend.herokuapp.com/offerinfos/';
    return this.httpClient.get<Offer[]>(Offer);
  }

  GetSalePerformance(){
    var SalePerformance = 'https://myybackend.herokuapp.com/SalesInvoices/invoicesByUser';
    return this.httpClient.get<SalePerformance[]>(SalePerformance);
  }


}
