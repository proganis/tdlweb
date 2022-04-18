import { Component, OnInit, ViewChild } from '@angular/core';
import { Role } from '../role';
import { RoleService } from '../role.service';
import { ModuleService } from '../../module/module.service';
import { Module } from '../../module/module';
import { MenuService } from '../../menu/menu.service';
import { FormSubmitEvent } from '../../../@common/form-submit.event';
import { ToastService } from '../../../@core/service/toast.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TreeComponent, ITreeOptions } from 'angular-tree-component';
import { DialogService } from '../../../@core/service';
import { NbToastrService } from '@nebular/theme';
import axios from 'axios';

@Component({
    selector: 'ngx-users-create',
    styleUrls: ['./create.component.scss'],
    templateUrl: './create.component.html',
})
export class RoleCreateComponent extends FormSubmitEvent implements OnInit {

    role: Role;
    modules: any;
    menus: any;
    selectedMenuIds: any[];
    preSelModule: any;
    expandTree: boolean = false;



    @ViewChild('tree')
    private tree: TreeComponent;

    opts: ITreeOptions = {
        idField: 'id',
        useCheckbox: true,
        useTriState: false,
    };

    formsSelectedData:any = {
        created_at:"",
        created_by:"",
        last_modified_by:"",
        last_modified_at: "",
        active:"",
        module_id:"",
        role_name:"",
      };

    constructor(public roleService: RoleService,
        public toaster: ToastService,
        public dialog: DialogService,
        private toastrService: NbToastrService,
        private moduleService: ModuleService,
        private menuService: MenuService,
        private router: Router,
        
        private route: ActivatedRoute) {
        super(roleService, toaster);
        this.role = new Role();
        this.role.active = true;
        this.role.menuIds = null;
        this.loadModules();
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            if (params.get('id'))
                this.service.getOne(params.get('id')).subscribe((r: Role) => {
                    this.role = r;
                    this.preSelModule = r.moduleId;
                    this.loadMenuTree(r.moduleId);
                });
        });
    }

    loadModules() {
        this.menus = [];
        this.modules = [];
        this.selectedMenuIds = [];
        this.moduleService.getActive().subscribe((res: Module[]) => {
            res.map(m => this.modules.push({ id: m.id, name: m.name }));
            this.role.moduleId = this.preSelModule;
        });
    }

    //
    // this.dataSource.map((item) => {
    //     if(item.module_id=== moduleId){
    //         this.menus.push(item);
    //     }
    //     });
    //
    loadMenuTree(moduleId: number) {
        //this.menuService.getTreeByModuleId(moduleId).subscribe((res) => {
        this.menuService.GetMenus().subscribe((res) => {
            var menus1 = [];
            res.map(m =>{
                if(m.module_id=== moduleId){
                menus1.push({id:m.id,name:m.name,children:[]});
            }
            });
            //this.menus = res;
            
            this.menus = menus1;

            setTimeout(() => {
                this.tree.treeModel.expandAll();
                this.setPreSelected();
            });

        });
    }
    setPreSelected() {
        if (this.role.menuIds !== null) {
            this.role.menuIds.forEach(id => {
                const node = this.tree.treeModel.getNodeById(id);
                if (node) {
                    node.setIsSelected(true);
                }
            });
        }
    }
    onModuleChange(event) {
        this.role.menuIds = null;
        this.loadMenuTree(event);
    }
    onSelect(event) {
        this.selectedMenuIds.push(event.node.data.id);
    }
    onDeselect(event) {
        this.selectedMenuIds.splice(this.selectedMenuIds.indexOf(event.node.data.id), 1);
    }
    onSubmit() {

       // module_id:"",
       //role_name:"",

    this.formsSelectedData.module_id = this.role.moduleId;
    this.formsSelectedData.role_name = this.role.name;
    // this.formsSelectedData.Allday = formdata.value.Allday;
    // this.formsSelectedData.fromdate = formdata.value.fromdate;
    // this.formsSelectedData.todate = formdata.value.todate;
    // this.formsSelectedData.Host = formdata.value.Host;
    // this.formsSelectedData.participants = formdata.value.participants;
    // this.formsSelectedData.contact = formdata.value.contact;
    // this.formsSelectedData.account = formdata.value.account;
    // this.formsSelectedData.repeat = formdata.value.repeat;
    // this.formsSelectedData.description = formdata.value.description;

    // this.formsSelectedData.issueby = formdata.value.issueby;
    // this.formsSelectedData.VisibleStatus = '1';


        if (this.role.moduleId == null) {
            this.dialog.alert('Please Select Module!');
            return;
        }
        if (this.selectedMenuIds.length === 0) {
            this.dialog.alert('Please select at least one menu.');
            return;
        }
        this.role.menuIds = this.selectedMenuIds;
        console.log(this.role.menuIds);
        
        if (this.role.moduleId!=null && this.role.name!="") {
            var responseid;
            axios
            .post("https://myybackend.herokuapp.com/roles/",this.formsSelectedData)
            .then(response => {
                this.role.menuIds.forEach(element => {
                    axios.post("https://myybackend.herokuapp.com/role-menus/",{
                    roleid: response.data.id,
                    menuid: element
                    })
                    .then(response => {
                        this.showToast('top-right', 'success','Menu saved SuccessFully');
                        window.location.reload();
                    })
                    .catch(error => {})
                    });
                //this.showToast('top-right', 'success','Role are saved SuccessFully');
                //window.location.reload();
            })
            .catch(error => { 
            })
          }
          else{
            this.showToast('left-top', 'success','Please select role & model name');
                //formdata.reset();
                window.location.reload();
          }

        //super.submit(this.role);
    }

    showToast(position, status, message) {
        this.toastrService.show(
          status || 'Success',
          `${message}`
        )  
    }
    _reset() {
        this.router.navigateByUrl('/pages/roles/list');
    }
    selectAll() {
        this._toggle(true);
    }
    deSelectAll() {
        this._toggle(false);
    }
    _toggle(val: boolean) {
        this.tree.treeModel.nodes.forEach(
            (node) => this._toggleChildren(this.tree.treeModel.getNodeById(node.id), val));
    }
    _toggleChildren(node: any, val: boolean) {
        node.setIsSelected(val);
        if (node.hasChildren) {
            node.children.forEach((child: any) => this._toggleChildren(child, val));
        }
    }
}
