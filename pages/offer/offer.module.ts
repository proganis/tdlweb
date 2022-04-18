import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ThemeModule } from '../../@theme/theme.module';
import { OfferRoutingModule } from './offer-routing.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { DxDataGridModule, DxCheckBoxModule, DxSelectBoxModule, DxNumberBoxModule, DxButtonModule, DxAutocompleteModule, DxFormModule } from 'devextreme-angular';



const COMPONENTS = [
];



@NgModule({
  imports: [
    ThemeModule,
    HttpClientModule,
    OfferRoutingModule,
    DxDataGridModule,
    DxCheckBoxModule, 
    DxSelectBoxModule,
     DxNumberBoxModule, 
     DxButtonModule, 
     DxAutocompleteModule, 
     DxFormModule
  ],
  declarations: [
    ...COMPONENTS,
    ListComponent,
    CreateComponent,
    ViewComponent,
    EditComponent,
  ],
})
export class OfferModule { }
