import { Component, OnInit, ViewChild } from '@angular/core';
import { ModuleService } from '../../module/module.service';
import { Module } from '../../module/module';
import { MenuService } from '../../menu/menu.service';
import { ToastService } from '../../../@core/service/toast.service';
import { TreeComponent, ITreeOptions } from 'angular-tree-component';
import { Menu } from '../menu';

@Component({
    selector: 'ngx-menu-manage',
    styleUrls: ['./manage.component.scss'],
    templateUrl: './manage.component.html',
})
export class MenuManageComponent implements OnInit {

    modules: any;
    moduleId: number;
    menus: any;
    expandTree: boolean = false;
    menu: Menu;
    dataSource: any = {};

    @ViewChild('tree')
    private tree: TreeComponent;

    opts: ITreeOptions = {
        idField: 'id',
        useCheckbox: false,
        useTriState: false,
        allowDrag: true,
    };

    constructor(
        public toaster: ToastService,
        private moduleService: ModuleService,
        private menuService: MenuService) {
        this.loadModules();
    }

    ngOnInit(): void {
        this.menuService.GetMenus().subscribe(x=>{
            this.dataSource = x;
            })
    }

    loadModules() {
        this.menus = [];
        this.modules = [];
        this.moduleService.getActive().subscribe((res: Module[]) => {
            res.map(m => this.modules.push({ id: m.id, name: m.name }));
        });
    }
    loadMenuTree(moduleId: number) {
        var loadmenu=[];
        this.dataSource.map((item) => {
            if(item.module_id=== moduleId){
                loadmenu.push(item);
            }
            });
            this.menus=loadmenu;
        // this.menuService.getTreeByModuleId(moduleId).subscribe((res) => {
        //     this.menus = res;
        // });
    }
    onModuleChange(event) {
        this.loadMenuTree(event);
    }
    onMoveNode($event) {
            this.menu = new Menu();
            this.menu.moduleId = this.moduleId;
            this.menu.id = $event.node.id;
            this.menu.parentId = $event.to.parent.id;
            this.menu.sortOrder = $event.to.index;
            this.menuService.saveMenuOrdering(this.menu).subscribe(() => {
                this.toaster.info({title: 'Done', message: 'Menu order updated successfully!'});
            });
    }
}
