import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { ReportsServiceService } from '../reports-service.service';
import { DatePipe, formatDate } from '@angular/common';
import { isDate } from 'util';

@Component({
  selector: 'ngx-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {

  dataSource: any = {};
  arraydata:any={};
  reportdata:any={};
  todate:Date;
  fromdate:Date;

  constructor(httpClient: HttpClient,private _ReportsServiceService: ReportsServiceService) { 
    _ReportsServiceService.GetOffer().subscribe(x=>
      {
      this.dataSource=x;
      this.arraydata=x;
      this.reportdata=x;

      this.reportdata=this.reportdata.map((item) => {
        let tempTodate=item.HandOverTime.split("-");
        let finaTodate=tempTodate[2]+'-'+tempTodate[1]+'-'+tempTodate[0];
        let temp=new Date(finaTodate)
        item.HandOverTime=temp;
        return item;
      });

      })
  }

  ngOnInit() {
  }

  refresh(){
    window.location.reload();
  }

  onSubmit(form: any){
    console.log(this.reportdata);
    this.dataSource=this.reportdata;
    this.arraydata=this.reportdata;

    if (form.value.createFromDate) {
      this.fromdate=new Date(form.value.createFromDate);
     //var reportFromDate = formatDate(form.value.createFromDate, 'dd-MM-yyyy', 'en');
    }

    if (form.value.createToDate) {
      this.todate = new Date(form.value.createToDate);
      //this.todate.setDate( this.todate.getDate() + 1 );

      //var reportToDate = formatDate(this.todate, 'dd-MM-yyyy', 'en');
    }
    console.log(this.fromdate);
    console.log(this.todate);

    // if(form.value.project){
    //   this.dataSource=this.arraydata.filter(x=>x.ProjectId===form.value.project);
    // }
    
    // if(form.value.client){
    //   this.dataSource=this.arraydata.filter(x=>x.ContactId===form.value.client);
    // }

    // if (form.value.createFromDate&&form.value.createToDate) {
    //   this.dataSource=this.arraydata.filter((x=>x.HandOverTime>=this.fromdate) && (x=>x.HandOverTime<=this.todate));
    // }

    if (form.value.createFromDate) {
      this.dataSource=this.arraydata.filter((x=>x.HandOverTime>=this.fromdate));
    }

    if (form.value.createToDate) {
      this.dataSource=this.dataSource.filter((x=>x.HandOverTime<=this.todate));
    }
  }

}
