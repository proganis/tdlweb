import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import axios from 'axios';
import {   DxFormComponent } from 'devextreme-angular';


@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  formsSelectedData:any = {
    name:"",
    mobileno1:"",
    mobileno2:"",
    email: "",
    landowneraddress:"",
    landownerstatus:"",
    location:"",
    locationaddress:"",
    landsize:"",
    landsizewithroad:"",
    facing:"",
    noofowners:"",
    ratio:"",
    cashamount:"",
    noofstoreyed:"",
    issueby:"",
    VisibleStatus:"",

    //name, mobileno1, mobileno2, email, landowneraddress, landownerstatus, location, landsize, landsizewithroad, facing, noofowners, ratio, cashamount
  };

  constructor(private toastrService: NbToastrService) { }

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
    this.formsSelectedData.email = formdata.value.email;
    this.formsSelectedData.landowneraddress = formdata.value.landowneraddress;
    this.formsSelectedData.landownerstatus = formdata.value.landownerstatus;
    this.formsSelectedData.location = formdata.value.location;
    this.formsSelectedData.locationaddress = formdata.value.locationaddress;
    this.formsSelectedData.landsize = formdata.value.landsize;
    this.formsSelectedData.landsizewithroad = formdata.value.landsizewithroad;
    this.formsSelectedData.facing = formdata.value.facing;
    this.formsSelectedData.noofowners = formdata.value.noofowners;
    this.formsSelectedData.ratio = formdata.value.ratio;
    this.formsSelectedData.cashamount = formdata.value.cashamount;
    this.formsSelectedData.noofstoreyed = formdata.value.noofstoreyed;
    this.formsSelectedData.issueby = formdata.value.issueby;
    this.formsSelectedData.VisibleStatus = '1';
    if (formdata.value.name!="" && formdata.value.mobileno1!="") {
      axios
      .post("https://myybackend.herokuapp.com/landowners/",this.formsSelectedData)
      .then(response => {  
          this.showToast('top-right', 'success','Land Owner Create SuccessFully');
          //formdata.reset();
          window.location.reload();

      })
      .catch(error => { 
      })
    }
    else{
      this.showToast('left-top', 'success','Please select Name & Mobile No');
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
