import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivityPrograms,defineActivity,rgmCenters,activityDateType,activityPrograms,rgmCenterType } from '../../Modal/ActivityPrograms';
import {DefineActivityService} from '../../Service/define-activity.service';
import {DefineAcademicCentersService} from '../../Service/define-academic-centers.service';
import {SchedulingComService } from '../../Service/scheduling-dop.service';
import { ToastrService } from 'ngx-toastr';
import { AddPrograms } from '../../Modal/AddPrograms';
import {Academic} from '../../Modal/summary';
import * as moment from 'moment';
import { KEY_CODE } from '../scheduling-dop/scheduling-dop.component';


import {SummaryService} from '../../Service/summary.service';
import { ProgrammeSelectionForDetailPageComponent } from 'src/app/programme-selection-for-detail-page/programme-selection-for-detail-page.component';
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

r_id:number;
  show = false;
  Schedulecodes:any;
  AddingAcademic:[];
  Type="";
root_center=[];
Conducting="";
Medium=[];
programid:number;
programentranid:number;
cenetrname=[];
 rightFunctionValue: number;
 programshdulecode:any;
 limit:number =0;
 Centers:any;
 Center:[];
 program:[];
 public FilterDateStudentShip;
 public FilterDateLastDateStudentShip;
 signActivity: string = 'plus';
  signMedium:string='plus';
  signCenters:string='plus';
  signCapacity:string='plus';
  signProgram: string = 'plus';

  selectedCentersValue:any;
  Filter:boolean=false;
  Entries = ['5','10','15','20'];
  End: any;
examcenter:any;
  forProgramActive="";
  isForSelected=true;
  public date = moment();
  public centerdate = moment();
  public dateForm: FormGroup;
  public CenterdateForm: FormGroup;
  public daysArr;
  public CenterdaysArr;

  AddingPrograms :[];


  



  constructor(private getData:SummaryService ,private toastr: ToastrService,private fb: FormBuilder) 
  {
    
    this.initDateRange();  
   
    this.selectedProgramDate(moment('2020-11-10'));
    this.selectedProgramDate(moment('2020-11-19'));
    this.isProgramSelected(moment('2020-11-10'));
    this.isProgramSelected(moment('2020-11-19'));
   
  }
  public ngOnInit() {
    // throw new Error('Method not implemented.');
   this.programcode()



    this.daysArr = this.createCalendar(this.date);
    console.log(this.daysArr,"days",this.date);
    this.CenterdaysArr=this.createCenterCalendar(this.centerdate);
    console.log(this.daysArr);
    
  }



async programcode()
{

  let a= await this.getData.getprogramcode().toPromise();
    
     this.Schedulecodes=a;



}


async submitdata(value){
console.log(value);

  let b = await this.getData.getdata(value).toPromise();

  this.AddingAcademic=b;


  this.rootcenter(value);
this.programshdulecode=value;
 

}



async getcalenderdate(i){


  if(i==1){
    this.getActivityCenter(this.programshdulecode);

  }
if(i==2){
  this.getActivityProgram(this.programshdulecode);

}

}
async getActivityCenter(programcode){
this.rightFunctionValue=0;
  let a = await this.getData.getActivityCenter(programcode).toPromise();
  console.log(a,"details");
  
  let i = 0;
this.Centers =a.length;
this.Center=a;
  this.cenetrname=a[i]['rgmCenter']['cnt_description'];
this.show=true;

}

async getActivityProgram(programcode){
  
    let a = await this.getData.getActivityProgram(programcode).toPromise();
   
    this.show=false;
    this.program=a;
    console.log(a,programcode,"programshedulcode");
  
  }

async rootcenter(programcode){

  let a = await this.getData.getdatcenter(programcode).toPromise();


  this.Type=a['examCenterType']['description'];
  this.root_center=a['examRootCenter'];
  this.r_id=a['entranceExamRootCenterId'];
this.Conducting=a['isEntryExamMediumAndProgMediumEqual'];
this.Medium=a['examMediums'];
this.programid=a['programStarted']['program']['programId'];
   
  console.log(this.programid);
  this.getcenter(this.r_id);

  console.log(this.root_center,"root center");
  
}
getcenter(r_id){
  this.getData.getexamcenter(r_id).subscribe(res=>{this.examcenter=res
    console.log(res,"root");
    });

}

async submitrootdata(value){
console.log(value,"paas");

// this.programStarted.filter(x=>x.programScheduleCode==value).forEach(x=>this.ProgramID=x.program['programId'])

  let a = await this.getData.getentranceCapacity(this.programshdulecode).toPromise();
  let b
   a.filter(x=>x['entranceExamCenter']['examRootCenter']['id']==value);
   console.log(a.filter(x=>x['entranceExamCenter']['examRootCenter']['id']==value),"filter");
   
  // if(value=a['entranceExamCenter']['examRootCenter']['id'])
  {
  this.AddingPrograms = a.filter(x=>x['entranceExamCenter']['examRootCenter']['id']==value);
  console.log(a,"rootcenter--");
}


}


RightFunction(){
  if(this.rightFunctionValue<this.Centers-1){
    this.rightFunctionValue++;
    this.cenetrname=this.Center[this.rightFunctionValue]['rgmCenter']['cnt_description'];
  }

  
  
}

LeftFunction(){
  if(this.rightFunctionValue>0){
    this.rightFunctionValue--;
    this.cenetrname=this.Center[this.rightFunctionValue]['rgmCenter']['cnt_description'];
  }
 
 
}




public todayCheck(day){
  if(!day){
    return false;
  }
  return moment().format("L") === day.format("L");
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
  toggleSignMedium() 
  {
    
    if(this.signMedium == 'plus') 
    {
      this.signMedium = 'minus';
    } else 
    {
      this.signMedium = 'plus';
    }
  }

  toggleSignCapacity(){
    if(this.signCapacity == 'plus') 
    {
      this.signCapacity = 'minus';
    } else 
    {
      this.signCapacity = 'plus';
    }
  }
  toggleSignCenters(){
    if(this.signCenters == 'plus') 
    {
      this.signCenters = 'minus';
    } else 
    {
      this.signCenters = 'plus';
    }
  }
  toggleSignProgram() 
  {
    if(this.signProgram == 'plus') 
    {
      this.signProgram = 'minus';
    } else 
    {
      this.signProgram = 'plus';
    }
  }

  SearchFunction()
  {
      this.Filter=true;
  }




  EntryPrograms(filterVal: any)
  {
    this.End = filterVal;
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



UpFunctionCenter()
{

}
// this.Active(this.SetCenterValue);  


DownFunctionCenter()
{


//this.Active(this.SetCenterValue);
}


public initDateRange() {
  return (this.dateForm = this.fb.group({
    ProgramdateFrom: [null, Validators.required],
    ProgramdateTo: [null, Validators.required],
    
  }));

}



public selectedProgramDate(day) {
  let dayFormatted = day.format('YYYY-MM-DD');
    this.isForSelected=true; 
    if (this.dateForm.valid)
    { 
     
      
        this.dateForm.setValue({ ProgramdateFrom: null, ProgramdateTo: null });
        return;
      

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
  




}
