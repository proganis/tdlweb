import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';

import { TranslateModule } from '@ngx-translate/core';
import { DxDataGridModule, DxChartModule, DxPieChartModule } from 'devextreme-angular';

@NgModule({
    imports: [
        ThemeModule,
        TranslateModule,
        DxDataGridModule,
        DxChartModule,
        DxPieChartModule
    ],
    declarations: [
        DashboardComponent,
    ],
})
export class DashboardModule { }
