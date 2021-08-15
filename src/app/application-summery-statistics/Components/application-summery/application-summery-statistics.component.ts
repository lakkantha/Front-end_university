import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApplicationSummeryStatisticsService } from "src/app/application-summery-statistics/Services/application-summery-statistics.service";
import { ApplicationStatisticsCenterAdService } from "src/app/application-statistics-center-ad/Services/application-statistics-center-ad.service";
import { ApplicationStatistics } from "src/app/application-statistics-center-ad/Modals/applicationStatisticsModal";
import * as XLSX from 'xlsx';
import { ApplicationListForSummaryStatisticsService } from 'src/app/application-list-for-summary-statistics/Services/application-list-for-summary-statistics.service';
import {forExcel,forSequence} from "../../Modal/applicationStatistics"
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-application-summery-statistics',
  templateUrl: './application-summery-statistics.component.html',
  styleUrls: ['./application-summery-statistics.component.css']
})
export class ApplicationSummeryStatisticsComponent implements OnInit {

  // fileName= 'SummaryStatistics - '+new Date()+'.xlsx';

  fileName:any;
  centerCode="centerCode";
  centerName="centerName";
  programName="programName";
  academicYear="academicYear";
  centerId="centerId";
  batch="batch";
  forSequenseInitial=[];
  forRemoveNull=[];
  filteredPrograms=[];
  forMediumCount=[];
  forSequenceCount=[];
  forCenterCount=[];
  forFinalGetMedium=[];
  forFinalGetSequence=[];
  forFinalCenter=[];
  englishCount=0;
  sinhalaCount=0;
  tamilCount=0;
  applicationCount=0;
  applicationPaymentCount=0;
  examBookingCount=0;
  counselling=0;
  courseRegistration=0;
  coursePayment=0;
  detailApplication=0;
  educationalQualification=0;
  professionalQualification=0;
  workExperience=0;
  registrationCompleted=0;
  downloadAdmissionCount=0;
  offlineEntryExam=0;
  onlineConselling=0;
  ApplicationPaymentDone=0;
  RequestExemptions=0;
  totalSequence=0;
  totalMedium=0;
  spinnerOn = true;
  adminRole:any;
  programStartedId:any;
  resultCenter=[];
  programId:any;
  showColumn3=false;
  showColumn4=false;
  showColumn5=false;
  showColumn6=false;
  showColumn7=false;
  showColumn8=false;
  showColumn9=false;
  showColumn10=false;
  showColumn11=false;
  showColumn12=false;
  showColumn13=false;
  showColumn15=false;
  showColumn16=false;
  showColumn19=false;
  filterInitialApplicants= [];
  superAdminMedium:forSequence[];
  superAdminSequence=[];
  getSequence=[];
  forHeaders=[];
  forSequenceArray=[
    // {
    //   id:1,
    //   name:"Application",
    //   sequence:0
    // },
    // {
    //   id:2,
    //   name:"Application Payment Pending",
    //   sequence:17
    // }
  ]
  forSequenceOrder=[];
  adminTable=[];
  superAdminTable=[];
  defineHeaders=[];
  constructor(private applicationService: ApplicationSummeryStatisticsService,private applicationStatistics: ApplicationStatisticsCenterAdService,private router: Router,private route:ActivatedRoute,private getService: ApplicationListForSummaryStatisticsService) {
    var userDetails = JSON.parse(localStorage.getItem("auth-user"));
    this.centerName=userDetails['adminDetails'][0]['rgtAdminCenter']['cnt_description'];
    this.centerCode=userDetails['adminDetails'][0]['rgtAdminCenter']['cnt_code'];
    this.centerId=userDetails['adminDetails'][0]['rgtAdminCenter']['cnt_centerId'];
    if(userDetails.roles.find(x=>x=='ROLE_SUPER_ADMIN')){
      this.adminRole='ROLE_SUPER_ADMIN';
    }
    else if(userDetails.roles.find(x=>x=='ROLE_ADMIN')){
      this.adminRole='ROLE_ADMIN';
    }
    // this.programName=this.applicationStatistics.setDataforSummery['details']['programStarted']['program']['title'];
    // this.academicYear=this.applicationStatistics.setDataforSummery['details']['programStarted']['academicYear']['year'];
    // this.batch=this.applicationStatistics.setDataforSummery['details']['programStarted']['batchNo'];
    if(this.route.snapshot.paramMap.get('programStartedId')!=""){
      this.programStartedId=this.route.snapshot.paramMap.get('programStartedId');
     };
   // this.forGetSequence();
   this.getAllSequence();
   this.forFilteredGetSequence();
    
   }

  ngOnInit(): void {
    
  }

  async getAllSequence(){
    await this.applicationService.getAllSequence().toPromise()
    .then(res=>{
      this.getSequence=res;
    })
    .catch(e=>{
      console.log(e);
    });
  }

  captureScreen()  
  {  
    var ButtonControl = document.getElementById("buttonForPrint");
    var back = document.getElementById("backButtonForPrint");
    var excel=document.getElementById("buttonForExcel");
    ButtonControl.style.visibility = "hidden";
    back.style.visibility="hidden";
    excel.style.visibility="hidden";
    window.print();
    ButtonControl.style.visibility = "visible";
    back.style.visibility="visible";
    excel.style.visibility="visible";
  } 

  async exportToExcel(){
    // await this.getInitialApplicant();
    this.spinnerOn=true;
    if(this.adminRole=='ROLE_SUPER_ADMIN'){
      this.applicationService.getExcel(this.programStartedId).toPromise()
      .then(res=>{
        
        var blob = new Blob([res], { type: 'application/octet-stream' });
   
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob);
          return;
        }
          const data =window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'initialApplicantSequence.xlsx';
          link.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window}));
          this.spinnerOn=false;
      })
      .catch(e=>{
        console.log(e);
        this.spinnerOn=false;
      });
    }

    if(this.adminRole=='ROLE_ADMIN'){ 
      this.applicationService.getExcelByCenter(this.programStartedId,this.centerId).toPromise()
      .then(res=>{
        
        var blob = new Blob([res], { type: 'application/octet-stream' });
   
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob);
          return;
        }
          const data =window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'initialApplicantSequence.xlsx';
          link.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window}));
          this.spinnerOn=false;
      })
      .catch(e=>{
        console.log(e);
        this.spinnerOn=false;
      });
    }
    // document.getElementById('forModal').click();
  }

  Save(){
  //  const workbook = new Workbook();
  //  const worksheet = workbook.addWorksheet('Sharing Data');
  let element = document.getElementById('programs1'); 
  console.log(document.getElementById('programs1'),"element");
  
  const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

  /* generate workbook and add the worksheet */
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  /* save to file */
  XLSX.writeFile(wb, this.fileName+".xlsx");
  // workbook.xlsx.writeBuffer().then((data: any) => {
  //   const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  //   fs.saveAs(blob, 'SocialShare.xlsx');
  // });
  }

  back(){
    this.router.navigate(['applicationStatistics']);
  }

  // async forGetSequence(){
  //   this.forSequenseInitial=[];
  //   this.forRemoveNull=[];
  //   this.filteredPrograms=[];
  //   this.forFinalGetMedium=[];
  //   this.forFinalGetSequence=[];
   
  // await  this.applicationService.getSequenceData(this.applicationStatistics.setDataforSummery['details']['programStarted']['program']['programId']).subscribe(
  //     res=>{
  //        this.spinnerOn = true;
  //       this.forSequenseInitial=res;
  //       for(var i=0;i<this.forSequenseInitial.length;i++){
  //         if(this.forSequenseInitial[i]!=null){
  //           this.forRemoveNull.push(this.forSequenseInitial[i])
  //         }
  //       }
  //       if(this.adminRole=="ROLE_ADMIN"){
  //         this.forRemoveNull.filter(x=>x.initialApplicant.programStartedAcedemicCenter.cnt_center.cnt_centerId==this.centerId).forEach(x=>this.filteredPrograms.push(x));
  //         const resultforMedium = Array.from(this.filteredPrograms.reduce((m, t) => m.set(t.initialApplicant.medium.mediumId, t), new Map()).values());
  //         const resultforSequence = Array.from(this.filteredPrograms.reduce((m, t) => m.set(t.sequence.id, t), new Map()).values());
  //                 // console.log(result);
  //         for(var i=0;i<resultforMedium.length;i++){
  //           this.forMediumCount=[];
  //           this.filteredPrograms.filter(x=>x.initialApplicant.medium.mediumId==resultforMedium[i]['initialApplicant']['medium']['mediumId']).forEach(x=>this.forMediumCount.push(x)); 
  //          this.forFinalGetMedium.push({"count":this.forMediumCount.length,"details":resultforMedium[i]['initialApplicant']['medium']['description'],"mediumId":resultforMedium[i]['initialApplicant']['medium']['mediumId']});
  //         }
  //         for(var i=0;i<resultforSequence.length;i++){
  //           this.forSequenceCount=[];
  //           this.filteredPrograms.filter(x=>x.sequence.id==resultforSequence[i]['sequence']['id']).forEach(x=>this.forSequenceCount.push(x)); 
  //          this.forFinalGetSequence.push({"count":this.forSequenceCount.length,"details":resultforSequence[i]['sequence']['description'],"sequenceId":resultforSequence[i]['sequence']['id']});
  //         }
  //         console.log(this.forFinalGetMedium,"this.forFinalGetProgram");
  //         console.log(this.forFinalGetSequence,"this.forFinalGetSequence");
  //         console.log(this.filteredPrograms,"this.filteredPrograms");
  //         for(var i=0;i<this.forFinalGetMedium.length;i++){
  //           if(this.forFinalGetMedium[i]['mediumId']==1){
  //             this.englishCount=this.forFinalGetMedium[i]['count'];
  //           }
  //           if(this.forFinalGetMedium[i]['mediumId']==2){
  //             this.sinhalaCount=this.forFinalGetMedium[i]['count'];
  //           }
  //           if(this.forFinalGetMedium[i]['mediumId']==3){
  //             this.tamilCount=this.forFinalGetMedium[i]['count'];
  //           }
  //         }
  
  //         for(var i=0;i<this.forFinalGetSequence.length;i++){
  //           if(this.forFinalGetSequence[i]['sequenceId']==1){
  //             this.applicationCount=this.forFinalGetSequence[i]['count'];
  //           }
  //           if(this.forFinalGetSequence[i]['sequenceId']==2){
  //             this.applicationPaymentCount=this.forFinalGetSequence[i]['count'];
  //           }
  //           if(this.forFinalGetSequence[i]['sequenceId']==3){
  //             this.examBookingCount=this.forFinalGetSequence[i]['count'];
  //           }
  //           if(this.forFinalGetSequence[i]['sequenceId']==12){
  //             this.downloadAdmissionCount=this.forFinalGetSequence[i]['count'];
  //           }
  //         }
  //         this.totalSequence=Number(this.applicationCount)+Number(this.applicationPaymentCount)+Number(this.examBookingCount)+Number(this.downloadAdmissionCount);
  //         this.totalMedium=Number(this.englishCount)+Number(this.sinhalaCount)+Number(this.tamilCount);
  //       }
  //       if(this.adminRole=="ROLE_SUPER_ADMIN"){
  //         const resultforCenter = Array.from(this.forRemoveNull.reduce((m, t) => m.set(t.initialApplicant.programStartedAcedemicCenter.cnt_center.cnt_centerId, t), new Map()).values());
  //         const resultforMedium = Array.from(this.forRemoveNull.reduce((m, t) => m.set(t.initialApplicant.medium.mediumId, t), new Map()).values());
  //         const resultforSequence = Array.from(this.forRemoveNull.reduce((m, t) => m.set(t.sequence.id, t), new Map()).values());


  //         for(var j=0;j<resultforCenter.length;j++){
  //           this.forFinalGetMedium=[];
  //           this.forFinalGetSequence=[];
  //           this.forCenterCount=[];
  //           this.forRemoveNull.filter(x=>x.initialApplicant.programStartedAcedemicCenter.cnt_center.cnt_centerId==resultforCenter[j]['initialApplicant']['programStartedAcedemicCenter']['cnt_center']['cnt_centerId']).forEach(x=>this.forCenterCount.push(x)); 
  //           for(var i=0;i<resultforMedium.length;i++){
  //             this.forMediumCount=[];
  //             this.forCenterCount.filter(x=>x.initialApplicant.medium.mediumId==resultforMedium[i]['initialApplicant']['medium']['mediumId']).forEach(x=>this.forMediumCount.push(x)); 
  //            this.forFinalGetMedium.push({"count":this.forMediumCount.length,"details":resultforMedium[i]['initialApplicant']['medium']['description'],"mediumId":resultforMedium[i]['initialApplicant']['medium']['mediumId']});
  //           }
  //           for(var i=0;i<resultforSequence.length;i++){
  //             this.forSequenceCount=[];
  //             this.forCenterCount.filter(x=>x.sequence.id==resultforSequence[i]['sequence']['id']).forEach(x=>this.forSequenceCount.push(x)); 
  //            this.forFinalGetSequence.push({"count":this.forSequenceCount.length,"details":resultforSequence[i]['sequence']['description'],"sequenceId":resultforSequence[i]['sequence']['id']});
  //           }
  //           for(var i=0;i<this.forFinalGetMedium.length;i++){
  //             if(this.forFinalGetMedium[i]['mediumId']==1){
  //               this.englishCount=this.forFinalGetMedium[i]['count'];
  //             }
  //             if(this.forFinalGetMedium[i]['mediumId']==2){
  //               this.sinhalaCount=this.forFinalGetMedium[i]['count'];
  //             }
  //             if(this.forFinalGetMedium[i]['mediumId']==3){
  //               this.tamilCount=this.forFinalGetMedium[i]['count'];
  //             }
  //           }
  //           for(var i=0;i<this.forFinalGetSequence.length;i++){
  //             if(this.forFinalGetSequence[i]['sequenceId']==1){
  //               this.applicationCount=this.forFinalGetSequence[i]['count'];
  //             }
  //             if(this.forFinalGetSequence[i]['sequenceId']==2){
  //               this.applicationPaymentCount=this.forFinalGetSequence[i]['count'];
  //             }
  //             if(this.forFinalGetSequence[i]['sequenceId']==3){
  //               this.examBookingCount=this.forFinalGetSequence[i]['count'];
  //             }
  //             if(this.forFinalGetSequence[i]['sequenceId']==12){
  //               this.downloadAdmissionCount=this.forFinalGetSequence[i]['count'];
  //             }
  //           }
  //           this.forFinalCenter.push(
  //             {
  //               "englisMedium":this.englishCount,
  //               "sinhalaMedium":this.sinhalaCount,
  //               "tamilMedium":this.tamilCount,
  //               "applicationCountSequence":this.applicationCount,
  //               "applicationPaymentCountSequence":this.applicationPaymentCount,
  //               "examBookingCountSequence":this.examBookingCount,
  //               "downloadAdmissionCountSequence":this.downloadAdmissionCount,
  //               "centerName":resultforCenter[j]['initialApplicant']['programStartedAcedemicCenter']['cnt_center']['cnt_description'],
  //               "centerCode":resultforCenter[j]['initialApplicant']['programStartedAcedemicCenter']['cnt_center']['cnt_code']
  //             }
  //             );
  //             const temp = this.totalMedium;
  //             const tempSequence = this.totalSequence;
  //             this.totalMedium=Number(this.englishCount)+Number(this.sinhalaCount)+Number(this.tamilCount);
  //             this.totalMedium = temp+this.totalMedium;
  //             this.totalSequence=Number(this.applicationCount)+Number(this.applicationPaymentCount)+Number(this.examBookingCount)+Number(this.downloadAdmissionCount);
  //             this.totalSequence=tempSequence+this.totalSequence;
              
  //             this.englishCount=0;
  //             this.sinhalaCount=0;
  //             this.tamilCount=0;
  //             this.applicationCount=0;
  //             this.applicationPaymentCount=0;
  //             this.examBookingCount=0;
  //             this.downloadAdmissionCount=0;
  //         }       
  //       }
  //     this.spinnerOn = false;
  //     }
  //   )
  
  // }
  
 async forFilteredGetSequence(){
   let programStart=[];
 await this.applicationStatistics.getProgramStart(this.programStartedId).toPromise()
  .then(res=>{
    programStart=res;
    console.log(programStart);
    this.programName=programStart[0]['program']['title'];
    this.academicYear=programStart[0]['academicYear']['year'];
    this.batch=programStart[0]['batchNo'];
    this.programId=programStart[0]['program']['programId'];
  })
  .catch(e=>{
    console.log(e);
    
  });
  let getSequenseOrder=[];
  await this.applicationService.getSequenceOrder(this.programId).toPromise()
  .then(res=>{
    getSequenseOrder=res;
    this.forSequenceOrder=res;
    console.log(getSequenseOrder,"getSequenseOrder");
    
  })
  .catch(e=>{
    console.log(e);
    
  });

  // for(var i=0;i<getSequenseOrder.length;i++){
  //   if(getSequenseOrder[i]=="3"){
  //     this.showColumn3=true;
  //   }
  //   else{
  //     this.showColumn3=false;
  //   }
  //   if(getSequenseOrder[i]=="12"){
  //     this.showColumn4=true;
  //   }
  //   else{
  //     this.showColumn4=false;
  //   }
  // }
  this.forHeaders=[];
  this.defineHeaders=[];
  let tempArray=[];
  if(getSequenseOrder.length>8){
    for(var i=0;i<getSequenseOrder.length;i++){
      let sequenceName;
      if(getSequenseOrder[i]==3){
        sequenceName="Entrance Exam Booking Pending";
        this.forHeaders.push("EEBP");
        this.defineHeaders.push("EEBP - Entrance Exam Booking Pending");
      }
      else if(getSequenseOrder[i]==2){
        sequenceName="Application Payment Pending";
        this.forHeaders.push("APP");
        this.defineHeaders.push("APP - Application Payment Pending");
      }
      else if(getSequenseOrder[i]==16){
        sequenceName="Application Payment Done";
        this.forHeaders.push("APD");
        this.defineHeaders.push("APD - Application Payment Done");
      }
      else{
        this.getSequence.filter(x=>x.id==getSequenseOrder[i]).forEach(x=>sequenceName=x.description);
        // this.getSequence.filter(x=>x.id==getSequenseOrder[i]).forEach(x=>tempArray.push(x.description));
        tempArray=sequenceName.split(" ");
         console.log(tempArray);
         let heading="";
        for(var z=0;z<tempArray.length;z++){
            heading=heading+tempArray[z].substring(0,2);
        }
        this.forHeaders.push(heading);
        this.defineHeaders.push(heading+" - "+sequenceName);
      }
      
      
      if(getSequenseOrder[i]==3){
        this.forSequenceArray.push({
          id:getSequenseOrder[i],
          name:sequenceName,
          sequence:18
        });
      }
      else if(getSequenseOrder[i]==2){
        this.forSequenceArray.push({
          id:getSequenseOrder[i],
          name:sequenceName,
          sequence:17
        });
      }
      else{
        this.forSequenceArray.push({
          id:getSequenseOrder[i],
          name:sequenceName,
          sequence:0
        });
      }
  
    }
  }
  else{
    for(var i=0;i<getSequenseOrder.length;i++){
      let sequenceName;
      if(getSequenseOrder[i]==3){
        sequenceName="Entrance Exam Booking Pending";
        this.forHeaders.push("Entrance Exam Booking Pending");
      }
      else if(getSequenseOrder[i]==2){
        sequenceName="Application Payment Pending";
        this.forHeaders.push("Application Payment Pending");
      }
      else if(getSequenseOrder[i]==16){
        sequenceName="Application Payment Done";
        this.forHeaders.push("Application Payment Done");
      }
      else{
        this.getSequence.filter(x=>x.id==getSequenseOrder[i]).forEach(x=>sequenceName=x.description);
        this.getSequence.filter(x=>x.id==getSequenseOrder[i]).forEach(x=>this.forHeaders.push(x.description));
      }
      
      
      if(getSequenseOrder[i]==3){
        this.forSequenceArray.push({
          id:getSequenseOrder[i],
          name:sequenceName,
          sequence:18
        });
      }
      else if(getSequenseOrder[i]==2){
        this.forSequenceArray.push({
          id:getSequenseOrder[i],
          name:sequenceName,
          sequence:17
        });
      }
      else{
        this.forSequenceArray.push({
          id:getSequenseOrder[i],
          name:sequenceName,
          sequence:0
        });
      }
  
    }
  }


  // this.showColumn3=getSequenseOrder.find(x=>x=="3");
  // if(this.showColumn3){
  //   this.forSequenceArray.push(
  //   {
  //     id:3,
  //     name:"Entrance Exam Booking Pending",
  //     sequence:18
  //   }
  //   );
  // }
  // this.showColumn12=getSequenseOrder.find(x=>x=="12");
  // if(this.showColumn12){
  //   this.forSequenceArray.push(
  //   {
  //     id:12,
  //     name:"Download Admission",
  //     sequence:0
  //   }
  //   );
  // }
  // this.showColumn13=getSequenseOrder.find(x=>x=="13");
  // if(this.showColumn13){
  //   this.forSequenceArray.push(
  //   {
  //     id:13,
  //     name:"Ofline Entry Exam",
  //     sequence:0
  //   }
  //   );
  // }
  // this.showColumn15=getSequenseOrder.find(x=>x=="15");
  // if(this.showColumn15){
  //   this.forSequenceArray.push(
  //   {
  //     id:15,
  //     name:"Online Counselling",
  //     sequence:0
  //   }
  //   );
  // }
  // this.showColumn16=getSequenseOrder.find(x=>x=="16");
  // if(this.showColumn16){
  //   this.forSequenceArray.push(
  //   {
  //     id:16,
  //     name:"Application Payment Done",
  //     sequence:0
  //   }
  //   );
  // }
  // this.showColumn19=getSequenseOrder.find(x=>x=="19");
  // if(this.showColumn19){
  //   this.forSequenceArray.push(
  //   {
  //     id:19,
  //     name:"Request Exemptions",
  //     sequence:0
  //   }
  //   );
  // }
  // this.showColumn4=getSequenseOrder.find(x=>x=="4");
  // if(this.showColumn4){
  //   this.forSequenceArray.push(
  //   {
  //     id:4,
  //     name:"Counselling",
  //     sequence:0
  //   }
  //   );
  // }
  // this.showColumn5=getSequenseOrder.find(x=>x=="5");
  // if(this.showColumn5){
  //   this.forSequenceArray.push(
  //   {
  //     id:5,
  //     name:"Course Registration",
  //     sequence:0
  //   }
  //   );
  // }
  // this.showColumn6=getSequenseOrder.find(x=>x=="6");
  // if(this.showColumn6){
  //   this.forSequenceArray.push(
  //   {
  //     id:6,
  //     name:"Course Payment",
  //     sequence:0
  //   }
  //   );
  // }
  // this.showColumn7=getSequenseOrder.find(x=>x=="7");
  // if(this.showColumn7){
  //   this.forSequenceArray.push(
  //   {
  //     id:7,
  //     name:"Detail Application",
  //     sequence:0
  //   }
  //   );
  // }
  // this.showColumn8=getSequenseOrder.find(x=>x=="8");
  // if(this.showColumn8){
  //   this.forSequenceArray.push(
  //   {
  //     id:8,
  //     name:"Educational Qualification",
  //     sequence:0
  //   }
  //   );
  // }
  // this.showColumn9=getSequenseOrder.find(x=>x=="9");
  // if(this.showColumn9){
  //   this.forSequenceArray.push(
  //   {
  //     id:9,
  //     name:"Professional Qualification",
  //     sequence:0
  //   }
  //   );
  // }
  // this.showColumn10=getSequenseOrder.find(x=>x=="10");
  // if(this.showColumn10){
  //   this.forSequenceArray.push(
  //   {
  //     id:10,
  //     name:"Work Experience",
  //     sequence:0
  //   }
  //   );
  // }
  // this.showColumn11=getSequenseOrder.find(x=>x=="11");
  // if(this.showColumn11){
  //   this.forSequenceArray.push(
  //   {
  //     id:11,
  //     name:"Registration Completed",
  //     sequence:0
  //   }
  //   );
  // }

  
    if(this.adminRole=="ROLE_ADMIN"){
      let mediums=[];
    await  this.applicationService.getMedium(Number(this.programStartedId),Number(this.centerId)).toPromise()
      .then(res=>{
        mediums=res;
      })
      .catch(e=>{
        console.log(e);
      });

      let sequense=[];
    await  this.applicationService.getFilteredSequence(Number(this.programStartedId),Number(this.centerId)).toPromise()
      .then(res=>{
        sequense=res;
      })
      .catch(e=>{
        console.log(e);
      });

      for(var i=0;i<mediums.length;i++){
        if(mediums[i]['identity']==1){
          this.englishCount=mediums[i]['count'];
        }
        if(mediums[i]['identity']==2){
          this.sinhalaCount=mediums[i]['count'];
        }
        if(mediums[i]['identity']==3){
          this.tamilCount=mediums[i]['count'];
        }
      }

      // for(var i=0;i<sequense.length;i++){
      //   if(sequense[i]['identity']==1){
      //     this.applicationCount=sequense[i]['count'];
      //   }
      //   if(sequense[i]['identity']==2||sequense[i]['identity']==17){
      //     this.applicationPaymentCount+=sequense[i]['count'];
      //   }
      //   if(sequense[i]['identity']==3||sequense[i]['identity']==18){
      //     this.examBookingCount+=sequense[i]['count'];
      //   }
      //   if(sequense[i]['identity']==4){
      //     this.counselling=sequense[i]['count'];
      //   }
      //   if(sequense[i]['identity']==5){
      //     this.courseRegistration=sequense[i]['count'];
      //   }
      //   if(sequense[i]['identity']==6){
      //     this.coursePayment=sequense[i]['count'];
      //   }
      //   if(sequense[i]['identity']==7){
      //     this.detailApplication=sequense[i]['count'];
      //   }
      //   if(sequense[i]['identity']==8){
      //     this.educationalQualification=sequense[i]['count'];
      //   }
      //   if(sequense[i]['identity']==9){
      //     this.professionalQualification=sequense[i]['count'];
      //   }
      //   if(sequense[i]['identity']==10){
      //     this.workExperience=sequense[i]['count'];
      //   }
      //   if(sequense[i]['identity']==11){
      //     this.registrationCompleted=sequense[i]['count'];
      //   }
      //   if(sequense[i]['identity']==12){
      //     this.downloadAdmissionCount=sequense[i]['count'];
      //   }
      //   if(sequense[i]['identity']==13){
      //     this.offlineEntryExam=sequense[i]['count'];
      //   }
      //   if(sequense[i]['identity']==15){
      //     this.onlineConselling=sequense[i]['count'];
      //   }
      //   if(sequense[i]['identity']==16){
      //     this.ApplicationPaymentDone=sequense[i]['count'];
      //   }
      //   if(sequense[i]['identity']==19){
      //     this.RequestExemptions=sequense[i]['count'];
      //   }
      // }
      this.adminTable=[];
      for(var i=0;i<this.forSequenceArray.length;i++){
        if(sequense.find(x=>x.identity==this.forSequenceArray[i].id)){
          sequense.filter(x=>x.identity==this.forSequenceArray[i].id).forEach(x=>this.adminTable.push(
            {
              "count":x.count,
              "identity":x.identity,
              "sequence":this.forSequenceArray[i].sequence
            }));
        }
        else{
          this.adminTable.push(
            {
              "count":0,
              "identity":this.forSequenceArray[i].id,
              "sequence":this.forSequenceArray[i].sequence
            });
        }
      }

      for(var i=0;i<this.adminTable.length;i++){
        this.totalSequence=this.totalSequence+Number(this.adminTable[i]['count']);
      }
      // this.totalSequence=Number(this.applicationCount)+Number(this.applicationPaymentCount)+Number(this.examBookingCount)
      //                     +Number(this.downloadAdmissionCount)+Number(this.counselling)+Number(this.courseRegistration)
      //                     +Number(this.coursePayment)+Number(this.detailApplication)+Number(this.educationalQualification)
      //                     +Number(this.professionalQualification)+Number(this.workExperience)+Number(this.registrationCompleted)
      //                     +Number(this.offlineEntryExam)+Number(this.onlineConselling)+Number(this.ApplicationPaymentDone)+Number(this.RequestExemptions);
      this.totalMedium=Number(this.englishCount)+Number(this.sinhalaCount)+Number(this.tamilCount);
    }

    if(this.adminRole=="ROLE_SUPER_ADMIN"){
      let centers=[];
    await  this.applicationService.rgmCenterGetAll().toPromise()
      .then(res=>{
        centers=res;
      })
      .catch(e=>{
        console.log(e);
      });

      
      var centerCode;
      var centerId;
      await this.applicationService.getMediumSuperAdmin(Number(this.programStartedId)).toPromise()
      .then(res=>{
        this.superAdminMedium=res as forSequence[];
        
      })
      .catch(e=>{
        console.log(e);
      });

      await this.applicationService.getSequenceSuperAdmin(Number(this.programStartedId)).toPromise()
      .then(res=>{
        this.superAdminSequence=res;
      })
      .catch(e=>{
        console.log(e);
      });
      const resultForMedium = Array.from(this.superAdminMedium.reduce((m, t) => m.set(t.center, t), new Map()).values());
      for(var i=0;i<resultForMedium.length;i++){
        centers.filter(x=>x.cnt_description==resultForMedium[i]['center']).forEach(x=>centerCode=x.cnt_code);
        centers.filter(x=>x.cnt_description==resultForMedium[i]['center']).forEach(x=>centerId=x.cnt_centerId);

        let mediums=[];
        this.superAdminMedium.filter(x=>x.center==resultForMedium[i]['center']).forEach(x=>mediums.push(x));
        if(mediums.length>0){
          for(var j=0;j<mediums.length;j++){
            if(mediums[j]['identity']==1){
              this.englishCount=mediums[j]['count'];
            }
            if(mediums[j]['identity']==2){
              this.sinhalaCount=mediums[j]['count'];
            }
            if(mediums[j]['identity']==3){
              this.tamilCount=mediums[j]['count'];
            }
          }
        }

        let sequense=[];
        this.superAdminSequence.filter(x=>x.center==resultForMedium[i]['center']).forEach(x=>sequense.push(x));
        if(sequense.length>0){
          // for(var k=0;k<sequense.length;k++){
          //   if(sequense[k]['identity']==1){
          //     this.applicationCount=sequense[k]['count'];
          //   }
          //   if(sequense[k]['identity']==2||sequense[k]['identity']==17){
          //     this.applicationPaymentCount+=sequense[k]['count'];
          //   }
          //   if(sequense[k]['identity']==3||sequense[k]['identity']==18){
          //     this.examBookingCount+=sequense[k]['count'];
          //   }
          //   if(sequense[k]['identity']==4){
          //     this.counselling=sequense[k]['count'];
          //   }
          //   if(sequense[k]['identity']==5){
          //     this.courseRegistration=sequense[k]['count'];
          //   }
          //   if(sequense[k]['identity']==6){
          //     this.coursePayment=sequense[k]['count'];
          //   }
          //   if(sequense[k]['identity']==7){
          //     this.detailApplication=sequense[k]['count'];
          //   }
          //   if(sequense[k]['identity']==8){
          //     this.educationalQualification=sequense[k]['count'];
          //   }
          //   if(sequense[k]['identity']==9){
          //     this.professionalQualification=sequense[k]['count'];
          //   }
          //   if(sequense[k]['identity']==10){
          //     this.workExperience=sequense[k]['count'];
          //   }
          //   if(sequense[k]['identity']==11){
          //     this.registrationCompleted=sequense[k]['count'];
          //   }
          //   if(sequense[k]['identity']==12){
          //     this.downloadAdmissionCount=sequense[k]['count'];
          //   }
          //   if(sequense[k]['identity']==13){
          //     this.offlineEntryExam=sequense[k]['count'];
          //   }
          //   if(sequense[k]['identity']==15){
          //     this.onlineConselling=sequense[k]['count'];
          //   }
          //   if(sequense[k]['identity']==16){
          //     this.ApplicationPaymentDone=sequense[k]['count'];
          //   }
          //   if(sequense[k]['identity']==19){
          //     this.RequestExemptions=sequense[k]['count'];
          //   }
          // }
          this.superAdminTable=[];
          for(var k=0;k<this.forSequenceArray.length;k++){
            if(sequense.find(x=>x.identity==this.forSequenceArray[k].id)){
              sequense.filter(x=>x.identity==this.forSequenceArray[k].id).forEach(x=>this.superAdminTable.push(
                {
                  "count":x.count,
                  "identity":x.identity,
                  "sequence":this.forSequenceArray[k].sequence,
                }));
            }
            else{
              this.superAdminTable.push(
                {
                  "count":0,
                  "identity":this.forSequenceArray[k].id,
                  "sequence":this.forSequenceArray[k].sequence
                });
            }
          }
        }

        this.forFinalCenter.push(
          {
            "englisMedium":this.englishCount,
            "sinhalaMedium":this.sinhalaCount,
            "tamilMedium":this.tamilCount,
            // "applicationCountSequence":this.applicationCount,
            // "applicationPaymentCountSequence":this.applicationPaymentCount,
            // "examBookingCountSequence":this.examBookingCount,
            // "downloadAdmissionCountSequence":this.downloadAdmissionCount,
            // "counselling":this.counselling,
            // "courseRegistration":this.courseRegistration,
            // "coursePayment":this.coursePayment,
            // "detailApplication":this.detailApplication,
            // "educationalQualification":this.educationalQualification,
            // "professionalQualification":this.professionalQualification,
            // "workExperience":this.workExperience,
            // "registrationCompleted":this.registrationCompleted,
            // "offlineEntryExam":this.offlineEntryExam,
            // "onlineConselling":this.onlineConselling,
            // "ApplicationPaymentDone":this.ApplicationPaymentDone,
            // "RequestExemptions":this.RequestExemptions,
            "centerName":resultForMedium[i]['center'],
            "centerCode":centerCode,
            "centerId":centerId,
            "sequenceArray":this.superAdminTable
          }
          );
          const temp = this.totalMedium;
          const tempSequence = this.totalSequence;
          this.totalMedium=Number(this.englishCount)+Number(this.sinhalaCount)+Number(this.tamilCount);
          this.totalMedium = temp+this.totalMedium;
          console.log(this.forFinalCenter);
          let tempSequence2=0;
          for(var j=0;j<this.forFinalCenter[i]['sequenceArray'].length;j++){
            tempSequence2=tempSequence2+Number(this.forFinalCenter[i]['sequenceArray'][j]['count']);
          }
          // this.totalSequence=Number(this.applicationCount)+Number(this.applicationPaymentCount)+Number(this.examBookingCount)
          // +Number(this.downloadAdmissionCount)+Number(this.counselling)+Number(this.courseRegistration)
          // +Number(this.coursePayment)+Number(this.detailApplication)+Number(this.educationalQualification)
          // +Number(this.professionalQualification)+Number(this.workExperience)+Number(this.registrationCompleted)
          // +Number(this.offlineEntryExam)+Number(this.onlineConselling)+Number(this.ApplicationPaymentDone)+Number(this.RequestExemptions);
          this.totalSequence=tempSequence+tempSequence2;
          
          this.englishCount=0;
          this.sinhalaCount=0;
          this.tamilCount=0;
          // this.applicationCount=0;
          // this.applicationPaymentCount=0;
          // this.examBookingCount=0;
          // this.downloadAdmissionCount=0;
          // this.counselling=0;
          // this.courseRegistration=0;
          // this.coursePayment=0;
          // this.detailApplication=0;
          // this.educationalQualification=0;
          // this.professionalQualification=0;
          // this.workExperience=0;
          // this.registrationCompleted=0;
          // this.offlineEntryExam=0;
          // this.onlineConselling=0;
          // this.ApplicationPaymentDone=0;
          // this.RequestExemptions=0;
      }

      // for(var i=0;i<centers.length;i++){
      //   let mediums=[];
      //   await  this.applicationService.getMedium(Number(this.programStartedId),Number(centers[i]['cnt_centerId'])).toPromise()
      //     .then(res=>{
      //       mediums=res;
      //     })
      //     .catch(e=>{
      //       console.log(e);
      //     });
    
      //     let sequense=[];
      //   await  this.applicationService.getFilteredSequence(Number(this.programStartedId),Number(centers[i]['cnt_centerId'])).toPromise()
      //     .then(res=>{
      //       sequense=res;
      //     })
      //     .catch(e=>{
      //       console.log(e);
      //     });

      //     if(mediums.length>0||sequense.length>0){
      //       for(var j=0;j<mediums.length;j++){
      //         if(mediums[j]['identity']==1){
      //           this.englishCount=mediums[j]['count'];
      //         }
      //         if(mediums[j]['identity']==2){
      //           this.sinhalaCount=mediums[j]['count'];
      //         }
      //         if(mediums[j]['identity']==3){
      //           this.tamilCount=mediums[j]['count'];
      //         }
      //       }
      //       for(var k=0;k<sequense.length;k++){
      //         if(sequense[k]['identity']==1){
      //           this.applicationCount=sequense[k]['count'];
      //         }
      //         if(sequense[k]['identity']==2||sequense[k]['identity']==17){
      //           this.applicationPaymentCount+=sequense[k]['count'];
      //         }
      //         if(sequense[k]['identity']==3||sequense[k]['identity']==18){
      //           this.examBookingCount+=sequense[k]['count'];
      //         }
      //         if(sequense[k]['identity']==4){
      //           this.counselling=sequense[k]['count'];
      //         }
      //         if(sequense[k]['identity']==5){
      //           this.courseRegistration=sequense[k]['count'];
      //         }
      //         if(sequense[k]['identity']==6){
      //           this.coursePayment=sequense[k]['count'];
      //         }
      //         if(sequense[k]['identity']==7){
      //           this.detailApplication=sequense[k]['count'];
      //         }
      //         if(sequense[k]['identity']==8){
      //           this.educationalQualification=sequense[k]['count'];
      //         }
      //         if(sequense[k]['identity']==9){
      //           this.professionalQualification=sequense[k]['count'];
      //         }
      //         if(sequense[k]['identity']==10){
      //           this.workExperience=sequense[k]['count'];
      //         }
      //         if(sequense[k]['identity']==11){
      //           this.registrationCompleted=sequense[k]['count'];
      //         }
      //         if(sequense[k]['identity']==12){
      //           this.downloadAdmissionCount=sequense[k]['count'];
      //         }
      //       }
  
      //       this.forFinalCenter.push(
      //         {
      //           "englisMedium":this.englishCount,
      //           "sinhalaMedium":this.sinhalaCount,
      //           "tamilMedium":this.tamilCount,
      //           "applicationCountSequence":this.applicationCount,
      //           "applicationPaymentCountSequence":this.applicationPaymentCount,
      //           "examBookingCountSequence":this.examBookingCount,
      //           "downloadAdmissionCountSequence":this.downloadAdmissionCount,
      //           "counselling":this.counselling,
      //           "courseRegistration":this.courseRegistration,
      //           "coursePayment":this.coursePayment,
      //           "detailApplication":this.detailApplication,
      //           "educationalQualification":this.educationalQualification,
      //           "professionalQualification":this.professionalQualification,
      //           "workExperience":this.workExperience,
      //           "registrationCompleted":this.registrationCompleted,
      //           "centerName":centers[i]['cnt_description'],
      //           "centerCode":centers[i]['cnt_code'],
      //           "centerId":centers[i]['cnt_centerId']
      //         }
      //         );
      //         const temp = this.totalMedium;
      //         const tempSequence = this.totalSequence;
      //         this.totalMedium=Number(this.englishCount)+Number(this.sinhalaCount)+Number(this.tamilCount);
      //         this.totalMedium = temp+this.totalMedium;
      //         this.totalSequence=Number(this.applicationCount)+Number(this.applicationPaymentCount)+Number(this.examBookingCount)
      //         +Number(this.downloadAdmissionCount)+Number(this.counselling)+Number(this.courseRegistration)
      //         +Number(this.coursePayment)+Number(this.detailApplication)+Number(this.educationalQualification)
      //         +Number(this.professionalQualification)+Number(this.workExperience)+Number(this.registrationCompleted);
      //         this.totalSequence=tempSequence+this.totalSequence;
              
      //         this.englishCount=0;
      //         this.sinhalaCount=0;
      //         this.tamilCount=0;
      //         this.applicationCount=0;
      //         this.applicationPaymentCount=0;
      //         this.examBookingCount=0;
      //         this.downloadAdmissionCount=0;
      //         this.counselling=0;
      //         this.courseRegistration=0;
      //         this.coursePayment=0;
      //         this.detailApplication=0;
      //         this.educationalQualification=0;
      //         this.professionalQualification=0;
      //         this.workExperience=0;
      //         this.registrationCompleted=0;
      //     }

      // }
    }
    // await this.getInitialApplicant();
    this.spinnerOn=false;

  }

  onRedirect(sequenceId,count,sequenceId1){
    this.router.navigate(['sequenceApplicationLists',{programStartedId:this.programStartedId,centerId:this.centerId,sequenceId:sequenceId,sequenceId1:sequenceId1,count:count,forCounsellor:0}]);
  }
  onRedirectSuperAdmin(centerId,sequenceId,count,sequenceId1){
    this.router.navigate(['sequenceApplicationLists',{programStartedId:this.programStartedId,centerId:centerId,sequenceId:sequenceId,sequenceId1:sequenceId1,count:count,forCounsellor:0}]);
  }

  async getInitialApplicant(){
    this.filterInitialApplicants=[];
    this.spinnerOn=true;
    let programStart=[];

    await this.applicationStatistics.getProgramStart(this.programStartedId).toPromise()
    .then(res=>{
      programStart=res;
      this.programName=programStart[0]['program']['title'];
      this.academicYear=programStart[0]['academicYear']['year'];
      this.batch=programStart[0]['batchNo'];
    })
    .catch(e=>{
      console.log(e);
    });
    if(this.adminRole=='ROLE_SUPER_ADMIN'){
    for(var i=0;i<this.forFinalCenter.length;i++){
      
      let forFinalCenter=[];
      let forFianleSEquence=[];
      
      for(var j=0;j<this.forSequenceArray.length;j++){  
        
        let forFinal=[];
              let initialApplicant=[];
            await  this.getService.getInitialApplicants(Number(this.programStartedId),Number(this.forFinalCenter[i]['centerId']),Number(this.forSequenceArray[j]['id'])).toPromise()
              .then(res=>{
                  initialApplicant=res; 
                  if(initialApplicant.length>0){
                    for(var k=0;k<initialApplicant.length;k++){
                      
                      forFinal.push({
                        "id":initialApplicant[k]['applicationno'],
                        "nic":initialApplicant[k]['username'],
                        "namewithinitials":initialApplicant[k]['name'],
                        "mobileno":initialApplicant[k]['mobileno'],
                        "email":initialApplicant[k]['email']
                      });
                    }
                  }
              })
              .catch(e=>{
                console.log(e);
              });

              await  this.getService.getInitialApplicants(Number(this.programStartedId),Number(this.forFinalCenter[i]['centerId']),Number(this.forSequenceArray[j]['sequence'])).toPromise()
              .then(res=>{
                  initialApplicant=res;
                  console.log(initialApplicant,"initialApplicant");
                  
                  if(initialApplicant.length>0){
                    for(var k=0;k<initialApplicant.length;k++){
                      forFinal.push({
                        "id":initialApplicant[k]['applicationno'],
                        "nic":initialApplicant[k]['username'],
                        "namewithinitials":initialApplicant[k]['name'],
                        "mobileno":initialApplicant[k]['mobileno'],
                        "email":initialApplicant[k]['email']
                      });
                    }

                  }
              })
              .catch(e=>{
                console.log(e);
                
              });

              forFianleSEquence.push({
                "sequenceName":this.forSequenceArray[j]['name'],
                "studentData":forFinal
              })
      }
      
this.filterInitialApplicants.push({
  "centerName":this.forFinalCenter[i]['centerName'],
  "sequence":forFianleSEquence
});
    } 
    console.log(this.filterInitialApplicants,"filterInitialApplicantsCenters");
  }

  if(this.adminRole=='ROLE_ADMIN'){  
      let forFianleSEquence=[];
      
      for(var j=0;j<this.forSequenceArray.length;j++){  
        
        let forFinal=[];
              let initialApplicant=[];
            await  this.getService.getInitialApplicants(Number(this.programStartedId),Number(this.centerId),Number(this.forSequenceArray[j]['id'])).toPromise()
              .then(res=>{
                  initialApplicant=res; 
                  if(initialApplicant.length>0){
                    for(var k=0;k<initialApplicant.length;k++){
                      
                      forFinal.push({
                        "id":initialApplicant[k]['applicationno'],
                        "nic":initialApplicant[k]['username'],
                        "namewithinitials":initialApplicant[k]['name'],
                        "mobileno":initialApplicant[k]['mobileno'],
                        "email":initialApplicant[k]['email']
                      });
                    }
                  }
              })
              .catch(e=>{
                console.log(e);
              });

              await  this.getService.getInitialApplicants(Number(this.programStartedId),Number(this.centerId),Number(this.forSequenceArray[j]['sequence'])).toPromise()
              .then(res=>{
                  initialApplicant=res;
                  console.log(initialApplicant,"initialApplicant");
                  
                  if(initialApplicant.length>0){
                    for(var k=0;k<initialApplicant.length;k++){
                      forFinal.push({
                        "id":initialApplicant[k]['applicationno'],
                        "nic":initialApplicant[k]['username'],
                        "namewithinitials":initialApplicant[k]['name'],
                        "mobileno":initialApplicant[k]['mobileno'],
                        "email":initialApplicant[k]['email']
                      });
                    }

                  }
              })
              .catch(e=>{
                console.log(e);
                
              });

              forFianleSEquence.push({
                "sequenceName":this.forSequenceArray[j]['name'],
                "studentData":forFinal
              })
      }
      
this.filterInitialApplicants.push({
  "centerName":this.centerName,
  "sequence":forFianleSEquence
});

    console.log(this.filterInitialApplicants,"filterInitialApplicantsCenters");
  }

    this.spinnerOn=false;


  }

}
