import { Component } from '@angular/core';
import { Menu } from '../menu';
import { FormSubmitEvent } from '../../../@common/form-submit.event';
import { MenuService } from '../menu.service';
import { ToastService } from '../../../@core/service/toast.service';
import { ModuleService } from '../../module/module.service';
import { Module } from '../../module/module';
import { NbToastrService } from '@nebular/theme';
import axios from 'axios';

@Component({
    selector: 'ngx-menu-create',
    styleUrls: ['./create.component.scss'],
    templateUrl: './create.component.html',
})
export class MenuCreateComponent extends FormSubmitEvent {

    formsSelectedData:any = {
        icon:"",
        link:"",
        module_id:"",
        sort_order: "",
        name:""
      };

    menu: Menu;
    menus: any;
    modules: any;

    constructor(public service: MenuService, public toaster: ToastService, private moduleService: ModuleService,private toastrService: NbToastrService,) {
        super(service, toaster);
        this._reset();
    }
    loadModules() {
        this.moduleService.getActive().subscribe((res: Module[]) => {
            res.map(m => this.modules.push({ id: m.id, name: m.name, }));
        });
    }
    onModuleChange(moduleId) {
        this.menus = [];
        this.loadMenuList(moduleId);
    }
    loadMenuList(moduleId: number) {
        this.service.getListByModuleId(moduleId).subscribe((res: Menu[]) => {
            res.map(m => { this.menus.push({ id: m.id, title: m.title, }); });
        });
    }
    onSubmit() {

        console.log("onSubmit");
        if (this.menu.moduleId === 0) {
            alert('Please Select Module.');
            return;
        }
        //super.submit(this.user);


        this.formsSelectedData.icon = this.menu.icon;
        this.formsSelectedData.module_id = this.menu.moduleId;
        this.formsSelectedData.sort_order = this.menu.sortOrder;
        this.formsSelectedData.name = this.menu.title;
        this.formsSelectedData.link = this.menu.moduleId;

        if (this.menu.title!="" && this.menu.link!="") {
          axios.post("https://myybackend.herokuapp.com/module_menus/",this.formsSelectedData)
          .then(response => {  
            this.showToast('top-right', 'success','Module Menus are saved SuccessFully');
            window.location.reload(); 
          })
          .catch(error => { 
          })
        }
        else{
          this.showToast('left-top', 'success','Please select title,link');
              //formdata.reset();
              window.location.reload();
        }
        //super.submit(this.menu);
    }

    showToast(position, status, message) {
        this.toastrService.show(
          status || 'Success',
          `${message}`
        )  
    }
    _reset(): void {
        this.menu = new Menu();
        this.menu.active = true;
        this.menus = [];
        this.modules = [];
        this.loadModules();
    }
}
