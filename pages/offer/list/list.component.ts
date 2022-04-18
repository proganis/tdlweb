import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListService } from './list.service';
import { NbToastrService } from '@nebular/theme';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from "pdfmake/build/vfs_fonts";
import { ExpandOperator } from 'rxjs/internal/operators/expand';
import { Project } from '../../reports/model/project';
import { style } from '@angular/animations';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  dataSource: any = {};
  selectedId: any;
  message:any;
  sub:any;
  id:any;
  editDetails:any=[];
 

  constructor(httpClient: HttpClient,private listService: ListService,private toastrService: NbToastrService,private route: ActivatedRoute) { }

  ngOnInit() {
   
    this.listService.GetOffer().subscribe(x=>{
      this.dataSource = x;
    })
  }
  createPdf(datalist){

    // var fonts = {
    //   Roboto: {
    //     normal: 'fonts/Roboto-Regular.ttf',
    //     bold: 'fonts/Roboto-Medium.ttf',
    //     italics: 'fonts/Roboto-Italic.ttf',
    //     bolditalics: 'fonts/Roboto-MediumItalic.ttf'
    //   }
    // };

    // this.sub = this.route.params.subscribe(params => {
    //   this.id = params['id'];
    // });

    this.dataSource.map((item) => {
      if(item.id === datalist){
        this.editDetails = item;
      }
      
     });

    var SchedulesDetails: any[] = [];
    var noofinstallment=this.editDetails.NoOfInstallpayment;
    var amountperinstallment=this.editDetails.AmountPerInstallment;
    var intallmenttype=this.editDetails.InstallpaymentType;
    
    var bookingdownpayment=this.editDetails.BookingMoney+this.editDetails.DownPayment;
    var date=new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var startno=0;
    var j:number;
    //var paymenttype=this.InstallmentType;

         
  
    

    // pdfMake.tableLayouts = {
    //   exampleLayout: {
    //     hLineWidth: function (i: number, node: { table: { body: string | any[]; headerRows: any; }; }) {
    //       if (i === 0 || i === node.table.body.length) {
    //         return 0;
    //       }
    //       return (i === node.table.headerRows) ? 0 : 1;
    //     },
    //     vLineWidth: function (i: any) {
    //       return 0;
    //     },
    //     hLineColor: function (i: number) {
    //       return i === 1 ? 'black' : '#aaa';
    //     },
    //     paddingLeft: function (i: number) {
    //       return i === 0 ? 0 : 8;
    //     },
    //     paddingRight: function (i: number, node: { table: { widths: string | any[]; }; }) {
    //       return (i === node.table.widths.length - 1) ? 0 : 8;
    //     }
    //   }
    // };

    for (let j= 1; j <= noofinstallment; j++)
    {
        var d = new Date(year, month + j, day).toLocaleDateString('en-GB');
        SchedulesDetails.push({Installment:"installment-"+j, Amount:amountperinstallment, Date:d})
    }
  
  function buildTableBody(data, columns) {
      var body = [];
  
      body.push(columns);
  
      data.forEach(function(row) {
          var dataRow = [];
  
          columns.forEach(function(column) {
              dataRow.push(row[column].toString());
          })
  
          body.push(dataRow);
      });
  
      return body;
  }
  
  function table(data, columns) {
      return {
              fontSize:8,
              table: {
                  headerRows: 1,
                  widths: [150, 150, 150],
                  body: buildTableBody(data, columns)
              }
      };
  }


    var docDefinition = {
      content: [

        {
          text: 'TEAM Developers Limited',
          style: 'h1',
          marginTop:-20,
          alignment: 'center'
        },
       
        {
          text: '__________________________ Standard Offer Letter __________________________',
          alignment: 'center', 
          style: 'h2',
        },
        

        {
          style: 'margbtm', marginTop:5,
          columns: [
            { text:' Project Name', bold:true },
            {text: ':'+this.editDetails.ProjectId, bold:true }, '\n', { qr:':'+this.editDetails.UnitId, fit: '80', marginTop:5, alignment: 'center' } 

          ],
        },
        
        {
          style: 'margbtm', marginTop:-59,
            columns: [
            { text:'Project Address' },
            {text: ':'+this.editDetails.ProjectAddress }, '\n','\n'

          ],
        },

        {
          style: 'margbtm',
          columns: [

            { text:'Unit Id' },
            {text: ':'+this.editDetails.UnitId },'\n','\n'

          ],
        },

        {
          style: 'margbtm',
          columns: [

            { text:'Floor No' },
            {text: ':'+this.editDetails.FloorNo }, '\n','\n'

          ],
        }, 
        // {text:'Floor No:'+this.editDetails.FloorNo},

        {
          style: 'margbtm',
          columns: 
          [

            { text:'Floor Area' },
            {text: ':'+this.editDetails.FloorArea }, '\n','\n'

          ],
        }, 
        // {text:'Floor Area:'+this.editDetails.FloorArea},

        {
          style: 'margbtm',
          columns: 
          [

            { text:'Handover Time' },
            {text: ':'+this.editDetails.HandOverTime }, '\n','\n'

          ],
        },
        // {text:'Handover Time:'+this.editDetails.HandOverTime},

        {text:'Negotiated Price:', style: 'tblMargin' },

        {
          marginBottom:6, fontSize:8,
          table :
          { 
            widths: [230, 230],
            body: 
            [
              [
                {text: 'Particualars',  alignment: 'center', bold:true}, {text: 'Offer Price (Tk)', alignment: 'center', bold:true}],
              [
                {text:'Rate per sft:'}, {text: this.editDetails.RatePerSft,  alignment: 'right' }
              ],
              [
                {text:'Unit Cost:'}, {text: this.editDetails.UnitCost,  alignment: 'right' }
              ],
              
              [
                {text:'Parking Cost (Two):'}, {text: this.editDetails.ParkingCost,  alignment: 'right' }
              ],
              
              [
                {text:'Total Cost:', bold:true}, {text: this.editDetails.TotalCost, bold:true,  alignment: 'right' }
              ],
              
            ]
            
          }
        },

        // {text:'Rate per sft:'+this.editDetails.RatePerSft},

        // {text:'Unit Cost:'+this.editDetails.UnitCost},
        
        // {text:'Parking Cost:'+this.editDetails.ParkingCost},

        // {text:'Total Cost:'+this.editDetails.TotalCost},

        {text:"Booking Money + Down Payment:", style: 'tblMargin' },

        {
          marginBottom:6, fontSize:8,
          table :
          { 
            widths: [180, 15, 180, 65],
            body: 
            [
              // [
              //   {text: 'Particualars',  alignment: 'center', bold:true}, 'Tk', {text: 'Offer Price (Tk)', alignment: 'center', bold:true}],
              [
                {text:'Booking Money:'}, 'Tk', {text: this.editDetails.BookingMoney,  alignment: 'right' }, {text:'Date', alignment:'center'}
              ],
              [
                {text:'Down Payment:'}, 'Tk' ,{text: this.editDetails.DownPayment,  alignment: 'right' }, {text:'Date', alignment:'center'}
              ],
              
              [
                {text:'Parking Cost (Two):'}, 'Tk', {text: this.editDetails.ParkingCost,  alignment: 'right' }, {text:'Date', alignment:'center'}
              ],
              
              [
                {text:'Total Payment Booking + Down Payment', bold:true},'Tk', {text: bookingdownpayment, bold:true,  alignment: 'right' }, {text:'\n'}
              ],
              
            ]
            
          }
        },

        // {text:'Booking Money:'+this.editDetails.BookingMoney},

        // {text:'Down Payment:'+this.editDetails.DownPayment},

        // {
        //   text:"Total Payment Booking Money+Down Payment:"+bookingdownpayment
        // },

        // if you set the value of text to an array instead of a string, you'll be able
        // to style any part individually
        // { qr: 'text in QR' },
        
        { text: 'Installment Schedule:', style: 'tblMargin' },
        
        table( SchedulesDetails,['Installment','Amount','Date']),
           

        {
          style: 'margbtm', marginTop:4,
          columns: 
          [

            { text:"Total Payment = ", bold:true },
            {text: this.editDetails.TotalCost, bold:true } 

          ],
          
        },

        { 
          style: 'margbtm',
          columns: 
          [

            { text:"Other Cost(to be paid before handover):"},
            {text: '\n' },

          ],
          
        },

        // {text:'Other Cost(to be paid before handover):'},

        {
          style: 'margbtm',
          columns: 
          [

            { text:"Addition/Ommission:"},
            {text: this.editDetails.Additioncost},

          ],
          
        },

        // {text:'Addition/Ommission:'+this.editDetails.Additioncost},

        {
          style: 'margbtm',
          columns: 
          [

            { text:"Utility Connnection Cost:"},
            {text: this.editDetails.UtilityConnectionCost},

          ],
          
        },

        // {text:'Utility Connnection Cost:'+this.editDetails.UtilityConnectionCost},

        {
          style: 'margbtm',
          columns: 
          [

            { text:"Advance Service Charge:"},
            {text: this.editDetails.OthersCost},

          ],
          
        },

        // {text:'Advance Service Charge:'+this.editDetails.OthersCost},

        {
          style: 'margbtm',
          columns: 
          [

            { text:"Reserve Fund:"},
            {text: this.editDetails.ReserveFund},

          ],
          
        },

        // {text:'Reserve Fund:'+this.editDetails.ReserveFund},
        {
          fontSize:8,
          columns: 
          [

            { text:"Registration Cost:"},
            {text: this.editDetails.RegistrationCost},

          ],
          
        },
        // {text:'Registration Cost:'+this.editDetails.RegistrationCost},

        { fontSize:8, marginTop:30,
          columns: 
          [
            { text:"Prepared By \n\n ------------------------------- \n Saleh Akber Rabbi \n Deputy Manager \n Team Developer Ltd."},
            {text: '\n' },{text: '\n' },
            { text:"Approved By \n\n ------------------------------- \n Chandan Kumar Das \n Director \n Team Developer Ltd."},

          ],
          
        },
      ],

      styles: {
        h1: {
          fontSize: 20,
          bold: true,
          alignment: 'justify'
        },

        h2:{
          fontSize: 12,
          bold: true,
          alignment: 'center'
        },
        
        wid200:{
          widths:[150,150,150],
       },
       
       margbtm:{
         marginBottom:3,
         fontSize:8,
       },
       tblMargin: {
        bold:true,  
        marginBottom:2, 
        fontSize:8,
       }
       

      }
    };

    var win = window.open('', '_blank');
    pdfMake.createPdf(docDefinition).print({}, win);
    
  }
  //onDeleteSubmit(FormData:any){
    //this.selectedId = FormData.value.id
    // axios
    // .delete(`https://myybackend.herokuapp.com/offerinfos/${this.selectedId}`)
    // .then(response => {  
    //     this.showToast('top-right', 'success','selected item deleted suceesfully');
    // })
    // .catch(error => {      
    // }) 
    //console.log(FormData.value);
  //}

  showToast(position, status, message) {
    this.toastrService.show(
      status || 'Success',
      `${message}`
    )  
  }


}
