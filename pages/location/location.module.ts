import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';

import { LocationRoutingModule } from './location-routing.module';
import { LocationComponent } from './location.component';
import { LocationCreateComponent} from './create/create.component';
import { LocationListComponent } from './list/list.component';

import { TreeModule } from 'angular-tree-component';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TranslateModule } from '@ngx-translate/core';

const COMPONENTS = [
  LocationComponent,
  LocationCreateComponent,
  LocationListComponent,
];

const ENTRY_COMPONENTS = [
  LocationComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    LocationRoutingModule,
    Ng2SmartTableModule,
    TreeModule,
        TranslateModule,
  ],
  declarations: [
    ...COMPONENTS,
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS,
  ],
})
export class LocationModule { }
