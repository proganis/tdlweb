import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { ReportsServiceService } from '../reports-service.service';
import { Project } from '../model/project';
import { DatePipe, formatDate } from '@angular/common';
import { isDate } from 'util';

@Component({
  selector: 'ngx-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  dataSource: any = {};
  arraydata:any={};
  reportdata:any={};
  childdata:any={};
  todate:Date;
  fromdate:Date;
  sizeValue:any;
  rateValue:any;

  constructor(httpClient: HttpClient,private _ReportsServiceService: ReportsServiceService) {
    _ReportsServiceService.GetProject().subscribe(x=>
      {
        this.dataSource=x;
        this.arraydata=x;
        this.reportdata=x;

        this.reportdata=this.reportdata.map((item) => {
                if(item.HandoverDate){
                  let tempTodate=item.HandoverDate.split("-");
                  let finaTodate=tempTodate[2]+'-'+tempTodate[1]+'-'+tempTodate[0];
                  let temp=new Date(finaTodate)
                  item.HandoverDate=temp;
                  return item;
                }
               
              });
        
      })
   }

   calculateCellValue(rowData){  
    return rowData.Size * rowData.Rate;    
}
   
  ngOnInit(){
    
  }

  refresh(){
    window.location.reload();
  }

  onSubmit(form: any){
    this.dataSource=this.reportdata;
    this.arraydata=this.reportdata;

    if (form.value.handOverFromDate) {
      this.fromdate=new Date(form.value.handOverFromDate);
    }

    if (form.value.handOverToDate) {
      this.todate = new Date(form.value.handOverToDate);
    }

    if(form.value.projectType){
      this.dataSource=this.arraydata.filter(x=>x.ProjectType===form.value.projectType);
    }
    
    if(form.value.projectLocation){
      this.dataSource=this.arraydata.filter(x=>x.ProjectAddress===form.value.projectLocation);
    }
    if (form.value.handOverFromDate) {
      this.dataSource=this.arraydata.filter((x=>x.HandoverDate>=this.fromdate));
    }

    if (form.value.handOverToDate) {
      this.dataSource=this.dataSource.filter((x=>x.HandoverDate<=this.todate));
    }
  }
  getdetals(key){
    let childItem: any[] = [];
    childItem=this.dataSource;
    childItem = this.dataSource.find(x => x.id === key).projectDetails;
    this.getSoldTotal(childItem);
    this.getTotalAmount(childItem);
    this.soldUnitQty(childItem);
    return childItem;
  }

  getSoldTotal(data){
    var result2 = 0;
    for (let key in data.projectDetails) {
      if(data.projectDetails[key].Status === 'Sold' && data.projectDetails[key].Size && data.projectDetails[key].Rate){
        result2 += parseInt(data.projectDetails[key].Size) * parseInt(data.projectDetails[key].Rate);
      }
    }
    return result2;
  }

  getTotalAmount(data){
    var result2 = 0;
    for (let key in data.projectDetails) {
      if(data.projectDetails[key].Size != "" && data.projectDetails[key].Rate != ""){
        result2 += parseInt(data.projectDetails[key].Size) * parseInt(data.projectDetails[key].Rate);
      }
    }
    return result2;
  }

  soldUnitQty(data){
    var totalCount = 0;
    var soldUnitCount = 0;
    for (let key in data.projectDetails) {
      totalCount += 1;
      if(data.projectDetails[key].Status === 'Sold'){
        soldUnitCount += 1;
      }
    }

    var result = soldUnitCount +" out of " + totalCount;
    return result;

  }
}
