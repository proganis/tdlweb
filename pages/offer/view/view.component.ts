import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListService } from '../list/list.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  dataSource: any = {};
  sub:any;
  id:any;
  viewDetails:any=[];


  constructor(httpClient: HttpClient,private listService: ListService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.listService.GetOffer().subscribe(x=>{
      this.dataSource = x;

      this.dataSource.map((item) => {
        if(item.id === this.id){
          this.viewDetails = item;
        }
        
       });
    })
  }

}
