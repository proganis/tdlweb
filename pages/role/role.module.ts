import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';

import { RoleRoutingModule } from './role-routing.module';
import { RoleComponent } from './role.component';
import { RoleCreateComponent} from './create/create.component';
import { RoleListComponent } from './list/list.component';
import { TreeModule } from 'angular-tree-component';

import { Ng2SmartTableModule } from 'ng2-smart-table';

const COMPONENTS = [
  RoleComponent,
  RoleCreateComponent,
  RoleListComponent,
];

const ENTRY_COMPONENTS = [
  RoleComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    RoleRoutingModule,
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
export class RoleModule { }
