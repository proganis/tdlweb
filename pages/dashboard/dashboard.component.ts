import { Component, OnDestroy } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { ReportsServiceService } from '../reports/reports-service.service';

@Component({
    selector: 'ngx-dashboard',
    styleUrls: ['./dashboard.component.scss'],
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {
    dataSource: any = {};
    dataSourceProject: any = {};
    dataSourceChart: any = {};

    constructor(httpClient: HttpClient,private _ReportsServiceService: ReportsServiceService) {
        _ReportsServiceService.GetSalePerformance().subscribe(x=>
          {
            this.dataSource=x;
            this.dataSourceChart = this.dataSource;
          })
          
          _ReportsServiceService.GetProject().subscribe(y=>
            {
              this.dataSourceProject=y;
            })
       }

    ngOnDestroy() {
        
    }
}
