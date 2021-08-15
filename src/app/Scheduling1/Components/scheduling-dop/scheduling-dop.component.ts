import { Component, HostListener, OnInit, ViewChild  } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SchedulingComService } from '../../Service/scheduling-dop.service';
import {DefineActivityService} from '../../Service/define-activity.service';
import {Faculties,Departments,Units,Programs,AcademicYear,ActivityStarted,ProgramStarted,ActivityCenterDate,ActivityProgramDate,DefineActivityStarted} from '../../Modal/scheduling-dop'
import {defineActivity,rgmCenters} from '../../Modal/ActivityPrograms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';


export enum KEY_CODE {
  UP_ARROW = 38,
  DOWN_ARROW = 40
}

@Component({
  selector: 'app-scheduling-com',
  templateUrl: './scheduling-dop.component.html',
  styleUrls: ['./scheduling-dop.component.css']
})

export class SchedulingComComponent implements OnInit {
  public isReserved = null;
  public isReservedCenter=null;
  public date = moment();
  public centerdate = moment();
  public dateForm: FormGroup;
  public CenterdateForm: FormGroup;
  public daysArr;
  public CenterdaysArr;
  faculties=[];
  departments=[];
  units=[];
  programs=[];
  academicYear: AcademicYear[];
  activites:defineActivity[];
  activitiesWithProgramID=[];
  activityStarted: DefineActivityStarted[];
  showCreatedTableProgram=false;
  showNewTableProgram=false;
  showCreatedTableCentre=false;
  showNewTableCentre=false;
  programStarted: ProgramStarted[];
  activityProgramDate: ActivityProgramDate[];
  activityCenterDate:ActivityCenterDate[];
  rgmCenters=[];
  values= '';
  power="";
  ProgramStartedID:any;
  ProgramStartedIDCenter:any;
  showFaculty:boolean;
  showDepartment:boolean;
  showUnit:boolean;
  showProgram:boolean;
  FacultyValue='';
  DepartmentValue='';
  UnitValue='';
  ProgramValue='';
  PS_ST_Value='r';
  AcademicYear1='';
  Batch1='';
  ProgramScheduleCode1='';
  ProgramID:any;
  AcademicYearID:any;
  programDate=[];
  centerDate=[];
  centerDes=[];
  activityID:any;
  activityIDCenter:any;
  activityName:any;
  forEdit=false;
  forUpdateBtn=false;
  ShowLabel=false;
  isProgram = true;
  isCenter:boolean;
  forActiveCenter:any;
  forActiveProgram="active";
  forNewProgramDisabled:any;
  forReProgramDisabled:any;
  SetProgramValue=0;
  SetCenterValue=0;
  studentTypeID=2;
  studentTypeIDfromDB:any;
  MultipleBatches=false;
  ProgrameReNotification=false;
  ProgrameNewNotification=false;
  isForSelected=true;
  rightFunctionValue:any;
  isForSelecetdCenter=true;
  SetProgramDatesActivity=[];
  SetCenterDatesActivity=[];
  public FilterDateStudentShip;
  public FilterDateLastDateStudentShip;
  programDateID=0;
  centerDateID=0;
  ProgramCode:any;
  tableProgramDate=[];
  ScheduleCode=[];
  forEditCenter=false;
  forUpdateBtnCenter=false;
  programScheduleCodeName:any;
  centerScheduleCodeName:any;
  finalActivityProgramDate:any;
  i:any;
  limit:number =0;

  FacultyID:any;

  Faculties =[];
  Departments = [];
  Units = [];
  Programs = [];
  AcademicYears = [];
  SetProgramDates = [];
  SetCenterDates = [];
  Centers=[];
  CentersValue=[];
  active=false;
  activeProgram=false;
  Getprograms : any;
  isForActiveCenter=true;
  isForActiveProgram=true;
  Center="";
  forProgramActive="";
  downValue=0;
  programScheduleCode:any;
  tableCentreDate=[];
  CenterID:any;
  dateForFromFiveMonths:any;
  dateForFromTwwoMonths:any;
  isLatestProgram=false;
  isLatestCenter=false;
  // @HostListener('window:keyup', ['$event'])
  // keyEvent(event: KeyboardEvent) 
  // {
  //   if (event.keyCode === KEY_CODE.UP_ARROW) 
  //   {
  //     this.UpFunction();
  //     this.UpFunctionCenter();
  //   }

  //   if (event.keyCode === KEY_CODE.DOWN_ARROW) 
  //   {
  //     this.DownFunction();
  //     this.DownFunctionCenter();
  //   }
  // }

  constructor(private toastr: ToastrService,private ProgramService : SchedulingComService,private ActivityService:DefineActivityService, private router: Router,private fb: FormBuilder) 
  { 

    this.SchedulingForm.patchValue({StudentType : 'Re'});
    this.getData(); 
    this.initDateRange();  
    this.initCenterDateRange();
    this.ProgramService.getFacultyService().subscribe
    (res =>{
    this.faculties = res;

      for(let i=0; i< this.faculties.length;i++){
        this.Faculties.push(this.faculties[i]['description']);
      }
    

    this.Faculties.sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0));
    })

    this.ProgramService.getAllDepartmentService().subscribe
    (res=>{
      this.departments=res;

        for(let i=0; i<this.departments.length;i++){
          this.Departments.push(this.departments[i]['description']);
        }
      

      this.Departments.sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0));
    })

    this.ProgramService.getAllUnitService().subscribe
    (res=>{
      this.units=res;

        for(let i=0;i<this.units.length;i++){
          this.Units.push(this.units[i]['description']);
        }


      this.Units.sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0));
    })

    this.ProgramService.getProgramsService().subscribe
    (res=>{
      this.programs=res;

        for(let i=0; i<this.programs.length;i++){
          this.Programs.push(this.programs[i]['title'])
        }
      

      this.Programs.sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0));
    })

    this.ProgramService.getAcademicYearService().subscribe
    (res=>{
      this.academicYear=res as AcademicYear[];
      for(let i=0; i<this.academicYear.length;i++){
        this.AcademicYears.push(this.academicYear[i]['year'])
      }
    })

    this.ActivityService.getActivity().subscribe
    (res=>{
      this.activites=res as defineActivity[];

    })

  }

  public ngOnInit() {
    this.daysArr = this.createCalendar(this.date);
    this.CenterdaysArr=this.createCenterCalendar(this.centerdate);
  }

  onProgramScheduleCodeCenter(value){
    this.forEditCenter=false;
    this.forUpdateBtnCenter=false;
    this.isForActiveCenter=false;
    this.isForSelecetdCenter=false;
    this.Center='';
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


          // if(this.SetProgramDatesActivity.length>0){
          //   for(let i=0;i<this.SetProgramDatesActivity.length;i++){
          //     this.SetProgramDates.push(
          //       {
          //         "name":this.SetProgramDatesActivity[i]['name'],
          //         "id":this.SetProgramDatesActivity[i]['activityId']
          //       }); 
          //       }
          // }  
          if(this.SetCenterDatesActivity.length>0){
            for(let i=0;i<this.SetCenterDatesActivity.length;i++){
              this.SetCenterDates.push(
                {
                  "name":this.SetCenterDatesActivity[i].activity['name'],
                  "id":this.SetCenterDatesActivity[i].activity['activityId']
                }); 
                }
          } 
          console.log(this.SetCenterDates);
          const result = Array.from(this.SetCenterDates.reduce((m, t) => m.set(t.name, t), new Map()).values());
          this.SetCenterDates=result;
          console.log(result,"abc");
          
      })
  }


  onProgramScheduleCode(value){ 
    this.ProgrameReNotification=false;
    this.ProgrameNewNotification=false;
    this.forEdit=false;
    this.forUpdateBtn=false;
    this.isForSelected=false;
    this.isForActiveProgram=false;
    this.activitiesWithProgramID.length=0;
    this.SetProgramDates.length=0;
    this.SetProgramDatesActivity=[];
    this.programScheduleCodeName=value;
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

          if(this.SetProgramDatesActivity.length>0){
            for(let i=0;i<this.SetProgramDatesActivity.length;i++){
              this.SetProgramDates.push(
                {
                  "name":this.SetProgramDatesActivity[i]['name'],
                  "id":this.SetProgramDatesActivity[i]['activityId']
                }); 
                }
          }  

          //let newFormulalist =  this.SetProgramDates.filter((v,i) => this.SetProgramDates.findIndex(item => item.value == v.value) === i);
          const result = Array.from(this.SetProgramDates.reduce((m, t) => m.set(t.name, t), new Map()).values());
          this.SetProgramDates=result;
          console.log(result,"abc");
          
          // if(this.SetCenterDatesActivity.length>0){
          //   for(let i=0;i<this.SetCenterDatesActivity.length;i++){
          //     this.SetCenterDates.push(
          //       {
          //         "name":this.SetCenterDatesActivity[i].activity['name'],
          //         "id":this.SetCenterDatesActivity[i]['id']
          //       }); 
          //       }
          // } 
      })
  }

  public programGet(){
    this.ProgramService.getActivityProgramDate(this.ProgramStartedID).subscribe
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

  setActive(i){  
      return this.active===i;
  }

  setProgramActive(i){
      return this.activeProgram === i;
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

 async getLatestProgramDate(value){

    let programData=[];
    console.log(value);
    
    if(value){
    await  this.ProgramService.getLatestProgramDate().toPromise()
      .then(res=>{
        programData=res;
        this.ProgramCodedateForm.get('ScheduleCode').setValue(programData['programStarted']['programScheduleCode']);
        // this.isForActiveProgram=true;
        this.onProgramScheduleCode(programData['programStarted']['programScheduleCode']);
        this.setProgramActive(programData['activity']['activityId']);
        this.ProgramActive(programData['activity']['activityId'],programData['activity']['name']);
        this.isForActiveProgram=true;       
      })
      .catch(e=>{
        console.log(e);
        
      });
    }
    else{
      this.onReset();
    }

  }

  getLatestCenterDate(value){
    let centerData=[];
    if(value){
      this.ProgramService.getLatestCenterDate().toPromise()
      .then(res=>{
        centerData=res;
        this.CentreCodedateForm.get('ScheduleCode1').setValue(centerData['programStarted']['programScheduleCode']);
        this.onProgramScheduleCodeCenter(centerData['programStarted']['programScheduleCode']);
        this.setActive(centerData['activity']['activityId']);
        this.Active(centerData['activity']['activityId'],centerData['activity']['name']);
        this.isForActiveCenter=true;
        console.log(centerData);
        
      })
      .catch(e=>{
        console.log(e);
        
      });
    }
    else{
      this.onReset();
    }

  }

  ProgramActive(value,name){
    
    this.SetProgramValue=value;
    this.activityID=value;
    this.activityName=name;
    this.activeProgram=value;
    this.isForActiveProgram=true;
    //this.activitiesWithProgramID.filter(s=>s.activity['name']==name).forEach(s=>this.activityID=s.activity['activityId'])
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
    else if(value==8 ){
      
      this.ProgrameNewNotification=false;
      this.ProgrameReNotification=false;
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

      this.CentersValue[0].filter(s=>s.cnt_description==this.Center).forEach(s=>this.CenterID=s.cnt_centerId)

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
  
  SchedulingForm = new FormGroup({
    Faculty : new FormControl(''),
    Department : new FormControl(''),
    Unit : new FormControl(''),
    Program : new FormControl('',Validators.required),
    StudentType :  new FormControl(''),
    MultipleBatches : new FormControl(''),
    AcademicYear : new FormControl('',Validators.required),
    Batch : new FormControl(''),
    ProgramScheduleCode : new FormControl(''),
  })

  ProgramCodedateForm = new FormGroup({
    ScheduleCode:new FormControl(''),
  })

  CentreCodedateForm= new FormGroup({
    ScheduleCode1:new FormControl(''),
  })

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

  RightFunction(){
    if(this.rightFunctionValue<this.Centers.length-1){
      this.rightFunctionValue++;
      this.Center=this.Centers[this.rightFunctionValue];
    }

    this.CentersValue[0].filter(s=>s.cnt_description==this.Center).forEach(s=>this.CenterID=s.cnt_centerId)
    
  }

  LeftFunction(){
    if(this.rightFunctionValue>0){
      this.rightFunctionValue--;
      this.Center=this.Centers[this.rightFunctionValue];
    }
   
    this.CentersValue[0].filter(s=>s.cnt_description==this.Center).forEach(s=>this.CenterID=s.cnt_centerId)
  }

async OpenModal(){
  if(this.ProgramScheduleCode1!=""){
   await  this.onSubmit();
  }
  
this.ScheduleCode=[];
await  this.ProgramService.getAllProgramStarted().toPromise().then    
    (res=>{
      this.programStarted=res as ProgramStarted[];
      for(let i=0; i<this.programStarted.length;i++){
        this.ScheduleCode.push(this.programStarted[i]['programScheduleCode'])
      }
      this.ScheduleCode.sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0));
    })
    
    if(this.PS_ST_Value=="n"){
      this.forNewProgramDisabled="disabled";
    }
    else{
      this.forNewProgramDisabled="";
    }
    if(this.PS_ST_Value=="r"){
      this.forReProgramDisabled="disabled"
    }
    else{
      this.forReProgramDisabled="";
    }
  }
  
  public selectedProgramDate(day) {
    let dayFormatted = day.format('YYYY-MM-DD');  
    this.isForSelected=true; 
    if (this.dateForm.valid)
    { 
      let dateFromMoment = moment(this.dateForm.value.ProgramdateFrom, 'YYYY-MM-DD');
      let dateToMoment = moment(this.dateForm.value.ProgramdateTo, 'YYYY-MM-DD');
      if(this.SetProgramValue==4){
        if(this.forEdit){
          if(dateFromMoment.isSameOrBefore(day) && dateToMoment.isSameOrAfter(day)){
            this.dateForm.setValue({ ProgramdateFrom: this.dateForm.get('ProgramdateFrom').value, ProgramdateTo: this.dateForm.get('ProgramdateTo').value});
            return;
          }
          else{
            this.dateForm.setValue({ ProgramdateFrom: null, ProgramdateTo: null });
            return;
          }
        }
        else{
          this.dateForm.get('ProgramdateFrom').patchValue(this.dateForFromFiveMonths);
          this.dateForm.get('ProgramdateTo').patchValue(dayFormatted);
        }
 
      }
      else if(this.SetProgramValue==5){
        if(this.forEdit){
          if(dateFromMoment.isSameOrBefore(day) && dateToMoment.isSameOrAfter(day)){
            this.dateForm.setValue({ ProgramdateFrom: this.dateForm.get('ProgramdateFrom').value, ProgramdateTo: this.dateForm.get('ProgramdateTo').value});
            return;
          }
          else{
            this.dateForm.setValue({ ProgramdateFrom: null, ProgramdateTo: null });
            return;
          }
        }
        else{
          this.dateForm.get('ProgramdateFrom').patchValue(this.dateForFromTwwoMonths);
          this.dateForm.get('ProgramdateTo').patchValue(dayFormatted);
        }
 
      }
      else if(dateFromMoment.isSameOrBefore(day) && dateToMoment.isSameOrAfter(day)){
        this.dateForm.setValue({ ProgramdateFrom: this.dateForm.get('ProgramdateFrom').value, ProgramdateTo: this.dateForm.get('ProgramdateTo').value});
        return;
      }
      else{
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
        this.dateForFromTwwoMonths=this.dateForm.get('ProgramdateFrom').value;
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
this.forEdit=false;
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

  public isCenterSelected(Centerday) {
    if (!Centerday) {
      return false;
    }
    let CenterdateFromMoment = moment(this.CenterdateForm.value.CenterdateFrom, 'YYYY-MM-DD');
    let CenterdateToMoment = moment(this.CenterdateForm.value.CenterdateTo, 'YYYY-MM-DD');
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

  async getData(){
    // console.log("run");
    
    let response = await this.ProgramService.getProgramsService().toPromise();
    this.Getprograms = response;
    // console.log(this.Getprograms);    
  }

  async getDepartment(){
    // let response = await this.ProgramService.getFacultyService().toPromise();
    // this.Faculties=response;
    // //console.log(this.Faculties)
    
  }
  
  onBatch(value){
    if(this.ProgramValue!=''&&this.PS_ST_Value!=''&&value!=''&&this.AcademicYear1!=''){
      
      this.ProgramScheduleCode1=this.ProgramCode+"_"+this.PS_ST_Value+"_"+this.AcademicYear1+"_"+value;
      this.Batch1=value;
    }
    else if(this.ProgramValue!=''&&this.PS_ST_Value!=''&&value==''&&this.AcademicYear1!=''){
      this.ProgramScheduleCode1=this.ProgramCode+"_"+this.PS_ST_Value+"_"+this.AcademicYear1;
    }
    
  }

  onMultipleBatchesChange(){
    
    if(!this.SchedulingForm.get('MultipleBatches').value){
      this.MultipleBatches=true;
      
    }
    else{
      this.MultipleBatches=false;
      this.Batch1="";
      this.ProgramScheduleCode1=this.ProgramCode+"_"+this.PS_ST_Value+"_"+this.AcademicYear1;
    }
    
  }

  onAcademicYear(value){
    if(this.ProgramValue!=''&&this.PS_ST_Value!=''&&this.AcademicYear1!=''&&this.Batch1!=''){
      this.ProgramScheduleCode1=this.ProgramCode+"_"+this.PS_ST_Value+"_"+this.AcademicYear1+"_"+this.Batch1;
      this.ShowLabel=true;
      // console.log('b'); 
    }
    else if(this.ProgramValue!=''&&this.PS_ST_Value!=''&&this.AcademicYear1!=''&&this.Batch1==''){
      this.ProgramScheduleCode1=this.ProgramCode+"_"+this.PS_ST_Value+"_"+this.AcademicYear1;
    }
    else{
      this.ShowLabel=false;
    }
    this.academicYear.filter(s=> s.year == value).forEach(s=> this.AcademicYearID=(s['id'])) 
  }

  onStudentTypeChange(value){
    if(value=="New"){
      this.PS_ST_Value="n";  
      this.studentTypeID=1;
    }
    if(value=="Re"){
      this.PS_ST_Value="r";
      this.studentTypeID=2;
    }
    if(value=="Both"){
      this.PS_ST_Value="b";
      this.studentTypeID=3;
    }
    if(this.ProgramValue!=''&&this.PS_ST_Value!=''&&this.AcademicYear1!=''&&this.Batch1!=''){
      this.ProgramScheduleCode1=this.ProgramCode+"_"+this.PS_ST_Value+"_"+this.AcademicYear1+"_"+this.Batch1;
      this.ShowLabel=true;
      // console.log('b'); 
    }
    else if(this.ProgramValue!=''&&this.PS_ST_Value!=''&&this.AcademicYear1!=''&&this.Batch1==''){
      this.ProgramScheduleCode1=this.ProgramCode+"_"+this.PS_ST_Value+"_"+this.AcademicYear1;
    }
  }

  onFaculty(event: any,FacultyValue) { 
    this.values = event;

    if(FacultyValue!=''){
      this.showFaculty=true;
    }
    else{
      this.Departments=[];
      this.Units=[];
      this.Programs=[];
      this.ProgramService.getAllDepartmentService().subscribe
      (res=>{
        this.departments=res;

          for(let i=0; i<this.departments.length;i++){
            this.Departments.push(this.departments[i]['description']);
          }


        this.Departments.sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0));
      })
  
      this.ProgramService.getAllUnitService().subscribe
      (res=>{
        this.units=res;

          for(let i=0;i<this.units.length;i++){
            this.Units.push(this.units[i]['description']);
          }


        this.Units.sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0));
      })
  
      this.ProgramService.getProgramsService().subscribe
      (res=>{
        this.programs=res;

          for(let i=0; i<this.programs.length;i++){
            this.Programs.push(this.programs[i]['title'])
          }


        this.Programs.sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0));
      })
    }    
  }

  onDapartment(event: any,DepartmentValue) { 
    this.values = event;
    
    if(DepartmentValue!=''){
      this.showDepartment=true;
    }    
  }

  onUnit(event: any,UnitValue) { 
    // this.values = event;
    
    if(UnitValue!=''){
      this.showUnit=true;
    }    
  }

  onProgram(value,ProgramValue) { 
    
    if(ProgramValue!=''){
      this.showProgram=true;
    }    

    if(ProgramValue!=''&&this.PS_ST_Value!=''&&this.Batch1!=''&&this.AcademicYear1!=''){      
      this.ProgramScheduleCode1=this.ProgramCode+"_"+this.PS_ST_Value+"_"+this.AcademicYear1+"_"+this.Batch1;
     
    }
    else if(ProgramValue!=''&&this.PS_ST_Value!=''&&this.Batch1==''&&this.AcademicYear1!=''){
      this.ProgramScheduleCode1=this.ProgramCode+"_"+this.PS_ST_Value+"_"+this.AcademicYear1;
    }
    else{
      this.ProgramScheduleCode1="";
    }
  }

  FacultySelect(SelectedValue: any){   
    this.FacultyValue=SelectedValue;
    this.FacultyID=this.faculties.filter(s=>s.description==SelectedValue)[0].id;
    this.showFaculty=false;   
    this.Departments=[];
    this.Programs=[];
    this.Units=[];
    this.ProgramService.getDepartmentService(this.FacultyID).subscribe
    (res =>{
    this.departments = res;
    if(this.departments.length==undefined){
      this.Departments.push(this.departments['description']);
    }
    if(this.departments.length>1){
      for(let i=0; i<this.departments.length;i++){
        this.Departments.push(this.departments[i]['description']);
      }
    }
    this.Departments.sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0));
    });

    this.ProgramService.getUnitService(this.FacultyID).toPromise().then
    (res =>{
    this.units = res;
    
    
    if(this.units.length==undefined){
      this.Units.push(this.units['description']);
    }
    if(this.units.length>1){
      for(let i=0; i<this.units.length;i++){
        this.Units.push(this.units[i]['description']);
      }
    }
    console.log(this.units.length,"a",this.Units);
    this.Units.sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0));
    });

    this.ProgramService.getSelectedProgramService(this.FacultyID).subscribe
    (res=>{
      this.programs=res;
      if(this.programs.length==undefined){
        this.Programs.push(this.programs['title']);
      }
      if(this.programs.length>1){
        for(let i=0; i<this.programs.length;i++){
          this.Programs.push(this.programs[i]['title'])
        }
      }

     this.Programs.sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0));
    })
  }

  DepartmentSelect(SelectedValue: any){   
    this.DepartmentValue=SelectedValue;
    this.showDepartment=false;   
  }

  UnitSelect(SelectedValue: any){   
    this.UnitValue=SelectedValue;
    this.showUnit=false;   
  }

  ProgramSelect(SelectedValue: any){   
    // this.SetProgramDates=[];
    // this.SetCenterDates=[];
    // this.activitiesWithProgramID=[];
    this.ProgramValue=SelectedValue;
    this.showProgram=false;  
    this.programs.filter(s=> s.title == this.ProgramValue).forEach(s=> this.ProgramID=(s['programId']))
    this.programs.filter(s=> s.title == this.ProgramValue).forEach(s=> this.ProgramCode=(s['code']))
    
//     this.ProgramService.getActivityStarted(this.ProgramID).subscribe
//     (res=>{
//     this.activityStarted=res as ActivityStarted[];
//     console.log(this.activityStarted);
      
//     for(let i=0;i<this.activityStarted.length;i++){
//       this.SetProgramDatesActivity=[];
//       this.SetCenterDatesActivity=[];
//       this.activitiesWithProgramID.push(this.activityStarted[i]);
//       this.activitiesWithProgramID.filter(s=>s.activityDateType['id']==1).forEach(s=> this.SetProgramDatesActivity.push(s.activity))
//       this.activitiesWithProgramID.filter(s=>s.activityDateType['id']==2).forEach(s=> this.SetCenterDatesActivity.push({"activity":s.activity,"id":s.id}))
//     }

// if(this.SetProgramDatesActivity.length>0){
//   for(let i=0;i<this.SetProgramDatesActivity.length;i++){
//     this.SetProgramDates.push(
//       {
//         "name":this.SetProgramDatesActivity[i]['name'],
//         "id":this.SetProgramDatesActivity[i]['activityId']
//       }); 
//       }
// }  

// if(this.SetCenterDatesActivity.length>0){
//   for(let i=0;i<this.SetCenterDatesActivity.length;i++){
//     this.SetCenterDates.push(
//       {
//         "name":this.SetCenterDatesActivity[i].activity['name'],
//         "id":this.SetCenterDatesActivity[i]['id']
//       }); 
//       }
// } 
//    console.log(this.SetCenterDates);
//   })

//  console.log(this.SetCenterDates);
//  console.log(this.SetProgramDates);
  }

  onClickedOutside() {    
    this.showFaculty=false;
    this.showDepartment=false;
    this.showUnit=false;
    this.showProgram=false;
  }

 async onSubmit(){
    let createProgramSchedule = {
      
      "academicYear": {
        "id": this.AcademicYearID
      },
      "batchNo": this.Batch1,
      "foreignFee": 0,
      "fromDate": "",
      "localFee": 0,
      "multipleBatchApplicable": this.MultipleBatches,
      "program": {
        "programId": this.ProgramID
      },
      "programScheduleCode": this.ProgramScheduleCode1,
      "studentType": {
        "id": this.studentTypeID
      },
      "toDate": ""

    
    }
    
  await  this.ProgramService.createProgramSchedule(createProgramSchedule).toPromise().
    then(s => { this.toastr.success(this.ProgramScheduleCode1+" has successfully created.", s['message']); this.onReset();})
    .catch((s) => { this.toastr.error("Error", s['error']['message']); console.log(s);});
    
  }

//   createProgramDateandCentreDate(){
//     if(this.programDate.length>0){
//       this.ProgramService.createProgramDate(this.programDate).toPromise()
//       .then(s => { this.toastr.success("Activity program date has successfully created.", s['message']);this.programGet();this.onReset();console.log(s); })
//       .catch((s) => { this.toastr.error( s['error']['message']); console.log(s);});
//     }
// if(this.centerDate.length>0){
//   this.ProgramService.createCenterDate(this.centerDate).toPromise()
//   .then(s => { this.toastr.success("Activity center date has successfully created.", s['message']);this.centreGet();this.onReset(); })
//   .catch((s) => { this.toastr.error( s['error']['message']); console.log(s);});
// }
//   }

//   programDateArray(){
//      this.programDate.push({
//       "programStarted":{"programStartedId":Number(this.ProgramStartedID)},
//       "activity":{"activityId": Number(this.activityID)},
//       "dateFrom":String(this.dateForm.get("ProgramdateFrom").value),
//       "dateObject": {},
//       "dateTo":String(this.dateForm.get("ProgramdateTo").value),
//       "id": 0
//   });

// this.tableProgramDate.push({
//     "activityName": this.activites.find(x=>x.activityId==this.activityID).name,
//     "code":this.ProgramCodedateForm.get('ScheduleCode').value
// })    
//     //  this.isProgramSelected(moment(this.dateForm.get('ProgramdateFrom').value).subtract(1, 'days').format('YYYY/MM/DD'));
//     //  console.log(moment(this.dateForm.get('ProgramdateFrom').value).subtract(1, 'days').format('YYYY/MM/DD'));
//      this.isForSelected=false;
//      this.showNewTableProgram=true;
//     // this.isForActiveProgram=false;    
//   }

programDateArray(){
  let body={
    "programStarted": {"programStartedId":Number(this.ProgramStartedID)},
    "activity": {"activityId": Number(this.activityID)},
    "dateFrom": String(this.dateForm.get("ProgramdateFrom").value),
    "dateObject": {},
    "dateTo": String(this.dateForm.get("ProgramdateTo").value),
}

this.ProgramService.createProgramDate(body).toPromise()
.then(s => { this.toastr.success(s.slice(12,s.length-2));this.programGet();this.isForSelected=false;this.isForActiveProgram=false; })
.catch((s) => { this.toastr.error( s['error']['message']); console.log(s);});
}

  // programCenterArray(){
  //    this.centerDate.push({
  //     "programStarted":{"programStartedId": this.ProgramStartedIDCenter},
  //     "activity":{"activityId": this.activityID,},
  //     "dateObject": {"sag":"faf"},
  //     "fromDate": this.CenterdateForm.get('CenterdateFrom').value,
  //     "rgmCenter":{"cnt_centerId": this.CenterID},
  //     "toDate": this.CenterdateForm.get('CenterdateTo').value
  // });
    
  //    this.tableCentreDate.push({
  //      "code":this.CentreCodedateForm.get('ScheduleCode1').value,
  //     "activityName": this.activites.find(x=>x.activityId==this.activityID).name,
  //     "centreName":this.CentersValue[0].find(s=>s.cnt_centerId==this.CenterID).cnt_description  
  // })
     
  //     this.isForSelecetdCenter=false;
  //     this.showNewTableCentre=true;
  // }

  programCenterArray(){
    let body={
      "activity": {"activityId": this.activityID,},
      "dateObject": {},
      "fromDate": this.CenterdateForm.get('CenterdateFrom').value,
      "programStarted": {"programStartedId": this.ProgramStartedIDCenter},
      "rgmCenter": {"cnt_centerId": this.CenterID},
      "toDate": this.CenterdateForm.get('CenterdateTo').value
    }
    this.ProgramService.createCenterDate(body).toPromise()
    .then(s => { this.toastr.success(s.slice(12,s.length-2));this.centreGet();console.log(s);
     })
    .catch((s) => { this.toastr.error(s); console.log(s);  this.isForActiveCenter=false;this.isForSelecetdCenter=false;});
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

 async DeleteProgramDB(i){ 
   await this.ProgramService.deleteProgramDate(this.activityProgramDate[i]['id']).toPromise().
    then(s => { this.toastr.success(this.activityProgramDate[i].programStarted['programScheduleCode']+" has successfully deleted.", s['message']);this.programGet();})
    .catch((s) => { this.toastr.error("Error", s['error']['message']); console.log(s);});
    this.isForSelected=false;
    this.isForActiveProgram=false;
  }

 async DeleteCenterDB(i){
  await  this.ProgramService.deleteCenterDate(this.activityCenterDate[i]['id']).toPromise().
    then(s => { this.toastr.success(this.activityCenterDate[i].programStarted['programScheduleCode']+" has successfully deleted.", s['message']);this.centreGet();})
    .catch((s) => { this.toastr.error("Error", s['error']['message']); console.log(s);});
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
    let splitDate=this.activityProgramDate[i].dateFrom.split("-");
    let splitCurrentDate=this.date.format('YYYY-MM-DD').split("-");
    let year = Number(splitCurrentDate[0])-Number(splitDate[0]);
    let month = Number(splitCurrentDate[1])-Number(splitDate[1]);
    console.log(year,"year");
    console.log(month,"month");
    if(Number(year)>0){
    this.date.subtract(Number(year),'y');
    if(Number(month)>0){
      this.date.subtract(Number(month),'M');
    }
    if(Number(month)<0){
      this.date.add(Number(month)*-1,'M');
    }
    this.daysArr = this.createCalendar(this.date);
    }
    if(Number(year)<0){
      this.date.add(Number(year)*-1,'y');
      if(Number(month)>0){
        this.date.subtract(Number(month),'M');
      }
      if(Number(month)<0){
        this.date.add(Number(month)*-1,'M');
      }
      this.daysArr = this.createCalendar(this.date);
    }
    if(Number(year)==0){
      if(Number(month)>0){
        this.date.subtract(Number(month),'M');
      }
      if(Number(month)<0){
        this.date.add(Number(month)*-1,'M');
      }
      this.daysArr = this.createCalendar(this.date);
    }
  }

  public EditCreatedCenterTable(i){ 
    this.forEditCenter=true;
    this.forUpdateBtnCenter=true;
    this.isForActiveCenter=true;
    this.centerDateID=this.activityCenterDate[i].id;
    this.CenterdateForm.setValue({ CenterdateFrom: this.activityCenterDate[i].fromDate, CenterdateTo: this.activityCenterDate[i].toDate});
    this.selectedCenterDate(moment(this.activityCenterDate[i].fromDate));
    this.selectedCenterDate(moment(this.activityCenterDate[i].toDate));
    this.isCenterSelected(moment(this.activityCenterDate[i].fromDate));
    this.isCenterSelected(moment(this.activityCenterDate[i].toDate));
    this.setActive(this.activityCenterDate[i].activity.name);
    this.Center=this.activityCenterDate[i].rgmCenter.cnt_description;
    console.log(this.activityCenterDate[i].activity.name,"abc");
    this.Active(this.activityCenterDate[i].activity.activityId,this.activityCenterDate[i].activity.name);
    let splitDate=this.activityCenterDate[i].fromDate.split("-");
    let splitCurrentDate=this.centerdate.format('YYYY-MM-DD').split("-");
    let year = Number(splitCurrentDate[0])-Number(splitDate[0]);
    let month = Number(splitCurrentDate[1])-Number(splitDate[1]);
    console.log(year,"year");
    console.log(month,"month");
    if(Number(year)>0){
    this.centerdate.subtract(Number(year),'y');
    if(Number(month)>0){
      this.centerdate.subtract(Number(month),'M');
    }
    if(Number(month)<0){
      this.centerdate.add(Number(month)*-1,'M');
    }
    this.CenterdaysArr = this.createCenterCalendar(this.centerdate);
    }
    if(Number(year)<0){
      this.centerdate.add(Number(year)*-1,'y');
      if(Number(month)>0){
        this.centerdate.subtract(Number(month),'M');
      }
      if(Number(month)<0){
        this.centerdate.add(Number(month)*-1,'M');
      }
      this.CenterdaysArr = this.createCenterCalendar(this.centerdate);
    }
    if(Number(year)==0){
      if(Number(month)>0){
        this.centerdate.subtract(Number(month),'M');
      }
      if(Number(month)<0){
        this.centerdate.add(Number(month)*-1,'M');
      }
      this.CenterdaysArr = this.createCenterCalendar(this.centerdate);
    }
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
     this.ProgramService.updateProgramDate(body).toPromise().
    then(s => { this.toastr.success(this.programScheduleCodeName+" has successfully Updated.", s['message']);this.programGet();})
    .catch((s) => { this.toastr.error("Error", s['error']['message']); console.log(s);});
    this.forEdit=false;
    this.forUpdateBtn=false;
    this.isForSelected=false;
    this.isForActiveProgram=false;
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

  onReset(){
    this.SchedulingForm.get('Program').setValue('');
    this.SchedulingForm.patchValue({StudentType : 'Re'});
    this.ProgramID="";
    this.UnitValue="";
    this.DepartmentValue="";
    this.FacultyValue="";
    this.SchedulingForm.get('MultipleBatches').setValue('');
    this.MultipleBatches=false;
    this.SchedulingForm.get('AcademicYear').setValue('');
    this.AcademicYearID="";
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
    this.showNewTableCentre=false;
    this.showNewTableProgram=false;
    this.showCreatedTableCentre=false;
    this.showCreatedTableProgram=false;
    this.isForSelected=false;
    this.isForSelecetdCenter=false;
    this.ProgrameReNotification=false;
    this.ProgrameNewNotification=false;
    this.isLatestProgram=false;
    this.isLatestCenter=false;
  }
}
