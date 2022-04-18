import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { ListService } from './list.service';
import axios from 'axios';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  dataSource: any = {};
  selectedId: any;

  constructor(httpClient: HttpClient,private listService: ListService,private toastrService: NbToastrService) {
     
   }

  ngOnInit() {
    this.listService.GetContact().subscribe(x=>{
      this.dataSource = x;
      console.log(this.dataSource);
    })
  }

  onDeleteSubmit(formData:any){
    this.selectedId = formData.value.id
    axios
    .delete(`https://myybackend.herokuapp.com/contacts/${this.selectedId}`)
    .then(response => {  
        this.showToast('top-right', 'success','selected item deleted suceesfully');
    })
    .catch(error => {      
    }) 
    console.log(formData.value);
  }

  showToast(position, status, message) {
    this.toastrService.show(
      status || 'Success',
      `${message}`
    )  
}

}
