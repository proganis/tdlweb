import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { OrgTypeComponent } from './orgtype/orgtype.component';


const routes: Routes = [{
    path: '',
    component: AdminComponent,
    children: [{
        path: 'orgtype',
        component: OrgTypeComponent,
    }],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule { }

export const routedComponents = [
    AdminComponent,
    OrgTypeComponent,
];
