import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListService } from '../list/list.service';
import { ListService as ContactListService } from '../../contact/list/list.service';
import { ListService as ProjectListService } from '../../project/list/list.service';
import { NbToastrService } from '@nebular/theme';
import { find } from 'rxjs/operators';
import axios from 'axios';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  [x: string]: any;

  dataSource: any = {};

  customerDataSource : any = {};
  customerList: any = [];

  projectDataSource : any = {};
  projectList: any = [];
  projectDetails;

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
    BookingMoneyRate:"",
    BookingDate:"",
    DownPayment:"",
    DownPaymentRate:"",
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
  };

  
  constructor(httpClient: HttpClient,private listService: ListService,private customerListService: ContactListService,private projectListService: ProjectListService,private toastrService: NbToastrService) { }

  ngOnInit() {
    this.listService.GetOffer().subscribe(x=>{
      this.dataSource = x;
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

  modelChanged($event){
    var HandoverDate=this.HandOverTime;
   if (HandoverDate!="") {
     if ($event>HandoverDate) {
       alert("Handover Date date must be greater then Booking Date")
     }
   }
   else
   {
    alert("Please input Hand Over Date")
   }
  }

  modelChanged1($event){
   var HandoverDate=this.HandOverTime;
   if (HandoverDate!="") {
     if ($event>HandoverDate) {
       alert("Handover Date date must be greater then Downpayment Date")
     }
   }
   else
   {
    alert("Please input Hand Over Date")
   }
 }

  onSubmit(formdata : any){
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
    this.formsSelectedData.BookingMoneyRate=formdata.value.BookingMoneyRate;
    // this.formsSelectedData.BookingMoney = 1233554;
    this.formsSelectedData.BookingDate = formdata.value.BookingDate;
    this.formsSelectedData.DownPayment = formdata.value.DownPayment;
    this.formsSelectedData.DownPaymentRate=formdata.value.DownPaymentRate;
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

    console.log(this.formsSelectedData);

    axios
      .post("https://myybackend.herokuapp.com/offerinfos/",this.formsSelectedData)
      .then(response => {  
          this.showToast('top-right', 'success','Offer Create SuccessFully');
          //formdata.reset();
          window.location.reload();

      })
      .catch(error => { 
      })


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

  onChange(item){
    let items = item.value;
    let project = this.projectDataSource.find(o => o.ProjectName === items);
    console.log(project);
    this.ProjectAddress=project.ProjectAddress;
    this.projectDetails = project.projectDetails;
    return this.projectDetails;
    // console.log(items);
  }

  onChangeUnitId($event){
    var splitted = $event.split("-");
    console.log(splitted);
    if (splitted.length>0) {
      var FloorNo = splitted[0];
    }
    if (splitted.length>2) {
      var rate = splitted[2];
    }
    if (splitted.length>3) {
      var size = splitted[3];
    }

    if (splitted.length>4) {
      var unitDirection = splitted[4];
    }
    console.log()
    this.FloorNo=FloorNo;
    this.FloorArea=size;
    this.RatePerSft=rate;
    this.Direction=unitDirection;
    
    if(size!=""&& rate!="")
      {
          var unitCostValue=parseFloat(size)*parseFloat(rate);
      }
      else
      {
          var unitCostValue=0.0;
      }
      this.UnitCost=unitCostValue;
    // unitCostValue=unitCostValue.toString();
    // this.setState({UnitCost: unitCostValue})
    // console.log(this.projectDetails);
  }

onBlurMethod1()
{
  var totalCostValue=parseFloat(this.UnitCost)+parseFloat(this.ParkingCost);
  this.TotalCost=totalCostValue;
  // var bookingMoneyValue=(totalCostValue*10)/100;
  // var downpaymentValue=(totalCostValue*15)/100;
  // this.BookingMoney=bookingMoneyValue;
  // this.DownPayment=downpaymentValue;
}

calculateDownPayment()
{
  var totalCostValue=parseFloat(this.UnitCost)+parseFloat(this.ParkingCost);
  var rate=this.DownPaymentRate;
  var downpaymentValue=(totalCostValue*rate)/100;
  this.DownPayment=downpaymentValue;
}

calculateBookingMoney()
{
  var totalCostValue=parseFloat(this.UnitCost)+parseFloat(this.ParkingCost);
  var rate=this.BookingMoneyRate;
  var bookingMoneyValue=(totalCostValue*rate)/100;
  this.BookingMoney=bookingMoneyValue;
}

onBlurMethod2()
{
  var totalAmount=parseFloat(this.TotalCost)-parseFloat(this.BookingMoney)-parseFloat(this.DownPayment);
  var totalinstallment=parseFloat(this.NoOfInstallpayment);
  var amounntPerInstallmentResult=totalAmount/totalinstallment;
  this.AmountPerInstallment=amounntPerInstallmentResult;
}

  showToast(position, status, message) {
    this.toastrService.show(
      status || 'Success',
      `${message}`
    )  
  }


}
