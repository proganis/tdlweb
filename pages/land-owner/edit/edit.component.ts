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
  };

  constructor(httpClient: HttpClient,private listService: ListService,private route: ActivatedRoute,private toastrService: NbToastrService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.listService.GetLandOwner().subscribe(x=>{
      this.dataSource = x;

      this.dataSource.map((item) => {
        if(item.id === this.id){
          this.editDetails = item;
        }
        console.log(this.editDetails);
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

    //
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
      .put(`https://myybackend.herokuapp.com/landowners/${this.id}`,this.formsSelectedData)
      .then(response => {  
          this.showToast('top-right', 'success','Land Owner Update SuccessFully');
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
    //
  }

  showToast(position, status, message) {
    this.toastrService.show(
      status || 'Success',
      `${message}`
    )  
}

}
