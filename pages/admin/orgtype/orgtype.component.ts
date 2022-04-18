import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { ActiveModel } from '../../../@core/models';
import { OrgTypeService } from './orgtype.service';
import { OrgType } from './orgtype';
import { ToastService } from '../../../@core/service/toast.service';
import { InlineGridEvents } from '../../../@common/inline-grid.events';
import { IDModel } from '../../../@core/models';


@Component({
    selector: 'ngx-orgtype-list',
    templateUrl: './orgtype.component.html',
})
export class OrgTypeComponent extends InlineGridEvents {


    settings = {
        mode: 'inline',
        selectMode: 'single',
        pager: {
            perPage: 10,
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
            name: {
                title: 'Name',
                type: 'string',
            },
            active: ActiveModel,
            remarks: {
                title: 'Remarks',
                type: 'number',
            },
        },
    };

    source: LocalDataSource = new LocalDataSource();

    constructor(public service: OrgTypeService, public toaster: ToastService) {
        super(service, toaster);
        this.load();

    }

    load(): void {
        this.service.getAll().subscribe((res: OrgType[]) => {
            this.source.load(res);
        });
    }

    reloadGrid(): void {
        this.load();
    }
}
