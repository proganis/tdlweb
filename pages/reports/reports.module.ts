import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ThemeModule } from '../../@theme/theme.module';

import { ReportsComponent } from './reports.component';
import { ReportsRoutingModule } from './reports-routing.module';
import { ContactComponent } from './contact/contact.component';
import { DxDataGridModule, DxChartModule, DxPieChartModule } from 'devextreme-angular';
import { ProjectComponent } from './project/project.component';
import { OfferComponent } from './offer/offer.component';
import { SalesComponent } from './sales/sales.component';
import { SalePerformanceComponent } from './sale-performance/sale-performance.component';

const COMPONENTS = [
    ReportsComponent,
    ContactComponent,
];



@NgModule({
  imports: [
    ThemeModule,
    ReportsRoutingModule,
    HttpClientModule,
    DxDataGridModule,
    DxChartModule,
    DxPieChartModule
  ],
  declarations: [
    ...COMPONENTS,
    ProjectComponent,
    OfferComponent,
    SalesComponent,
    SalePerformanceComponent,
  ],
})
export class ReportsModule { }
