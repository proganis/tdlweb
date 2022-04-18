import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListService } from '../list/list.service';
import { NbToastrService } from '@nebular/theme';
import { ListService as ContactListService } from '../../contact/list/list.service';
import { ListService as ProjectListService } from '../../project/list/list.service';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'ngx-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  dataSource: any = {};
  customerDataSource : any = {};
  customerList: any = [];

  projectDataSource : any = {};
  projectList: any = [];
  projectDetails;

  sub:any;
  id:any;
  editDetails:any=[];

  formsSelectedData:any = {
    ContactId:"",
    ProjectId:"",
    ProjectAddress:"",
    UnitId:"",
    Direction: "",
    FloorNo:"",
    FloorArea:"",
    HandOverTime:"",
    RatePerSft:"",
    UnitCost:"",
    ParkingCost:"",
    TotalCost:"",
    BookingMoney:"",
    BookingDate:"",
    DownPayment:"",
    DownPaymentDate:"",
    InstallpaymentType:"",
    NoOfInstallpayment:"",
    AmountPerInstallment:"",
    Additioncost:"",
    ReserveFund:"",
    UtilityConnectionCost:"",
    RegistrationCost:"",
    OthersCost:"",
    VisibleStatus:"",
    BookingMoneyRate:"",
    DownPaymentRate:"",

  };

  constructor(httpClient: HttpClient,private listService: ListService,private customerListService: ContactListService,private projectListService: ProjectListService,private toastrService: NbToastrService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.listService.GetOffer().subscribe(x=>{
      this.dataSource = x;

      this.dataSource.map((item) => {
        if(item.id === this.id){
          this.editDetails = item;
        }
        
       });
    })

    this.getCustomerList();
    this.getProjectList();
  }

  ProjectAddress: any;
  FloorNo:any;
  FloorArea:any;
  RatePerSft:any;
  UnitCost:any;
  ParkingCost:any;
  TotalCost:any;
  BookingMoney:any;
  DownPayment:any;
  NoOfInstallpayment:any;
  AmountPerInstallment:any;
  BookingDate:any;
  DownPaymentDate:any;
  HandOverTime:any;
  DownPaymentRate:any;
  BookingMoneyRate:any;

  getCustomerList(){

    this.customerListService.GetContact().subscribe(item=>
        {
          this.customerDataSource=item;
          this.customerDataSource.forEach(customerItem => {
            this.customerList.push(customerItem.name)
        })
      console.log(this.customerList);
      }
    )
  }

  getProjectList(){

    this.projectListService.GetProject().subscribe(item=>
        {
          this.projectDataSource=item;
          this.projectDataSource.forEach(projectItem => {
            this.projectList.push(projectItem.ProjectName);
        })
      }
    )
  }

  onChange($event){
    let project = this.projectDataSource.find(o => o.ProjectName === $event);
    this.projectDetails = project.projectDetails;
    return this.projectDetails;
  }

calculateDownPayment()
{
  var totalCostValue=parseFloat(this.editDetails.UnitCost)+parseFloat(this.editDetails.ParkingCost);
  var rate=this.editDetails.DownPaymentRate;
  var downpaymentValue=(totalCostValue*rate)/100;
  this.editDetails.DownPayment=downpaymentValue;
}

calculateBookingMoney()
{
  var totalCostValue=parseFloat(this.editDetails.UnitCost)+parseFloat(this.editDetails.ParkingCost);
  var rate=this.editDetails.BookingMoneyRate;
  var bookingMoneyValue=(totalCostValue*rate)/100;
  this.editDetails.BookingMoney=bookingMoneyValue;
}

onBlurMethod1()
{
  var totalCostValue=parseFloat(this.editDetails.UnitCost)+parseFloat(this.editDetails.ParkingCost);
  this.editDetails.TotalCost=totalCostValue;
  // var bookingMoneyValue=(totalCostValue*10)/100;
  // var downpaymentValue=(totalCostValue*15)/100;
  // this.BookingMoney=bookingMoneyValue;
  // this.DownPayment=downpaymentValue;
}
onBlurMethod2()
{
  var totalAmount=parseFloat(this.editDetails.TotalCost)-parseFloat(this.editDetails.BookingMoney)-parseFloat(this.editDetails.DownPayment);
  var totalinstallment=parseFloat(this.editDetails.NoOfInstallpayment);
  var amounntPerInstallmentResult=totalAmount/totalinstallment;
  this.editDetails.AmountPerInstallment=amounntPerInstallmentResult;
}

  onUpdate(formdata : any){

    //
    this.formsSelectedData.ContactId = formdata.value.ContactId;
    this.formsSelectedData.ProjectId = formdata.value.ProjectId;
    this.formsSelectedData.ProjectAddress = formdata.value.ProjectAddress;
    this.formsSelectedData.UnitId = formdata.value.UnitId;
    this.formsSelectedData.Direction = formdata.value.Direction;
    this.formsSelectedData.FloorNo = formdata.value.FloorNo;
    this.formsSelectedData.FloorArea = formdata.value.FloorArea;
    // this.formsSelectedData.FloorArea = 12333;
    this.formsSelectedData.HandOverTime = formdata.value.HandOverTime;
    this.formsSelectedData.RatePerSft = formdata.value.RatePerSft;
    this.formsSelectedData.UnitCost = formdata.value.UnitCost;
    this.formsSelectedData.ParkingCost = formdata.value.ParkingCost;
    this.formsSelectedData.TotalCost = formdata.value.TotalCost;
    this.formsSelectedData.BookingMoney = formdata.value.BookingMoney;
    // this.formsSelectedData.BookingMoney = 1233554;
    this.formsSelectedData.BookingDate = formdata.value.BookingDate;
    this.formsSelectedData.DownPayment = formdata.value.DownPayment;
    this.formsSelectedData.DownPaymentRate=formdata.value.DownPaymentRate;
    this.formsSelectedData.BookingMoneyRate=formdata.value.BookingMoneyRate;
    this.formsSelectedData.DownPaymentDate = formdata.value.DownPaymentDate;
    this.formsSelectedData.InstallpaymentType = formdata.value.InstallpaymentType;
    this.formsSelectedData.NoOfInstallpayment = formdata.value.NoOfInstallpayment;
    this.formsSelectedData.AmountPerInstallment = formdata.value.AmountPerInstallment;
    this.formsSelectedData.Additioncost = formdata.value.Additioncost;
    this.formsSelectedData.ReserveFund = formdata.value.ReserveFund;
    this.formsSelectedData.UtilityConnectionCost = formdata.value.UtilityConnectionCost;
    this.formsSelectedData.RegistrationCost = formdata.value.RegistrationCost;
    this.formsSelectedData.OthersCost = formdata.value.OthersCost;
    this.formsSelectedData.VisibleStatus = '1';

    if (formdata.value.ContactId!="" && formdata.value.ProjectId!="") {
      axios
      .put(`https://myybackend.herokuapp.com/offerinfos/${this.id}`,this.formsSelectedData)
      .then(response => {  
          this.showToast('top-right', 'success','Offer  Update SuccessFully');
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

}
