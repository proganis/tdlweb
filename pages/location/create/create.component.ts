import { Component } from '@angular/core';
import { Locations } from '../location';
import { LocationService } from '../location.service';
import { ToastService } from '../../../@core/service/toast.service';
import { FormSubmitEvent } from '../../../@common/form-submit.event';

@Component({
    selector: 'ngx-location-create',
    styleUrls: ['./create.component.scss'],
    templateUrl: './create.component.html',
})
export class LocationCreateComponent extends FormSubmitEvent {

    loc: Locations;

    opts: any = {
        idField: 'id',
        useCheckbox: false,
    }

    locations: any = [];

    constructor(public service: LocationService, public toaster: ToastService) {
        super(service, toaster);
        this._reset();
    }

    _loadLocations() {
        this.service.getTree().subscribe((res) => { this.locations = res });
    }

    _reset() {
        this.loc = new Locations();
        this.loc.active = true;
        this._loadLocations();
    }

    onActivate(event) {
        this.loc.parentId = event.node.data.id;
    }

    onSubmit() {
        if (this.locations.length > 0 && !this.loc.parentId) {
            alert('Please select Parent Location!');
            return;
        }
        super.submit(this.loc);
    }
}
