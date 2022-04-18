import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { TranslateModule } from '@ngx-translate/core';
import {AssigningComponent} from './assigning/assigning.component';
import { LandOwnerComponent } from './land-owner/land-owner.component';
import { ContactComponent } from './contact/contact.component';
import { ProjectComponent } from './project/project.component';
import { OfferComponent } from './offer/offer.component';
// import {SalesComponent} from './sales/sales.component';
// import {taskinfoComponent} from './taskinfo/taskinfo.component';
import {eventinfoComponent} from './eventinfo/eventinfo.component';
import {callinfoComponent} from './callinfo/callinfo.component';


const PAGES_COMPONENTS = [
    PagesComponent,
];

@NgModule({
    imports: [
        PagesRoutingModule,
        ThemeModule,
        DashboardModule,
        MiscellaneousModule,
        TranslateModule,
    ],
    declarations: [
        ...PAGES_COMPONENTS,
        AssigningComponent, 
        LandOwnerComponent,
        ContactComponent,
        ProjectComponent,
        OfferComponent,
        //SalesComponent,
        //taskinfoComponent,
        eventinfoComponent,
        callinfoComponent,
        
    ],
})
export class PagesModule {
}
