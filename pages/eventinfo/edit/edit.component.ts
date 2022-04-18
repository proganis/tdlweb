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

  constructor(httpClient: HttpClient,private listService: ListService,private customerListService: ContactListService,private route: ActivatedRoute,private toastrService: NbToastrService) { }
  // constructor(httpClient: HttpClient,private listService: ListService,private customerListService: ContactListService,private toastrService: NbToastrService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.listService.Geteventinfo().subscribe(x=>{
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
      .put(`https://myybackend.herokuapp.com/eventInformations/${this.id}`,this.formsSelectedData)
      .then(response => {  
          this.showToast('top-right', 'success','Event Info Update SuccessFully');
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
