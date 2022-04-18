import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ThemeModule } from '../../@theme/theme.module';
import { DxDataGridModule } from 'devextreme-angular';
import { ProjectRoutingModule } from './project-routing.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
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
    HttpClientModule,
    ProjectRoutingModule,
    DxDataGridModule,
    DxCheckBoxModule,
  DxSelectBoxModule,
  DxNumberBoxModule,
  DxButtonModule,
  DxFormModule,
  DxAutocompleteModule,
  DxDropDownButtonModule,
  ],
  declarations: [
    ...COMPONENTS,
    ListComponent,
    CreateComponent,
    ViewComponent,
    EditComponent,
  ],
})
export class ProjectModule { }
