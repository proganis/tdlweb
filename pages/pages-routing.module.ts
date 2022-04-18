import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {AssigningComponent} from './assigning/assigning.component'
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
    path: '',
    component: PagesComponent,
    children: [{
        path: 'dashboard',
        component: DashboardComponent,
    }, {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule',
    },
    
    {
        path: 'assign',
        loadChildren: './admin/admin.module#AdminModule',
    },
    
    {
        path: 'module',
        loadChildren: './module/module.module#ModuleModule',
    }, {
        path: 'org',
        loadChildren: './organization/organization.module#OrganizationModule',
    }, {
        path: 'location',
        loadChildren: './location/location.module#LocationModule',
    }, {
        path: 'menus',
        loadChildren: './menu/menu.module#MenuModule',
    }, {
        path: 'user',
        loadChildren: './user/user.module#UserModule',
    },
    {
        path: 'reports',
        loadChildren: './reports/reports.module#ReportsModule',
    },
    {
        path: 'land-owner',
        loadChildren: './land-owner/land-owner.module#LandOwnerModule',
    },
    {
        path: 'contact',
        loadChildren: './contact/contact.module#ContactModule',
    },
    {
        path: 'project',
        loadChildren: './project/project.module#ProjectModule',
    },
    {
        path: 'offer',
        loadChildren: './offer/offer.module#OfferModule',
    },

    // {
    //     path: 'sales',
    //     loadChildren: './sales/sales.module#SalesModule',
    // },

    // {
    //     path: 'taskinfo',
    //     loadChildren: './taskinfo/taskinfo.module#taskinfoModule',
    // },

    {
        path: 'eventinfo',
        loadChildren: './eventinfo/eventinfo.module#eventinfoModule',
    },

    {
        path: 'callinfo',
        loadChildren: './callinfo/callinfo.module#callinfoModule',
    },
    
    {
        path: 'roles',
        loadChildren: './role/role.module#RoleModule',
    }, {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
   
    {
        path: 'assigning',
        component: AssigningComponent,
    },
    
    
    {
        path: '**',
        component: NotFoundComponent,
    }],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {
}
