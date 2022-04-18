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
    Type:"",
    Contact:"",
    Subject:"",
    CallPurpose: "",
    Account:"",
    CallType:"",
    CallStarttime:"",
    CallDuration:"",
    Description:"",
    CallResult:"",
    issueby:"",
    VisibleStatus:"",
  };

  constructor(httpClient: HttpClient,private listService: ListService,private customerListService: ContactListService,private toastrService: NbToastrService) { }

  ngOnInit() {
    this.getCustomerList();
  }

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
  //Type, Contact, Subject, CallPurpose, Account, CallType, CallStarttime, CallDuration, Description, CallResult,issueby
  onSubmit(formdata : any){

    this.formsSelectedData.Type = formdata.value.Type;
    this.formsSelectedData.Contact = formdata.value.Contact;
    this.formsSelectedData.Subject = formdata.value.Subject;
    this.formsSelectedData.CallPurpose = formdata.value.CallPurpose;
    this.formsSelectedData.Account = formdata.value.Account;
    this.formsSelectedData.CallType = formdata.value.CallType;
    this.formsSelectedData.CallStarttime = formdata.value.CallStarttime;
    this.formsSelectedData.CallDuration = formdata.value.CallDuration;
    this.formsSelectedData.Description = formdata.value.Description;
    this.formsSelectedData.CallResult = formdata.value.CallResult;
    this.formsSelectedData.issueby = formdata.value.issueby;
    this.formsSelectedData.VisibleStatus = '1';

    if (formdata.value.Contact!="" && formdata.value.Subject!="") {
      axios
      .post("https://myybackend.herokuapp.com/CallInformations/",this.formsSelectedData)
      .then(response => {  
          this.showToast('top-right', 'success','Call Information are saved SuccessFully');
          window.location.reload();

      })
      .catch(error => { 
      })
    }
    else{
      this.showToast('left-top', 'success','Please select Subject & Contact');
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
