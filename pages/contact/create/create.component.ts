import { Component, OnInit,ViewChild } from '@angular/core';
import axios from 'axios';
import { NbToastrService } from '@nebular/theme';
import {   DxFormComponent } from 'devextreme-angular';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';


@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  @ViewChild(DxFormComponent) form:DxFormComponent
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
   

  constructor(private toastrService: NbToastrService,private fb: FormBuilder) {
    this.createForm();
   }

  private _regForm: FormGroup;
  public get regForm(): FormGroup {
    return this._regForm;
  }
  public set regForm(value: FormGroup) {
    this._regForm = value;
  }
   createForm() 
   {
     this.regForm = this.fb.group(
        { 
          name: ['', Validators.required ],
          email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._-]+@[a-z]+\.[a-z]{2,4}$")]],
        }
       );
   }
   submitted = false;


        

  ngOnInit() {
    


      }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onSubmit(formdata : any){

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
    if (formdata.value.name!="" && formdata.value.email!="") {
      axios
      .post("https://myybackend.herokuapp.com/contacts/",this.formsSelectedData)
      .then(response => {  
          this.showToast('top-right', 'success','Client Create SuccessFully');
          //formdata.reset();
          window.location.reload();

      })
      .catch(error => { 
      })
    }
    else{
      this.showToast('left-top','Error!','Please add Name, Email & Mobile No');
          //formdata.reset();
          //window.location.reload();
    }

  }

  showToast(position, status, message) {
    this.toastrService.show(
      status || 'Success',
      `${message}`
    )  
}


}


