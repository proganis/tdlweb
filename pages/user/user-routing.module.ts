import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { UserCreateComponent } from './create/create.component';
import { UserListComponent } from './list/list.component';
import {AssigningComponent} from './assigning/assigning.component'
import {PriceSetComponent} from './price-set/price-set.component'
import { ReportComponent } from './report/report.component';


const routes: Routes = [{
    path: '',
    children: [
        {
            path: 'create',
            component: UserComponent,
        },
        {
            path: 'edit/:id',
            component: UserCreateComponent,
        },
        {
            path: 'list',
            component: UserListComponent,
        },

        {
            path: 'assign',
            component: AssigningComponent,
        },
        {
            path: 'priceSet',
            component: PriceSetComponent,
        },
        {
            path: 'report',
            component: ReportComponent,
        },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule { }
