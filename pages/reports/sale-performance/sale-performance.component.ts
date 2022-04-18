import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { ReportsServiceService } from '../reports-service.service';
import { SalePerformance } from '../model/salePerformance';


@Component({
  selector: 'ngx-sale-performance',
  templateUrl: './sale-performance.component.html',
  styleUrls: ['./sale-performance.component.scss']
})
export class SalePerformanceComponent implements OnInit {

  dataSourceOne: any = [];
  dataSourceTwo: any = [];
  dataSourceChart: any = {};
  dataSourceBarChart: any = {};
  dataSource: any = {};
  arraydata: any = [];
  Earea:any={};
  reportdata:any={};
  barArray:any=[];
  //salesManIsHidden : boolean = false;
  //quantityIsHidden : boolean = false;
  //btnSeach : boolean = false;
  saleManList: any = [];
  uniqueSaleManList: any = [];
  assignedUnit: number;
  percentage;
  barChart:boolean = false;

  constructor(httpClient: HttpClient,private _ReportsServiceService: ReportsServiceService) {
    _ReportsServiceService.GetSalePerformance().subscribe(x=>
      {
        this.dataSource=x;
        this.dataSourceChart = this.dataSource;
      
        this.dataSource.forEach(item => {
           this.dataSourceOne.push(Object.assign({_id: item._id},{count: item.count}, {assignedUnit: 10}));
        }
      )


      this.dataSourceOne.forEach(item => {

        var achivmentPercentage = ( parseInt(item.count)* 100) /parseInt(item.assignedUnit) ;

        this.dataSourceTwo.push(Object.assign({_id: item._id},{count: item.count}, {assignedUnit: 10},{percentage: achivmentPercentage}));
     }
   )

        this.arraydata=x;
        this.reportdata=this.dataSourceTwo;
        this.Earea=x;
      })

      this.getSalesManList();
   }

   onSubmit(form: any){
     //console.log(form.value.salesMan);
    if (form.value.salesMan) {

     // console.log(this.dataSourceTwo.filter(x=>x._id===form.value.salesMan));
      this.dataSourceTwo=this.reportdata.filter(x=>x._id===form.value.salesMan);
      this.barChart = true;
      this.dataSourceBarChart = this.dataSourceTwo.filter(x=>x._id===form.value.salesMan);
      for (let index = 0; index <1; index++) {
        if(this.dataSourceBarChart[0].assignedUnit>0)
        {
          aObj={xaxis:"Assigned Unit",yaxis:this.dataSourceBarChart[0].assignedUnit};
        }
        this.barArray.push(aObj);
        if(this.dataSourceBarChart[0].count>0)
        {
          var aObj={xaxis:"Sold Unit",yaxis:this.dataSourceBarChart[0].count};
        }
        this.barArray.push(aObj);
        
      }

     console.log(this.barArray);
      
    }

    // if (form.value.quantity) {
    //   this.dataSource=this.arraydata.filter(x=>x.count == parseInt(form.value.quantity));
    // }
   }

//    onChange(event:any) {

//     if(event === '1'){
//       this.salesManIsHidden = true;
//       this.btnSeach = true;

//       this.quantityIsHidden = false;
     
//     }else{
//       this.quantityIsHidden = true;
//       this.btnSeach = true;

//       this.salesManIsHidden = false;
//     }
// }

getSalesManList(){

  this._ReportsServiceService.GetSalePerformance().subscribe(item=>
      {
        this.Earea=item;
        this.Earea.forEach(salesMan => {
          if(salesMan._id !== ''){

            this.saleManList.push(salesMan._id)
          }
      })
      this.uniqueSaleManList =  this.saleManList.filter((v, i, a) => a.indexOf(v) === i);
      
    }
  )
}

refresh(){
  window.location.reload();
}


  ngOnInit() {
  }

  

}
