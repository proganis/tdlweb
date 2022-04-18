import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoleComponent } from './role.component';
import { RoleCreateComponent } from './create/create.component';
import { RoleListComponent } from './list/list.component';


const routes: Routes = [{
    path: '',
    component: RoleComponent,
    children: [
        {
            path: 'create',
            component: RoleCreateComponent,
        },
        {
            path: 'edit/:id',
            component: RoleCreateComponent,
        },
        {
            path: 'list',
            component: RoleListComponent,
        },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RoleRoutingModule { }
