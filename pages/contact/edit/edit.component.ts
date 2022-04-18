import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListService } from '../list/list.service';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
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

  formsSelectedData:any = {
    name:"",
    mobileno1:"",
    mobileno2:"",
    mobileno3:"",
    email: "",
    source:"",
    contactStatus:"",
    location:"",
    wishlocation:"",
    flatsize:"",
    budget:"",
    readyOngoing:"",
    handoverdate:"",
    forwhome:"",
    purpose:"",
    financeBy:"",
    issueby:"",
    leadDate:"",
    NewProspectusDate:"",
    OldProspectusDate:"",
    OpportunityDate:"",
    CustomerDate:"",
    VisibleStatus:"",
  };

  constructor(httpClient: HttpClient,private listService: ListService,private route: ActivatedRoute,private toastrService: NbToastrService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.listService.GetContact().subscribe(x=>{
      this.dataSource = x;

      this.dataSource.map((item) => {
        if(item.id === this.id){
          this.editDetails = item;
        }
        
       });
    })
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onUpdate(formdata : any){
    this.formsSelectedData.name = formdata.value.name;
    this.formsSelectedData.mobileno1 = formdata.value.mobileno1;
    this.formsSelectedData.mobileno2 = formdata.value.mobileno2;
    this.formsSelectedData.mobileno3 = formdata.value.mobileno3;
    this.formsSelectedData.email = formdata.value.email;
    this.formsSelectedData.source = formdata.value.source;
    this.formsSelectedData.contactStatus = formdata.value.contactStatus;
    this.formsSelectedData.location = formdata.value.location;
    this.formsSelectedData.wishlocation = formdata.value.wishlocation;
    this.formsSelectedData.flatsize = formdata.value.flatsize;
    this.formsSelectedData.budget = formdata.value.budget;
    this.formsSelectedData.readyOngoing = formdata.value.readyOngoing;
    this.formsSelectedData.handoverdate = formdata.value.handoverdate;
    this.formsSelectedData.forwhome = formdata.value.forwhome;
    this.formsSelectedData.purpose = formdata.value.purpose;
    this.formsSelectedData.financeBy = formdata.value.financeBy;
    this.formsSelectedData.issueby = formdata.value.issueby;
    if(formdata.value.contactStatus === 'Lead'){

      this.formsSelectedData.leadDate = new Date();
    }

    if(formdata.value.contactStatus === 'Prospect'){
      this.formsSelectedData.NewProspectusDate = new Date();
    }
    
    this.formsSelectedData.OldProspectusDate = formdata.value.OldProspectusDate;

    if(formdata.value.contactStatus === 'Opportunity'){
      this.formsSelectedData.OpportunityDate = new Date();
    }
    
    if(formdata.value.contactStatus === 'Customer'){
      this.formsSelectedData.CustomerDate = new Date();
    }
    
    this.formsSelectedData.VisibleStatus = '1';

    axios
      .put(`https://myybackend.herokuapp.com/contacts/${this.id}`,this.formsSelectedData)
      .then(response => {  
          this.showToast('top-right', 'success','Client Update SuccessFully');

      })
      .catch(error => { 
      })


  }

  showToast(position, status, message) {
    this.toastrService.show(
      status || 'Success',
      `${message}`
    )  
}

}
