import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { ContactComponent } from './contact/contact.component';
import { ProjectComponent } from './project/project.component';
import { OfferComponent } from './offer/offer.component';
import { SalesComponent } from './sales/sales.component';
import { SalePerformanceComponent } from './sale-performance/sale-performance.component';

const routes: Routes = [{
    path: '',
    component: ReportsComponent,
    children: [
            {
            path: 'contact',
            component: ContactComponent
        }, {
            path: 'project',
            component: ProjectComponent
        },{
            path: 'offer',
            component: OfferComponent
        },{
            path: 'sales',
            component: SalesComponent
        },{
            path: 'sale-performance',
            component: SalePerformanceComponent
        },
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ReportsRoutingModule { }
