import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ThemeModule } from '../../@theme/theme.module';
import { CreateComponent } from './create/create.component';
import { ContactRoutingModule } from './contact-routing.module';
import { ListComponent } from './list/list.component';
import { DxDataGridModule } from 'devextreme-angular';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';


import { DxCheckBoxModule,
  DxSelectBoxModule,
  DxNumberBoxModule,
  DxButtonModule,
  DxFormModule,
  DxAutocompleteModule,
  DxDropDownButtonModule,
  
   } from 'devextreme-angular';



const COMPONENTS = [
];



@NgModule({
  imports: [
    ThemeModule,
    ContactRoutingModule,
    HttpClientModule,
    DxDataGridModule,
        DxCheckBoxModule,
        DxSelectBoxModule,
        DxNumberBoxModule,
        DxButtonModule,
        DxAutocompleteModule,
        DxFormModule,
        DxDropDownButtonModule,
        FormsModule,
        ReactiveFormsModule 
  ],
  declarations: [
    ...COMPONENTS,
    CreateComponent,
    ListComponent,
    ViewComponent,
    EditComponent,
  ],
})
export class ContactModule { }
