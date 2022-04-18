import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';
import { ListService } from '../list/list.service';
import { ListService as ContactListService } from '../../contact/list/list.service';
import {   DxFormComponent } from 'devextreme-angular';


@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  dataSource: any = {};

  customerDataSource : any = {};
  customerList: any = [];

  formsSelectedData:any = {
    title:"",
    location:"",
    Allday:"",
    fromdate: "",
    todate:"",
    Host:"",
    participants:"",
    contact:"",
    account:"",
    repeat:"",
    issueby:"",
    description:"",
    VisibleStatus:"",
  };

  switchEd: boolean = false;

  constructor(httpClient: HttpClient,private listService: ListService,private customerListService: ContactListService,private toastrService: NbToastrService) { }

  ngOnInit() {
    this.getCustomerList();
  }

  // okClicked(e){
  //   if(e.value == false) {
  //     this.switchEd = true
  //   } else {
  //     this.switchEd = false
  //   }
  //   // console.log(e);
  // }

  getCustomerList(){

    this.customerListService.GetContact().subscribe(item=>
        {
          this.customerDataSource=item;
          this.customerDataSource.forEach(customerItem => {
            this.customerList.push(customerItem.name)
        })
        
      }
    )
  }
  //TaskOwner, Subject, DueDate, Contact, Account, Status, Prority, SendEmail, Repeat, Description,issueby
  onSubmit(formdata : any){

    this.formsSelectedData.title = formdata.value.title;
    this.formsSelectedData.location = formdata.value.location;
    this.formsSelectedData.Allday = formdata.value.Allday;
    this.formsSelectedData.fromdate = formdata.value.fromdate;
    this.formsSelectedData.todate = formdata.value.todate;
    this.formsSelectedData.Host = formdata.value.Host;
    this.formsSelectedData.participants = formdata.value.participants;
    this.formsSelectedData.contact = formdata.value.contact;
    this.formsSelectedData.account = formdata.value.account;
    this.formsSelectedData.repeat = formdata.value.repeat;
    this.formsSelectedData.description = formdata.value.description;

    this.formsSelectedData.issueby = formdata.value.issueby;
    this.formsSelectedData.VisibleStatus = '1';

    if (formdata.value.title!="" && formdata.value.Contact!="") {
      axios
      .post("https://myybackend.herokuapp.com/eventInformations/",this.formsSelectedData)
      .then(response => {  
          this.showToast('top-right', 'success','Event Information are saved SuccessFully');
          window.location.reload();

      })
      .catch(error => { 
      })
    }
    else{
      this.showToast('left-top', 'success','Please select title & Contact');
          //formdata.reset();
          window.location.reload();
    }


  }

  showToast(position, status, message) {
    this.toastrService.show(
      status || 'Success',
      `${message}`
    )  
}

}
