import { Component } from '@angular/core';
import { ModuleService } from '../module.service';
import { Module } from '../module';

import { ToastService } from '../../../@core/service/toast.service';
import { FormSubmitEvent } from '../../../@common/form-submit.event';

@Component({
    selector: 'ngx-module-create',
    styleUrls: ['./create.component.scss'],
    templateUrl: './create.component.html',
})
export class ModuleCreateComponent extends FormSubmitEvent {

    newMac: string;
    newIP: string;
    mod: Module;

    constructor(public service: ModuleService, public toaster: ToastService) {
        super(service, toaster);
        this._reset();
    }
    _reset() {
        this.mod = new Module();
        this.mod.active = true;
        this.mod.ipAccessList = [];
        this.mod.macAccessList = [];
        this.newMac = null;
        this.newIP = null;
    }
    onIPAdd() {
        if (this.newIP != null) {
            this.mod.ipAccessList.push(this.newIP);
            this.newIP = null;
        }
    }
    onIpChange(event) {
        console.log(event);
    }
    onMacAdd() {
        if (this.newMac != null) {
            this.mod.macAccessList.push(this.newMac);
            this.newMac = null;
        }
    }
    onSubmit() {
        super.submit(this.mod);
    }
}
