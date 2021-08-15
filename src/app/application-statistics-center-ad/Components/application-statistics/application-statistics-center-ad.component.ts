import { Component, OnInit } from '@angular/core';
import { ApplicationStatisticsCenterAdService } from "src/app/application-statistics-center-ad/Services/application-statistics-center-ad.service";
import { ApplicationStatistics } from "src/app/application-statistics-center-ad/Modals/applicationStatisticsModal";
import * as moment from 'moment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-application-statistics-center-ad',
  templateUrl: './application-statistics-center-ad.component.html',
  styleUrls: ['./application-statistics-center-ad.component.css']
})
export class ApplicationStatisticsCenterAdComponent implements OnInit {
  centerCode="centerCode";
  centerName="centerName";
  centerId=1;
  adminRole:any;
  CurrentDate=new Date();
  getProgramByDate : ApplicationStatistics[];
  forRemoveNull: ApplicationStatistics[];
  filteredPrograms: ApplicationStatistics[];
  forApplicationCount=[];
  forFinalGetProgram=[];
  forFilteredProgramData=[];
  finalFilteredProgramData=[];
  spinnerOn = true;


  constructor(private applicationService: ApplicationStatisticsCenterAdService,private router: Router) {
    this.spinnerOn = true;
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
  console.log(this.adminRole);
  
  // var date = moment(this.CurrentDate).format('YYYY-MM-DD');
  // this.getProgramDate(date);
  this.getFilteredProgramData();
  
  }

  captureScreen()  
  {  
    var ButtonControl = document.getElementById("buttonForPrint");
    ButtonControl.style.visibility = "hidden";
    window.print();
    ButtonControl.style.visibility = "visible";
  } 

  ngOnInit(): void {
  }

//  async getProgramDate(date){
//     this.filteredPrograms=[];
//     this.forRemoveNull=[];
//     this.forApplicationCount=[];
//     this.forFinalGetProgram=[];
//   await  this.applicationService.getProgramDate(date).subscribe(
//       res=>{
//         this.spinnerOn = true;
//         this.getProgramByDate=res as ApplicationStatistics[];
//         for(var i=0;i<this.getProgramByDate.length;i++){
//           if(this.getProgramByDate[i]!=null){
//             this.forRemoveNull.push(this.getProgramByDate[i])
//           }
//         }

//         if(this.adminRole=="ROLE_ADMIN"){
//           this.forRemoveNull.filter(x=>x.programStartedAcedemicCenter.cnt_center.cnt_centerId==this.centerId).forEach(x=>this.filteredPrograms.push(x));
//           const result = Array.from(this.filteredPrograms.reduce((m, t) => m.set(t.programStarted.program.programId, t), new Map()).values());
//           for(var i=0;i<result.length;i++){
//             this.forApplicationCount=[];
//             this.filteredPrograms.filter(x=>x.programStarted.program.programId==result[i].programStarted.program.programId).forEach(x=>this.forApplicationCount.push(x)); 
//             this.forFinalGetProgram.push({"count":this.forApplicationCount.length,"details":result[i]});
//           }
//         }
//         if(this.adminRole=="ROLE_SUPER_ADMIN"){
//           const result = Array.from(this.forRemoveNull.reduce((m, t) => m.set(t.programStarted.program.programId, t), new Map()).values());
//           for(var i=0;i<result.length;i++){
//             this.forApplicationCount=[];
//             this.forRemoveNull.filter(x=>x.programStarted.program.programId==result[i].programStarted.program.programId).forEach(x=>this.forApplicationCount.push(x)); 
//             this.forFinalGetProgram.push({"count":this.forApplicationCount.length,"details":result[i]});
//           }
//         }
//         this.spinnerOn = false;
//       }
//     )
//   }

 async getFilteredProgramData(){
  let programStart=[];
  await this.applicationService.getAllProgramStart().toPromise()
  .then(res=>{
    programStart=res; 
  })
  .catch(e=>{
    console.log(e);
  });
    if(this.adminRole=="ROLE_ADMIN"){
      
      this.applicationService.getFilterdProgramDataWithCenter(this.centerId).toPromise()
      .then(async res=>{

          this.forFilteredProgramData=res;
          for(var i=0;i<this.forFilteredProgramData.length;i++){
            let programStartAll=[];
            programStart.filter(x=>x.programStartedId==Number(this.forFilteredProgramData[i]['identity'])).forEach(x=>programStartAll=x);
            this.finalFilteredProgramData.push({
              "program":programStartAll['program']['title'],
              "programId":programStartAll['program']['programId'],
              "academicYear":programStartAll['academicYear']['year'],
              "toDate":this.forFilteredProgramData[i]['date'],
              "count":this.forFilteredProgramData[i]['count'],
              "programStartedId":this.forFilteredProgramData[i]['identity']
            });
          }
          console.log(this.finalFilteredProgramData,"finalFilteredProgramData");

        }
      ).catch(e=>{
        console.log(e);
        }
      );
    }
    if(this.adminRole=="ROLE_SUPER_ADMIN"){
      this.applicationService.getFilterdProgramData().toPromise()
      .then(async res=>{

        this.forFilteredProgramData=res;
        for(var i=0;i<this.forFilteredProgramData.length;i++){
          let programStartAll=[];
          programStart.filter(x=>x.programStartedId==Number(this.forFilteredProgramData[i]['identity'])).forEach(x=>programStartAll=x);
          this.finalFilteredProgramData.push({
            "program":programStartAll['program']['title'],
            "programId":programStartAll['program']['programId'],
            "academicYear":programStartAll['academicYear']['year'],
            "toDate":this.forFilteredProgramData[i]['date'],
            "count":this.forFilteredProgramData[i]['count'],
            "programStartedId":this.forFilteredProgramData[i]['identity']
          });
        }
        console.log(this.finalFilteredProgramData,"finalFilteredProgramData");

        }
      ).catch(e=>{
        console.log(e);
        }
      );
      
    }
    this.spinnerOn = false;
  }

  onRedirect(tableData,count){
    // this.applicationService.setData=tableData;
    // if(this.adminRole=="ROLE_ADMIN"){
    //   this.applicationService.initialStudents=this.filteredPrograms;
    // }
    // if(this.adminRole=="ROLE_SUPER_ADMIN"){
    //   this.applicationService.initialStudents=this.forRemoveNull;
    // }
    this.router.navigate(['applicationLists',{programStartedId:tableData,count:count,payment:1}]);
  }

  onRedirectToSummery(tableData){
    // this.applicationService.setDataforSummery=tableData;
    // if(this.adminRole=="ROLE_ADMIN"){
    //   this.applicationService.initialStudentsforSummery=this.filteredPrograms;
    // }
    // if(this.adminRole=="ROLE_SUPER_ADMIN"){
    //   this.applicationService.initialStudentsforSummery=this.forRemoveNull;
    // }
    this.router.navigate(['applicationSummery',{programStartedId:tableData}]);
  }

}
