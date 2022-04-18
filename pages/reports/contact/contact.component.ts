import { Component, OnInit } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { ReportsServiceService } from '../reports-service.service';
import { Contact } from '../model/contact';
import { isDate } from 'util';

@Component({
  selector: 'ngx-contact,nb-select-sizes',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  createFromDateIsHidden: boolean=false;
  createToDateIsHidden: boolean=false;
  statusIsHidden: boolean=false; 
  existingAreaIsHidden: boolean=false;
  movingAreaIsHidden: boolean=false;
  customerDateIsHidden: boolean=false;
  opportunityDateIsHidden: boolean=false; 
  oldProspectusDateIsHidden: boolean=false;
  newProspectusDateIsHidden: boolean=false;
  btnSearch: boolean=false;
  dataSource: any = {};
  Earea:any={};
  reportdata:any={};
  test:any={};
  existingAreaList: any = [];
  uniquexistingAreaList: any = [];
  arraydata: any = [];
  movingAreaList: any = [];
  uniqueMovingAreaList: any = [];

  customerReportData : any = {};
  customerDataSource : any = {};
  customerArrayData : any = {};

  nwProspectusDateReportDate : any = {};
  opportunityDateReportData : any = {};
  oldProspectusDateReportData : any = {};

  todate:Date;
  fromdate:Date;
  customertodate:Date;
  customerfromdate:Date;
  newProspectusFromDate:Date;
  newProspectusToDate:Date;
  opportunityFromDate:Date;
  opportunityToDate:Date;

  

  constructor(httpClient: HttpClient,private _ReportsServiceService: ReportsServiceService) {

     _ReportsServiceService.GetContact().subscribe(x=>
      {
        this.dataSource=x;
        this.arraydata=x;
        this.reportdata=x
        this.Earea=x;
        this.customerReportData=x;
        this.opportunityDateReportData = x;
        this.oldProspectusDateReportData = x;

        this.reportdata=this.reportdata.map((item) => {
          if(item.NewProspectusDate){

            let tempTodate=item.NewProspectusDate.split("-");
            let finaTodate=tempTodate[2]+'-'+tempTodate[1]+'-'+tempTodate[0];
            let temp=new Date(item.NewProspectusDate);
            item.NewProspectusDate=temp;        
            return item;
          }
        });

        this.customerReportData=this.customerReportData.map((customerItem) => {
          if(customerItem.CustomerDate){
            let tempTodate=customerItem.CustomerDate.split("-");
            let finaTodate=tempTodate[2]+'-'+tempTodate[1]+'-'+tempTodate[0];
            let tempCustomer=new Date(customerItem.CustomerDate);
            customerItem.CustomerDate=tempCustomer;
            return customerItem;
          }
         
        });


        this.opportunityDateReportData=this.opportunityDateReportData.map((itemOpportunityDate) => {
          if(itemOpportunityDate.OpportunityDate){
            let tempTodate=itemOpportunityDate.OpportunityDate.split("-");
            let finaTodate=tempTodate[2]+'-'+tempTodate[1]+'-'+tempTodate[0];
            let temp=new Date(finaTodate)
            itemOpportunityDate.OpportunityDate=temp;
            return itemOpportunityDate;
          }
         
        });

        
        this.oldProspectusDateReportData=this.oldProspectusDateReportData.map((itemoldProspectusDateReportDate) => {
          if(itemoldProspectusDateReportDate.OldProspectusDate){
            let tempTodate=itemoldProspectusDateReportDate.OldProspectusDate.split("-");
            let finaTodate=tempTodate[2]+'-'+tempTodate[1]+'-'+tempTodate[0];
            let tempNewProspectusDate=new Date(finaTodate)
            itemoldProspectusDateReportDate.OldProspectusDate=tempNewProspectusDate;
            return itemoldProspectusDateReportDate;
          }
        });
  
       
      })
      this.getExistingArea();
      this.getMovingArea();
     
  }

  refresh(){
    window.location.reload();
  }

  getExistingArea(){

    this._ReportsServiceService.GetContact().subscribe(item=>
        {
          this.Earea=item;
          this.Earea.forEach(locationitem => {
            if(locationitem.location !== ''){

              this.existingAreaList.push(locationitem.location)
            }
        })
        this.uniquexistingAreaList =  this.existingAreaList.filter((v, i, a) => a.indexOf(v) === i);
        
      }
    )
  }

  getMovingArea(){

    this._ReportsServiceService.GetContact().subscribe(item=>
        {
          this.Earea=item;
          this.Earea.forEach(wishlocationitem => {
            if(wishlocationitem.wishlocation !== ''){

              this.movingAreaList.push(wishlocationitem.wishlocation)
            }
        })
        this.uniqueMovingAreaList =  this.movingAreaList.filter((v, i, a) => a.indexOf(v) === i);
        
      }
    )
  }


  onSubmit(form: any){
    
    this.dataSource=this.reportdata;
    this.arraydata=this.reportdata;

    this.customerDataSource=this.customerReportData;
    this.customerArrayData=this.customerReportData;

    console.log(form.value.customerFromDate);
    console.log(form.value.customerToDate);

    
    if (form.value.newProspectusFromDate) {
      this.newProspectusFromDate=new Date(form.value.newProspectusFromDate);
    }

    if (form.value.newProspectusToDate) {
      this.newProspectusToDate = new Date(form.value.newProspectusToDate);
    }
    
    if(form.value.oldProspectusDate){
      var oldProspectus = formatDate(form.value.oldProspectusDate, 'dd-MM-yyyy', 'en');
    }

    if(form.value.opportunityFromDate){
      this.opportunityFromDate=new Date(form.value.opportunityFromDate);
    }

    if(form.value.opportunityToDate){
      this.opportunityToDate=new Date(form.value.opportunityToDate);
    }

    if (form.value.customerFromDate) {
      this.customerfromdate=new Date(form.value.customerFromDate);
      console.log(this.customerfromdate);
    }

    if (form.value.customerToDate) {
      this.customertodate = new Date(form.value.customerToDate);
      console.log(this.customertodate);
    }

    if (form.value.createFromDate) {
      this.fromdate=new Date(form.value.createFromDate);
    }

    if (form.value.createToDate) {
      this.todate = new Date(form.value.createToDate);
    }



    
    if(form.value.status){
      this.dataSource=this.arraydata.filter(x=>x.contactStatus===form.value.status);
    }
    
    if(form.value.existingArea){
      this.dataSource=this.arraydata.filter(x=>x.location===form.value.existingArea);
    }    

    if(form.value.movingArea){
      this.dataSource=this.arraydata.filter(x=>x.wishlocation===form.value.movingArea);
    }

    if (form.value.newProspectusFromDate) {
      this.dataSource=this.arraydata.filter((x=>x.NewProspectusDate>=this.newProspectusFromDate));
    }

    if (form.value.newProspectusToDate) {
      this.dataSource=this.dataSource.filter((x=>x.NewProspectusDate<=this.newProspectusToDate));
    }

    if(form.value.opportunityFromDate){
      this.dataSource=this.arraydata.filter((x=>x.OpportunityDate>=this.opportunityFromDate));
    }

    if(form.value.opportunityToDate){
      this.dataSource=this.arraydata.filter((x=>x.OpportunityDate<=this.opportunityToDate));
    }

    if (form.value.customerFromDate) {
      this.dataSource=this.customerArrayData.filter((x=>x.CustomerDate>=this.customerfromdate));
    }

    if (form.value.customerToDate) {
      this.dataSource=this.customerDataSource.filter((x=>x.CustomerDate<=this.customertodate));
    }

    if (form.value.createFromDate) {
      this.dataSource=this.arraydata.filter((x=>x.createdAt>=this.fromdate));
    }

    if (form.value.createToDate) {
      this.dataSource=this.dataSource.filter((x=>x.createdAt<=this.todate));
    }
   
    
  }

  onChange(event:any) {

    if(event === '1'){
      this.createFromDateIsHidden = true;
      this.createToDateIsHidden = true;
      this.btnSearch = true;

      this.statusIsHidden = false;
      this.existingAreaIsHidden = false;
      this.movingAreaIsHidden = false;
      this.customerDateIsHidden = false;
      this.opportunityDateIsHidden = false;
      this.newProspectusDateIsHidden = false;
    }else if(event === '2'){
      this.existingAreaIsHidden = true;
      this.btnSearch = true;

      this.createFromDateIsHidden = false;
      this.createToDateIsHidden = false;
      this.statusIsHidden = false;
      this.movingAreaIsHidden = false;
      this.customerDateIsHidden = false;
      this.opportunityDateIsHidden = false;
      this.newProspectusDateIsHidden = false;
    }else if(event === '3'){
      this.movingAreaIsHidden = true;
      this.btnSearch = true;

      this.createFromDateIsHidden = false;
      this.createToDateIsHidden = false;
      this.statusIsHidden = false;
      this.existingAreaIsHidden = false;
      this.customerDateIsHidden = false;
      this.opportunityDateIsHidden = false;
      this.newProspectusDateIsHidden = false;
    }else if(event === '4'){
      this.customerDateIsHidden = true;
      this.btnSearch = true;

      this.createFromDateIsHidden = false;
      this.createToDateIsHidden = false;
      this.statusIsHidden = false;
      this.existingAreaIsHidden = false;
      this.movingAreaIsHidden = false;
      this.opportunityDateIsHidden = false;
      this.newProspectusDateIsHidden = false;
    }else if(event === '5'){
      this.opportunityDateIsHidden = true;
      this.btnSearch = true;

      this.createFromDateIsHidden = false;
      this.createToDateIsHidden = false;
      this.statusIsHidden = false;
      this.existingAreaIsHidden = false;
      this.movingAreaIsHidden = false;
      this.customerDateIsHidden = false;
      this.newProspectusDateIsHidden = false;
    }else if(event === '6'){
      this.newProspectusDateIsHidden = true;
      this.btnSearch = true;

      this.createFromDateIsHidden = false;
      this.createToDateIsHidden = false;
      this.statusIsHidden = false;
      this.existingAreaIsHidden = false;
      this.movingAreaIsHidden = false;
      this.customerDateIsHidden = false;
      this.opportunityDateIsHidden = false;
    }else{
      this.existingAreaIsHidden = true;
      this.movingAreaIsHidden = true;
      this.btnSearch = true;

      this.createFromDateIsHidden = false;
      this.createToDateIsHidden = false;
      this.statusIsHidden = false;
      this.newProspectusDateIsHidden = false;
      this.customerDateIsHidden = false;
      this.opportunityDateIsHidden = false;
    }
}

  ngOnInit() {
    
  }

}
