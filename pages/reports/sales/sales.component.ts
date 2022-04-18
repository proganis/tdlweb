import { Component, OnInit } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { ReportsServiceService } from '../reports-service.service';
import { isDate } from 'util';

@Component({
  selector: 'ngx-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  downpaymentDataSource: any = {};
  downpaymentArrayData: any = [];
  dataSource: any = {};
  reportdata:any= {};
  arraydata: any = [];
  Earea:any = {};
  downpaymentReportData:any = {};
  customerList:any = [];
  uniqueCustomerList:any = [];
  projectList:any = [];
  uniqueProjectList:any = [];
  unitList:any = [];
  uniqueUnitList:any = [];

  customerIsHidden: boolean = false;
  projectIsHidden: boolean = false;
  unitIsHidden: boolean = false;
  bookingDateIsHidden: boolean = false;
  downpaymentDate: boolean = false;
  btnSeach: boolean = false;
  DateRangeFilter: any;

  
  bookingtodate:Date;
  bookingfromdate:Date;

  downpaymenttodate:Date;
  downpaymentfromdate:Date;

  constructor(httpClient: HttpClient,private _ReportsServiceService: ReportsServiceService) { 
    _ReportsServiceService.GetSales().subscribe(x=>
      {
        this.dataSource=x;
        this.arraydata=x;
        this.reportdata=x
        this.Earea=x;
        //this.downpaymentReportData = x;

        this.reportdata=this.reportdata.map((item) => {
          let tempBookingTodate=item.BookingDate.split("-");
          let finalBookingTodate=tempBookingTodate[2]+'-'+tempBookingTodate[1]+'-'+tempBookingTodate[0];
          let tempBooking=new Date(finalBookingTodate);
          item.BookingDate=tempBooking;
          return item;
        });

        // this.downpaymentReportData=this.downpaymentReportData.map((item) => {
        //   let tempDownpaymentTodate=item.DownPaymentDate.split("-");
        //   let finalDownpaymentTodate=tempDownpaymentTodate[2]+'-'+tempDownpaymentTodate[1]+'-'+tempDownpaymentTodate[0];
        //   let tempDownpayment=new Date(finalDownpaymentTodate)
        //   // console.log(tempDownpayment)
        //   item.DownPaymentDate=tempDownpayment;
        //   return item;
        // });
        // console.log(this.dataSource[1].DownPaymentDate);
      })

      this.getCustomerList();
      this.getProjectList();
      this.getUnitList();
      
  }

  getCustomerList(){

    this._ReportsServiceService.GetSales().subscribe(item=>
        {
          this.Earea=item;
          this.Earea.forEach(customeritem => {
            if(customeritem.ContactId !== ''){

              this.customerList.push(customeritem.ContactId)
            }
        })
        this.uniqueCustomerList =  this.customerList.filter((v, i, a) => a.indexOf(v) === i);
        
      }
    )
  }

  getProjectList(){

    this._ReportsServiceService.GetSales().subscribe(item=>
        {
          this.Earea=item;
          this.Earea.forEach(projectitem => {
            if(projectitem.ProjectId !== ''){

              this.projectList.push(projectitem.ProjectId)
            }
        })
        this.uniqueProjectList =  this.projectList.filter((v, i, a) => a.indexOf(v) === i);
        
      }
    )
  }

  getUnitList(){

    this._ReportsServiceService.GetSales().subscribe(item=>
        {
          this.Earea=item;
          this.Earea.forEach(unititem => {
            if(unititem.UnitId !== ''){

              this.unitList.push(unititem.UnitId)
            }
        })
        this.uniqueUnitList =  this.unitList.filter((v, i, a) => a.indexOf(v) === i);
        
      }
    )
  }

  getdetals(key){
    // console.log(this.dataSource);
    let childItem: any[] = [];
    childItem=this.dataSource;
    childItem = this.dataSource.find(x => x.id === key).paymentSchedules;
    return childItem;
  }

  onSubmit(form: any){

    this.dataSource=this.reportdata;
    this.arraydata=this.reportdata;

    this.downpaymentDataSource=this.downpaymentReportData;
    this.downpaymentArrayData=this.downpaymentReportData;


    if (form.value.bookingFromDate) {
      this.bookingfromdate=new Date(form.value.bookingFromDate);
    }

    if (form.value.bookingToDate) {
      this.bookingtodate = new Date(form.value.bookingToDate);
    }

    if (form.value.downpaymentFromDate) {
      this.downpaymentfromdate = new Date(form.value.downpaymentFromDate);
    }

    if (form.value.downpaymentToDate) {
      this.downpaymenttodate = new Date(form.value.downpaymentToDate);
    }
    



    if(form.value.customer){
      this.dataSource=this.arraydata.filter(x=>x.ContactId===form.value.customer);
    }

    if(form.value.project){
      this.dataSource=this.arraydata.filter(x=>x.ProjectId===form.value.project);
    }

    if(form.value.unit){
      this.dataSource=this.arraydata.filter(x=>x.UnitId===form.value.unit);
    }

    if(form.value.bookingFromDate){
      this.dataSource=this.arraydata.filter((x=>x.BookingDate>=this.bookingfromdate));
    }

    if (form.value.bookingToDate) {
      this.dataSource=this.dataSource.filter((x=>x.BookingDate<=this.bookingtodate));
    }
    if(form.value.downpaymentFromDate){
      this.dataSource=this.downpaymentArrayData.filter((x=>x.DownPaymentDate>=this.downpaymentfromdate));
    }

    if(form.value.downpaymentToDate){
      this.dataSource=this.downpaymentDataSource.filter((x=>x.DownPaymentDate<=this.downpaymenttodate));
    }

    // if(downpaymentDate){
    //   this.dataSource=this.arraydata.filter(x=>x.DownPaymentDate==downpaymentDate)
    // }
  }

  refresh(){
    window.location.reload();
  }


  onChange(event:any) {

    if(event === '1'){
      this.customerIsHidden = true;
      this.btnSeach = true;

      this.projectIsHidden = false;
      this.unitIsHidden = false;
      this.bookingDateIsHidden = false;
      this.downpaymentDate = false;
    }else if(event === '2'){
      this.projectIsHidden = true;
      this.btnSeach = true;

      this.customerIsHidden = false;
      this.unitIsHidden = false;
      this.bookingDateIsHidden = false;
      this.downpaymentDate = false;
    }else if(event === '3'){
      this.unitIsHidden = true;
      this.btnSeach = true;

      this.customerIsHidden = false;
      this.projectIsHidden = false;
      this.bookingDateIsHidden = false;
      this.downpaymentDate = false;
    }else if(event === '4'){
      this.bookingDateIsHidden = true;
      this.btnSeach = true;

      this.customerIsHidden = false;
      this.projectIsHidden = false;
      this.unitIsHidden = false;
      this.downpaymentDate = false;
    }else{
      this.downpaymentDate = true;
      this.btnSeach = true;

      this.customerIsHidden = false;
      this.projectIsHidden = false;
      this.unitIsHidden = false;
      this.bookingDateIsHidden = false;
    }
  }

  ngOnInit() {
    
  }

}
