import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ThemeModule } from '../../@theme/theme.module';
import { CreateComponent } from './create/create.component';
import { LandOwnerRoutingModule } from './land-owner-routing.module';
import { ListComponent } from './list/list.component';
import { DxDataGridModule, DxCheckBoxModule, DxSelectBoxModule, DxNumberBoxModule, DxButtonModule, DxAutocompleteModule, DxFormModule } from 'devextreme-angular';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';



const COMPONENTS = [
    ListComponent,
    CreateComponent,
    ViewComponent,
    EditComponent
];



@NgModule({
  imports: [
    ThemeModule,
    LandOwnerRoutingModule,
    HttpClientModule,
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
    EditComponent
  ],
})
export class LandOwnerModule { }
