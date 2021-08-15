import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SchedulingComService } from '../../Service/scheduling-dop.service';
import {DefineActivityService} from '../../Service/define-activity.service';
import {SchedulingCoordinatorService} from '../../Service/scheduling-pc.service';
import {ActivityStarted,ProgramStarted,ActivityCenterDate,ActivityProgramDate,DefineActivityStarted} from '../../Modal/scheduling-dop'
import {ProgramStarted1,ProgramEntryExam} from '../../Modal/scheduling-ad'
import { ToastrService } from 'ngx-toastr';
import {defineActivity} from '../../Modal/ActivityPrograms';
import { DatapassingService } from "../../Service/datapassing.service";
import { SchedulingAdService } from "../../Service/scheduling-ad.service";
import * as moment from 'moment';
@Component({
  selector: 'app-scheduling-center-ad',
  templateUrl: './scheduling-center-ad.component.html',
  styleUrls: ['./scheduling-center-ad.component.css']
})
export class SchedulingCenterAdComponent implements OnInit {
  [x: string]: any;
  ScheduleCode=[];
  getProgramStarted: ProgramStarted1;
  programStarted: ProgramStarted[];
  activityCenterDate:ActivityCenterDate[];
  activityProgramDate: ActivityProgramDate[];
  activityStarted: DefineActivityStarted[];
  programEntryExam:ProgramEntryExam;
  activites:defineActivity[];
  forActiveProgram="active";
  forActiveCenter:any;
  isProgram = true;
  isCenter:boolean;
  public dateForm: FormGroup;
  public CenterdateForm: FormGroup;
  public date = moment();
  public centerdate = moment();
  public daysArr;
  public CenterdaysArr;
  limit:number =0;
  isForSelected=true;
  isForSelecetdCenter=true;
  SetProgramValue=0;
  SetCenterValue=0;
  dateForFromFiveMonths:any;
  dateForFromTwwoMonths:any;
  public FilterDateStudentShip;
  public FilterDateLastDateStudentShip;
  ProgrameReNotification=false;
  ProgrameNewNotification=false;
  activitiesWithProgramID=[];
  SetProgramDates = [];
  SetCenterDates = [];
  SetProgramDatesActivity=[];
  SetCenterDatesActivity=[];
  ProgramID:any;
  ProgramStartedID:any;
  ProgramStartedIDCenter:any;
  studentTypeIDfromDB:any;
  PS_ST_Value='r';
  showCreatedTableProgram=false;
  showNewTableProgram=false;
  showCreatedTableCentre=false;
  showNewTableCentre=false;
  active=false;
  activeProgram=false;
  isForActiveCenter=true;
  isForActiveProgram=true;
  activityID:any;
  activityIDCenter:any;
  activityName:any;
  programDate=[];
  centerDate=[];
  tableProgramDate=[];
  tableCentreDate=[];
  Center="";
  rightFunctionValue:any;
  Centers=[];
  CentersValue=[];
  CenterID:any;
  Faculty:any;
  Department:any;
  Program:any;
  ApplicableNewStudents=false;
  isDisabled=false;
  isDisabledCenter=false;
  isDateProgram=true;
  isActivityProgram=true;
  forUpdateBtnCenter=false;
  forEditCenter=false;
  centerDateID=0;
  multyDates=[];
  indexforMultyDates:any;
  centerScheduleCodeName:any;
  programIdForNavigation:any;
  entryExamTypeValue:any;
  isForMultySelectEdit=false;
  Schedulings = [
    'ProgA_a_2020/21-1',
    'ProgB_a_2020/21-2',
    'ProgC_a_2020/21-3',
  ];

  SchedulingCoordinatorForm = new FormGroup({
    Scheduling: new FormControl(''),
    Faculty: new FormControl(''),
    Department: new FormControl(''),
    Date: new FormControl(''),
    Program: new FormControl(''),
    StudentType: new FormControl({value:'',disabled: true}),
    MultipleBatches: new FormControl({value:false,disabled: true}),
    AcademicYear: new FormControl({value:'',disabled: true}),
    Batch: new FormControl({ value: '', disabled: true }),
    Local:new FormControl({ value: '', disabled: true }),
    Foreign:new FormControl({ value: '', disabled: true })
  });
  constructor(private SchedulingAdData:SchedulingAdService,private data:DatapassingService,private toastr: ToastrService,private router: Router,private ProgramServicePC : SchedulingCoordinatorService,private ProgramService : SchedulingComService,private ActivityService:DefineActivityService,private fb: FormBuilder,private dopProgramService:SchedulingComService) {
    this.initDateRange();
    this.initCenterDateRange();

    this.ActivityService.getActivity().subscribe
    (res=>{
      this.activites=res as defineActivity[];

    })


    this.dopProgramService.getAllProgramStarted().toPromise().then
    (res=>{
      this.programStarted=res as ProgramStarted[];
      for(let i=0; i<this.programStarted.length;i++){
        this.ScheduleCode.push(this.programStarted[i]['programScheduleCode'])
      }
      this.ScheduleCode.sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0));
    })
   }

  ProgramCodedateForm = new FormGroup({
    ScheduleCode:new FormControl(''),
  })

  CentreCodedateForm= new FormGroup({
    ScheduleCode1:new FormControl(''),
  })

  public  ngOnInit() {
    this.daysArr = this.createCalendar(this.date);
    this.CenterdaysArr=this.createCenterCalendar(this.centerdate);
  }

  async OpenModal(){

  this.ScheduleCode=[];
  await  this.ProgramService.getAllProgramStarted().toPromise().then
      (res=>{
        this.programStarted=res as ProgramStarted[];
        for(let i=0; i<this.programStarted.length;i++){
          this.ScheduleCode.push(this.programStarted[i]['programScheduleCode'])
        }
        this.ScheduleCode.sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0));
      })

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

  public multySelected(day)
  {
    if(!day)
    {
      return false;
    }
      let dayFormatted = day.format('YYYY-MM-DD');
      let dateFromMoment = moment(this.CenterdateForm.value.CenterdateFrom, 'YYYY-MM-DD');
      let dateToMoment = moment(this.CenterdateForm.value.CenterdateTo, 'YYYY-MM-DD');
      let isdateBetween = moment(dayFormatted).isBetween(dateFromMoment,dateToMoment);
     if(isdateBetween)
    {
      var result;
      this.multyDates.filter(item=>item.date==dayFormatted).forEach(s=>result=s['date'])
  
console.log(result,"Hello");

  if(result==dayFormatted){
    console.log("b");
    this.SchedulingCoordinatorForm.patchValue({Date:""});
    this.multyDates.filter(item=>item.date==dayFormatted).forEach(s=>this.indexforMultyDates=this.multyDates.indexOf(s))
    this.multyDates.splice(this.indexforMultyDates,1); 
  }
  else{
    console.log("c");
    this.SchedulingCoordinatorForm.get("Date").patchValue(dayFormatted);
    this.multyDates.push({
      "date":this.SchedulingCoordinatorForm.get('Date').value
    });
    console.log(this.SchedulingCoordinatorForm.get('Date').value);
    const body={
      "date":this.SchedulingCoordinatorForm.get('Date').value
    }
    if(!this.isForMultySelectEdit){
    this.SchedulingAdData.updateCenterDate(body,this.centerDateID).toPromise().
    then(s => { this.toastr.success(this.centerScheduleCodeName+" has successfully Updated.", s['message']);this.centreGet();})
    .catch((s) => { this.toastr.error("Error", s['error']['message']); console.log(s);});
    }
this.isForMultySelectEdit=false;
  }
  console.log(this.multyDates);

    }

  }

  public isMultySelected(day)
{
  if(!day)
  {
    return false;
  }
  let dayFormatted = day.format('MM/DD/YYYY');
  let dateFromMoment = moment(this.CenterdateForm.value.CenterdateFrom, 'YYYY-MM-DD');
  let dateToMoment = moment(this.CenterdateForm.value.CenterdateTo, 'YYYY-MM-DD');
  let isdateBetween = moment(dayFormatted).isBetween(dateFromMoment,dateToMoment);
  if(isdateBetween )
  {


      if(moment(this.SchedulingCoordinatorForm.get("Date").value).isSame(day)){

        document.getElementById(dayFormatted).classList.add('multySelected');
        document.getElementById(dayFormatted).classList.remove('selected');
      }
      else{

        document.getElementById(dayFormatted).classList.remove('multySelected');
        document.getElementById(dayFormatted).classList.add('selected');
      }
  }
  // else if(!dateFromMoment.isSameOrBefore(day) && !dateToMoment.isSameOrAfter(day))
  // {
  //   // this.programdateBetween.forEach(s=>{
  //   //   document.getElementById(s).classList.remove('multySelected');
  //   //   this.visibleDiv=false;
  //   // })
  //   document.getElementById(this.addExamSchedules[this.forIndex].Date).classList.remove('multySelected');
  //   this.visibleDiv=false;
  //   this.addExamSchedules[this.forIndex].Date="";
  // }
}

  public selectedProgramDate(day) {
    let dayFormatted = day.format('YYYY-MM-DD');
    this.isForSelected=true;
    this.isDateProgram=false;
    if (this.dateForm.valid)
    {
      if(this.SetProgramValue==4){
        this.dateForm.get('ProgramdateFrom').patchValue(this.dateForFromFiveMonths);
        this.dateForm.get('ProgramdateTo').patchValue(dayFormatted);
      }
      else if(this.SetProgramValue==5){
        this.dateForm.get('ProgramdateFrom').patchValue(this.dateForFromTwwoMonths);
        this.dateForm.get('ProgramdateTo').patchValue(dayFormatted);
      }
      else{
        this.isDateProgram=true;
        this.isActivityProgram=true;
        this.isForActiveProgram=false;
        this.dateForm.setValue({ ProgramdateFrom: null, ProgramdateTo: null });
        return;
      }

    }
    else if(this.SetProgramValue==4)
    {
      if (!this.dateForm.get('ProgramdateFrom').value)
      {
        this.dateForm.get('ProgramdateFrom').patchValue(dayFormatted);
        this.dateForFromFiveMonths=this.dateForm.get('ProgramdateFrom').value;
        this.FilterDateStudentShip=moment(dayFormatted).add(5, 'months');
        let FormatedFilterDateStudentShip = this.FilterDateStudentShip.format('YYYY-MM-DD');
        this.dateForm.get('ProgramdateTo').patchValue(FormatedFilterDateStudentShip);
      }
      else
      {
        this.dateForm.get('ProgramdateTo').patchValue(dayFormatted);
      }
    }

    else if(this.SetProgramValue==5)
    {
      if (!this.dateForm.get('ProgramdateFrom').value)
      {
        this.dateForm.get('ProgramdateFrom').patchValue(dayFormatted);
        this.FilterDateLastDateStudentShip=moment(dayFormatted).add(2, 'months');
        let FormatedFilterDate = this.FilterDateLastDateStudentShip.format('YYYY-MM-DD');
        this.dateForm.get('ProgramdateTo').patchValue(FormatedFilterDate);
      }
      else
      {
        this.dateForm.get('ProgramdateTo').patchValue(dayFormatted);
      }
    }

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

  }

  public selectedCenterDate(Centerday) {
    this.isForSelecetdCenter=true;
    let dayFormattedProgram = Centerday.format('YYYY-MM-DD');
    if (this.CenterdateForm.valid) {
      let dateFromMoment = moment(this.CenterdateForm.value.CenterdateFrom, 'YYYY-MM-DD');
      let dateToMoment = moment(this.CenterdateForm.value.CenterdateTo, 'YYYY-MM-DD');
      if(dateFromMoment.isSameOrBefore(Centerday) && dateToMoment.isSameOrAfter(Centerday)){
        this.CenterdateForm.setValue({ CenterdateFrom: this.CenterdateForm.get('CenterdateFrom').value, CenterdateTo: this.CenterdateForm.get('CenterdateTo').value});
        return;
      }else{
        this.CenterdateForm.setValue({ CenterdateFrom: null,CenterdateTo:null });
        return;
      }

    }
    else{
      if (!this.CenterdateForm.get('CenterdateFrom').value) {
        this.CenterdateForm.get('CenterdateFrom').patchValue(dayFormattedProgram);
      } else {
        this.CenterdateForm.get('CenterdateTo').patchValue(dayFormattedProgram);
      }
    }
    this.forEditCenter=false;
  }

  public isProgramSelected(day) {

    if (!day) {

      return false;
    }
    let dateFromMoment = moment(this.dateForm.value.ProgramdateFrom, 'YYYY/MM/DD');
    let dateToMoment = moment(this.dateForm.value.ProgramdateTo, 'YYYY/MM/DD');
    if (this.dateForm.valid) {

      return (
        dateFromMoment.isSameOrBefore(day) && dateToMoment.isSameOrAfter(day)
      );
    }
    if (this.dateForm.get('ProgramdateFrom').valid) {

      return dateFromMoment.isSame(day);
    }
  }

  public isCenterSelected(Centerday) {
    if (!Centerday) {
      return false;
    }
    let CenterdateFromMoment = moment(this.CenterdateForm.value.CenterdateFrom, 'YYYY/MM/DD');
    let CenterdateToMoment = moment(this.CenterdateForm.value.CenterdateTo, 'YYYY/MM/DD');
    if (this.CenterdateForm.valid) {
      return (
        CenterdateFromMoment.isSameOrBefore(Centerday) && CenterdateToMoment.isSameOrAfter(Centerday)
      );
    }
    if (this.CenterdateForm.get('CenterdateFrom').valid) {
      return CenterdateFromMoment.isSame(Centerday);
    }
  }

  public todayCheck(day){
    if(!day){
      return false;
    }
    return moment().format("L") === day.format("L");
  }

  public programGet(){
    this.ProgramService.getActivityProgramDate(this.ProgramStartedID).subscribe
    (res=>{
      this.activityProgramDate= res as ActivityProgramDate[];

      if(this.activityProgramDate.length>0){
        this.showCreatedTableProgram=true;
      }
      else{
        this.showCreatedTableProgram=false;
      }
    })

  }

  public centreGet(){
    this.ProgramService.getActivityCenterDate(this.ProgramStartedIDCenter).subscribe
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

  async onProgramScheduleCodeAD(value){
    this.programScheduleCode=value;
  await  this.ProgramServicePC.getProgramsStartedService(value).toPromise().then
    (res=>{
    this.getProgramStarted=res as ProgramStarted1;
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
    // if(this.getProgramStarted.studentType.description=="Both"||this.getProgramStarted.studentType.description=="New"){
    // this.SchedulingCoordinatorForm.get('Local').enable();
    // this.SchedulingCoordinatorForm.get('Foreign').enable();
    // }
    // else{
    //   this.SchedulingCoordinatorForm.get('Local').disable();
    //   this.SchedulingCoordinatorForm.get('Foreign').disable();
    // }
    //this.programStarted.filter(s=>s.programScheduleCode==value).forEach(s=>this.getShareData.ShareData=s.programStartedId);
    this.programStarted.filter(s=>s.programScheduleCode==value).forEach(s=>this.data.shareddata=s.programScheduleCode);
    this.programStarted.filter(s=>s.programScheduleCode==value).forEach(s=>this.data.startedID=s.programStartedId);
    this.programIdForNavigation=this.getProgramStarted.program.programId;
    console.log(this.programIdForNavigation);

    })

this.SchedulingAdData.getProgramEntranceExamTypeId(this.programIdForNavigation).toPromise()
.then(res=>{

  this.programEntryExam=res as ProgramEntryExam;
  this.entryExamTypeValue=this.programEntryExam.entryExamType.id;
  console.log(this.programEntryExam);
})

    }

  onProgramScheduleCode(value){
    this.activitiesWithProgramID.length=0;
    this.SetProgramDates.length=0;
    this.SetProgramDatesActivity=[];

    this.programStarted.filter(x=>x.programScheduleCode==value).forEach(x=>this.ProgramID=x.program['programId'])
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

    this.ProgramService.getActivityStarted(this.ProgramID).subscribe
    (res=>{
      this.activityStarted=res as DefineActivityStarted[];
      if(this.activityStarted.length>0){
        for(let i=0;i<this.activityStarted.length;i++){
          this.SetProgramDatesActivity=[];
          // this.SetCenterDatesActivity=[];
          this.activitiesWithProgramID.push(this.activityStarted[i]);
          console.log(this.activitiesWithProgramID);
          this.activitiesWithProgramID.filter(s=>s.activityStarted.activityDateType.id==1).forEach(s=> this.SetProgramDatesActivity.push(s.activityStarted.activity))
          // this.activitiesWithProgramID.filter(s=>s.activityDateType['id']==2).forEach(s=> this.SetCenterDatesActivity.push({"activity":s.activity,"id":s.id}))
        }
      }

      if(this.activityStarted.length>0){
        if(this.activityStarted[0].accessType.id==2){
          this.isDisabled=true;
        }
        else{
          this.isDisabled=false;
        }
      }
      else{
        this.isDisabled=false;
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

  setActive(i){
    return this.active===i;
  }

  setProgramActive(i){
    return this.activeProgram === i;
  }

  ProgramActive(value,name){

    this.SetProgramValue=value;
    this.activityID=value;
    this.activityName=name;
    this.activeProgram=value;
    this.isForActiveProgram=true;
    this.isActivityProgram=false;
    if(value==1){

      if(this.PS_ST_Value=="b"){
        this.ProgrameReNotification=true;
      }
      this.ProgrameNewNotification=false;

    }
    else if(value==2 ){

      this.ProgrameNewNotification=false;
      this.ProgrameReNotification=false;
    }
    else if(value==3){

      this.ProgrameNewNotification=false;
      this.ProgrameReNotification=false;
    }
    else if(value==4  ){

      if(this.PS_ST_Value=="b"){
        this.ProgrameNewNotification=true;
      }
      this.ProgrameReNotification=false;
    }
    else if(value==5 ){

      if(this.PS_ST_Value=="b"){
        this.ProgrameNewNotification=true;
      }
      this.ProgrameReNotification=false;
    }
    else if(value==6 ){

      this.ProgrameNewNotification=false;
      this.ProgrameReNotification=false;
    }
    else if(value==7 ){

      this.ProgrameNewNotification=false;
      this.ProgrameReNotification=false;
    }
  }

  programDateArray(){
    this.programDate.push(
     {
         "programStarted": {
           "programStartedId":this.ProgramStartedID
         },
         "activity": {
           "activityId": this.activityID,
         },
         "dateObject": {},
         "dateFrom": this.dateForm.get('ProgramdateFrom').value,
         "dateTo": this.dateForm.get('ProgramdateTo').value,
         "id":0
   }

    )
  this.tableProgramDate.push({
   "activityName": this.activites.find(x=>x.activityId==this.activityID).name,
   "code":this.ProgramCodedateForm.get('ScheduleCode').value

  })
    this.isForSelected=false;
    this.showNewTableProgram=true;


  }

  Delete(x)
  {
   var delBtn = confirm(" Do you want to delete ?");
  if ( delBtn == true ) {
   this.programDate.splice(x, 1 );
   this.tableProgramDate.splice(x,1);
  }

   if(this.programDate.length==0){
   this.showNewTableProgram=false;
  }
  }

  DeleteCentre(i){
    var delBtn = confirm(" Do you want to delete ?");
    if ( delBtn == true ) {
      this.centerDate.splice(i,1);
      this.tableCentreDate.splice(i,1);
    }
    if(this.centerDate.length==0){
      this.showNewTableCentre=false;
    }
  }

  onProgramScheduleCodeCenter(value){
    this.SetCenterDates.length=0;
    this.activitiesWithProgramID.length=0;
    this.SetCenterDatesActivity=[];
    this.centerScheduleCodeName=value;
    this.programStarted.filter(x=>x.programScheduleCode==value).forEach(x=>this.ProgramID=x.program['programId'])
    this.programStarted.filter(x=>x.programScheduleCode==value).forEach(x=>this.ProgramStartedIDCenter=x.programStartedId)

    this.centreGet();

    this.ProgramService.getActivityStarted(this.ProgramID).subscribe
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

  programCenterArray(){


     let body={
      "activity": {"activityId": this.activityID,},
      "dateObject": {},
      "fromDate": this.CenterdateForm.get('CenterdateFrom').value,
      "programStarted": {"programStartedId": this.ProgramStartedIDCenter},
      "rgmCenter": {"cnt_centerId": this.CenterID},
      "toDate": this.CenterdateForm.get('CenterdateTo').value
    }
    console.log(body);
    this.ProgramService.createCenterDate(body).toPromise()
    .then(s => { this.toastr.success(s);this.centreGet();console.log(s);
     })
    .catch((s) => { this.toastr.error( s['error']['message']); console.log(s);  this.isForActiveCenter=false;this.isForSelecetdCenter=false;});
 }

  AddEntranceExamCenters(){
    console.log(this.entryExamTypeValue);

    if(this.entryExamTypeValue==1){
      this.router.navigate(['scheduling/addEntryExamLabCapacity']);
    }
    if(this.entryExamTypeValue==2){
      this.router.navigate(['scheduling/addEntranceExamCenters']);
    }

  }

  UpdatecenterDateArray(){
    let body={
      "programStarted": {
         "programStartedId": this.ProgramStartedIDCenter
      },
      "activity": {
        // "activityId": this.SetCenterValue
        "activityId": this.activityID
      },
      "dateObject": {"sag":"faf"},
      "fromDate": this.CenterdateForm.get('CenterdateFrom').value,
      "rgmCenter": {
        "cnt_centerId": this.CenterID
      },
      "toDate": this.CenterdateForm.get('CenterdateTo').value,
      "id": this.centerDateID
  }

  this.ProgramService.updateCenterDate(body).toPromise().
  then(s => { this.toastr.success(this.centerScheduleCodeName+" has successfully Updated.", s['message']);this.centreGet();})
  .catch((s) => { this.toastr.error("Error", s['error']['message']); console.log(s);});
  this.forEditCenter=false;
    this.forUpdateBtnCenter=false;
    this.isForActiveCenter=false;
    this.isForSelecetdCenter=false;
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

  onReset(){
    this.ProgramID="";
    this.isForActiveCenter=false;
    this.isForActiveProgram=false;
    this.Center="";
    this.programDate=[];
    this.centerDate=[];
    this.tableProgramDate=[];
    this.tableCentreDate=[];
    this.ProgramScheduleCode1="";
    this.Batch1="";
    this.ProgramCodedateForm.get('ScheduleCode').setValue('');
    this.CentreCodedateForm.get('ScheduleCode1').setValue('');
    this.SetCenterDates=[];
    this.SetProgramDates=[];
    this.activityCenterDate=[];
    this.activityProgramDate=[];
    this.showCreatedTableCentre=false;
    this.showCreatedTableProgram=false;
    this.forUpdateBtnCenter=false;
    this.isForSelected=false;
    this.isForSelecetdCenter=false;
    this.SchedulingCoordinatorForm.patchValue({Date:""});
    for(var i=0;i<this.multyDates.length;i++){
      console.log(this.multyDates[i]['date']);
      let dayFormatted = (moment(this.multyDates[i]['date'])).format('MM/DD/YYYY');
      document.getElementById(dayFormatted).classList.remove('multySelected');
    }
  }

}
