import { Component, HostListener, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {SchedulingCoordinatorService} from '../../Service/scheduling-pc.service';
import {SchedulingComService} from '../../Service/scheduling-dop.service';
import {ShareServiceService} from '../../Service/share-service.service';
import {ProgramStarted,EntryExamSubComponent,CenterCapacity,EntranceExamTimeSlotTable1} from '../../Modal/scheduling-pc';
import {Faculties,Departments,Units,Programs,AcademicYear,ActivityStarted,ActivityCenterDate,ActivityProgramDate,DefineActivityStarted} from '../../Modal/scheduling-dop'
import{examScheduling} from '../../Modal/defineEntranceExamScheduling';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
export enum KEY_CODE {
  UP_ARROW = 38,
  DOWN_ARROW = 40
}

@Component({
  selector: 'app-scheduling-coordinator',
  templateUrl: './scheduling-pc.component.html',
  styleUrls: ['./scheduling-pc.component.css'],
})
export class SchedulingCoordinatorComponent implements OnInit {
  public date = moment();
  public centerdate = moment();
  public isReserved = null;
  public isReservedCenter=null;
  public daysArr;
  public CenterdaysArr;
  forNewProgramDisabled:any;
  forReProgramDisabled:any;
  forPCProgramDisabled:any;
  SetProgramValue=5;
  SetCenterValue=0;
  public FilterDateStudentShip;
  public FilterDateLastDateStudentShip;
  i:any;
  limit:number =0;
  PS_ST_Value='r';
  Getprograms : any;
  isCenter:boolean;
  forActiveCenter:any;
  forActiveProgram="active";
  forIndex:any;
  priviousDate="";
  Faculty:any;
  Department:any;
  Program:any;
  programScheduleCode:any;
  programScheduleCodeName:any;
  studentTypeIDfromDB:any;
  ProgramStartedID:any;
  ProgramID:any;
  activityID:any;
  activityName:any;
  programDateID=0;
  centerScheduleCodeName:any;
  ProgramStartedIDCenter:any;
  Center="";
  rightFunctionValue:any;
  CenterID:any;
  centerDateID=0;
  editDateFrom:any;
  editDateTo:any;
  dateForFromFiveMonths:any;
  dateForFromTwwoMonths:any;
  selectedMethodId:any;
  paperId:number;
  fromTime:any;
  toTime:any;

  examScheduleDate=[];
  examScheduleTime=[];
  examScheduleLunchTime=[];
  SetCenterDates = [];
  paperName=[];
  Centers=[];
  CentersValue=[];
  methodOfSelection=[];
  onSelectHall=[];
  selectedEntryExamMethod=[];
  showDataselectedEntryExamMethod=[];
  SetCenterDatesActivity=[];
  activitiesWithProgramID=[];
  SetProgramDates = [];
  SetProgramDatesActivity=[];
  addExamSchedules=[];
  programdateBetween=[];
  ScheduleCode=[];

  programStarted: ProgramStarted[];
  getProgramStarted: ProgramStarted;
  entranceExamTimeSlotGet: EntryExamSubComponent[];
  activityProgramDate: ActivityProgramDate[];
  activityStarted: DefineActivityStarted[];
  selectHall:CenterCapacity[];
  activityCenterDate:ActivityCenterDate[];
  entranceExamTimeSlotTable1:EntranceExamTimeSlotTable1[];

  ProgrameReNotification=false;
  ProgrameNewNotification=false;
  isProgram = true;
  visibleDiv=false;
  selectionTest=false;
  GradingTest=false;
  Viva=false;
  Interview=false;
  showProgramSelectedDates=false;
  forCheckTableValue=false;
  ApplicableNewStudents=false;
  activeProgram=false;
  isForActiveProgram=true;
  showCreatedTableProgram=false;
  forUpdateBtn=false;
  isForSelected=true;
  forEdit=false;
  showMethodofSelection=false;
  showHallofSelection=false;
  showDefineEntranceExamTableProgram=false;
  showCreatedTableCentre=false;
  isDisabledCenter=true;
  active=false;
  isForActiveCenter=true;
  forEditCenter=false;
  forUpdateBtnCenter=false;
  isForMultySelectEdit=false;
  forMethodOfSelection=false;
  forSubComponent=false;

  public dateForm: FormGroup;
  public CenterdateForm: FormGroup;
  SchedulingCoordinatorForm = new FormGroup({
    Scheduling: new FormControl(''),
    Faculty: new FormControl(''),
    Department: new FormControl(''),
    Program: new FormControl(''),
    StudentType: new FormControl({value:'',disabled: true}),
    MultipleBatches: new FormControl({value:false,disabled: true}),
    AcademicYear: new FormControl({value:'',disabled: true}),
    Batch: new FormControl({ value: '', disabled: true }),
    Local:new FormControl({ value: '', disabled: true }),
    Foreign:new FormControl({ value: '', disabled: true })
  });
  examScheduleTable=new FormGroup({
    MethodofSelection: new FormControl(''),
    PaperName: new FormControl(''),
    FromDate: new FormControl(''),
    ToDate: new FormControl(''),
    Date: new FormControl(''),
    FromTimeHour : new FormControl('',Validators.required),
    FromTimeMinute : new FormControl('',Validators.required),
    FromTimePeriod: new FormControl('',Validators.required),
    ToTimeHour : new FormControl('',Validators.required),
    ToTimeMinute : new FormControl('',Validators.required),
    ToTimePeriod: new FormControl('',Validators.required),
    AttendanceCompulsory : new FormControl(''),
    LunchFromTimeHour: new FormControl(''),
    LunchFromTimeMinute: new FormControl(''),
    LunchFromTimePeriod: new FormControl(''),
    LunchToTimeHour: new FormControl(''),
    LunchToTimeMinute: new FormControl(''),
    LunchToTimePeriod: new FormControl(''),
    StudentCount: new FormControl('')
  })
  ProgramCodedateForm = new FormGroup({
    ScheduleCode:new FormControl(''),
  })
  ProgramEntranceExamMethod= new FormGroup({
    methodOfSelection:new FormControl(''),
    hallNo:new FormControl(''),
  })
  CentreCodedateForm= new FormGroup({
    ScheduleCode1:new FormControl(''),
  })

  constructor(private getShareData: ShareServiceService,private toastr: ToastrService,private ProgramService : SchedulingCoordinatorService,private dopProgramService:SchedulingComService, private router: Router,private fb: FormBuilder) 

  {   
    this.initDateRange();  
    this.initCenterDateRange();
    //this.checkDate();
    if(this.selectionTest){
      this.examScheduleTable.patchValue({MethodofSelection:'Selection Test'})
    }
    else if(this.GradingTest){
      this.examScheduleTable.patchValue({MethodofSelection:'Grading Test'})
    }
    else{
      if(this.Viva){
        this.examScheduleTable.patchValue({MethodofSelection:'Viva'})
      }
      if(this.Interview){
        this.examScheduleTable.patchValue({MethodofSelection:'Interview'})
      }
    }

    this.dopProgramService.getAllProgramStarted().toPromise().then    
    (res=>{
      this.programStarted=res as ProgramStarted[];
      for(let i=0; i<this.programStarted.length;i++){
        this.ScheduleCode.push(this.programStarted[i]['programScheduleCode'])
      }
      this.ScheduleCode.sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0));
    })
  }

  onProgramScheduleCode(value){
this.programScheduleCode=value;
this.ProgramService.getProgramsStartedService(value).toPromise().then
(res=>{ 
this.getProgramStarted=res as ProgramStarted;
this.Faculty=this.getProgramStarted.program.facultyId.description;
if(this.getProgramStarted.program.department.description=="Null"){
  this.Department="___";
}
else{
  this.Department=this.getProgramStarted.program.department.description;
}
this.Program= this.getProgramStarted.program.title;
this.SchedulingCoordinatorForm.patchValue({StudentType : this.getProgramStarted.studentType.description});
this.SchedulingCoordinatorForm.patchValue({MultipleBatches: this.getProgramStarted.multipleBatchApplicable});
this.SchedulingCoordinatorForm.patchValue({AcademicYear: this.getProgramStarted.academicYear.year});
this.SchedulingCoordinatorForm.patchValue({Batch: this.getProgramStarted.batchNo});
this.SchedulingCoordinatorForm.patchValue({Local:this.getProgramStarted.localFee});
this.SchedulingCoordinatorForm.patchValue({Foreign:this.getProgramStarted.foreignFee});
if(this.getProgramStarted.studentType.description=="Both"){
this.ApplicableNewStudents=true;
}
else{
  this.ApplicableNewStudents=false;
}
if(this.getProgramStarted.studentType.description=="Both"||this.getProgramStarted.studentType.description=="New"){
this.SchedulingCoordinatorForm.get('Local').enable();
this.SchedulingCoordinatorForm.get('Foreign').enable();
}
else{
  this.SchedulingCoordinatorForm.get('Local').disable();
  this.SchedulingCoordinatorForm.get('Foreign').disable();
}
this.programStarted.filter(s=>s.programScheduleCode==value).forEach(s=>this.getShareData.ShareData=s.programStartedId);
this.programStarted.filter(s=>s.programScheduleCode==value).forEach(s=>this.getShareData.ShareProgramId=s.program.programId);
this.programStarted.filter(s=>s.programScheduleCode==value).forEach(s=>this.getShareData.ShareProgramStartedCode=s.programScheduleCode);
console.log(this.getShareData.ShareData);
console.log(this.getShareData.ShareProgramId);
console.log(this.getShareData.ShareProgramStartedCode);

})

}

 onProgramScheduleCodeforDate(value){ 
  this.isForActiveProgram=false;
  this.showMethodofSelection=false;
  this.showHallofSelection=false;
  this.isForSelected=false;
  this.isDisabledCenter=true; 
  this.showDefineEntranceExamTableProgram=false;
  this.activitiesWithProgramID.length=0;
  this.SetProgramDates.length=0;
  this.methodOfSelection.length=0;
  this.SetProgramDatesActivity=[];
  this.onSelectHall=[];
  this.programScheduleCodeName=value;
  this.programStarted.filter(x=>x.programScheduleCode==value).forEach(x=>this.ProgramID=x.program.programId)
  this.programStarted.filter(x=>x.programScheduleCode==value).forEach(x=>this.ProgramStartedID=x.programStartedId)
  this.programStarted.filter(x=>x.programScheduleCode==value).forEach(x=>this.studentTypeIDfromDB=x.studentType.id)
  if(this.studentTypeIDfromDB==1){
    this.PS_ST_Value="n";  
  }
  if(this.studentTypeIDfromDB==2){
    this.PS_ST_Value="r";
  }
  if(this.studentTypeIDfromDB==3){
    this.PS_ST_Value="b";
  }
  
   this.programGet();
  
   this.entranceExamGet();

  this.timeSlotBindingTable1();
   console.log(this.entranceExamTimeSlotGet,"Hello");
  this.ProgramService.getHall(value).subscribe
  (res=>{
  this.selectHall=res as CenterCapacity[];
  if(this.selectHall.length>0){
    this.onSelectHall=[];
    for(var i=0;i<this.selectHall.length;i++){
      this.onSelectHall.push({
        "description":this.selectHall[i].entranceExamCenterHall.description,
        "id":this.selectHall[i].entranceExamCenterHall.id});
    }
  }
  console.log(this.onSelectHall);
  
  })
  
  this.dopProgramService.getActivityStarted(this.ProgramID).subscribe
  (res=>{   
  this.activityStarted=res as DefineActivityStarted[];
    if(this.activityStarted.length>0){
      for(let i=0;i<this.activityStarted.length;i++){
        this.SetProgramDatesActivity=[];
        this.activitiesWithProgramID.push(this.activityStarted[i]);
        console.log(this.activitiesWithProgramID);
        this.activitiesWithProgramID.filter(s=>s.activityStarted.activityDateType.id==1).forEach(s=> this.SetProgramDatesActivity.push(s.activityStarted.activity))
        
      }
    }

        if(this.SetProgramDatesActivity.length>0){
          for(let i=0;i<this.SetProgramDatesActivity.length;i++){
            this.SetProgramDates.push(
              {
                "name":this.SetProgramDatesActivity[i]['name'],
                "id":this.SetProgramDatesActivity[i]['activityId']
              }); 
              }
        }  

        const result = Array.from(this.SetProgramDates.reduce((m, t) => m.set(t.name, t), new Map()).values());
        this.SetProgramDates=result;
        console.log(result,"abc");
    })
}

onProgramScheduleCodeCenter(value){
  this.SetCenterDates.length=0;
  this.activitiesWithProgramID.length=0;
  this.SetCenterDatesActivity=[];
  this.centerScheduleCodeName=value;
  this.programStarted.filter(x=>x.programScheduleCode==value).forEach(x=>this.ProgramID=x.program['programId'])
  this.programStarted.filter(x=>x.programScheduleCode==value).forEach(x=>this.ProgramStartedIDCenter=x.programStartedId)

  this.centreGet();

  this.dopProgramService.getActivityStarted(this.ProgramID).subscribe
  (res=>{
    this.activityStarted=res as DefineActivityStarted[];
    if(this.activityStarted.length>0){
      for(let i=0;i<this.activityStarted.length;i++){
        // this.SetProgramDatesActivity=[];
        this.SetCenterDatesActivity=[];
        this.activitiesWithProgramID.push(this.activityStarted[i]);
        // this.activitiesWithProgramID.filter(s=>s.activityDateType['id']==1).forEach(s=> this.SetProgramDatesActivity.push(s.activity))
        this.activitiesWithProgramID.filter(s=>s.activityStarted.activityDateType.id==2).forEach(s=> this.SetCenterDatesActivity.push({"activity":s.activityStarted.activity,"id":s.id}))
      }
    }
    console.log(this.SetCenterDatesActivity,"hi");
        if(this.SetCenterDatesActivity.length>0){
          for(let i=0;i<this.SetCenterDatesActivity.length;i++){
            this.SetCenterDates.push(
              {
                "name":this.SetCenterDatesActivity[i].activity['name'],
                "id":this.SetCenterDatesActivity[i].activity['activityId']
              });
              }
        }

        const result = Array.from(this.SetCenterDates.reduce((m, t) => m.set(t.name, t), new Map()).values());
        this.SetCenterDates=result;
    })
}

public centreGet(){
  this.dopProgramService.getActivityCenterDate(this.ProgramStartedIDCenter).subscribe
  (res=>{
    this.activityCenterDate= res as ActivityCenterDate[];
    if(this.activityCenterDate.length>0){
      this.showCreatedTableCentre=true;
    }
    else{
      this.showCreatedTableCentre=false;
    }
  })
}

RightFunction(){
  if(this.rightFunctionValue<this.Centers.length-1){
    this.rightFunctionValue++;
    this.Center=this.Centers[this.rightFunctionValue];
  }

  this.CentersValue[0].filter(s=>s.cnt_description==this.Center).forEach(s=>this.CenterID=s.cnt_centerId)
  console.log(this.CenterID);

}

LeftFunction(){
  if(this.rightFunctionValue>0){
    this.rightFunctionValue--;
    this.Center=this.Centers[this.rightFunctionValue];
  }

  this.CentersValue[0].filter(s=>s.cnt_description==this.Center).forEach(s=>this.CenterID=s.cnt_centerId)
  console.log(this.CenterID);
}

setActive(i){
  return this.active===i;
}

public programGet(){
  this.dopProgramService.getActivityProgramDate(this.ProgramStartedID).subscribe
  (res=>{
    this.activityProgramDate= res as ActivityProgramDate[];
    console.log(this.activityProgramDate);
    
    if(this.activityProgramDate.length>0){
      this.showCreatedTableProgram=true; 
    }
    else{
      this.showCreatedTableProgram=false;
    }
  })

}

async  entranceExamGet(){  
 await this.ProgramService.getEntranceExamData(this.ProgramID).subscribe
  (res=>{
    this.entranceExamTimeSlotGet = res as EntryExamSubComponent[];
    for(var i=0;i<this.entranceExamTimeSlotGet.length;i++){
      this.methodOfSelection.push(
        {
          "description":this.entranceExamTimeSlotGet[i].entryExamComponent.entryExamMethod.description,
          "id":this.entranceExamTimeSlotGet[i].entryExamComponent.entryExamMethod.id
        }); 
  
    }
    const result = Array.from(this.methodOfSelection.reduce((m, t) => m.set(t.description, t), new Map()).values());
    this.methodOfSelection=result;
    console.log(this.entranceExamTimeSlotGet,"12345");
    
  })
}

async timeSlotBindingTable1(){
  this.showDataselectedEntryExamMethod=[];
await this.ProgramService.getTimeSlotBindingTable1(this.ProgramStartedID).subscribe
(res=>{
this.entranceExamTimeSlotTable1= res as EntranceExamTimeSlotTable1[];
console.log(this.entranceExamTimeSlotTable1,"enneda gama");
this.entranceExamTimeSlotTable1.filter(x=>x.entryExamComponent.entryExamMethod.id==this.selectedMethodId).forEach(x=>this.showDataselectedEntryExamMethod.push(x));
})

}

//  PaperNameGet(){
// this.paperName=[];
//   for(var i=0;i<this.entranceExamTimeSlotGet.length;i++){
//     this.paperName.push(
//       {
//         "description":this.entranceExamTimeSlotGet[i].description,
//         "id":this.entranceExamTimeSlotGet[i].id
//       }); 

//   }
// }

onHallSelect(value){
this.paperId=value;
this.forSubComponent=true;
this.forMethodOfSelection=false;
}

onMethodOfSelection(value){
  this.selectedEntryExamMethod=[];
  this.showDataselectedEntryExamMethod=[];
  this.selectedMethodId=value;
  this.forSubComponent=false;
  this.forMethodOfSelection=true;
  if(value==1){
    this.selectionTest=true;
    this.GradingTest=false;
    this.Viva=false;
    this.Interview=false;
    
    
    this.entranceExamTimeSlotGet.filter(x=>x.entryExamComponent.entryExamMethod.id==value).forEach(x=>this.selectedEntryExamMethod.push(x))
      //const result = Array.from(this.selectedEntryExamMethod.reduce((m, t) => m.set(t.paper, t), new Map()).values());
      //this.selectedEntryExamMethod=result;
    console.log(this.selectedEntryExamMethod);
    this.entranceExamTimeSlotTable1.filter(x=>x.entryExamComponent.entryExamMethod.id==value).forEach(x=>this.showDataselectedEntryExamMethod.push(x));
    if(this.showDataselectedEntryExamMethod.length>0){
      this.showDefineEntranceExamTableProgram=true;
    }
    else{
      this.showDefineEntranceExamTableProgram=false;
    }
    console.log(this.showDataselectedEntryExamMethod,"abc");
  }
  if(value==2){
    this.selectionTest=false;
    this.GradingTest=false;
    this.Viva=true;
    this.Interview=false;

    this.entranceExamTimeSlotGet.filter(x=>x.entryExamComponent.entryExamMethod.id==2).forEach(x=>this.selectedEntryExamMethod.push(x))
      // const result = Array.from(this.selectedEntryExamMethod.reduce((m, t) => m.set(t.paper, t), new Map()).values());
      // this.selectedEntryExamMethod=result;
    console.log(this.selectedEntryExamMethod);
    this.entranceExamTimeSlotTable1.filter(x=>x.entryExamComponent.entryExamMethod.id==value).forEach(x=>this.showDataselectedEntryExamMethod.push(x));
    if(this.showDataselectedEntryExamMethod.length>0){
      this.showDefineEntranceExamTableProgram=true;
    }
    else{
      this.showDefineEntranceExamTableProgram=false;
    }
    console.log(this.showDataselectedEntryExamMethod,"abc");
  }
  
  if(value==3){
    this.selectionTest=false;
    this.GradingTest=true;
    this.Viva=false;
    this.Interview=false;

    this.entranceExamTimeSlotGet.filter(x=>x.entryExamComponent.entryExamMethod.id==value).forEach(x=>this.selectedEntryExamMethod.push(x))
      // const result = Array.from(this.selectedEntryExamMethod.reduce((m, t) => m.set(t.paper, t), new Map()).values());
      // this.selectedEntryExamMethod=result;
    console.log(this.selectedEntryExamMethod);
    this.entranceExamTimeSlotTable1.filter(x=>x.entryExamComponent.entryExamMethod.id==value).forEach(x=>this.showDataselectedEntryExamMethod.push(x));
    if(this.showDataselectedEntryExamMethod.length>0){
      this.showDefineEntranceExamTableProgram=true;
    }
    else{
      this.showDefineEntranceExamTableProgram=false;
    }
    console.log(this.showDataselectedEntryExamMethod,"abc");
  }
  if(value==4){
    this.selectionTest=false;
    this.GradingTest=false;
    this.Viva=false;
    this.Interview=true;
      this.entranceExamTimeSlotGet.filter(x=>x.entryExamComponent.entryExamMethod.id==4).forEach(x=>this.selectedEntryExamMethod.push(x))
      // const result = Array.from(this.selectedEntryExamMethod.reduce((m, t) => m.set(t.paper, t), new Map()).values());
      // this.selectedEntryExamMethod=result;
    console.log(this.selectedEntryExamMethod);
    this.entranceExamTimeSlotTable1.filter(x=>x.entryExamComponent.entryExamMethod.id==value).forEach(x=>this.showDataselectedEntryExamMethod.push(x));
    if(this.showDataselectedEntryExamMethod.length>0){
      this.showDefineEntranceExamTableProgram=true;
    }
    else{
      this.showDefineEntranceExamTableProgram=false;
    }
    console.log(this.showDataselectedEntryExamMethod,"abc");
  }
}

setProgramHidden(i)
{
  
  if((i==4||i==5)&&this.PS_ST_Value=="n")
  { 
    return true;
  }
  else if(i==1&&this.PS_ST_Value=="r")
  {
    return true;
  }
  else
  {
    return false;
  }
}

setReadOnly(i){
  
  if(i==6||i==7||i==8)
  { 
    return false;
  }
  else
  {
    return true;
  }
}

setProgramActive(i){
  return this.activeProgram === i;
}

programDateArray(){
  let body={
    "programStarted": {"programStartedId":Number(this.ProgramStartedID)},
    "activity": {"activityId": Number(this.activityID)},
    "dateFrom": String(this.dateForm.get("ProgramdateFrom").value),
    "dateObject": {},
    "dateTo": String(this.dateForm.get("ProgramdateTo").value),
}

this.dopProgramService.createProgramDate(body).toPromise()
.then(s => { this.toastr.success(s);this.programGet();console.log(s);this.isForSelected=false;this.isForActiveProgram=false; })
.catch((s) => { this.toastr.error( s['error']['message']); console.log(s);});
}

UpdateprogramDateArray(){
  let body={
    "activity": {
      "activityId": this.activityID,
    },
    "dateFrom": this.dateForm.get('ProgramdateFrom').value,
    "dateObject": {},
    "dateTo": this.dateForm.get('ProgramdateTo').value,
    "id": this.programDateID,
    "programStarted": {
      "programStartedId": this.ProgramStartedID
    }
  }
   this.dopProgramService.updateProgramDate(body).toPromise().
  then(s => { this.toastr.success(this.programScheduleCodeName+" has successfully Updated.", s['message']);this.programGet();})
  .catch((s) => { this.toastr.error("Error", s['error']['message']); console.log(s);});
  this.forEdit=false;
  this.forUpdateBtn=false;
  this.isForSelected=false;
  this.isForActiveProgram=false;
}

public EditCreatedProgramTable(i){ 
  this.forEdit=true;
  this.forUpdateBtn=true;
  this.programDateID=this.activityProgramDate[i].id;
  this.dateForm.setValue({ ProgramdateFrom: this.activityProgramDate[i].dateFrom, ProgramdateTo: this.activityProgramDate[i].dateTo});
  this.selectedProgramDate(moment(this.activityProgramDate[i].dateFrom));
  this.selectedProgramDate(moment(this.activityProgramDate[i].dateTo));
  this.isProgramSelected(moment(this.activityProgramDate[i].dateFrom));
  this.isProgramSelected(moment(this.activityProgramDate[i].dateTo));
  this.setProgramActive(this.activityProgramDate[i].activity.activityId);
  this.ProgramActive(this.activityProgramDate[i].activity.activityId,this.activityProgramDate[i].activity.name)
  this.isForActiveProgram=true;
}

async DeleteProgramDB(i){ 
  await this.dopProgramService.deleteProgramDate(this.activityProgramDate[i]['id']).toPromise().
   then(s => { this.toastr.success(this.activityProgramDate[i].programStarted['programScheduleCode']+" has successfully deleted.", s['message']);this.programGet();})
   .catch((s) => { this.toastr.error("Error", s['error']['message']); console.log(s);});
   this.isForSelected=false;
   this.isForActiveProgram=false;
 }

public saveToTable(){
  this.showHallofSelection=true;
  if(this.examScheduleTable.value.FromTimePeriod=="pm"&&Number(this.examScheduleTable.value.FromTimeHour)==12){
    this.fromTime=(this.examScheduleTable.value.FromTimeHour+":"+this.examScheduleTable.value.FromTimeMinute+":00");
  }
  else if(this.examScheduleTable.value.FromTimePeriod=="am"&&Number(this.examScheduleTable.value.FromTimeHour)==12){
    this.fromTime=("00:"+this.examScheduleTable.value.FromTimeMinute+":00");
  }
  else if(this.examScheduleTable.value.FromTimePeriod=="pm"){
    let eve=(12+Number(this.examScheduleTable.value.FromTimeHour));
    this.fromTime=(eve+":"+this.examScheduleTable.value.FromTimeMinute+":00");
  }
  else{
    this.fromTime=(this.examScheduleTable.value.FromTimeHour+":"+this.examScheduleTable.value.FromTimeMinute+":00");
  }

  if(this.examScheduleTable.value.ToTimePeriod=="pm"&&Number(this.examScheduleTable.value.ToTimeHour)==12){
    this.toTime=(this.examScheduleTable.value.ToTimeHour+":"+this.examScheduleTable.value.ToTimeMinute+":00");
  }
  else if(this.examScheduleTable.value.ToTimePeriod=="am"&&Number(this.examScheduleTable.value.ToTimeHour)==12){
    this.toTime=("00:"+this.examScheduleTable.value.ToTimeMinute+":00");
  }
  else if(this.examScheduleTable.value.ToTimePeriod=="pm"){
    let eve=(12+Number(this.examScheduleTable.value.ToTimeHour));
    this.toTime=(eve+":"+this.examScheduleTable.value.ToTimeMinute+":00");
  }
  else{
    this.toTime=(this.examScheduleTable.value.ToTimeHour+":"+this.examScheduleTable.value.ToTimeMinute+":00");
  }
  this.examScheduleTable.value.FromTimeHour;
  let body={
    "assigndate": this.examScheduleTable.get('Date').value,
   
    "endTime":this.toTime,
   "ishidden": true,
    "entryExamComponent": {
      "id": Number(this.paperId)
    },
    "programStarted": {  
      "programStartedId": this.ProgramStartedID
    },
    "starttime": this.fromTime
  } 
    // "entryExamComponent": {
    //   "id": 1
    // },
  let body1={
    "assigndate":this.examScheduleTable.get('Date').value,
  
    "endTime":this.toTime,
    "ishidden": true,
   
    "programEntryExamMethod": {
      "programEntryExamMethodPK": {
        "entryExamMethodId":Number(this.selectedMethodId),
        "programId": Number(this.ProgramID)
      }
    },
    "programStarted": {
  
      "programStartedId":this.ProgramStartedID
  
    },
  
    "starttime":this.fromTime
  }
  
  console.log(body,"Hi buddy");
  console.log(body1,"Hi hello");
  
if(this.forCheckTableValue==false){
  this.addExamSchedules[this.addExamSchedules.length]=this.examScheduleTable.value;
  console.log(this.addExamSchedules);
}
  else{
    this.addExamSchedules[this.forIndex]=this.examScheduleTable.value;
    console.log(this.forIndex);
    console.log(this.examScheduleTable.value);
  }
  this.examScheduleTable.patchValue({Date:""});
  this.examScheduleTable.patchValue({FromTimeHour:""});
  this.examScheduleTable.patchValue({FromTimeMinute:""});
  this.examScheduleTable.patchValue({FromTimePeriod:""});
  this.examScheduleTable.patchValue({ToTimeHour:""});
  this.examScheduleTable.patchValue({ToTimeMinute:""});
  this.examScheduleTable.patchValue({ToTimePeriod:""});
  this.examScheduleTable.patchValue({AttendanceCompulsory:""});
  this.examScheduleTable.patchValue({LunchFromTimeHour:""});
  this.examScheduleTable.patchValue({LunchFromTimeMinute:""});
  this.examScheduleTable.patchValue({LunchFromTimePeriod:""});
  this.examScheduleTable.patchValue({LunchToTimeHour:""});
  this.examScheduleTable.patchValue({LunchToTimeMinute:""});
  this.examScheduleTable.patchValue({LunchToTimePeriod:""});
  this.examScheduleTable.patchValue({StudentCount:""});
  this.visibleDiv=false;
  this.checkDate();
 
if(this.forSubComponent==true&&this.forMethodOfSelection==false){
  this.ProgramService.createTimeSlot(body).toPromise().
  then(s => { this.toastr.success(s['message']);this.timeSlotBindingTable1();})
  .catch((s) => { this.toastr.error("Error", s['error']['message']); console.log(s);});
}
if(this.forMethodOfSelection==true&&this.forSubComponent==false){
  this.ProgramService.createTimeSlotforMethod(body1).toPromise().
  then(s => { this.toastr.success(s['message']);})
  .catch((s) => { this.toastr.error("Error", s['error']['message']); console.log(s);});
}
}

fromTimeChange(value){ 
  if((value).charCodeAt(0)<48||(value).charCodeAt(0)>57){
    this.examScheduleTable.get('FromTimeHour').patchValue('');
  }   
  if(this.examScheduleTable.value.FromTimeHour>12 ||this.examScheduleTable.value.FromTimeHour<0){
    this.examScheduleTable.get('FromTimeHour').patchValue('');
  }
}

fromTimeChangeMinute(value){
  if((value).charCodeAt(0)<48||(value).charCodeAt(0)>57){
    this.examScheduleTable.get('FromTimeMinute').patchValue('');
  }   
  if(this.examScheduleTable.value.FromTimeMinute>59||this.examScheduleTable.value.FromTimeMinute<0){
    this.examScheduleTable.get('FromTimeMinute').patchValue('');
  }
}

toTimeChange(value){  
  if((value).charCodeAt(0)<48||(value).charCodeAt(0)>57){
    this.examScheduleTable.get('ToTimeHour').patchValue('');
  }   
  if(this.examScheduleTable.value.ToTimeHour>12 ||this.examScheduleTable.value.ToTimeHour<0 ){
    this.examScheduleTable.get('ToTimeHour').patchValue('');
  }
}

toTimeChangeMinute(value){
  if((value).charCodeAt(0)<48||(value).charCodeAt(0)>57){
    this.examScheduleTable.get('ToTimeMinute').patchValue('');
  }   
  if(this.examScheduleTable.value.ToTimeMinute>59||this.examScheduleTable.value.ToTimeMinute<0){
    this.examScheduleTable.get('ToTimeMinute').patchValue('');
  }
}

  public setExamDate(i){
    console.log(moment(this.addExamSchedules[i].FromDate));
    
    this.forIndex=i;
    this.forCheckTableValue=true;
    this.dateForm.setValue({ ProgramdateFrom: this.addExamSchedules[i].FromDate, ProgramdateTo: this.addExamSchedules[i].ToDate});
    this.selectedProgramDate(moment(this.addExamSchedules[i].FromDate));
    this.selectedProgramDate(moment(this.addExamSchedules[i].ToDate));
    this.isProgramSelected(moment(this.addExamSchedules[i].FromDate));
    this.isProgramSelected(moment(this.addExamSchedules[i].ToDate));
    //this.multySelected(moment(this.addExamSchedules[i].date));
    this.isMultySelected(moment(this.addExamSchedules[i].Date));
    
    console.log(this.forIndex);
    
    }

  public checkDate(){
    
    
    if(this.addExamSchedules!=[]){
      
      for(let i=0;i<this.addExamSchedules.length;i++){
        if(this.addExamSchedules[i].Date==""){
          console.log("a");
          this.examScheduleDate[i] =false;
          this.examScheduleTime[i] =false;
          this.examScheduleLunchTime[i]=false;
        }
        else{
          this.examScheduleDate[i] =true;
          if(this.addExamSchedules[i].FromTimeHour==""&&this.addExamSchedules[i].ToTimeHour==""){
            this.examScheduleTime[i]=false;
          }
          else{
            this.examScheduleTime[i]=true;
          }
          if(this.addExamSchedules[i].LunchFromTimeHour==""&&this.addExamSchedules[i].LunchToTimeHour==""){
            this.examScheduleLunchTime[i]=false;
          }
          else{
            this.examScheduleLunchTime[i]=true;
          }
        }
      }
    }

  }

  public ngOnInit() {
    this.daysArr = this.createCalendar(this.date);
    this.CenterdaysArr=this.createCenterCalendar(this.centerdate);
  }

  public todayCheck(day){
    if(!day){
      return false;
    }
    return moment().format("L") === day.format("L");
  }

  public nextProgramMonth(){
    this.date.add(1,'M');
    this.daysArr = this.createCalendar(this.date);
  }

  public previousProgramMonth(){
    this.date.subtract(1,'M');
    this.limit--;
    this.daysArr = this.createCalendar(this.date);
  }

  public nextCenterMonth(){
    this.centerdate.add(1,'M');
    this.CenterdaysArr = this.createCenterCalendar(this.centerdate);
  }

  public previousCenterMonth(){
    this.centerdate.subtract(1,'M');
    this.CenterdaysArr = this.createCenterCalendar(this.centerdate);
  }

  public createCalendar(month) {
    let firstDay = moment(month).startOf('M');
    let days = Array.apply(null, { length: month.daysInMonth() })
      .map(Number.call, Number)
      .map(n => {
        return moment(firstDay).add(n, 'd');
      });
      for (let n = 0; n < firstDay.weekday(); n++) {
        days.unshift(null);
      }
      // console.log(days);
      return days;
  }

  public createCenterCalendar(month) {
    let firstDay = moment(month).startOf('M');
    let days = Array.apply(null, { length: month.daysInMonth() })
      .map(Number.call, Number)
      .map(n => {
        return moment(firstDay).add(n, 'd');
      });
      for (let n = 0; n < firstDay.weekday(); n++) {
        days.unshift(null);
      }
      // console.log(days);
      return days;
  }

  ProgramActive(value,name){
    this.SetProgramValue=value;
    
    this.activityID=value;
    this.activityName=name;
    this.activeProgram=value;
    this.isForActiveProgram=true;
    this.editDateFrom="";
    this.editDateTo="";
    if(value==1){

      if(this.PS_ST_Value=="b"){
        this.ProgrameReNotification=true;
      }
      this.ProgrameNewNotification=false;
      this.showMethodofSelection=false;
      this.showHallofSelection=false;

    }
    else if(value==2 ){

      this.ProgrameNewNotification=false;
      this.ProgrameReNotification=false;
      this.showMethodofSelection=false;
      this.showHallofSelection=false;
    }
    else if(value==3){

      this.ProgrameNewNotification=false;
      this.ProgrameReNotification=false;
      this.showMethodofSelection=false;
      this.showHallofSelection=false;
    }
    else if(value==4  ){

      if(this.PS_ST_Value=="b"){
        this.ProgrameNewNotification=true;
      }
      this.ProgrameReNotification=false;
      this.showMethodofSelection=false;
      this.showHallofSelection=false;
    }
    else if(value==5 ){

      if(this.PS_ST_Value=="b"){
        this.ProgrameNewNotification=true;
      }
      this.ProgrameReNotification=false;
      this.showMethodofSelection=false;
      this.showHallofSelection=false;
    }
    else if(value==6 ){

      this.ProgrameNewNotification=false;
      this.ProgrameReNotification=false;
      this.showMethodofSelection=false;
      this.showHallofSelection=false;
    }
    else if(value==7 ){

      this.ProgrameNewNotification=false;
      this.ProgrameReNotification=false;
      this.showMethodofSelection=false;
      this.showHallofSelection=false;
    }
    else if(value==8 ){
      
      this.ProgrameNewNotification=false;
      this.ProgrameReNotification=false;
      this.showMethodofSelection=true;
      this.showHallofSelection=false;
    }
    
    
if(this.activityProgramDate.length>0){
  this.isDisabledCenter=false;
  this.activityProgramDate.filter(x=>x.activity.activityId==value).forEach(x=>this.editDateFrom=x.dateFrom);
  this.activityProgramDate.filter(x=>x.activity.activityId==value).forEach(x=>this.editDateTo=x.dateTo);
  if(this.editDateFrom!=""&&this.editDateTo!=""){
    this.dateForm.setValue({ ProgramdateFrom: this.editDateFrom, ProgramdateTo: this.editDateTo});
    this.selectedProgramDate(moment(this.editDateFrom));
    this.selectedProgramDate(moment(this.editDateTo));
    this.isProgramSelected(moment(this.editDateFrom));
    this.isProgramSelected(moment(this.editDateTo));
  }
else{
  this.isForSelected=false; 
  this.isDisabledCenter=true;
}
}

  }

Active(value,name){
  this.CentersValue=[];
  this.Centers=[];
  this.SetCenterValue=value;
  this.rightFunctionValue=0;
  this.active=name;
  this.isForActiveCenter=true;
  this.activitiesWithProgramID.filter(s=>s.activityStarted.activity.activityId==this.SetCenterValue).forEach(s=>this.CentersValue[0]=(s.activityStarted.rgmCenter) )
  this.activitiesWithProgramID.filter(s=>s.activityStarted.activity.name==name).forEach(s=>this.activityID=s.activityStarted.activity.activityId)
    for(let i=0;i<this.CentersValue[0].length;i++){
      this.Centers.push(this.CentersValue[0][i]['cnt_description'])
    }
if(this.forEditCenter==false){
this.Center=this.Centers[this.rightFunctionValue];
}
    this.CentersValue[0].filter(s=>s.cnt_description==this.Center).forEach(s=>this.CenterID=s.cnt_centerId);
}

public EditCreatedCenterTable(i){
  this.forEditCenter=true;
  this.forUpdateBtnCenter=true;
  this.centerDateID=this.activityCenterDate[i].id;

  this.CenterdateForm.setValue({ CenterdateFrom: this.activityCenterDate[i].fromDate, CenterdateTo: this.activityCenterDate[i].toDate});

  this.selectedCenterDate(moment(this.activityCenterDate[i].fromDate));
  this.selectedCenterDate(moment(this.activityCenterDate[i].toDate));
  this.isCenterSelected(moment(this.activityCenterDate[i].fromDate));
  this.isCenterSelected(moment(this.activityCenterDate[i].toDate));
  for(var j=0;j<this.activityCenterDate[i].activityCenterDateDateLists.length;j++){
    this.isForMultySelectEdit=true;
    this.multySelected(moment(this.activityCenterDate[i].activityCenterDateDateLists[j].date));
    this.isMultySelected(moment(this.activityCenterDate[i].activityCenterDateDateLists[j].date));

  }

  this.setActive(this.activityCenterDate[i].activity.name);
  console.log(this.activityCenterDate[i],"fsn");
  console.log(this.activitiesWithProgramID[i],"djnosds");

  this.Center=this.activityCenterDate[i].rgmCenter.cnt_description;
  this.Active(this.activityCenterDate[i].activity.activityId,this.activityCenterDate[i].activity.name);
  this.isForActiveCenter=true;


}

ChangeProgramPage(){
    this.isProgram=true;
    this.isCenter=false;
    this.forActiveCenter="";
    this.forActiveProgram="active";
}

ChangeCenterPage(){
    this.isCenter=true;
    this.isProgram=false;
    this.forActiveProgram="";
    this.forActiveCenter="active";

}

 DefineAcademicCenters(){
  this.router.navigate(['scheduling/defineAcademicCenter']);
}

 DefineEntranceExamRootCenters(){
  this.router.navigate(['scheduling/defineEntranceExamRootCenters']);
}

 public initDateRange() {
  return (this.dateForm = this.fb.group({
    ProgramdateFrom: [null, Validators.required],
    ProgramdateTo: [null, Validators.required],
  }));

}

public initCenterDateRange(){
  return (this.CenterdateForm = this.fb.group({
    CenterdateFrom:[null,Validators.required],
    CenterdateTo:[null,Validators.required]
  }));
}

OpenModal(){
    this.forPCProgramDisabled="disabled";
}

timeDiv(day){
  if (!day) {
    return false;
  }
  else{
    return true;
  }
}

public selectedProgramDate(day) {
  let dayFormatted = day.format('YYYY-MM-DD');  
  this.isForSelected=true; 
  if (this.dateForm.valid)
  { 
    let dateFromMoment = moment(this.dateForm.value.ProgramdateFrom, 'YYYY-MM-DD');
    let dateToMoment = moment(this.dateForm.value.ProgramdateTo, 'YYYY-MM-DD');
    // if(this.SetProgramValue==4){
    //   if(this.forEdit){
    //     if(dateFromMoment.isSameOrBefore(day) && dateToMoment.isSameOrAfter(day)){
    //       this.dateForm.setValue({ ProgramdateFrom: this.dateForm.get('ProgramdateFrom').value, ProgramdateTo: this.dateForm.get('ProgramdateTo').value});
    //       return;
    //     }
    //     else{
    //       this.dateForm.setValue({ ProgramdateFrom: null, ProgramdateTo: null });
    //       return;
    //     }
    //   }
    //   else{
    //     this.dateForm.get('ProgramdateFrom').patchValue(this.dateForFromFiveMonths);
    //     this.dateForm.get('ProgramdateTo').patchValue(dayFormatted);
    //   }

    // }
    // else if(this.SetProgramValue==5){
    //   if(this.forEdit){
    //     if(dateFromMoment.isSameOrBefore(day) && dateToMoment.isSameOrAfter(day)){
    //       this.dateForm.setValue({ ProgramdateFrom: this.dateForm.get('ProgramdateFrom').value, ProgramdateTo: this.dateForm.get('ProgramdateTo').value});
    //       return;
    //     }
    //     else{
    //       this.dateForm.setValue({ ProgramdateFrom: null, ProgramdateTo: null });
    //       return;
    //     }
    //   }
    //   else{
    //     this.dateForm.get('ProgramdateFrom').patchValue(this.dateForFromTwwoMonths);
    //     this.dateForm.get('ProgramdateTo').patchValue(dayFormatted);
    //   }

    // }
     if(dateFromMoment.isSameOrBefore(day) && dateToMoment.isSameOrAfter(day)){
      this.dateForm.setValue({ ProgramdateFrom: this.dateForm.get('ProgramdateFrom').value, ProgramdateTo: this.dateForm.get('ProgramdateTo').value});
      return;
    }
    // else{
    //   this.dateForm.setValue({ ProgramdateFrom: null, ProgramdateTo: null });
    //   return;
    // }

  }
  // else if(this.SetProgramValue==4)
  // {
  //   if (!this.dateForm.get('ProgramdateFrom').value) 
  //   {
  //     this.dateForm.get('ProgramdateFrom').patchValue(dayFormatted);
  //     this.dateForFromFiveMonths=this.dateForm.get('ProgramdateFrom').value;
  //     this.FilterDateStudentShip=moment(dayFormatted).add(5, 'months'); 
  //     let FormatedFilterDateStudentShip = this.FilterDateStudentShip.format('YYYY-MM-DD');
  //     this.dateForm.get('ProgramdateTo').patchValue(FormatedFilterDateStudentShip);
  //   } 
  //   else 
  //   {
  //     this.dateForm.get('ProgramdateTo').patchValue(dayFormatted); 
  //   }
  // }
  // else if(this.SetProgramValue==5)
  // {
  //   if (!this.dateForm.get('ProgramdateFrom').value) 
  //   {
  //     this.dateForm.get('ProgramdateFrom').patchValue(dayFormatted);
  //     this.dateForFromTwwoMonths=this.dateForm.get('ProgramdateFrom').value;
  //     this.FilterDateLastDateStudentShip=moment(dayFormatted).add(2, 'months'); 
  //     let FormatedFilterDate = this.FilterDateLastDateStudentShip.format('YYYY-MM-DD');
  //     this.dateForm.get('ProgramdateTo').patchValue(FormatedFilterDate);
  //   } 
  //   else 
  //   {
  //     this.dateForm.get('ProgramdateTo').patchValue(dayFormatted);
  //   }
  // }
else
{
if (!this.dateForm.get('ProgramdateFrom').value) 
{
  this.dateForm.get('ProgramdateFrom').patchValue(dayFormatted);
} 
else 
{
  this.dateForm.get('ProgramdateTo').patchValue(dayFormatted);
}
}
this.forEdit=false;
}

public isProgramSelected(day) {
    
  if (!day) {
    
    return false;
  }
  let dateFromMoment = moment(this.dateForm.value.ProgramdateFrom, 'YYYY-MM-DD');
  let dateToMoment = moment(this.dateForm.value.ProgramdateTo, 'YYYY-MM-DD');
  if (this.dateForm.valid) {
    
    return (
      dateFromMoment.isSameOrBefore(day) && dateToMoment.isSameOrAfter(day)
    );
  }
  if (this.dateForm.get('ProgramdateFrom').valid) {
    
    return dateFromMoment.isSame(day);
  }
}

public isMultySelected(day)
{
  if(!day)
  {
    return false;
  }
  
  let dayFormatted = day.format('MM/DD/YYYY');
  let previousDayFormatted = moment(this.examScheduleTable.get("Date").value).format('MM/DD/YYYY');
  let dateFromMoment = moment(this.dateForm.value.ProgramdateFrom, 'YYYY-MM-DD');
  let dateToMoment = moment(this.dateForm.value.ProgramdateTo, 'YYYY-MM-DD');
  let isdateBetween = moment(dayFormatted).isBetween(dateFromMoment,dateToMoment);
  if(isdateBetween || moment(dayFormatted).isSame(dateFromMoment)||moment(dayFormatted).isSame(dateToMoment))
  { 
    // if(moment(this.programdateBetween[this.programdateBetween.length - 1]).isSame(day)||moment(this.examSchedules[this.forIndex].date).isSame(day))
    console.log(this.forCheckTableValue,"Hello");
    
    if(this.forCheckTableValue){
      if(moment(this.addExamSchedules[this.forIndex].Date).isSame(day))
      {
        this.examScheduleTable.patchValue({FromTimeHour:this.addExamSchedules[this.forIndex].Date});
        this.examScheduleTable.patchValue({FromTimeHour:this.addExamSchedules[this.forIndex].FromTimeHour});
        this.examScheduleTable.patchValue({FromTimeMinute:this.addExamSchedules[this.forIndex].FromTimeMinute});
        this.examScheduleTable.patchValue({FromTimePeriod:this.addExamSchedules[this.forIndex].FromTimePeriod});
        this.examScheduleTable.patchValue({ToTimeHour:this.addExamSchedules[this.forIndex].ToTimeHour});
        this.examScheduleTable.patchValue({ToTimeMinute:this.addExamSchedules[this.forIndex].ToTimeMinute});
        this.examScheduleTable.patchValue({ToTimePeriod:this.addExamSchedules[this.forIndex].ToTimePeriod});
        this.examScheduleTable.patchValue({AttendanceCompulsory:this.addExamSchedules[this.forIndex].AttendanceCompulsory});
        this.examScheduleTable.patchValue({LunchFromTimeHour:this.addExamSchedules[this.forIndex].LunchFromTimeHour});
        this.examScheduleTable.patchValue({LunchFromTimeMinute:this.addExamSchedules[this.forIndex].LunchFromTimeMinute});
        this.examScheduleTable.patchValue({LunchFromTimePeriod:this.addExamSchedules[this.forIndex].LunchFromTimePeriod});
        this.examScheduleTable.patchValue({LunchToTimeHour:this.addExamSchedules[this.forIndex].LunchToTimeHour});
        this.examScheduleTable.patchValue({LunchToTimeMinute:this.addExamSchedules[this.forIndex].LunchToTimeMinute});
        this.examScheduleTable.patchValue({LunchToTimePeriod:this.addExamSchedules[this.forIndex].LunchToTimePeriod});
        this.examScheduleTable.patchValue({StudentCount:this.addExamSchedules[this.forIndex].StudentCount});
        if(this.selectionTest==true||this.GradingTest==true||this.Viva==true||this.Interview==true){
          this.visibleDiv=true;
        }
        
       // const result = this.programdateBetween.find((x) => x == dayFormatted);
       // console.log(result);

        document.getElementById(dayFormatted).classList.add('multySelected');
        document.getElementById(dayFormatted).classList.remove('selected');
        var newHeight = document.getElementById(dayFormatted).offsetTop;
        var newLeft = document.getElementById(dayFormatted).offsetLeft;
        document.getElementById("MovableDiv").style.top=newHeight+135+"px";
        document.getElementById("MovableDiv").style.left=newLeft+65+"px";
      }
      else{
          document.getElementById(dayFormatted).classList.remove('multySelected');
          document.getElementById(dayFormatted).classList.add('selected');
          this.visibleDiv=false;
      }
    }
    else{
      if(moment(this.examScheduleTable.get("Date").value).isSame(day)){
        if(this.selectionTest==true||this.GradingTest==true||this.Viva==true||this.Interview==true){
          this.visibleDiv=true;
        }
        // console.log(this.examScheduleTable.get('Date').value,"enneda");
        document.getElementById(dayFormatted).classList.add('multySelected');
        document.getElementById(dayFormatted).classList.remove('selected');
        var newHeight = document.getElementById(dayFormatted).offsetTop;
        var newLeft = document.getElementById(dayFormatted).offsetLeft;
        document.getElementById("MovableDiv").style.top=newHeight+135+"px";
        document.getElementById("MovableDiv").style.left=newLeft+65+"px";
        
        if(this.priviousDate!="Invalid date"){
          console.log("ennedanadekkuthu");
          
         document.getElementById(this.priviousDate).classList.remove('multySelected');
         document.getElementById(this.priviousDate).classList.add('selected');
        }
      }
      else{
        document.getElementById(dayFormatted).classList.remove('multySelected');
        document.getElementById(dayFormatted).classList.add('selected');
        this.visibleDiv=false;
      }
    }

  
  }
  else if(!dateFromMoment.isSameOrBefore(day) && !dateToMoment.isSameOrAfter(day))
  { 
    // this.programdateBetween.forEach(s=>{
    //   document.getElementById(s).classList.remove('multySelected');
    //   this.visibleDiv=false;
    // })
    document.getElementById(this.addExamSchedules[this.forIndex].Date).classList.remove('multySelected'); 
    this.visibleDiv=false;
    this.addExamSchedules[this.forIndex].Date="";
  }
}

public multySelected(day)
{ 
  if(!day)
  {
    return false;   
  }
  this.priviousDate=moment(this.examScheduleTable.get("Date").value).format('MM/DD/YYYY');
  console.log(this.priviousDate,"ennehello");
  
    let dayFormatted = day.format('YYYY-MM-DD');
    let dateFromMoment = moment(this.dateForm.value.ProgramdateFrom, 'YYYY-MM-DD');
    let dateToMoment = moment(this.dateForm.value.ProgramdateTo, 'YYYY-MM-DD');
    let isdateBetween = moment(dayFormatted).isBetween(dateFromMoment,dateToMoment);
    console.log(isdateBetween);
    
   if(isdateBetween || moment(dayFormatted).isSame(dateFromMoment)||moment(dayFormatted).isSame(dateToMoment))
  {
//    const result = this.programdateBetween.find((x) => x == dayFormatted);
//    if(result==dayFormatted||result1==dayFormatted)
if(this.forCheckTableValue){
  const result = this.addExamSchedules[this.forIndex].Date;
  if(result==dayFormatted)   {
       // const id = this.programdateBetween.indexOf(result); // 2
       // const removedDrink = this.programdateBetween.splice(id,  1);
       this.addExamSchedules[this.forIndex].Date="";
       
       console.log(this.addExamSchedules[this.forIndex].Date); 
     }
     else{
       // this.programdateBetween.push(dayFormatted);
       this.addExamSchedules[this.forIndex].Date=dayFormatted;
       console.log( this.addExamSchedules[this.forIndex].Date);
     }
     this.forCheckTableValue=false;
}
else{
  
  
const result = this.examScheduleTable.get('Date').value;

if(result==dayFormatted){
  this.examScheduleTable.patchValue({Date:""});
  var index = this.addExamSchedules.indexOf(dayFormatted);
  this.addExamSchedules.splice(index, 1 );
}
else{
  console.log("c");
  this.examScheduleTable.get("Date").patchValue(dayFormatted);
  console.log(this.examScheduleTable.get('Date').value);
  
}
}
  }
  this.checkDate();
}

public selectedCenterDate(Centerday) {
  let dayFormattedProgram = Centerday.format('MM/DD/YYYY');
  if (this.CenterdateForm.valid) {
    this.CenterdateForm.setValue({ CenterdateFrom: null,CenterdateTo:null });
    return;
  }
  if (!this.CenterdateForm.get('CenterdateFrom').value) {
    this.CenterdateForm.get('CenterdateFrom').patchValue(dayFormattedProgram);
  } else {
    this.CenterdateForm.get('CenterdateTo').patchValue(dayFormattedProgram);
  }
}

public isCenterSelected(Centerday) {
  if (!Centerday) {
    return false;
  }
  let CenterdateFromMoment = moment(this.CenterdateForm.value.CenterdateFrom, 'MM/DD/YYYY');
  let CenterdateToMoment = moment(this.CenterdateForm.value.CenterdateTo, 'MM/DD/YYYY');
  if (this.CenterdateForm.valid) {
    return (
      CenterdateFromMoment.isSameOrBefore(Centerday) && CenterdateToMoment.isSameOrAfter(Centerday)
    );
  }
  if (this.CenterdateForm.get('CenterdateFrom').valid) {
    return CenterdateFromMoment.isSame(Centerday);
  }
}

public reserveProgram() {
  if (!this.dateForm.valid) {
    return;
  }
  let dateFromMoment = this.dateForm.value.ProgramdateFrom;
  let dateToMoment = this.dateForm.value.ProgramdateTo;
  this.isReserved = `Reserved from ${dateFromMoment} to ${dateToMoment}`;
}

public reserveCenter() {
  if (!this.CenterdateForm.valid) {
    return;
  }
  let dateFromMomentCenter = this.CenterdateForm.value.CenterdateFrom;
  let dateToMomentCenter = this.CenterdateForm.value.CenterdateTo;
  this.isReservedCenter = `Reserved from ${dateFromMomentCenter} to ${dateToMomentCenter}`;
}

Delete(x)
{
  var delBtn = confirm(" Do you want to delete ?");
if ( delBtn == true ) {
  this.isMultySelected(moment(this.addExamSchedules[x].Date))
  this.addExamSchedules.splice(x, 1 );
} 
  
}

onReset(){

}

onSubmit(){
  let updateBody={
    "foreignFee":Number(this.SchedulingCoordinatorForm.get('Foreign').value) ,
    "localFee": Number(this.SchedulingCoordinatorForm.get('Local').value),
    "programScheduleCode": this.programScheduleCode
  }
  console.log(updateBody);
  
  this.ProgramService.updateProgramStartedFee(updateBody).toPromise().
  then(s => { this.toastr.success(this.programScheduleCode+" has successfully Updated.", s['message']);})
  .catch((s) => { this.toastr.error("Error", s['error']['message']); console.log(s);});
}

}
