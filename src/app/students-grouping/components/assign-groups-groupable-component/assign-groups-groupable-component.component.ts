import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AssignGroupsGroupableComponentServicesService } from '../../services/assign-groups-groupable-component-services.service'


@Component({
  selector: 'app-assign-groups-groupable-component',
  templateUrl: './assign-groups-groupable-component.component.html',
  styleUrls: ['./assign-groups-groupable-component.component.css']
})
export class AssignGroupsGroupableComponentComponent implements OnInit {
 
  message = ''
  programs: any;
  specializations: any;
  disciplines: any;
  streams: any;
  courses: any;
  centers: any;

  constructor(private api:AssignGroupsGroupableComponentServicesService, private router: Router) 
  { 
    this.getProgram()
  }

  ngOnInit(): void {

  }

  getProgram() {
    this.api.getProgramsService().subscribe(
      response => {
        console.log(response);
        this.programs = response;
      }
    )
  }

  getDataFromProgramService(id)
  {
    console.log(id)

    this.api.getSpecializationService(id).subscribe(
      response =>this.specializations = response
    )

    this.api.getDisciplineService(id).subscribe(
      response => this.disciplines = response
    )

    this.api.getStreamService(id).subscribe(
      response => this.streams = response
    )

    this.api.getCourseService().subscribe(
      response => this.courses = response
    )

    this.api.getCenterService().subscribe(
      response =>this.centers = response
    )

  }

  getMediumFromCourseService(id)
  {

  }



  form = new FormGroup({
    programme: new FormControl('', Validators.required),
    specialization: new FormControl('', Validators.required),
    course: new FormControl('', Validators.required),
    component: new FormControl('', Validators.required),
    center: new FormControl('', Validators.required)
  });

  get f(){
    return this.form.controls;
  }

  exit()
  {
    this.router.navigate(['student-group']);
  }

  submit1()
  {
    console.log(this.form.value)
  }


  dataGroupAndSettingsSearch: any;
  submit()
  {
    console.log(this.form.value)
    this.api.getGroupAndSettingData(this.form.value).subscribe(
      response => this.dataGroupAndSettingsSearch = response
    )
  }

  dataGroupAndSettings: any;
  getAllDBDataGroupAndSetting()
  {
    console.log(this.form.value)
    this.api.getAllDBGroupAndSettingData().subscribe(
      response => 
      {
        this.dataGroupAndSettings = response
      }   
    )   
  }
  getWeatherForecast() {
    return this.dataGroupAndSettings;
  }



  



  myConfirmData: { id: number, dateFrom: string, dateTo:string, timeFrom:string, timeTo:string }[] = [
  ];

  //this.myConfirmData[this.idValue] = this.form.value
  
  idFromDate:number
  dateFrom:any
  dateFromNumber:number
  
  @ViewChildren("box") boxes: QueryList<ElementRef>;
  @ViewChildren("boxTo") boxesTo: QueryList<ElementRef>;
  
  groupSettingsId = [];
  dateFromList = [];
  dateChangeFrom(index, id,value)
  {
    console.log(index)
    console.log(id)
    console.log(value)
    this.idFromDate = id
    this.dateFrom = value
    
    const idTBL = `${id}`;
    this.boxes.find(box => box.nativeElement.id === idTBL).nativeElement.value = ''
    this.boxesTo.find(boxTo => boxTo.nativeElement.id === idTBL).nativeElement.value = ''

    this.groupSettingsId[index] = id
    this.dateFromList[index] = value
    console.log(this.dateFromList)
    //this.listOfNames[index] =  value
    //console.log(this.myConfirmData)
    // this.confirmData[index].dateTo = value
    // this.confirmData[index].timeFrom = value
    // this.confirmData[index].timeTo = value

  }

  idToDate:number
  dateTo:any
  timeFromCom = ''
  dateToList = [];
  dateChangeTo(index,id,value)
  {
    console.log(index)
    console.log(id)
    console.log(value)
    this.idToDate = id
    this.dateTo = value

    const idTBL = `${id}`;
    this.boxes.find(box => box.nativeElement.id === idTBL).nativeElement.value = ''
    this.boxesTo.find(boxTo => boxTo.nativeElement.id === idTBL).nativeElement.value = ''

    this.dateToList[index] = value
    console.log(this.dateToList)
  }

  
  idFromTime:number
  timeFrom:any
  timeFromNumber:number
  timeFromList = [];
  timeChangeFrom(index,id,value)
  {
    console.log(index)
    console.log(id)
    console.log(value)
    this.idFromTime = id
    this.timeFrom = value
  
    this.timeFromList[index] = value
    console.log(this.timeFromList)

    
    this.api.getAllDBGroupAndSettingData().subscribe(
      response => 
      {
          let dataGroupAndSettings = response
          console.log(dataGroupAndSettings)

          for(let i = 0; i < dataGroupAndSettings.length; i++)
          {
              if(id == dataGroupAndSettings[i].id)
              {
                  continue;
              }
              else
              {
                  var a = false
                  var b = false
                  var b1 = false
                  var c = false
                  
                  var course = this.form.value.course
                  var component = this.form.value.component
                  var center = this.form.value.center

                  var dbCourse = dataGroupAndSettings[i].createGroup.course
                  //var dbComponent = dataGroupAndSettings[i].createGroup.component
                  var dbComponent = 530;
                  var dbCenter = dataGroupAndSettings[i].createGroup.center
                  var a = this.checkBasicCondition(course, dbCourse, component, dbComponent, center, dbCenter)
                  
                  
                  if(this.dateFrom != null && dataGroupAndSettings[i].dateFrom != null && dataGroupAndSettings[i].dateTo != null)
                  {
                    b = this.checkDate(this.dateFrom, dataGroupAndSettings[i].dateFrom, dataGroupAndSettings[i].dateTo)
                    console.log("111111bbbbbbbbb"+b);
                  }
                  

                  if(this.dateFrom != null && dataGroupAndSettings[i].dateFrom != null && dataGroupAndSettings[i].dateTo != null)
                  {
                    b1 = this.checkDate(this.dateTo, dataGroupAndSettings[i].dateFrom, dataGroupAndSettings[i].dateTo)
                    console.log("bbbbbbbbb"+b1);
                  }
                  

                  if(value != null && dataGroupAndSettings[i].timeFrom != null && dataGroupAndSettings[i].timeTo != null)
                  {
                    c = this.checkTime(value, dataGroupAndSettings[i].timeFrom, dataGroupAndSettings[i].timeTo)
                  
                  }


                  console.log(a);
                  console.log(b);
                  console.log(b1);
                  console.log(c);

                  if(a && (b||b1) && c)
                  {
                    this.message = "WARNING FOR CLASHES IN SCHEDULE";
                    document.getElementById("error").click();
                    break;
                  }
                  else
                  {

                  }

                  
              }
              
          }
      }   
    )

  }

  idToTime:number
  timeTo:any
  timeToNumber:number
  timeToList = [];
  timeChangeTo(index,id,value)
  {
    console.log(index)
    console.log(id)
    console.log(value)
    this.idToTime = id
    this.timeTo = value

    this.timeToList[index] = value
    console.log(this.timeToList)

  }


  checkDate(dateValueCheck,dbDateValueFrom,dbDateValueTo)
  {
    var checkDate = dateValueCheck
    var d1 = checkDate.split("-")
    var checkDateNumber = new Date(d1[0], parseInt(d1[1])-1, d1[2])

    var checkDateFrom = dbDateValueFrom
    var d2 = checkDateFrom.split("-")
    var DateNumberFromDB = new Date(d2[0], parseInt(d2[1])-1, d2[2])

    var checkDateTo = dbDateValueTo
    var d3 = checkDateTo.split("-")
    var DateNumberToDB = new Date(d3[0], parseInt(d3[1])-1, d3[2])

    if(checkDateNumber > DateNumberFromDB && checkDateNumber < DateNumberToDB)
    {
      return true;
    }
    else{
      return false;
    }
  }


  checkTime(timeValueCheck,dbTimeValueFrom,dbTimeValueTo)
  {
    var timeCheck = timeValueCheck
    var t1 = timeCheck.split(":");
    var timeNumber = ( ((Number(t1[0])) * 60) + Number(t1[1]) )

    var dbTimeFrom = dbTimeValueFrom
    var t2 = dbTimeFrom.split(":");
    var dbTimeFromNumber = ( ((Number(t2[0])) * 60) + Number(t2[1]) )

    var dbTimeTo = dbTimeValueTo
    var t2 = dbTimeTo.split(":");
    var dbTimeToNumber = ( ((Number(t2[0])) * 60) + Number(t2[1]) )

    if(timeNumber > dbTimeFromNumber && timeNumber < dbTimeToNumber)
    {
      return true;
    }
    else{
      return false;
    }
  }

  checkBasicCondition(course, dbCourse, component, dbComponent, center, dbCenter)
  {
    
    if(course == dbCourse)
    {
        if(component != dbComponent)
        {
            if(center == dbCenter)
            {
                return true;
            }
            else
            {
                return false;
            }
          
        }
        else
        {
            return false;
        }
      
    }
    else
    {
        if(center == dbCenter)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
  }




  saveConfirmData()
  {
    this.message = "Do you want to confirmed data which are entered on the table";
    document.getElementById("success").click();  
  }


  
  confirmData = 
  {
    groupSettingsId: '',
    dateFrom: '',
    dateTo:'',
    timeFrom:'',
    timeTo:''
  }
  confirmDataObjectArray = []
  confirmDataSentToDB()
  {
    for (let i = 0; i < this.groupSettingsId.length; i++) 
    {
      this.confirmData.groupSettingsId = this.groupSettingsId[i]
      this.confirmData.dateFrom = this.dateFromList[i]
      this.confirmData.dateTo = this.dateToList[i]
      this.confirmData.timeFrom = this.timeFromList[i]
      this.confirmData.timeTo = this.timeToList[i]

      this.confirmDataObjectArray.push(this.confirmData)
      console.log(this.confirmData)
      
      this.confirmData = 
      {
        groupSettingsId: '',
        dateFrom: '',
        dateTo:'',
        timeFrom:'',
        timeTo:''
      }
    }
    console.log(this.confirmDataObjectArray)
    this.confirmDataObjectArray = []
  }

}
