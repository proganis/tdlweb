import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [{
    path: '',
    children: [
        {
            path: 'list',
            component: ListComponent,
        },
        {
            path: 'list/create',
            component: CreateComponent,
        },
        {
            path: 'list/view/:id',
            component: ViewComponent,
        },
        {
            path: 'list/edit/:id',
            component: EditComponent,
        },
        
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class callinfoRoutingModule { }
