// import { Component, OnInit, ViewChild } from '@angular/core';
// import { User } from '../user';
// import { FormSubmitEvent } from '../../../@common/form-submit.event';
// import { UserService } from '../user.service';
// import { OrganizationService } from '../../organization/organization.service';
// import { ToastService } from '../../../@core/service/toast.service';
// import { ModuleService } from '../../module/module.service';
// import { Module } from '../../module/module';
// import { RoleService } from '../../role/role.service';
// import { Role } from '../../../role/role';
// import { Router, ActivatedRoute, ParamMap } from '@angular/router';

// @Component({
//     selector: 'ngx-users-create',
//     styleUrls: ['./create.component.scss'],
//     templateUrl: './create.component.html',
// })
// @Component({
//   selector: 'ngx-offer',
//   templateUrl: './user.component.html',
//   styleUrls: ['./user.component.scss']
// })
// export class UserComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from './user';
import { FormSubmitEvent } from './../../@common/form-submit.event';
import { UserService } from './user.service';
import { OrganizationService } from './../organization/organization.service';
import { ToastService } from './../../@core/service/toast.service';
import { ModuleService } from './../module/module.service';
import { Module } from './../module/module';
import { RoleService } from './../role/role.service';
import { Role } from './../role/role';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import axios from 'axios';
import { NbToastrService } from '@nebular/theme';

@Component({
    selector: 'ngx-users-create',
    styleUrls: ['./user.component.scss'],
    templateUrl: './user.component.html',
})
export class UserComponent extends FormSubmitEvent implements OnInit {


  formsSelectedData:any = {
    full_name:"",
    govt_id:"",
    name:"",
    password: "",
    org_id:"",
    email:"",
    superviseId:""
  };

    user: User;
    orgs: any;
    modules: any;
    roles: any;
    selectedRoles: any[];
    setSelRoles: [];
    preSelRoles: any = [];

    @ViewChild('roleDD') roleDD: any;

    @ViewChild('modDD') modDD: any;


    opts: any = {
        idField: 'id',
        useCheckbox: true,
        useTriState: false,
    };

    constructor(
        public service: UserService,
        public toaster: ToastService,
        private toastrService: NbToastrService,
        private orgService: OrganizationService,
        private moduleService: ModuleService,
        private roleService: RoleService,
        private router: Router,
        private route: ActivatedRoute) {

        super(service, toaster);

        this.user = new User();
        this.user.rolesIds = [];
        this.roles = [];
        this.modules = [];
        //this.loadModules();
        //this.loadOrgs();
        //this.loadAllRoles();

        //this._reset();
    }
    loadModules() {
        console.log("loadModules");
        this.moduleService.getActive().subscribe((res: Module[]) => {
            res.map(m => this.modules.push({ id: m.id, name: m.name }));
        });
    }
    loadOrgs() {
        console.log("loadOrgs");
        this.orgService.getTree().subscribe((res) => { this.orgs = res; });
    }
    loadAllRoles() {
        console.log("loadAllRoles");
        this.roles = [];
        this.roleService.GetRoles().subscribe((res: Role[]) => {
            res.map(r => this.roles.push({ id: r.id, name: r.role_name }));
            this.user.rolesIds = this.preSelRoles;
        });
    }
    loadRoles(moduleid: number[]) {
        console.log(moduleid[0]);
        this.roles = [];
        if (moduleid.length > 0) {
            this.roleService.GetRoles().subscribe((res: Role[]) => {
                console.log(res);
                res.map(r => {
                    if (moduleid[0]===r.module_id) {
                        this.roles.push({ id: r.id, name: r.role_name})
                    }
                    
                });
                this.user.rolesIds = this.preSelRoles;
            });
            // this.roleService.getRolesByModule(moduleId).subscribe((res: Role[]) => {
            //     res.map(r => this.roles.push({ id: r.id, name: r.name }));
            //     this.user.rolesIds = this.preSelRoles;
            // });
        }
    }
    onModuleSelect(event) {
        console.log("onModuleSelect");
        this.loadRoles(event);
    }
    onSubmit() {
        console.log("onSubmit");
        if (this.user.moduleIds.length === 0) {
            alert('Please Select Module.');
            return;
        }
        if (this.user.rolesIds.length === 0) {
            alert('Please Select Role.');
            return;
        }
        //super.submit(this.user);


        this.formsSelectedData.full_name = this.user.fullName;
        this.formsSelectedData.govt_id = this.user.govtId;//formdata.value.govtId;
        this.formsSelectedData.name = this.user.name;
        this.formsSelectedData.password = this.user.password;
        this.formsSelectedData.org_id = this.user.org_id;
        this.formsSelectedData.email = this.user.email;
        this.formsSelectedData.superviseId = "admin";
        //user-roles
        //user-modules
        if (this.user.password!="" && this.user.email!=false && this.user.name!="") {

          axios.post("https://myybackend.herokuapp.com/users/",this.formsSelectedData)
          .then(response => {  
            //this.showToast('top-right', 'success','Users are saved SuccessFully');
            //window.location.reload();

            this.user.rolesIds.forEach(element => {
                axios.post("https://myybackend.herokuapp.com/user-roles/",{
                userid: response.data.user._id,
                roleid: element
                })
                .then(response => {
                    this.showToast('top-right', 'success','User Role saved SuccessFully');
                    window.location.reload();
                })
                .catch(error => {})
                });    

                this.user.moduleIds.forEach(element => {
                axios.post("https://myybackend.herokuapp.com/user-modules/",
                    {
                        userid:response.data.user._id,
                        moduleid:element
                    })
                    .then(response => {  
                        //this.showToast('top-right', 'success','Users Module are saved SuccessFully');
                        //window.location.reload();
                
                    })
                    .catch(error => { 
                    })
                });  
          })
          .catch(error => { 
          })
        }
        else{
          this.showToast('left-top', 'success','Please select password, email & name');
              //formdata.reset();
              // window.location.reload();
        }
    }
    
    _reset(): void {

        //console.log("_reset");
        if (this.user && this.user.editing) {
            this.router.navigateByUrl('/pages/users/list');
        }
        this.user = new User();
        this.user.rolesIds = [];
        this.roles = [];
        this.modules = [];
        this.loadModules();
        this.loadOrgs();
        this.loadAllRoles();
        
    }
    ngOnInit(): void {
        this.user.editing = false;
        this.route.paramMap.subscribe((params: ParamMap) => {
            if (params.get('id'))
                this.service.getOne(params.get('id')).subscribe((u: User) => {
                    this.user = u;
                    this.user.password = null;
                    this.onModuleSelect(u.moduleIds.join(','));
                    this.preSelRoles = u.rolesIds;
                   this.user.editing = true;
                });
        });
        this.loadModules();
        //this.loadOrgs();
        //this.loadAllRoles();
    }

    showToast(position, status, message) {
    this.toastrService.show(
      status || 'Success',
      `${message}`
    )  
}
}

