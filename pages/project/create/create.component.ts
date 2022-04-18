import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { NbToastrService } from '@nebular/theme';
import { ListService as LandownerListService } from '../../land-owner/list/list.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  landownerDataSource : any = {};
  landownerList: any = [];

  formsSelectedData:any = {
    ProjectName:"",
    ProjectAddress:"",
    ProjectType:"",
    LoName:"",
    LandArea: "",
    Storied:"",
    ApproveDate:"",
    TakingDate:"",
    TotalUnit:"",
    TdlUnit:"",
    LoUnit:"",
    TotalParking:"",
    TdlParking:"",
    LoParking:"",
    HandoverDate:"",
    HandoverDateClient:"",
    GraceTime:"",
    HandoverDateafterGrace:"",
    CompensationStart:"",
    LoRate:"",
    ClientRate:"",
    projectDetails:[
      // {Floor:"",
      // SaleDate:"",
      // UnitId:"",
      // Size:"",
      // Rate:"",
      // Status:""}
    ],
    VisibleStatus:"",
  };

  public inputProjectDetails: any[] = [{
    Floor: '',
    UnitId: '',
    UnitDirection:'',
    Size: '',
    Rate: '',
    SaleDate:"",
    Status:'Not Sold'
  }];
  TdlUnit: any;
  TotalUnit:any;
  LoUnit:any;

  TotalParking:any;
  TdlParking:any;
  LoParking:any;

  ApproveDate:any;
  TakingDate:any;
  HandoverDate:any;
  CompensationStart:any;

  constructor(private landownerListService: LandownerListService,private toastrService: NbToastrService) { }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  
  onBlurMethod(){
    var lounit=this.TotalUnit-this.TdlUnit;
    this.LoUnit=lounit;
   }

   onBlurMethod1(){
    var loparking=this.TotalParking-this.TdlParking;
    this.LoParking=loparking;
   }
   
   modelChanged($event){
     var approvedate=this.ApproveDate;
     var TakingDate=this.TakingDate;
     var HandoverDate=this.HandoverDate;
     if (approvedate!="" && TakingDate!="") {
       if ($event<approvedate) {
         alert("Approve date must be less then Hand over Date")
       }
       if ($event<TakingDate) {
        this.HandoverDate="";
        alert("Taking date from land owner must be less then Hand over Date")
       }
     }
     else
     {
      this.HandoverDate="";
      alert("Please input Approve date/Taking date from Land Owner ")
     }
   }

   modelChanged1($event){

    var HandoverDate=this.HandoverDate;
    if (HandoverDate!="") {
      if ($event<HandoverDate) {
        this.showToast('top-right', 'success','Handover Date date must be less then Compensation Start Date');
      }
    }
    else
    {
     alert("Please input Hand Over Date")
    }
  }

  handler(e){
    alert(e.target.value);
  }

  ngOnInit() {
    //this.getLandOwnerList();
    this.landownerListService.GetLandOwner().subscribe(item=>
      {
        this.landownerDataSource=item;
        this.landownerDataSource.forEach(landownerItem => {
          this.landownerList.push(landownerItem.name)
      })      
    }
  )
  }

  // getLandOwnerList(){

  //     this.landownerListService.GetLandOwner.subscribe(item=>
  //       {
  //         this.landownerDataSource=item;
  //         this.landownerDataSource.forEach(customerItem => {
  //           this.landownerList.push(customerItem.name)
  //       })
        
  //     }
  //   )
  // }

  onSubmit(formdata : any){
    this.formsSelectedData.ProjectName = formdata.value.ProjectName;
    this.formsSelectedData.ProjectAddress = formdata.value.ProjectAddress;
    this.formsSelectedData.ProjectType = formdata.value.ProjectType;
    this.formsSelectedData.LoName = formdata.value.LoName;
    this.formsSelectedData.LandArea = formdata.value.LandArea;
    this.formsSelectedData.Storied = formdata.value.Storied;
    this.formsSelectedData.ApproveDate = formdata.value.ApproveDate;
    this.formsSelectedData.TakingDate = formdata.value.TakingDate;
    this.formsSelectedData.TotalUnit = formdata.value.TotalUnit;
    this.formsSelectedData.TdlUnit = formdata.value.TdlUnit;
    this.formsSelectedData.LoUnit = formdata.value.LoUnit;
    this.formsSelectedData.TotalParking = formdata.value.TotalParking;
    this.formsSelectedData.TdlParking = formdata.value.TdlParking;
    this.formsSelectedData.LoParking = formdata.value.LoParking;
    this.formsSelectedData.HandoverDate = formdata.value.HandoverDate;
    this.formsSelectedData.HandoverDateClient = formdata.value.HandoverDateClient;
    this.formsSelectedData.GraceTime = formdata.value.GraceTime;
    this.formsSelectedData.HandoverDateafterGrace = formdata.value.HandoverDateafterGrace;
    this.formsSelectedData.CompensationStart = formdata.value.CompensationStart;
    this.formsSelectedData.LoRate = formdata.value.LoRate;
    this.formsSelectedData.ClientRate = formdata.value.ClientRate;

    this.inputProjectDetails.map((item) => {
      // this.formsSelectedData.projectDetails[0].Floor = item.Floor;
      // this.formsSelectedData.projectDetails[0].UnitId = item.UnitId;
      // this.formsSelectedData.projectDetails[0].Size = item.Size;
      // this.formsSelectedData.projectDetails[0].Rate = item.Rate;
      // this.formsSelectedData.projectDetails[0].Status = 'Not Sold';
      this.formsSelectedData.projectDetails.push(item);

    });
    this.formsSelectedData.VisibleStatus = '1';
    console.log(formdata.value.CompensationStart);
    this.formsSelectedData.HandoverDateafterGrace = formdata.value.CompensationStart;
    console.log(this.formsSelectedData.CompensationStart);

    axios
      .post("https://myybackend.herokuapp.com/projectInformations",this.formsSelectedData)
      .then(response => {  
          this.showToast('top-right', 'success','Project Create SuccessFully');
          //formdata.reset();
          window.location.reload();

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

  addNewInput(){
    this.inputProjectDetails.push({
      Floor: '',
      UnitId: '',
      UnitDirection:'',
      Size: '',
      Rate: '',
      SaleDate:"",
      Status:'Not Sold'
    });
  }

  removeInput(i: number) {
    this.inputProjectDetails.splice(i, 1);
  }
  

}
