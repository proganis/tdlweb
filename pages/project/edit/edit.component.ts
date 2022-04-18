import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListService } from '../list/list.service';
import { ListService as LandownerListService } from '../../land-owner/list/list.service';
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
  projectDetails:any = [];
  landownerDataSource:any=[];
  landownerList:any=[];

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
      {Floor:"",
      SaleDate:"",
      UnitId:"",
      UnitDirection:'',
      Size:"",
      Rate:"",
      Status:""}
    ],
    VisibleStatus:"",
  };

  constructor(httpClient: HttpClient,private landownerListService: LandownerListService,private listService: ListService,private route: ActivatedRoute,private toastrService: NbToastrService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.listService.GetProject().subscribe(x=>{
      this.dataSource = x;

      this.dataSource.map((item) => {
        if(item.id === this.id){
          this.editDetails = item;
        }
        
       });
       this.projectDetails = this.editDetails.projectDetails;
    })

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

  onUpdate(formdata : any){

    //
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
    this.formsSelectedData.projectDetails=this.projectDetails;
    this.formsSelectedData.VisibleStatus = '1';

    console.log(this.formsSelectedData.HandoverDate);
    if (formdata.value.name!="" && formdata.value.mobileno1!="") {
      axios
      .put(`https://myybackend.herokuapp.com/projectInformations/${this.id}`,this.formsSelectedData)
      .then(response => {  
          this.showToast('top-right', 'success','Project  Update SuccessFully');
          //formdata.reset();
          window.location.reload();

      })
      .catch(error => { 
      })
    }
    else{
      this.showToast('left-top', 'success','Please select Project Name & HandOver date');
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

addNewInput(){
  this.projectDetails.push({
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
  this.projectDetails.splice(i, 1);
}

}
