import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListService } from '../list/list.service';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ListService as ContactListService } from '../../contact/list/list.service';
import axios from 'axios';

@Component({
  selector: 'ngx-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  dataSource: any = {};
  sub:any;
  id:any;
  editDetails:any=[];

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

  constructor(httpClient: HttpClient,private listService: ListService,private customerListService: ContactListService,private route: ActivatedRoute,private toastrService: NbToastrService) { }
  // constructor(httpClient: HttpClient,private listService: ListService,private customerListService: ContactListService,private toastrService: NbToastrService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.listService.Getcallinfo().subscribe(x=>{
      this.dataSource = x;
      this.dataSource.map((item) => {
        if(item.id === this.id){
          this.editDetails = item;
        }
        console.log(this.editDetails);
       });
    })

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
    console.log(this.customerList);
  }

  onUpdate(formdata : any){
    //
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

    if (formdata.value.title!="" && formdata.value.Contact!="") {
      axios
      .put(`https://myybackend.herokuapp.com/CallInformations/${this.id}`,this.formsSelectedData)
      .then(response => {  
          this.showToast('top-right', 'success','Call Info Update SuccessFully');
          //formdata.reset();
          window.location.reload();

      })
      .catch(error => { 
      })
    }
    else{
      this.showToast('left-top', 'success','Please select Title & Contact');
          //formdata.reset();
          window.location.reload();
    }
    //
  }

  showToast(position, status, message) {
    this.toastrService.show(
      status || 'Success',
      `${message}`
    )  
}

}
