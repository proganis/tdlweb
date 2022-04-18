import { NgModule  } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ThemeModule } from '../../@theme/theme.module';
import { CreateComponent } from './create/create.component';
import { eventinfoRoutingModule } from './eventinfo-routing.module';
import { ListComponent } from './list/list.component';
import { DxDataGridModule, DxCheckBoxModule, DxSelectBoxModule, DxNumberBoxModule, DxButtonModule, DxAutocompleteModule, DxFormModule, DxSwitchModule } from 'devextreme-angular';
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
    eventinfoRoutingModule,
    HttpClientModule,
    DxDataGridModule,
        DxCheckBoxModule,
        DxSelectBoxModule,
        DxNumberBoxModule,
        DxButtonModule,
        DxAutocompleteModule,
        DxFormModule,
        DxSwitchModule,
        
  ],
  declarations: [
    ...COMPONENTS,
    ListComponent,
    CreateComponent,
    ViewComponent,
    EditComponent
  ],
})
export class eventinfoModule { }
