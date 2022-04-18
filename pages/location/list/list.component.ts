import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { ActiveModel } from '../../../@core/models';
import { LocationService } from '../location.service';
import { Locations } from '../location';
import { IDModel } from '../../../@core/models';
import { ToastService } from '../../../@core/service/toast.service';
import { InlineGridEvents } from '../../../@common/inline-grid.events';

@Component({
    selector: 'ngx-location-list',
    templateUrl: './list.component.html',
    styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class LocationListComponent extends InlineGridEvents {


    settings = {
        mode: 'inline',
        pager: {
            perPage: 10,
        },
        actions: {
            add: false,
            edit: true,
            delete: true,
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
            abbrEng: {
                title: 'Abbr Eng',
                type: 'string',
            },
            abbrBang: {
                title: 'Abbr Bang',
                type: 'string',
            },
            keyWord: {
                title: 'Keyword',
                type: 'number',
            },
            serialNo: {
                title: 'Serial No.',
                type: 'number',
            },
            remarks: {
                title: 'Remarks',
                type: 'number',
            },
            active: ActiveModel,
        },
    };

    source: LocalDataSource = new LocalDataSource();

    constructor(public service: LocationService, public toaster: ToastService) {
        super(service, toaster);
        this.load();

    }

    load(): void {
        this.service.getAll().subscribe((res: Locations[]) => {
            this.source.load(res);
        });
    }

    reloadGrid(): void {
        this.load();
    }

}
