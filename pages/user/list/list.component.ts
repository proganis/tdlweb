import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { UserService } from '../user.service';
import { User } from '../user';
import { InlineGridEvents } from '../../../@common/inline-grid.events';
import { ToastService } from '../../../@core/service/toast.service';
import { Router } from '@angular/router';

@Component({
    selector: 'ngx-advocate-list',
    templateUrl: './list.component.html',
    styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class UserListComponent extends InlineGridEvents {


    settings = {
        mode: 'external',
        pager: {
            perPage: 10,
        },
        attr: {
            id: 'name',
        },
        actions: {
            add: false,
            edit: true,
            delete: true,
            columnTitle: 'Actions',
            position: 'left',
            class: 'action-column',
        },
        add: {
            addButtonContent: '<i class="nb-plus"></i>',
            createButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
            confirmCreate: true,
        },
        edit: {
            editButtonContent: '<i class="nb-edit"></i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
            confirmSave: true,
        },
        delete: {
            deleteButtonContent: '<i class="nb-trash"></i>',
            confirmDelete: true,
        },
        columns: {
            name: {
                title: 'Username',
                type: 'string',
            },
            // fullName: {
            //     title: 'Full Name',
            //     type: 'string',
            // },
            // govtId: {
            //     title: 'Govt Id',
            //     type: 'string',
            // },
            // mobile: {
            //     title: 'Mobile',
            //     type: 'string',
            // },
            email: {
                title: 'Email',
                type: 'string',
            },
            // roles: {
            //     title: 'Roles',
            //     type: 'string',
            // },
            // modules: {
            //     title: 'Modules',
            //     type: 'string',
            // },
        },
    };

    source: LocalDataSource = new LocalDataSource();

    constructor(
        public service: UserService,
        public toaster: ToastService,
        private router: Router,
    ) {

        super(service, toaster);
        this.load();

    }

    edit(event) {
        this.router.navigateByUrl('/pages/users/edit/' + event.data.userName);
    }

    load(): void {

        this.service.GetUser().subscribe((res) => {
            console.log(res);
            this.source.load(res);
        });

    }
   
    reloadGrid(): void {
        this.load();
    }
    
}
