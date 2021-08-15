import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApplicationStatisticsCenterAdService } from "src/app/application-statistics-center-ad/Services/application-statistics-center-ad.service";
import { ApplicationStatistics } from "src/app/application-statistics-center-ad/Modals/applicationStatisticsModal";
import { ApplicationListService } from "src/app/applications-list/Services/application-list.service";
import { ApplicationListForSummaryStatisticsService } from "src/app/application-list-for-summary-statistics/Services/application-list-for-summary-statistics.service";
import * as moment from 'moment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-application-list-for-summary-statistics',
  templateUrl: './application-list-for-summary-statistics.component.html',
  styleUrls: ['./application-list-for-summary-statistics.component.css']
})
export class ApplicationListForSummaryStatisticsComponent implements OnInit {

  forSearch=new FormGroup({
    selectForSearch: new FormControl(''),
    typeForSearch:new FormControl('')
  })

  centerCode="centerCode";
  centerName="centerName";
  programName="programName";
  academicYear="academicYear";
  batch="batch";
  totalApplications="totalApplications";
  initialApplicants:ApplicationStatistics[];
  filterInitialApplicants=[];
  forSearchInitialApplicants=[];
  forFilterDiv=[];
  centerId=1;
  centerIdFromSummery=1;
  sequenceId=0;
  CurrentDate=new Date();
  spinnerOn=true;
  forSearchArray=false;
  SearchValue='';
  show=false;
  isDisable=true;
  programStartedId:any;
  adminRole:any;
  sequenceId1=0;
  counsellorId:any;
  forCounsellor:any;
  constructor(private _location: Location,private route: ActivatedRoute,private applicationService: ApplicationStatisticsCenterAdService,private applicationListServices:ApplicationListService,private router: Router,private getService: ApplicationListForSummaryStatisticsService) {
    var userDetails = JSON.parse(localStorage.getItem("auth-user"));
    if(userDetails['adminDetails'][0]['rgtAdminCenter']!=null){
      this.centerName=userDetails['adminDetails'][0]['rgtAdminCenter']['cnt_description'];
      this.centerCode=userDetails['adminDetails'][0]['rgtAdminCenter']['cnt_code'];
      this.centerId=userDetails['adminDetails'][0]['rgtAdminCenter']['cnt_centerId'];
    }


    if(userDetails.roles.find(x=>x=='ROLE_SUPER_ADMIN')){
      this.adminRole='ROLE_SUPER_ADMIN';
    }
    else if(userDetails.roles.find(x=>x=='ROLE_ADMIN')){
      this.adminRole='ROLE_ADMIN';
    }
    if(this.route.snapshot.paramMap.get('programStartedId')!=""){
      this.programStartedId=this.route.snapshot.paramMap.get('programStartedId');
      this.totalApplications=this.route.snapshot.paramMap.get('count');
      this.centerIdFromSummery=Number(this.route.snapshot.paramMap.get('centerId'));
      this.sequenceId=Number(this.route.snapshot.paramMap.get('sequenceId'));
      this.sequenceId1=Number(this.route.snapshot.paramMap.get('sequenceId1'));
      this.counsellorId=Number(this.route.snapshot.paramMap.get('counsellorId'));
      this.forCounsellor=this.route.snapshot.paramMap.get('forCounsellor');
     };
     
     
   }

  ngOnInit(): void {
    if(this.forCounsellor==0){
      this.getInitialApplicant();
    }
    if(this.forCounsellor==1){
      this.getInitialApplicantByCounsellor();
    }
  }

  async getInitialApplicantByCounsellor(){
    let programStart=[];
    await this.applicationService.getProgramStart(this.programStartedId).toPromise()
    .then(res=>{
      programStart=res;
      console.log(programStart);
      this.programName=programStart[0]['program']['title'];
      this.academicYear=programStart[0]['academicYear']['year'];
      this.batch=programStart[0]['batchNo'];
    })
    .catch(e=>{
      console.log(e);
      
    }); 
    let initialApplicant=[];
    await this.getService.getInitialApplicantsByCounsellor(this.programStartedId,this.counsellorId,this.centerIdFromSummery,this.sequenceId).toPromise()
    .then(res=>{
      initialApplicant=res;
      console.log(initialApplicant,"initialApplicant");
      
      if(initialApplicant.length>0){
        for(var i=0;i<initialApplicant.length;i++){
          this.filterInitialApplicants.push({
            "id":initialApplicant[i]['applicationno'],
            "nic":initialApplicant[i]['username'],
            "namewithinitials":initialApplicant[i]['name'],
            "email":initialApplicant[i]['email'],
            "mobileno":initialApplicant[i]['mobileno']
          })
        }
      }
  })
  .catch(e=>{
    console.log(e);
    
  });
  await this.getService.getInitialApplicantsByCounsellor(this.programStartedId,this.counsellorId,this.centerIdFromSummery,this.sequenceId1).toPromise()
  .then(res=>{
    initialApplicant=res;
    console.log(initialApplicant,"initialApplicant");
    
    if(initialApplicant.length>0){
      for(var i=0;i<initialApplicant.length;i++){
        this.filterInitialApplicants.push({
          "id":initialApplicant[i]['applicationno'],
          "nic":initialApplicant[i]['username'],
          "namewithinitials":initialApplicant[i]['name'],
          "email":initialApplicant[i]['email'],
          "mobileno":initialApplicant[i]['mobileno']
        })
      }
    }
})
.catch(e=>{
  console.log(e);
  
});
this.spinnerOn=false;
  }

 async getInitialApplicant(){
  let programStart=[];
  await this.applicationService.getProgramStart(this.programStartedId).toPromise()
  .then(res=>{
    programStart=res;
    console.log(programStart);
    this.programName=programStart[0]['program']['title'];
    this.academicYear=programStart[0]['academicYear']['year'];
    this.batch=programStart[0]['batchNo'];
  })
  .catch(e=>{
    console.log(e);
    
  });
      let initialApplicant=[];
    await  this.getService.getInitialApplicants(Number(this.programStartedId),Number(this.centerIdFromSummery),Number(this.sequenceId)).toPromise()
      .then(res=>{
          initialApplicant=res;
          console.log(initialApplicant,"initialApplicant");
          
          if(initialApplicant.length>0){
            for(var i=0;i<initialApplicant.length;i++){
              this.filterInitialApplicants.push({
                "id":initialApplicant[i]['applicationno'],
                "nic":initialApplicant[i]['username'],
                "namewithinitials":initialApplicant[i]['name'],
                "email":initialApplicant[i]['email'],
                "mobileno":initialApplicant[i]['mobileno']
              })
            }
          }
      })
      .catch(e=>{
        console.log(e);
        
      });
      await  this.getService.getInitialApplicants(Number(this.programStartedId),Number(this.centerIdFromSummery),Number(this.sequenceId1)).toPromise()
      .then(res=>{
          initialApplicant=res;
          console.log(initialApplicant,"initialApplicant");
          
          if(initialApplicant.length>0){
            for(var i=0;i<initialApplicant.length;i++){
              this.filterInitialApplicants.push({
                "id":initialApplicant[i]['applicationno'],
                "nic":initialApplicant[i]['username'],
                "namewithinitials":initialApplicant[i]['name'],
                "email":initialApplicant[i]['email'],
                "mobileno":initialApplicant[i]['mobileno']
              })
            }
          }
      })
      .catch(e=>{
        console.log(e);
        
      });
    this.spinnerOn=false;
  }

  back(){
    this._location.back();
  }
  captureScreen()  
  {  
    var ButtonControl = document.getElementById("buttonForPrint");
    var SelectBoxControl = document.getElementById("forSelectBox");
    var back = document.getElementById("backButtonForPrint");

    ButtonControl.style.visibility = "hidden";
    SelectBoxControl.style.visibility = "hidden";
    back.style.visibility="hidden";
    window.print();
    ButtonControl.style.visibility = "visible";
    SelectBoxControl.style.visibility = "visible";
    back.style.visibility="visible";
  } 

  onSearch(value1,value){
    if(value!=''){
      this.show=true;
    } 
  }

  changeSelect(){
    console.log(this.forSearch.get('selectForSearch').value);
    console.log(this.forSearch.get('typeForSearch').value);
    if(this.forSearch.get('selectForSearch').value==1){
      this.forFilterDiv=[];
      this.isDisable=false;
      for(var i=0;i<this.filterInitialApplicants.length;i++){
        this.forFilterDiv.push((this.filterInitialApplicants[i]['id']).toString());
      }
      console.log(this.forFilterDiv,"this.forFilterDi");
    }
    else if(this.forSearch.get('selectForSearch').value==2){
      this.forFilterDiv=[];
      this.isDisable=false;
      for(var i=0;i<this.filterInitialApplicants.length;i++){
        // if(this.filterInitialApplicants[i]['nic']!=null){
          this.forFilterDiv.push(this.filterInitialApplicants[i]['nic']);
        // }
        // else{
        //   this.forFilterDiv.push(this.filterInitialApplicants[i]['passport']);
        // }
      }
      console.log(this.forFilterDiv,"this.forFilterDi");
    }
    else if(this.forSearch.get('selectForSearch').value==3){
      this.forFilterDiv=[];
      this.isDisable=false;
      for(var i=0;i<this.filterInitialApplicants.length;i++){
        this.forFilterDiv.push(this.filterInitialApplicants[i]['namewithinitials']);
      }
    }
    else if(this.forSearch.get('selectForSearch').value==4){
      this.forFilterDiv=[];
      this.isDisable=false;
      for(var i=0;i<this.filterInitialApplicants.length;i++){
        this.forFilterDiv.push(this.filterInitialApplicants[i]['email']);
      }
    }
    else if(this.forSearch.get('selectForSearch').value==5){
      this.forFilterDiv=[];
      this.isDisable=false;
      for(var i=0;i<this.filterInitialApplicants.length;i++){
        this.forFilterDiv.push(this.filterInitialApplicants[i]['mobileno']);
      }
    }
    else if(this.forSearch.get('selectForSearch').value==6){
      this.forFilterDiv=[];
      this.forSearchArray=false;
      this.isDisable=true;
      this.forSearch.get('typeForSearch').patchValue('');
    }
  }

  onClickedOutside(){
    this.show=false;
  }

  searchSelect(search){
    this.SearchValue=search;
    this.show=false; 
  }

  search(){
    console.log(this.forSearch.get('selectForSearch').value);
    console.log(this.forSearch.get('typeForSearch').value);
    if(this.forSearch.get('selectForSearch').value==1){
      this.forSearchInitialApplicants=[];
      this.forSearchInitialApplicants.push(this.filterInitialApplicants.find(x=>x.id==this.forSearch.get('typeForSearch').value));
      this.forSearchArray=true;
    }
    else if(this.forSearch.get('selectForSearch').value==2){
      this.forSearchInitialApplicants=[];
      // if(this.filterInitialApplicants.find(x=>x.nic==this.forSearch.get('typeForSearch').value)==null){
      //   this.forSearchInitialApplicants.push(this.filterInitialApplicants.find(x=>x.passport==this.forSearch.get('typeForSearch').value));
      // }
      // else{
        this.forSearchInitialApplicants.push(this.filterInitialApplicants.find(x=>x.nic==this.forSearch.get('typeForSearch').value));
      // }
      
      this.forSearchArray=true;
    }
    else if(this.forSearch.get('selectForSearch').value==3){
      this.forSearchInitialApplicants=[];
      this.forSearchInitialApplicants.push(this.filterInitialApplicants.find(x=>x.namewithinitials==this.forSearch.get('typeForSearch').value));
      this.forSearchArray=true;
    }
    else if(this.forSearch.get('selectForSearch').value==4){
      this.forSearchInitialApplicants=[];
      this.forSearchInitialApplicants.push(this.filterInitialApplicants.find(x=>x.email==this.forSearch.get('typeForSearch').value));
      this.forSearchArray=true;
    }
    else if(this.forSearch.get('selectForSearch').value==5){
      this.forSearchInitialApplicants=[];
      this.forSearchInitialApplicants.push(this.filterInitialApplicants.find(x=>x.mobileno==this.forSearch.get('typeForSearch').value));
      this.forSearchArray=true;
    }
    else if(this.forSearch.get('selectForSearch').value==6){
      this.forSearchArray=false;
    }
  }

  onMore(nic){
    console.log(nic,"nic");
    this.router.navigate(['app/searchapplication',{nic:nic}]);
  }

}
