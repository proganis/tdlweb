import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { ActiveModel } from '../../../@core/models';
import { ModuleService } from '../module.service';
import { Module } from '../module';
import { Router } from '@angular/router';
import { BaseEvents } from '../../../@common/base.events';
import { IDModel } from '../../../@core/models';
import { FilterModel } from '../../../@core/models';
import { EditorModel } from '../../../@core/models';
import { ToastService } from '../../../@core/service';

@Component({
    selector: 'ngx-module-list',
    templateUrl: './list.component.html',
})
export class ModuleListComponent extends BaseEvents {

    settings = {
        mode: 'inline',
        pager: {
            perPage: 10,
        },
        actions: {
            add: false,
            edit: false,
            delete: true,
            columnTitle: 'Actions',
            position: 'left',
            class: 'action-column',
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
                title: 'Module Name',
                type: 'string',
            },
            remark: {
                title: 'Remarks',
                type: 'string',
            },
            active: ActiveModel,
            macBindingEnabled: {
                title: 'Mac Binding Enabled',
                type: 'boolean',
                sort: true,
                editor: EditorModel,
                filter: FilterModel,
            },
            ipBindingEnabled: {
                title: 'IP Binding Enabled',
                type: 'boolean',
                sort: true,
                editor: EditorModel,
                filter: FilterModel,
            },
            macAccessList: {
                title: 'Mac Addresses',
                type: 'string',
            },
            ipAccessList: {
                title: 'IP Addresses',
                type: 'string',

            },
        },
    };

    source: LocalDataSource = new LocalDataSource();

    constructor(
        public service: ModuleService,
        private router: Router,
        public toaster: ToastService) {
        super(service, toaster);
        this.load();

    }

    load(): void {
        this.service.getAll().subscribe((res: Module[]) => {
            this.source.load(res);
        });
    }

    onEdit(event): void {
        this.router.navigateByUrl('/pages/module/create');
    }


}
