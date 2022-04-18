import { Component, OnInit, ViewChild } from '@angular/core';
import { ValidPriceSet } from './validpriceSet';
import { FormSubmitEvent } from '../../../@common/form-submit.event';
import axios from 'axios';
import { NbToastrService } from '@nebular/theme';
import { isString } from 'util';
import { isDate } from 'util';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'ngx-price-set',
  templateUrl: './price-set.component.html',
  styleUrls: ['./price-set.component.scss']
})
export class PriceSetComponent implements OnInit {

    add: boolean = true
    vpriceset= new ValidPriceSet();
    projects=new Array();
    units=new Array();
    tempdetails=new Array();
    priceinfo=new Array();
    selectedUnit:string="";
    selectedUnitName:string="Select A Unit"
    selectedFloor:number;
    selectedForDelete:string=""
    selectedProjectId:string="";
    selectedProjectName:string="Select a Project";
    tempUnsoldFloor=new Array();
    unsoldFloor=new Array();
    setpro1:boolean=false;
    showPriceTable:boolean=false;
    tempPriceInfo=new Array();
    editedItem:string="";
    action:number=3;
    validationResult:boolean=false;
   
    formsSelectedData:any = {
      projectid:"",
      projectname:"",
      unitid:"",
      
      fromdate:"",
      todate: "",
      price:"",
    };

    ngOnInit(): void {
      this.add===true;
      axios
            .get("https://myybackend.herokuapp.com/projectInformations/")
            .then(response => {     
                this.projects=response.data;
            })
            .catch(error => {               
            })

      this.getAllPriceData(); 
    }

    getAllPriceData(){
      
      axios
          .get("https://myybackend.herokuapp.com/pricesetups/")
          .then(response => {        
              this.tempPriceInfo=response.data;
              this.getSelectedPriceData();
          })
          .catch(error => {           
          })
    }

    selectProject(id:string){
      this.unsoldFloor=new Array();
      this.tempUnsoldFloor=new Array();
      for(let i=0; i<this.projects.length;i++){
          if(this.projects[i].id==id){
              this.selectedProjectId=this.projects[i].id;                                     
              this.selectedProjectName=this.projects[i].ProjectName;
              break;             
          }
      }
      this.getProjectDetails();
      
      this.selectedUnitName="Select A Unit";  
        
    }    

    getProjectDetails(){

          this.showPriceTable=false;
          if(this.selectedProjectId!=""){
              for(let i=0; i<this.projects.length; i++){
                  if(this.projects[i].id==this.selectedProjectId){                                     
                      this.tempUnsoldFloor=this.projects[i].projectDetails;
                      this.setpro1=true;               
                  }
              }


              if(this.setpro1==true){
                for(let i=0; i<this.tempUnsoldFloor.length; i++){
                    if(this.tempUnsoldFloor[i].Status!="Sold"){                
                        this.unsoldFloor.push(this.tempUnsoldFloor[i]);
                    }
                }
              }

              if( this.unsoldFloor.length>0){  
                     
                     this.getSelectedPriceData();
                  
             }
          }
    }

    selectUnit(floor:number, unit:string ){
      this.showPriceTable=false;
      this.selectedFloor=floor;
      this.selectedUnit=unit;
      this.selectedUnitName=this.selectedFloor+"-"+this.selectedUnit
      this.getSelectedPriceData();        
    }


    getSelectedPriceData(){ 
      this.priceinfo=new Array();
      if(this.selectedProjectId!="" && this.selectedUnit!=""){
          if(this.tempPriceInfo.length>0){
              let unitfloor=this.selectedFloor+"-"+this.selectedUnit;
              for(let i=0; i<this.tempPriceInfo.length;i++){
                  if(this.tempPriceInfo[i].projectid==this.selectedProjectId && this.tempPriceInfo[i].unitid==unitfloor){
                      this.priceinfo.push(this.tempPriceInfo[i]);
                  }
              }    
          }         
      }

      if(this.priceinfo.length>0){
          this.showPriceTable=true;
      }
    }
    onSubmit(formdata:any,flag:number) {
      this.validationResult=false;
      this.formsSelectedData.projectid=this.selectedProjectId;
      this.formsSelectedData.projectname=this.selectedProjectName;
      this.formsSelectedData.unitid=this.selectedFloor+"-"+this.selectedUnit;
      this.formsSelectedData.fromdate=new Date(formdata.fromDate);
      this.formsSelectedData.todate=new Date(formdata.toDate);
      this.formsSelectedData.price=formdata.price;
      this.validationResult =this.dateValidationCheck(this.formsSelectedData);
      if(this.validationResult==true){
         this.formsSelectedData.fromdate=this.dateFormat(this.formsSelectedData.fromdate);
         this.formsSelectedData.todate=this.dateFormat(this.formsSelectedData.todate);

         if(flag==3){
              axios
                  .post("https://myybackend.herokuapp.com/pricesetups/",this.formsSelectedData)
                  .then(response => {  
                      this.showToast('top-right', 'success','Price Set up SuccessFully');
                      this.priceinfo=new Array();
                      this.vpriceset= new ValidPriceSet(); 
                      this.getAllPriceData();
                      this.validationResult=false;

                  })
                  .catch(error => { 
                  })
             
         }
         else if(flag==1){
              axios
                  .put(`https://myybackend.herokuapp.com/pricesetups/${this.editedItem}`,this.formsSelectedData)
                  .then(response => {  
                      this.showToast('top-right', 'success','Price Updated SuccessFully');
                      this.vpriceset= new ValidPriceSet();
                      this.action=3;
                      this.priceinfo=new Array();
                      this.validationResult=false;
                      this.getAllPriceData();
                  })
                  .catch(error => {      
                  })
              
         }        
           
      }

      else{

        this.showToast('top-right', 'warning','Wrong Date Selected');
      }   
    }

    selctForDelete(id){
      this.selectedForDelete=id;
    }
    deleteSelcted(){
          axios
              .delete(`https://myybackend.herokuapp.com/pricesetups/${this.selectedForDelete}`)
              .then(response => {  
                  this.showToast('top-right', 'success','selected item deleted suceesfully');
                  this.priceinfo=new Array();
                  this.vpriceset=new ValidPriceSet();
                  this.getAllPriceData();
                  this.selectedForDelete="";
                  this.action=3;
                  
              })
              .catch(error => {      
              }) 
    }
    
    editSelcted(id:string){
      this.add===false;
       for(let i=0;i<this.priceinfo.length;i++){
          if(this.priceinfo[i].id==id){
            this.editedItem=id;         
            let tempTodate=this.priceinfo[i].todate.split("-");
            let finaTodate=tempTodate[2]+'-'+tempTodate[1]+'-'+tempTodate[0];
            let tempFromDate=this.priceinfo[i].fromdate.split("-");
            let finalFromDate=tempFromDate[2]+'-'+tempFromDate[1]+'-'+tempFromDate[0];
            console.log(isString(this.priceinfo[i].todate));
            this.vpriceset= new ValidPriceSet(this.priceinfo[i].id,this.priceinfo[i].projectname, this.priceinfo[i].unitid, finalFromDate, finaTodate, this.priceinfo[i].price);
            this.action=1;
            break;
          }
       }
    }

    dateValidationCheck(item):boolean{     
      console.log(isString(item.fromdate))
      if(this.priceinfo.length>0){
          for(let i=0;i<this.priceinfo.length;i++){
            let tempTodate=this.priceinfo[i].todate.split("-");
            let finaTodate=tempTodate[2]+'-'+tempTodate[1]+'-'+tempTodate[0];
            let tempFromDate=this.priceinfo[i].fromdate.split("-");
            let finalFromDate=tempFromDate[2]+'-'+tempFromDate[1]+'-'+tempFromDate[0];
            let fromdate=new Date(finalFromDate);
            let todate=new Date(finaTodate);
            if(fromdate < item.fromdate && todate > item.todate ){
                return false;
                break; 
            }        
          }

          return true;
      }
      else{
        return true;

      }

    }
    
    dateFormat(item:Date): String{     
      let dd:any = item.getDate();
      let mm:any = item.getMonth() + 1;
      let yyyy = item.getFullYear();
      if (dd < 10) {
         dd = '0' + dd;
      } 
      if (mm < 10) {
         mm = '0' + mm;
      }     
      let today =  dd+ '-' + mm + '-' + yyyy;
      return today;        
    }

    showToast(position, status, message) {
        this.toastrService.show(
          status || 'Success',
          `${message}`
        )  
    }

    dateCheck(fromDate:string, toDate:string):boolean{
   
      let fromdate=new Date(fromDate);
      let todate=new Date(toDate);
   
      if(fromdate > todate){
         return true;
   
      }else{
         return false;
   
      }
   
   
   }
   

    


    constructor(private toastrService: NbToastrService) { }

}
