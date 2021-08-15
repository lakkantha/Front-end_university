import { Component, OnInit } from '@angular/core';
import { SearchapplicationService } from '../../Service/searchapplication.service';

import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
pdfMake.vfs = pdfFonts.pdfMake.vfs;  

@Component({
  selector: 'app-admission-pdf',
  templateUrl: './admission-pdf.component.html',
  styleUrls: ['./admission-pdf.component.css']
})
export class AdmissionPdfComponent implements OnInit {
  admission: any = [];
  constructor(private communicationService:SearchapplicationService) { }


  ngOnInit(): void {
    this.admission = {
      "programName":"B-Tech",
      "nic":975871659,
      "fullname":"kaif",
      "selectionTestMedium":"English",
      "center":"English",
      "indexNo":"ads",
      "academicYear":"asdewd"
    }
  //   this.communicationService.componentMethodCalled.subscribe((res) => {
  //     alert('(Component2) Method called!'),
    
  //     this.print(),console.log(res);
  // });

// this.print();

    
  }

  first(el:any)
{
  console.log(el);
this.admission= {
  "programName":el.pstudy,
  "nic":el.nic,
  "fullname":el.name,
  "medium":el.medium,
  "center":el.center,
  "indexNo":el.applino,
  "Year":el.ayear,
  "address":el.address,
  "email":el.email,
  "mobile":el.mobile,
  "tel":el.tel,
  "stype":el.studenttype

}
console.log(this.admission,"admission");

this.generate();
}
  generate()
  {
    
    var img = 'src/assets/img/OP_logo.jpg'
    const documentDefinition = { 
      page:"A4",
      background:[{
        image:'data:image/png;base64,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',
        opacity:0.06,
        width:450,
        margin:[80,80,0,0]
      }],
      header:[
        {image:'data:image/png;base64,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',
            width:70,
            height:75,
            margin:[50,5,0,0]
          },
     
      ],

      content: 
        [
          
          {
            text: "The Open University Of Sri Lanka.",
            fontSize: 20,
            bold: true,
            alignment: 'center',
            margin: [-15, -20, 0, 0],
            color: 'black'
          },

          {
            text: "Online Application Print Copy",
            fontSize: 20,
            bold: true,
            alignment: 'center',
            margin: [-15, 0, 0, 0],
            color: 'black',
          },

           {
                table : {
                    headerRows : 1,
                    widths: [500],
                    body : [
                            [''],
                            ['']
                            ]
                },
                layout : 'headerLineOnly',
                margin:[0, 15, 0, 0]
          },

          {
            text:"Program Details",
            fontSize: 14,
            bold: true,
            margin: [0, 10, 0, 20],
            color: 'black',
          },
          {
            table:{
              headerRows: 0,
              heights:25,
              widths: [ 100, 100, 120,150 ],

              body: [
                [ {text:'Programme of Study :', colSpan:2},{},{text:this.admission["programName"],colSpan:2},{}],
                [ {text:'Academic Year/Intake :', colSpan:2},{},{text:this.admission['Year'], colSpan:2},{}],
                [ {text:'Application Number/Index No:', colSpan:2},{},{text:this.admission['indexNo'], colSpan:2},{}],
                [{text:'Study Centre :'},{text:this.admission['center'],alignment:'left',margin:[-25,0,0,0]},{text:'Programme Medium :'},{text:this.admission['medium'],alignment:'left'}],
                [ {text:'Date And Time Applied :', colSpan:2},{},{text:'', colSpan:2},{}]
              ]
            },
            layout:'noBorders',
            bold:true
          },
           {
                table : {
                    headerRows : 1,
                    widths: [500],
                    body : [
                            [''],
                            ['']
                            ]
                },
                layout : 'headerLineOnly',
                margin:[0, 15, 0, 0],
          }, 
          {
            text:"Application Details",
            fontSize: 14,
            bold: true,
            margin: [0, 10, 0, 20],
            color: 'black',
          },
          {
            table:{
              headerRows: 0,
              heights:25,
              widths: [ 100, 100, 100,150 ],

              body: [
                [ {text:this.admission['stype']+" :", colSpan:2},{},{text:this.admission["nic"],colSpan:2},{}],
                [ {text:'Name with Initials :', colSpan:2},{},{text:this.admission['fullname'], colSpan:2},{}],
                [ {text:'Address :', colSpan:2},{},{text:this.admission['address'], colSpan:2},{}],
                [{text:'Phone Mobile :'},{text:this.admission['mobile'],alignment:'left',margin:[-20,0,0,0]},{text:'Fixed Line :'},{text:this.admission['tel'],alignment:'left',margin:[-35,0,0,0]}],
                [ {text:'Email :', colSpan:2},{},{text:this.admission['email'], colSpan:2},{}]
              ]
            },
            layout:'noBorders',
            bold:true
          }
          

        ] ,
        
    
      };
  pdfMake.createPdf(documentDefinition).open();
  }


  
  




}
