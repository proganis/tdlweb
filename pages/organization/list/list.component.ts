import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { ActiveModel } from '../../../@core/models';
import { OrganizationService } from '../organization.service';
import { Organization } from '../organization';
import { IDModel } from '../../../@core/models';
import { ToastService } from '../../../@core/service/toast.service';
import { InlineGridEvents } from '../../../@common/inline-grid.events';

@Component({
    selector: 'ngx-advocate-list',
    templateUrl: './list.component.html',
    styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class OrganizationListComponent extends InlineGridEvents {


    settings = {
        mode: 'inline',
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
            nameEng: {
                title: 'Name English',
                type: 'string',
            },
            nameBang: {
                title: 'Name Bangla',
                type: 'string',
            },
            active: ActiveModel,
            address: {
                title: 'Address',
                type: 'string',
            },
            webAddress: {
                title: 'Web Address',
                type: 'number',
            },
            telephone: {
                title: 'Telephone',
                type: 'string',
            },
            email: {
                title: 'Email',
                type: 'number',
            },
            remarks: {
                title: 'Remarks',
                type: 'number',
            },
        },
    };

    source: LocalDataSource = new LocalDataSource();

    constructor(public service: OrganizationService, public toaster: ToastService) {
        super(service, toaster);
        this.load();

    }

    load(): void {
        this.service.getAll().subscribe((res: Organization[]) => {
            this.source.load(res);
        });
    }

    reloadGrid(): void {
        this.load();
    }
}
