import { Component, OnInit } from '@angular/core';
import { AssignPriceSetService } from '../assign-price-set.service'
import axios from 'axios';
import { TouchSequence } from 'selenium-webdriver';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-assigning',
  templateUrl: './assigning.component.html',
  styleUrls: ['./assigning.component.scss']
})
export class AssigningComponent implements OnInit {
    selectedProjectId: string="";
    selectedProjectName: string="Select A project";

    selectedSalesManId:string="";
    selectedSalesManName:string="Select A Sales Man";
    selectedAssignId="";

    projects= new Array();
    allsalesMan= new Array();
    allAssign=new Array();
    tempUnsoldFloor=new Array();
    unsoldFloor=new Array();

    setpro1:boolean=false;

    sm1=new Array();
    sm2=new Array();
    sm3=new Array();

    table:boolean=false;
    table2:boolean=false;
    selectStatus:string="not yet start";

    temporayselect=new Array();
    result:boolean=false;
    
    showassign:boolean=false;

    showMessage:boolean=false;
    insertUpdate:boolean=false;
    
    insObject1:any = {
      salesperson:"",
      salespersonname:"",
      projectlist: [
        {
          projectid:"",
          title:"",
          unitdetails:[
            {
             Floor:"",
             UnitId:"",
             SaleDate:"",
             Status:""
            }
         ]
        }
      ] 
    };

    ngOnInit(): void {
       this.loadSalesMen()
       this.loadProject();
       this.loadAssign();

       
    }
    loadSalesMen(){
      this.allsalesMan=this.assignPriceSetService.getAllSalesMan();
    }

    loadProject(){
        axios
          .get("https://myybackend.herokuapp.com/projectInformations/")
          .then(response => {                 
              this.projects=response.data;
              this.loadAssign();
          })
          .catch(error => {        
          })
    }

    loadAssign(){
        axios
          .get("https://myybackend.herokuapp.com/UnitIdAssigns/")
          .then(response => {  
              this.allAssign=response.data;
              this.work();

          })
          .catch(error => {
          })
     }

    selectSalesMan(smid:string,name:string){
      this.table=false;
      this.table2=false;
      this.selectedAssignId="";
      if(this.selectedSalesManId==smid){
        this.unChanged();
      }else{
        this.showMessage=false;  
        this.table2=false;
        this.table=false;
        this.selectedSalesManId=smid;
        this.selectedSalesManName=name;
        this.work(); 
        
      }        
            
    }

    selectProject(id:string){
      this.table=false;
      this.table2=false;
      if(this.selectedProjectId==id){
          this.unChanged();
      }
      else{
        this.showMessage=false;  
        for(let i=0; i<this.projects.length;i++){
            if(this.projects[i].id==id){
                this.selectedProjectId=this.projects[i].id;                                     
                this.selectedProjectName=this.projects[i].ProjectName; 
            }
        }
        
        this.work();
        
      }
      
    }


    selectedFloor(item:any,values:any){
          if(this.selectStatus=="start"){
            if(values.currentTarget.checked==true){
              this.temporayselect.push(item);
          }
          else if(values.currentTarget.checked==false){
              var index = this.temporayselect.indexOf(item);
              if (index > -1) {
              this.temporayselect.splice(index, 1);
            }
          }
      }
    }

    unChanged(){

     
      this.sm3=new Array();
      this.unsoldFloor=new Array();

      setTimeout(()=>{   
        this.work();
     }, 1000);

    }
    
    work(){

      if(this.selectedSalesManId!="" && this.selectedProjectId!=""){
          this.unsoldFloor=new Array();
          this.sm3=new Array();
          this.tempUnsoldFloor=new Array();
          this.sm2=new Array();
          this.sm1=new Array();
          this.showassign=false;
          this.temporayselect=new Array();
          this.insertUpdate=false;
          this.insObject1.projectlist[0].unitdetails=new Array();
            this.selectStatus="start";
            for(let i=0; i<this.projects.length; i++){
                if(this.projects[i].id==this.selectedProjectId){                                     
                    this.tempUnsoldFloor=this.projects[i].projectDetails;
                    this.setpro1=true;   
                }
            }         
            if(this.setpro1==true){
              for(let i=0; i<this.tempUnsoldFloor.length; i++){
                  //if(this.tempUnsoldFloor[i].Status!="Sold"){
                  if(this.tempUnsoldFloor[i].Status!="Sold" && this.tempUnsoldFloor[i].Floor!="" && this.tempUnsoldFloor[i].UnitId!=""){
                      
                      this.unsoldFloor.push(this.tempUnsoldFloor[i]);
                  }
              }
            }
            for(let i=0;i<this.allAssign.length;i++){
                if(this.allAssign[i].salesperson==this.selectedSalesManId){
                    this.sm1.push(this.allAssign[i]);
                }

            }
           
            
            for(let i=0; i<this.sm1.length; i++){       
                    for(let j=0;j<this.sm1[i].projectlist.length;j++){
                      if(this.sm1[i].projectlist[j].projectid==this.selectedProjectId){
                            this.sm2=this.sm1[i].projectlist[j].unitdetails;
                            this.selectedAssignId=this.sm1[i].id;
                            break;
                      }
                    }                   
                    
            }

            
            for(let i=0;i<this.sm2.length;i++){
                if(this.sm2[i].Status!="Sold"){
                    this.sm3.push(this.sm2[i]);
                    //this.unsoldFloor.push(this.sm2[i]);
                    this.temporayselect.push(this.sm2[i]);
                }

            }            
            for(let i=0;i<this.sm3.length;i++){
                for(let j=0; j<this.unsoldFloor.length;j++){
                   if(this.sm3[i].Floor==this.unsoldFloor[j].Floor && this.sm3[i].UnitId==this.unsoldFloor[j].UnitId){
                      this.insertUpdate=true;
                      this.unsoldFloor.splice(j,1);               
                   }
                }
            }
            
                if(this.unsoldFloor.length>0){
                  this.table=true;
                }
                if(this.sm3.length>0){
                  this.table2=true;
                }  
                   
            if(this.table==true || this.table2 ==true){
               this.showassign=true;
           }   
           
      }
    }


  showResult(){
      this.result=true;   
      this.insObject1.salesperson=this.selectedSalesManId;
      this.insObject1.salespersonname=this.selectedSalesManName;
      this.insObject1.projectlist[0].projectid=this.selectedProjectId;
      this.insObject1.projectlist[0].title=this.selectedProjectName;
      this.insObject1.projectlist[0].unitdetails=new Array();
     for(let i= 0; i<this.temporayselect.length; i++){
          let tempobject:any={     
            Floor:"",
            UnitId:"",
            SaleDate:"",
            Status:""
          }
          tempobject.Floor=this.temporayselect[i].Floor;
          tempobject.UnitId=this.temporayselect[i].UnitId;
          tempobject.SaleDate=this.temporayselect[i].SaleDate;
          tempobject.Status=this.temporayselect[i].Status;   
          this.insObject1.projectlist[0].unitdetails.push(tempobject);
    }

    if(this.insObject1.projectlist[0].unitdetails.length==0){
        if(this.selectedAssignId==""){
           this.showToast('top-right', 'warning', 'Submitted Without Selecting');
        }
        else{

          axios
            .delete(`https://myybackend.herokuapp.com/UnitIdAssigns/${this.selectedAssignId}`)
            .then(response => {  
                this.showToast('top-right', 'success','SalesMan has been disselected from projects');
                this.loadProject();
                this.loadAssign();
                this.work();
            })
            .catch(error => {   
            })
             
        }

    }else{
      

          if(this.insertUpdate==false){

            axios
                .post("https://myybackend.herokuapp.com/UnitIdAssigns/",this.insObject1)
                .then(response => {  
                    this.showToast('top-right', 'success', 'SalesMan has been Assigned with new project');
                    this.loadProject();
                    this.loadAssign();
                    this.work();


                })
                .catch(error => {   
                })

                

        }else if(this.insertUpdate==true){
          
            axios
                .put(`https://myybackend.herokuapp.com/UnitIdAssigns/${this.selectedAssignId}`,this.insObject1)
                .then(response => {  
                    this.showToast('top-right', 'success','Sales Man Assignings Changed');
                    this.loadProject();
                    this.loadAssign();
                    this.work();
                })
                .catch(error => {   
                })
              
        }
        
    }
     
     

     

  }
  constructor(private toastrService: NbToastrService,private assignPriceSetService: AssignPriceSetService) { }
  
  showToast(position, status, message) {
    this.toastrService.show(
      status || 'Success',
      `${message}`
    )  
  }

}
