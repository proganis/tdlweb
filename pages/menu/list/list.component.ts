import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { ActiveModel } from '../../../@core/models';
import { MenuService } from '../menu.service';
import { Menu } from '../menu';
import { IDModel } from '../../../@core/models';
import { ToastService } from '../../../@core/service/toast.service';
import { InlineGridEvents } from '../../../@common/inline-grid.events';

@Component({
    selector: 'ngx-menu-list',
    templateUrl: './list.component.html',
    styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class MenuListComponent extends InlineGridEvents {


    settings = {
        mode: 'inline',
        pager: {
            perPage: 10,
        },
        actions: {
            add: false,
            edit: true,
            delete: false,
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
                title: 'Menu Title',
                type: 'string',
            },
            // link: {
            //     title: 'Link',
            //     type: 'link',
            //     editable: false,
            // },
            sort_order:{
                title: 'Sort Order',
                type: 'number',
            },
            active: ActiveModel,
        },
    };

    source: LocalDataSource = new LocalDataSource();

    constructor(public service: MenuService, public toaster: ToastService) {
        super(service, toaster);
        this.load();

    }

    load(): void {
        this.service.GetMenus().subscribe((res: Menu[]) => {
            this.source.load(res);
        });
    }

    reloadGrid(): void {
        this.load();
    }
}
