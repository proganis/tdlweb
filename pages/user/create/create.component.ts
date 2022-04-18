import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../user';
import { FormSubmitEvent } from '../../../@common/form-submit.event';
import { UserService } from '../user.service';
import { OrganizationService } from '../../organization/organization.service';
import { ToastService } from '../../../@core/service/toast.service';
import { ModuleService } from '../../module/module.service';
import { Module } from '../../module/module';
import { RoleService } from '../../role/role.service';
import { Role } from '../../role/role';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'ngx-users-create',
    styleUrls: ['./create.component.scss'],
    templateUrl: './create.component.html',
})
export class UserCreateComponent extends FormSubmitEvent implements OnInit {

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
        private orgService: OrganizationService,
        private moduleService: ModuleService,
        private roleService: RoleService,
        private router: Router,
        private route: ActivatedRoute) {

        super(service, toaster);
        this._reset();
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
        this.roleService.getAllRoles().subscribe((res: Role[]) => {
            res.map(r => this.roles.push({ id: r.id, name: r.name }));
            this.user.rolesIds = this.preSelRoles;
        });
    }
    loadRoles(moduleId: number[]) {
        console.log("loadRoles");
        this.roles = [];
        if (moduleId.length > 0) {
            this.roleService.getRolesByModule(moduleId).subscribe((res: Role[]) => {
                res.map(r => this.roles.push({ id: r.id, name: r.name }));
                this.user.rolesIds = this.preSelRoles;
            });
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
        super.submit(this.user);
    }
    
    _reset(): void {

        console.log("_reset");
        if (this.user && this.user.editing) {
            this.router.navigateByUrl('/pages/users/list');
        }
        this.user = new User();
        this.user.rolesIds = [];
        this.roles = [];
        this.modules = [];
        //this.loadModules();
       // this.loadOrgs();
        // this.loadAllRoles();
        
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
    }
}
