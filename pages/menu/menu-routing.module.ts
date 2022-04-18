import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenusComponent } from './menu.component';
import { MenuCreateComponent } from './create/create.component';
import { MenuListComponent } from './list/list.component';
import { MenuManageComponent } from './manage/manage.component';


const routes: Routes = [{
    path: '',
    component: MenusComponent,
    children: [
        {
            path: 'create',
            component: MenuCreateComponent,
        },
        {
            path: 'list',
            component: MenuListComponent,
        },
        {
            path: 'manage',
            component: MenuManageComponent,
        },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MenuRoutingModule { }
