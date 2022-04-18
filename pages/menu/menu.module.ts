import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';

import { MenuRoutingModule } from './menu-routing.module';
import { MenusComponent } from './menu.component';
import { MenuCreateComponent } from './create/create.component';
import { MenuListComponent } from './list/list.component';
import { MenuManageComponent } from './manage/manage.component';


import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TreeModule } from 'angular-tree-component';

const COMPONENTS = [
    MenusComponent,
    MenuCreateComponent,
    MenuListComponent,
    MenuManageComponent,
];

const ENTRY_COMPONENTS = [
    MenusComponent,
];

@NgModule({
    imports: [
        ThemeModule,
        MenuRoutingModule,
        Ng2SmartTableModule,
        TreeModule,
    ],
    declarations: [
        ...COMPONENTS,
    ],
    entryComponents: [
        ...ENTRY_COMPONENTS,
    ],
})
export class MenuModule { }
