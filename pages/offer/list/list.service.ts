import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { pdfMake } from 'pdfmake/build/pdfmake';
//import { pdfFonts }  from 'pdfmake/build/vfs_fonts';
//pdfMake.vfs = pdfFonts.pdfMake.vfs;



@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private httpClient: HttpClient) { }

  GetOffer() {
    var Offer = 'https://myybackend.herokuapp.com/offerinfos/';
    return this.httpClient.get<any[]>(Offer);
  }
 }
