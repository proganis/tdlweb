import { Component } from '@angular/core';
import { LocationService } from '../../location/location.service';
import { OrganizationService } from '../organization.service';
import { Organization } from '../organization';
import { FormSubmitEvent } from '../../../@common/form-submit.event';
import { ToastService } from '../../../@core/service/toast.service';
import { OrgTypeService } from '../../admin/orgtype/orgtype.service';
import { OrgType } from '../../admin/orgtype/orgtype';

@Component({
    selector: 'ngx-organization-create',
    styleUrls: ['./create.component.scss'],
    templateUrl: './create.component.html',
})
export class OrganizationCreateComponent extends FormSubmitEvent {

    org: Organization;
    orgTypes: any[];

    opts: any = {
        idField: 'id',
        useCheckbox: false,
    };

    orgs: any;

    locations: any;

    constructor(
        private locService: LocationService,
        public orgService: OrganizationService,
        private orgTypeService: OrgTypeService,
        public toaster: ToastService) {
        super(orgService, toaster);
        this._reset();
    }
    _loadLocations() {
        this.locService.getTree().subscribe((res) => { this.locations = res; });
    }
    _loadOrgs() {
        this.orgService.getTree().subscribe((res) => { this.orgs = res; });
    }
    _loadOrgTypes() {
        this.orgTypeService.getAll().subscribe((res: OrgType[]) => {
            res.map(o => this.orgTypes.push({ id: o.id, name: o.name }));
        });
    }
    onActivate(event) {
        this.org.parentId = event.node.data.id;
    }
    onDeActivate(event) {
        this.org.parentId = null;
    }
    onLocActivate(event) {
        this.org.locationId = event.node.data.id;
    }
    onLocDeActivate(event) {
        this.org.locationId = null;
    }
    onSubmit() {
        if (this.org.locationId == null) {
            alert('Please select Location!');
            return;
        }
        if (this.orgs.length > 0 && this.org.parentId == null) {
            alert('Please select Parent Organisation');
            return;
        }
        super.submit(this.org);
    }
    _reset(): void {
        this.org = new Organization();
        this.org.active = true;
        this.orgTypes = [];
        this._loadOrgs();
        this._loadLocations();
        this._loadOrgTypes();
    }
}
