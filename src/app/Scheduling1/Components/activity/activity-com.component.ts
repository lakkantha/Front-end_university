import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivityPrograms,defineActivity,rgmCenters,activityDateType,activityPrograms,rgmCenterType,activitySatrt } from '../../Modal/ActivityPrograms';
import {DefineActivityService} from '../../Service/define-activity.service';
import {DefineAcademicCentersService} from '../../Service/define-academic-centers.service';
import {SchedulingComService } from '../../Service/scheduling-dop.service';
import { ToastrService } from 'ngx-toastr';
import { AddPrograms } from '../../Modal/AddPrograms';

@Component({
  selector: 'app-activity-com',
  templateUrl: './activity-com.component.html',
  styleUrls: ['./activity-com.component.css'],
})
export class ActivityComComponent implements OnInit
{

  defineActivities: defineActivity[];
  Centers: rgmCenters[];
  activityDateTypes: activityDateType[];
  programs: activityPrograms[];
  centreType: rgmCenterType[];
  activityStart: activitySatrt[];
  selectedCenters = [];
  predefinedCenters = [];
  predefinedCentersId = [];
  allCenters = [];
  allCentersId = [];
  activityStartedID:any;
  FilterWithActivity=[];
  FilterWithDateType=[];
  FilterWithCenterType=[];
  FilterWithStudentType=[];
  p:number=1;
  total:number;
  itemsPage:number=5;
  // addNewActivity={
  //   activityDateType: {
  //     id: 1,
  //   },
  //   name: '',
  // }

  accessiblePerson=[
    {
    "id":1,
    "name":'Admin'
    },
    {
    "id":2,
    "name":'Super Admin'
    }
  ]

  constructor(private getData:DefineActivityService,private getCenterDate:DefineAcademicCentersService,private getPrograms:SchedulingComService,private toastr: ToastrService) 
  {
    this.getData.getActivity().subscribe
    (res =>{
    this.defineActivities = res as defineActivity[];
    console.log(this.defineActivities);
    
    for(let i=0; i< this.defineActivities.length;i++){
      this.Activities.push({
        "Name":this.defineActivities[i]['name'].toUpperCase(),
        "Id":this.defineActivities[i]['activityId'],
    });
    console.log(this.Activities);
    }
    this.Activities.sort((a,b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0)); 
    }),

    this.getData.getActivityDateType().subscribe
    (res=>{
      this.activityDateTypes= res as activityDateType[];
      for(let i=0; i< this.activityDateTypes.length;i++){
        this.ActivitiesDateType.push({
          "Id":this.activityDateTypes[i]['id'],
      });
    }
    }),

    this.getData.getCenterType().subscribe(res=>{
      this.centreType=res as rgmCenterType[];

    })

    this.getCenterDate.getCenter().subscribe
    (res =>{
    this.Centers = res as rgmCenters[];
    //console.log(this.Centers);
    
    this.Centers.forEach(s=> this.allCenters.push(s['cnt_description']))
    this.Centers.forEach(s=> this.selectedCenters.push(s['cnt_description']))
    this.Centers.filter(s=> s.ctp_centerTypeId == 1).forEach(s=> this.predefinedCenters.push(s['cnt_description']))

    }),
    console.log(this.allCentersId);
    
    this.getPrograms.getProgramsService().subscribe
    (res=>{
      this.programs = res as activityPrograms[];
      this.programs.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)); 
    })



    console.log(this.ActivityForm);
    this.ActivityForm.patchValue({ActivityDateType : 'Program'});
    //this.AvtivityForm.get('CenterType').disable();
    //this.AvtivityForm.get('CenterName').disable();
    this.ActivityForm.get('ProgramForm').patchValue({ActivityAccessType : 'Read Only'});
    
    
    // if(this.ActivityForm.get('ProgramForm').get('ActivityAccessType').value=='Read Only'){
    //   this.ActivityForm.get('ProgramForm').patchValue({CalenderTypeSingle:'true'});
    // }
    //this.AvtivityForm.get('ProgramForm').get('CalenderTypeRange').disable();
    //this.AvtivityForm.get('ProgramForm').get('CalenderTypeSingle').disable();

    this.getData.getAccessiblePersons().toPromise()
    .then(res=>{
      this.Persons=res;
      this.accesiblePerson=res;
    })
    .catch(e=>{
      console.log(e);
      
    });
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');

    
  }

  onEntries(){
    this.p=1;
  }
  arrayForProgramForm=[];
  [x: string]: any;
  ActivityForm = new FormGroup({
    ProgramForm : new FormGroup({
      ProgramName: new FormControl('',Validators.required),
      PersonName: new FormControl(''),
      ActivityAccessType: new FormControl('',Validators.required),
      CalenderTypeRange: new FormControl({value:'',disabled: true}),
      CalenderTypeSingle: new FormControl({value:'',disabled: true}),
      SortPrograms: new FormControl(''),
      Entries: new FormControl(''),
      Department: new FormControl(''),
      Faculty: new FormControl(''),
      Designation: new FormControl('')
    }),
    ActivityName: new FormControl('',Validators.required),
    ActivityDateType: new FormControl('',Validators.required),
    CenterType: new FormControl({value:'',disabled: true}),
    CenterName: new FormControl({value:'',disabled:true}),
    ApplicableStudentTypeNew: new FormControl(''),
    ApplicableStudentTypeRe: new FormControl('')

  });

  EditForm = new FormGroup({
    ProgramName : new FormControl(''),
    PersonName : new FormControl(''),
    ActivityAccessType : new FormControl(''),
    CalenderTypeRange : new FormControl(''),
    CalenderTypeSingle : new FormControl('')
  });
  selectedCentersValue:any;
  ShowCenters="false";
  textError=false;
  modalDismiss="";
  rangeTable=false;
  singleTable=false;
  Filter:boolean=false;
  signActivity: string = 'plus';
  signProgram: string = 'plus';
  Activities = [];
  ActivitiesDateType=[];
 // Centers = [];
  //Programs = ['IT','Engineering','Law','Madicine'];
  Sorts = ['Program','Users','Access Type','Calendar Type'];
  Entries = ['5','10','15','20'];
  Persons = [];
  Faculties = [];
  Departments = [];
  Designations = [];
  closeResult: string;
  isSubmitted = false;
  Activity: any;
  Center: any;
  ActivityID:any;
  centreTypeIs:any;
  Program: number;
  Person: any;
  ActivityAccessType: any;
  UpdatedActivityAccessType: any;
  ActivityDateType=1;
  DateRange: any;
  SingleDate: any;
  SortValue: any;
  End: any;
  CurrentEditRow: any;
  //AddPrograms = [];
  ViewPrograms = [];
  index: any;
  programId:any;
  AddingPrograms = [];
  DefineProgramID=[];
  activityAccessTypeID:any;
  programID:number;
  personID:any;
  calendorTypeID:any;
  studentType:any;
  sortFunctionValue=true;
  ShowSecondTogle=false;
  accesiblePerson=[];
  ActivityPrograms : ActivityPrograms = {
    program : [],
    ActivityName : "",
    ActivityDateType : "",
    CenterName : "",
    CenterType : "",
    ApplicableStudentTypeNew: "",
    ApplicableStudentTypeRe: ""
  };

  onSearch(){
    let faculty=this.ActivityForm.get('ProgramForm').get('Faculty').value;
    let department=this.ActivityForm.get('ProgramForm').get('Department').value;
    let designation=this.ActivityForm.get('ProgramForm').get('Designation').value
    if(faculty!=""&&department==""&&designation==""){
      this.getData.getAccessiblePersonsByFaculty(faculty).toPromise()
      .then(res=>{
        this.Persons=res;
      })
      .catch(e=>{
        console.log(e);
        
      })
    }
    if(faculty==""&&department!=""&&designation==""){
      this.getData.getAccessiblePersonsByDepartment(department).toPromise()
      .then(res=>{
        this.Persons=res;
      })
      .catch(e=>{
        console.log(e);
        
      })
    }
    if(faculty==""&&department==""&&designation!=""){
      this.getData.getAccessiblePersonsByDesignation(designation).toPromise()
      .then(res=>{
        this.Persons=res;
      })
      .catch(e=>{
        console.log(e);
        
      })
    }
    if(faculty!=""&&department!=""&&designation==""){
      this.getData.getAccessiblePersonsByFacultyAndDepartment(faculty,department).toPromise()
      .then(res=>{
        this.Persons=res;
      })
      .catch(e=>{
        console.log(e);
        
      })
    }
    if(faculty!=""&&department==""&&designation!=""){
      this.getData.getAccessiblePersonsByFacultyAndDesignation(faculty,designation).toPromise()
      .then(res=>{
        this.Persons=res;
      })
      .catch(e=>{
        console.log(e);
        
      })
    }
    if(faculty==""&&department!=""&&designation!=""){
      this.getData.getAccessiblePersonsByDepartmentAndDesignation(department,designation).toPromise()
      .then(res=>{
        this.Persons=res;
      })
      .catch(e=>{
        console.log(e);
        
      })
    }
    if(faculty!=""&&department!=""&&designation!=""){
      this.getData.getAccessiblePersonsByFacultyAndDepartmentAndDesignation(faculty,department,designation).toPromise()
      .then(res=>{
        this.Persons=res;
      })
      .catch(e=>{
        console.log(e);
        
      })
    }
    if(faculty==""&&department==""&&designation==""){
      this.getData.getAccessiblePersons().toPromise()
      .then(res=>{
        this.Persons=res;
      })
      .catch(e=>{
        console.log(e);
        
      })
    }
  }

  onTextChange(value)
  {
    console.log(this.selectedCentersValue);
    
    if(this.selectedCentersValue!=[]){
      this.ShowCenters="true";
    }
    else{
      this.ShowCenters="false";
    }
  }

  onItemRemoved(value)
  {

    if(this.selectedCentersValue!=[]){
      this.ShowCenters="true";
    }
    else{
      this.ShowCenters="false";
    }
  }


  toggleSignActivity() 
  {
    
    if(this.signActivity == 'plus') 
    {
      this.signActivity = 'minus';
    } else 
    {
      this.signActivity = 'plus';
    }
  }

  toggleSignProgram() 
  {
    
    if(this.signProgram == 'plus') 
    {
      this.signProgram = 'minus';
    } 
    else 
    {
      this.signProgram = 'plus';
    }
  }

  SearchFunction()
  {
      this.getData.getAllFaculties().toPromise()
      .then(res=>{
        this.Faculties=res;
      })
      .catch(e=>{
        console.log(e);
        
      });

      this.getData.getAllDepartments().toPromise()
      .then(res=>{
        this.Departments=res;
      })
      .catch(e=>{
        console.log(e);
        
      })

      this.getData.getAllDesignation().toPromise()
      .then(res=>{
        this.Designations=res;
      })
      .catch(e=>{
        console.log(e);
        
      });
      this.Filter=true;
      
  }

  SortFunction()
  {
    if(this.sortFunctionValue){
      if(this.SortValue == "Program")
      {
        this.AddingPrograms.sort((a, b) => a.ProgramName.localeCompare(b.ProgramName))
      }
      if(this.SortValue == "Users")
      {
        this.AddingPrograms.sort((a, b) => a.PersonName.localeCompare(b.PersonName))
      }
      if(this.SortValue == "Access Type")
      {
        this.AddingPrograms.sort((a, b) => a.ActivityAccessType.localeCompare(b.ActivityAccessType))
      }
      if(this.SortValue == "Calendar Type")
      {
        this.AddingPrograms.sort((a, b) => a.CalenderType.localeCompare(b.CalenderType))
      }
    this.sortFunctionValue=false;  
    }
    else{
      if(this.SortValue == "Program")
      {
        this.AddingPrograms.sort((a, b) => b.ProgramName.localeCompare(a.ProgramName))
      }
      if(this.SortValue == "Users")
      {
        this.AddingPrograms.sort((a, b) => b.PersonName.localeCompare(a.PersonName))
      }
      if(this.SortValue == "Access Type")
      {
        this.AddingPrograms.sort((a, b) => b.ActivityAccessType.localeCompare(a.ActivityAccessType))
      }
      if(this.SortValue == "Calendar Type")
      {
        this.AddingPrograms.sort((a, b) => b.CalenderType.localeCompare(a.CalenderType))
      }
    this.sortFunctionValue=true;  
    }

  }

  SortPrograms(filterVal: any)
  {
    this.SortValue = filterVal;
  }
  // EntryPrograms(filterVal: any)
  // {
  //   this.End = filterVal;
  // }

  CloseSearchFunction()
  {
    this.Filter=false;
  }

async AddActivity(newActivity: string)
  {

    
    let activityBody={
      "activityDateType": {
        "id": 1
      },
      "name": newActivity
    }
    await this.getData.createSingleActivity(activityBody).toPromise().
    then(s => { this.toastr.success("New activity " +newActivity+" is successfully created.", s['message']);this.onReset(); })
    .catch((s) => { this.toastr.error("Error", s['error']['message']); console.log(s);});

    this.Activities=[];

     this.getData.getActivity().subscribe
    (res =>{
    this.defineActivities = res as defineActivity[];

    for(let i=0; i< this.defineActivities.length;i++){
      this.Activities.push({
        "Name":this.defineActivities[i]['name'].toUpperCase(),
        "Id":this.defineActivities[i]['activityId'],
    });

    }
    this.Activities.sort((a,b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0)); 
    })

  }

  onAdd() 
  {
    if(this.ActivityForm.get('ProgramForm').get('CalenderTypeRange').value)
    {
      this.rangeTable=true;
      this.ActivityForm.get('ProgramForm').get('CalenderTypeRange').setValue('Date Range');
    }
    else
    {
      this.rangeTable=false;
      this.ActivityForm.get('ProgramForm').get('CalenderTypeRange').setValue('');
    }
    if(this.ActivityForm.get('ProgramForm').get('CalenderTypeSingle').value)
    { 
      this.singleTable=true;
      this.ActivityForm.get('ProgramForm').get('CalenderTypeSingle').setValue('Single Date');
    }
    else
    {
      this.singleTable=false;
      this.ActivityForm.get('ProgramForm').get('CalenderTypeSingle').setValue('');
    }
    //console.log(this.ActivityForm.get('ProgramForm').value);
    //this.AddingPrograms[this.AddingPrograms.length] = this.ActivityForm.get('ProgramForm').value;
    let user;
    this.programs.filter(s=> s.programId == this.Program).forEach(s=> this.programName=(s['title']));
    this.accesiblePerson.filter(x=>x.id==this.ActivityForm.get('ProgramForm').get('PersonName').value).forEach(x=>user=x.name);
    if(this.ActivityForm.get('ProgramForm').get('CalenderTypeRange').value!=""){
      this.AddingPrograms.push({
        "ActivityAccessType":this.ActivityForm.get('ProgramForm').get('ActivityAccessType').value,
        "ProgramName":this.programName,
        "PersonName":user,
        "PersonId":this.ActivityForm.get('ProgramForm').get('PersonName').value,
        "CalenderType":this.ActivityForm.get('ProgramForm').get('CalenderTypeRange').value,
        "ProgramID":Number(this.Program)
            })
    }
    if(this.ActivityForm.get('ProgramForm').get('CalenderTypeSingle').value!=""){
      this.AddingPrograms.push({
        "ActivityAccessType":this.ActivityForm.get('ProgramForm').get('ActivityAccessType').value,
        "ProgramName":this.programName,
        "PersonName":user,
        "PersonId":this.ActivityForm.get('ProgramForm').get('PersonName').value,
        "CalenderType":this.ActivityForm.get('ProgramForm').get('CalenderTypeSingle').value,
        "ProgramID":Number(this.Program)
      })
    }
    if(this.ActivityForm.get('ProgramForm').get('ActivityAccessType').value=="Read Only"){
      this.AddingPrograms.push({
        "ActivityAccessType":this.ActivityForm.get('ProgramForm').get('ActivityAccessType').value,
        "ProgramName":this.programName,
        "PersonName":user,
        "PersonId":this.ActivityForm.get('ProgramForm').get('PersonName').value,
        "CalenderType":"Single Date",
        "ProgramID":Number(this.Program)
      })
    }
    console.log(this.AddingPrograms);
    
    this.ActivityForm.get('ProgramForm').patchValue({ActivityAccessType : 'Read Only'});
    this.ActivityForm.get('ProgramForm').get('CalenderTypeRange').setValue('');
    this.ActivityForm.get('ProgramForm').get('CalenderTypeSingle').setValue('');
    this.ActivityForm.get('ProgramForm').get('CalenderTypeRange').disable();
    this.ActivityForm.get('ProgramForm').get('CalenderTypeSingle').disable();

    this.onSubmitActivity();
    this.total=this.AddingPrograms.length;
  }

  onReset()
  {
    this.ActivityForm.get('ActivityName').setValue('');
    this.Activity='';
    this.ActivityDateType=1;
    this.centreTypeIs="";
    this.allCentersId=[];
    this.DefineProgramID=[];
    this.studentType="";
    this.AddingPrograms.splice(0,this.AddingPrograms.length);
    this.ActivityForm.patchValue({ActivityDateType:'Program'});
    this.ActivityForm.get('CenterType').setValue('');
    this.ActivityForm.get('CenterName').setValue('');
    this.ActivityForm.get('CenterType').disable();
    this.ActivityForm.get('CenterName').disable();
    this.ActivityForm.get('ApplicableStudentTypeNew').setValue('');
    this.ActivityForm.get('ApplicableStudentTypeRe').setValue('');
    this.ActivityForm.get('ProgramForm').get('ProgramName').setValue('');
    this.ActivityForm.get('ProgramForm').get('PersonName').setValue('');
    this.ActivityForm.get('ProgramForm').patchValue({ActivityAccessType : 'Read Only'});
    this.ActivityForm.get('ProgramForm').get('CalenderTypeRange').setValue('');
    this.ActivityForm.get('ProgramForm').get('CalenderTypeSingle').setValue('');
    this.ActivityForm.get('ProgramForm').get('CalenderTypeRange').disable();
    this.ActivityForm.get('ProgramForm').get('CalenderTypeSingle').disable();
  }

  onResetProgram(){

  }

async  onSubmit()
  {
    // this.FilterWithActivity=[];
    // this.FilterWithDateType=[];
    // this.FilterWithStudentType=[];
    // this.activityStart=[];
     

  // await  this.getData.getAllActivityStart().toPromise().then
  //   (res=>{
  //     this.activityStart = res as activitySatrt[];
  //     console.log(this.activityStart,"getAll");
  //   })
    
  //   if(this.ActivityDateType==1){
  //     this.activityStart.filter(s=>s.activity.activityId==Number(this.ActivityID)).forEach(s=>this.FilterWithActivity.push(s));
  //     this.FilterWithActivity.filter(s=>s.activityDateType.id==this.ActivityDateType).forEach(s=>this.FilterWithDateType.push(s));
  //     this.FilterWithDateType.filter(s=>s.studentType.id==Number(this.studentType)).forEach(s=>this.activityStartedID=s.id);
  //   }
  //   if(this.ActivityDateType==2){
  //     this.activityStart.filter(s=>s.activity.activityId==Number(this.ActivityID)).forEach(s=>this.FilterWithActivity.push(s));
  //     this.FilterWithActivity.filter(s=>s.activityDateType.id==this.ActivityDateType).forEach(s=>this.FilterWithDateType.push(s));
  //     this.FilterWithDateType.filter(s=>s.studentType.id==Number(this.studentType)).forEach(s=>this.FilterWithStudentType.push(s));
  //     this.FilterWithStudentType.filter(s=>s.centerType.id==Number(this.centreTypeIs)).forEach(s=>this.activityStartedID=s.id);
  //   }
  //   console.log(this.activityStart);
  //   console.log(this.FilterWithActivity);
  //   console.log(this.FilterWithDateType);
  //   console.log(this.FilterWithStudentType);
  //   console.log(this.activityStartedID);
    
    this.ActivityPrograms.program = this.AddingPrograms;
    for(let i=0;i<this.AddingPrograms.length;i++){
      if(this.AddingPrograms[i]['ActivityAccessType']=="Edit Only"){
        this.activityAccessTypeID=1
      }
      else{
        this.activityAccessTypeID=2
      }
      this.programID=this.AddingPrograms[i]['ProgramID'];
      if(this.AddingPrograms[i]['CalenderType']=="Date Range"){
        this.calendorTypeID=2;
      }
      else{
        this.calendorTypeID=1;
      }

      this.DefineProgramID.push({
        "accessType":{"id":this.activityAccessTypeID},
        "program":{"programId":Number(this.programID)},
        "accessiblePerson":this.AddingPrograms[i]['PersonId'],
        "calenderType":{"id":this.calendorTypeID},
      })
    }





    let body={
      "activityStartedId": Number(this.activityStartedID), 
      "defineActivityProgram": this.DefineProgramID
    }
    console.log(body,"body");
    
    this.activityStartedID='';
    this.getData.createDefineActivityProgram(body).toPromise().
    then(s => { this.toastr.success("The activity " +this.Activity+" is successfully created.", s['message']);console.log(s);
     this.onReset(); })
    .catch((s) => { this.toastr.error( s['error']['message']); console.log(s);});

  }

 onSubmitActivity(){
  this.ActivityPrograms.ActivityName = this.ActivityForm.get('ActivityName').value;
  this.ActivityPrograms.ActivityDateType = this.ActivityForm.get('ActivityDateType').value;
  this.ActivityPrograms.CenterType = this.ActivityForm.get('CenterType').value;
  this.ActivityPrograms.CenterName = this.ActivityForm.get('CenterName').value;
  this.ActivityPrograms.ApplicableStudentTypeNew = this.ActivityForm.get('ApplicableStudentTypeNew').value;
  this.ActivityPrograms.ApplicableStudentTypeRe = this.ActivityForm.get('ApplicableStudentTypeRe').value;

  if(this.centreTypeIs==2){
    for(let i = 0; i<this.selectedCentersValue.length;i++){        
      this.Centers.filter(s=>s.cnt_description==this.selectedCentersValue[i].value).forEach(s=> this.allCentersId.push({"cnt_centerId":s['cnt_centerId']}))
    }
  }
  if(this.centreTypeIs==1){
    this.Centers.filter(s=> s.ctp_centerTypeId == 1).forEach(s=> this.allCentersId.push({"cnt_centerId":s['cnt_centerId']}))
  }
  if(this.centreTypeIs==3){ 
    this.Centers.forEach(s=> this.allCentersId.push({"cnt_centerId":s['cnt_centerId']}))
  }


  if(this.ActivityForm.get('ApplicableStudentTypeNew').value&&!this.ActivityForm.get('ApplicableStudentTypeRe').value){
    this.studentType=1;
  }
  else if(!this.ActivityForm.get('ApplicableStudentTypeNew').value&&this.ActivityForm.get('ApplicableStudentTypeRe').value){
    this.studentType=2;
  }
  else{
    this.studentType=3;
  }
  let defineActivity;
  if(this.ActivityDateType==1){
    defineActivity = 
   {
    "activity": {
      "activityId": Number(this.ActivityID)
    },
    "activityDateType": {
      "id": this.ActivityDateType
    },
    "rgmCenter": this.allCentersId,
    "studentType": {
      "id": Number(this.studentType)
    }
  }
 }
 if(this.ActivityDateType==2){
    defineActivity = {
     "activity": {
       "activityId": Number(this.ActivityID)
       },
       "activityDateType": {
       "id": this.ActivityDateType
       },
       "centerType": {
       "id": Number(this.centreTypeIs)
       },
       // "defineActivityPrograms": this.DefineProgramID,
       "rgmCenter": this.allCentersId,
       "studentType": {
       "id": Number(this.studentType)
       }
   }
 }
    
      this.getData.createDefineActivity(defineActivity).toPromise()
      .then(s => { 
        this.activityStartedID=s.id;
       })
     .catch(s => { 
       console.log(s);
    }
     );


}

  onActivityItemChange(value)
  { 
    if(value == 'Center')
    {
      this.ActivityForm.get('CenterType').enable();
      this.ActivityForm.get('CenterName').enable();
      this.ActivityDateType = 2;
      this.centreTypeIs=3;
    }
    else
    {
      this.ActivityForm.get('CenterType').disable();
      this.ActivityForm.get('CenterName').disable();
      this.ActivityForm.get('CenterType').setValue('');
      this.ActivityForm.get('CenterName').setValue('');
      this.ActivityDateType = 1;
    }
  }

  onActivityAccessItemChange(value)
  {
    this.ActivityAccessType = value;
    if(this.ActivityAccessType == 'Edit Only')
    {
      this.ActivityForm.get('ProgramForm').get('CalenderTypeRange').enable();
      this.ActivityForm.get('ProgramForm').get('CalenderTypeSingle').enable();
    }
    else{
      this.ActivityForm.get('ProgramForm').get('CalenderTypeRange').disable();
      this.ActivityForm.get('ProgramForm').get('CalenderTypeSingle').disable();
      this.ActivityForm.get('ProgramForm').get('CalenderTypeRange').setValue('');
      this.ActivityForm.get('ProgramForm').get('CalenderTypeSingle').setValue('');
    }
  }

  onUpdatedActivityAccessTypeItemChange(value)
  {
    if(value == 'Edit Only')
    {
      this.EditForm.get('CalenderTypeRange').enable();
      this.EditForm.get('CalenderTypeSingle').enable();
    }
    else
    {
      this.EditForm.get('CalenderTypeRange').disable();
      this.EditForm.get('CalenderTypeSingle').disable();
      this.EditForm.get('CalenderTypeRange').setValue('');
      this.EditForm.get('CalenderTypeSingle').setValue('');
    }
  }

  onCenterItemChange(value)
  {
    if(value=="Predefined")
    {
      this.centreTypeIs=1;
    }
    else if(value=="Selected")
    {
      this.centreTypeIs=2;
    }
    else
    {
      this.centreTypeIs=3;
    }
  }

  checkbox1(value)
  {
    this.DateRange = value;
    //this.ProgramForm.patchValue({CalenderTypeRange : this.DateRange});
    //this.ProgramForm.controls['AddButton'].enable(); 
  }
  checkbox2(value)
  {
    
    this.SingleDate = value;
    //this.ProgramForm.patchValue({CalenderTypeSingle : this.SingeDate});
    //this.ProgramForm.controls['AddButton'].enable();
  }
  EditTable(x)
  {
    this.CurrentEditRow = x;
    
    this.EditForm.patchValue({ProgramName : this.AddingPrograms[x].ProgramName}); 
    this.EditForm.patchValue({PersonName : this.AddingPrograms[x].PersonId}); 
    this.EditForm.patchValue({ActivityAccessType : this.AddingPrograms[x].ActivityAccessType});  
    console.log(this.AddingPrograms[x].CalenderType);
    
    if(this.AddingPrograms[x].CalenderType=="Date Range")
    {
      this.EditForm.patchValue({CalenderTypeRange : this.AddingPrograms[x].CalenderType}); 
      this.EditForm.get('CalenderTypeSingle').setValue('');
    }
    
    if(this.AddingPrograms[x].CalenderType=="Single Date")
    {
      this.EditForm.patchValue({CalenderTypeSingle : this.AddingPrograms[x].CalenderType});
      this.EditForm.get('CalenderTypeRange').setValue('');
    }
    
    this.ViewPrograms[0] = this.AddingPrograms[x];
    if(this.EditForm.get('ActivityAccessType').value == 'Edit Only')
    {
      this.EditForm.get('CalenderTypeRange').enable();
      this.EditForm.get('CalenderTypeSingle').enable();
    }
    else
    {
      this.EditForm.get('CalenderTypeRange').disable();
      this.EditForm.get('CalenderTypeSingle').disable();
      this.EditForm.get('CalenderTypeRange').setValue('');
      this.EditForm.get('CalenderTypeSingle').setValue('');
    }
    console.log(this.AddingPrograms[x]);
    

  }

  onUpdate()
  {
    if(this.EditForm.get('CalenderTypeRange').value)
    {
      this.EditForm.get('CalenderTypeRange').setValue('Date Range');
    }
    else
    {
      this.EditForm.get('CalenderTypeRange').setValue('');
    }
    if(this.EditForm.get('CalenderTypeSingle').value)
    {
      this.EditForm.get('CalenderTypeSingle').setValue('Single Date');
    }
    else
    {
      this.EditForm.get('CalenderTypeSingle').setValue('');
    }
    
    //this.AddingPrograms[this.CurrentEditRow] = this.EditForm.value;
    let user;
    this.programs.filter(s=> s.title == this.EditForm.get('ProgramName').value).forEach(s=> this.Program=(s['programId']));
    this.accesiblePerson.filter(x=>x.id==this.EditForm.get('PersonName').value).forEach(x=>user=x.name);
    this.AddingPrograms[this.CurrentEditRow]["ActivityAccessType"]=this.EditForm.get('ActivityAccessType').value;
    this.AddingPrograms[this.CurrentEditRow]["ProgramName"]=this.EditForm.get('ProgramName').value;
    this.AddingPrograms[this.CurrentEditRow]["PersonId"]=this.EditForm.get('PersonName').value;
    this.AddingPrograms[this.CurrentEditRow]["PersonName"]=user;
    
    this.AddingPrograms[this.CurrentEditRow]["ProgramID"]=Number(this.Program);
    if(this.EditForm.get('CalenderTypeRange').value=="Date Range"){
      this.AddingPrograms[this.CurrentEditRow]["CalenderType"]=this.EditForm.get('CalenderTypeRange').value 
    }
    if(this.EditForm.get('CalenderTypeSingle').value=="Single Date"){
      this.AddingPrograms[this.CurrentEditRow]["CalenderType"]=this.EditForm.get('CalenderTypeSingle').value
    }
    
    console.log(this.AddingPrograms[this.CurrentEditRow]);
    
  }

  Delete(x)
  {
    var delBtn = confirm(" Do you want to delete ?");
  if ( delBtn == true ) {
    this.AddingPrograms.splice(x, 1 );
  } 
    
  }

  View(x)
  {
    this.ViewPrograms[0] = this.AddingPrograms[x];
  }

  ActivityName(filterVal: number)
  {
    this.ShowSecondTogle=true;
    this.defineActivities.filter(s=> s.activityId == filterVal).forEach(s=> this.Activity=(s['name']))
    this.ActivityID = filterVal;   
  }

  CenterName(filterVal: any)
  {
        this.Center = filterVal;       
  }

  ProgramName(filterVal: number)
  {
        this.Program = filterVal;
        
  }

  PersonName(filterVal: any)
  {
        this.Person = filterVal;
  }

  FacultyName(filterVal: any){
  }

  DepartmentName(filterVal: any){
  }

  DesignationName(filterVal: any){

  }

}
