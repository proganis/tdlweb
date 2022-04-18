import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { RoleService } from '../role.service';
import { Role } from '../role';
import { ActiveModel } from '../../../@core/models';
import { IDModel } from '../../../@core/models';
import { InlineGridEvents } from '../../../@common/inline-grid.events';
import { ToastService } from '../../../@core/service/toast.service';
import { Router } from '@angular/router';

@Component({
    selector: 'ngx-roles-list',
    templateUrl: './list.component.html',
    styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class RoleListComponent extends InlineGridEvents {

    settings = {
        mode: 'external',
        pager: {
            perPage: 10,
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
            id: IDModel,
            role_name: {
                title: 'Role Name',
                type: 'string',
            },
            active: ActiveModel,
        },
    };

    source: LocalDataSource = new LocalDataSource();

    constructor(public service: RoleService,
        public toaster: ToastService,
        private router: Router) {
        super(service, toaster);
        this.load();

    }
    edit(event) {
        this.router.navigateByUrl('/pages/roles/edit/' + event.data.id);
    }

    load(): void {
        this.service.GetRoles().subscribe((res: Role[]) => {
            this.source.load(res);
        });
    }

    reloadGrid(): void {
        this.load();
    }

}
