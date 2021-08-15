import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DefineAcademicCentersService } from '../../Service/define-academic-centers.service';
import { DefineEntranceExamRootCentersService } from "../../Service/define-entrance-exam-root-centers.service";
import {Medium,Center} from '../../Modal/defineAcademicCenter';
import { getPostalCodeAdministrativeCenter,getAcademicCenter,getProgramMedium,cnt_center } from "../../Modal/define-entrance-exam";
import { ShareServiceService } from "../../Service/share-service.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-define-entrance-exam-root-centers',
  templateUrl: './define-entrance-exam-root-centers.component.html',
  styleUrls: ['./define-entrance-exam-root-centers.component.css']
})
export class DefineEntranceExamRootCentersComponent implements OnInit {
medium : Medium[];
center : cnt_center[];
getProgramMedium:getProgramMedium[];
getAdministrativeCenter:getPostalCodeAdministrativeCenter[];
getAcademicCenter:getAcademicCenter[];
CentersValues=[];
Remove = "false";
ShowCenters="false";
Centers = [];
cnterId=[];
CenterID:any;
programStartedID:any;
programID:any;
mediumValues=[];
mediumId=[];
isProgramMedium=false;
indexMedium:any;
isCenterType=3;
programScheduleCode:any;
  constructor(private toastr: ToastrService,private getData:DefineAcademicCentersService,private getEntranceExamData:DefineEntranceExamRootCentersService,private getShareData: ShareServiceService) { 
    this.ExamRootCenters.get('centerType').patchValue("centerType3");
    this.ExamRootCenters.get('sameMedium').patchValue("No");

    this.programStartedID=this.getShareData.ShareData;
    this.programID=this.getShareData.ShareProgramId;
    this.programScheduleCode=this.getShareData.ShareProgramStartedCode;
    this.getData.getMedium().subscribe
    (res =>{
    this.medium = res as Medium[]
    console.log(this.medium);
    })

    this.getData.getCenter().subscribe
    (res =>{
      this.center = res as cnt_center[]
      this.center.forEach(s=> this.Centers.push(s['description'])) 
    })  

    this.getEntranceExamData.getPostalCodeAdministrativeCenter().subscribe
    (res=>{
      this.getAdministrativeCenter=res as getPostalCodeAdministrativeCenter[]
      console.log(this.getAdministrativeCenter);
    })
    this.getEntranceExamData.getAcademicCenters(this.programStartedID).subscribe
    (res=>{
      this.getAcademicCenter=res as getAcademicCenter[]
      console.log(this.getAcademicCenter);
      
    })
    this.getEntranceExamData.getProgramMedium(this.programID).subscribe
    (res=>{
      this.getProgramMedium=res as getProgramMedium[]
      console.log(this.getProgramMedium,"Hi");
      console.log(this.programStartedID,"Hello");
      
    })
  }

  ngOnInit(): void {
  }
centerType=['Same as Student Administrative Center','Same as Student Academic Center','Independent from Student Administrative/Academic Center'];
ExamRootCenters = new FormGroup({
  previousSchedule: new FormControl(''),
  centerType: new FormControl(''),
  sameMedium: new FormControl(''),
  centerMedium: new FormControl(''),
})

onRemove()
{
  this.Remove="true"; 
  this.CentersValues=[];
}

onTextChange(value)
{
  if(this.CentersValues!=[]){
    this.ShowCenters="true";
  }
  else{
    this.ShowCenters="false";
  }
}

onItemRemoved(value)
{
console.log(value.value);

  if(this.CentersValues!=[]){
    this.ShowCenters="true";
  }
  else{
    this.ShowCenters="false";
  }
  // this.FirstArray= this.FirstArray.filter(item=>item['center']!==value.value);
  // console.log(this.FirstArray);
}

onActivityItemChange(value){
  this.CentersValues=[];
if(value=="centerType1"){
  this.isCenterType=1;
  for(var i=0;i<this.getAdministrativeCenter.length;i++){
    this.CentersValues.push(this.getAdministrativeCenter[i].rgtAdminCenter.adc_description);
  }  
}
if(value=="centerType2"){
  this.isCenterType=2;
  for(var i=0;i<this.getAcademicCenter.length;i++){
    this.CentersValues.push(this.getAcademicCenter[i].cnt_center.description);
  }  
}
if(value=="centerType3"){
this.isCenterType=3;
}

}

onclick(value,checked){
  if(checked){
    this.mediumId.push({
      "id":value
    });
  }
else{
  this.mediumId.filter(item=>item.id==value).forEach(s=>this.indexMedium=this.mediumId.indexOf(s))
  this.mediumId.splice(this.indexMedium,1); 
}
  console.log(this.mediumId); 
}

onMediumChange(value){
  this.mediumId=[];
  if(value=="Yes"){
    this.isProgramMedium=true;
for(var i=0;i<this.getProgramMedium.length;i++){
     this.mediumValues[this.getProgramMedium[i].medium.mediumId]=true;
  this.mediumId.push({
    "id":this.getProgramMedium[i].medium.mediumId
  })
}
  }
if(value=="No"){
  this.isProgramMedium=false;
  for(var i=0;i<this.medium.length;i++){
    this.mediumValues[this.medium[i].med_mediumId]=false;
  }
}
console.log(this.mediumId);

}

Save(){

  if(this.ExamRootCenters.get('centerType').value=="centerType3"){
    for(var i=0;i<this.CentersValues.length;i++){
      this.center.filter(s=>s.description==this.CentersValues[i].value).forEach(s=> this.CenterID=s['id']);
      this.cnterId.push({
          "id":this.CenterID
      })
    }
    console.log(this.cnterId);
  }


  if(this.ExamRootCenters.get('centerType').value=="centerType2"){
    for(var i=0;i<this.CentersValues.length;i++){
      this.getAcademicCenter.filter(s=>s.cnt_center.description==this.CentersValues[i]).forEach(s=> this.CenterID=s.cnt_center.id);
      this.cnterId.push({
          "id":this.CenterID
      })
    }
    console.log(this.cnterId);
  }


  if(this.ExamRootCenters.get('centerType').value=="centerType1"){
    for(var i=0;i<this.CentersValues.length;i++){
      this.getAdministrativeCenter.filter(s=>s.rgtAdminCenter.adc_description==this.CentersValues[i]).forEach(s=> this.CenterID=s.rgtAdminCenter.adc_adminCenterId);
      this.cnterId.push({
          "id":this.CenterID
      })
    }
  }

let body={
  "examCenterType": {
    "examCenterTypeId": this.isCenterType
  },
  "examMediums": this.mediumId,
  "examRootCenter": this.cnterId,
  "isEntryExamMediumAndProgMediumEqual": this.isProgramMedium,
  "programStarted": {
    "programScheduleCode": this.programScheduleCode
  }
}

console.log(body,"Hello");

this.getEntranceExamData.postEntranceExam(body).toPromise()
.then(s=>{ this.toastr.success( s['message']); })
.catch((s) => { this.toastr.error("error", s['error']['message']); console.log(s);});


}


onReset(){
  this.ExamRootCenters.get('centerType').patchValue("centerType3");
  this.ExamRootCenters.get('sameMedium').patchValue("No");
  this.isCenterType=3;
  this.mediumId=[];
  this.CenterID=[];
  this.isProgramMedium=false;
  for(var i=0;i<this.medium.length;i++){
    this.mediumValues[this.medium[i].med_mediumId]=false;
  }
  this.CentersValues=[];
}

}
