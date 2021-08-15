import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { SendNotificationProgramCourseService } from "../../services/send-notification-program-course.service";

@Component({
  selector: 'app-send-notification-program-course',
  templateUrl: './send-notification-program-course.component.html',
  styleUrls: ['./send-notification-program-course.component.css']
})
export class SendNotificationProgramCourseComponent implements OnInit {
  programStarted=[];
  levels=[];
  finalArray=[];
  courses=[];
  programId:number;
  show=false;
  disableLevel=true;
  disableCourse=true;
  disableProgram=false;
  disableButton=true;
  showFilterCode=true;
  showDiv=false;
  coursesCode=[];
  forFilter=[];
  codes=[];
  codeValue='';
  data:any;
  isSearchingForAllStudents:boolean = false;
  isSelectAllChecked:boolean = false;
  selectedApplicantIds:any [] = [];
  selectedApplicants:any[] = [];
  notification:boolean = false;
  email:boolean = false;
  sms:boolean = false;
  notificationLength = 254;
  emailLength = 1000;
  smsLength = 254;
  messageToStudent= "";
  maxLength = 0;
  contactAll = {
    initialApplicantIds : [],
    message : ""
  };
  errorMessage = "";
  successMessage = "";

  constructor(private spinner: NgxSpinnerService,private service: SendNotificationProgramCourseService) { }

  ngOnInit(): void {
    //this.getProgramStarted();
    this.showFilterCode=true;
  }

  searchForm=new FormGroup({
    program:new FormControl(''),
    level:new FormControl(''),
    course:new FormControl(''),
    courseCode:new FormControl('')
  });

  getProgramStarted(){
    this.spinner.show();
    this.service.getProgramStarted().toPromise()
    .then(res=>{
      console.log(res, "Program");
      this.programStarted=res;
      this.spinner.hide();
    })
    .catch(e=>{
      console.log(e);
      this.spinner.hide();
    });
  }

  onCode(event: any,value){

    this.codes=[];
    if(value!=''){
      this.service.filterByCode(value).toPromise()
      .then(res=>{
        this.forFilter=res;
        for(var i=0;i<this.forFilter.length;i++){
          this.codes.push({
            "code":this.forFilter[i].code,
            "id":this.forFilter[i].id
          });
        }

      })
      .catch(e=>{
        console.log(e);

      })
      this.showDiv=true;
    }

  }

  selectApplicant(val, checked){
    console.log(val);

    if(checked){
      var index = this.selectedApplicantIds.indexOf(val);
      if(index == -1){
        this.selectedApplicantIds.push(val);
      }
      for(let a of this.finalArray){
        if(a.regNumber == val){
          this.selectedApplicants.push(a);
        }
      }

    }
    else{
      var index = this.selectedApplicantIds.indexOf(val);
      this.selectedApplicantIds.splice(index,1);

      for(let a of this.finalArray){
        if(a.regNumber == val){
          var index2 = this.selectedApplicants.indexOf(a);
          this.selectedApplicants.splice(index2,1);
        }
      }

    }
  }

  selectAll(val, checked){
    this.selectedApplicants = [];
    if(checked){
      this.isSelectAllChecked = true;
      for(let fa of this.finalArray){
        if(document.getElementById("checkbox"+fa.regNumber)as HTMLInputElement){
          (document.getElementById("checkbox"+fa.regNumber)as HTMLInputElement).checked = true;
          (document.getElementById("checkbox"+fa.regNumber)as HTMLInputElement).disabled = true;
        }
        var index = this.selectedApplicantIds.indexOf(fa.regNumber);
        if(index == -1){
          this.selectedApplicantIds.push(fa.regNumber);
        }
      }
    }
    else{
      this.isSelectAllChecked = false;
      for(let fa of this.finalArray){
        if(document.getElementById("checkbox"+fa.regNumber)as HTMLInputElement){
          (document.getElementById("checkbox"+fa.regNumber)as HTMLInputElement).checked = false;
          (document.getElementById("checkbox"+fa.regNumber)as HTMLInputElement).disabled = false;
        }
        this.selectedApplicantIds = [];
      }
    }
  }

  selectMethod(val){
    this.messageToStudent = "";
    if(val == "Noti"){
      this.notification = true;
      this.email = false;
      this.sms = false;
      this.maxLength = this.notificationLength;
    }
    if(val == "email"){
      this.notification = false;
      this.email = true;
      this.sms = false;
      this.maxLength = this.emailLength;
    }
    if(val == "sms"){
      this.notification = false;
      this.email = false;
      this.sms = true;
      this.maxLength = this.smsLength;
    }
  }

  sendMessage(){
    if(this.notification){
      this.sendNotiToAll();
    }
    if(this.sms){
      this.sendSMSToAll();
    }
    if(this.email){
      this.sendEmailToAll();
    }
  }

  async getByCourse(){
    this.finalArray = [];
    this.selectedApplicants = [];
    this.selectedApplicantIds = [];
    this.notification = false;
    this.email = false;
    this.sms = false;
    this.spinner.show();
    await this.service.getDetailsByCourse(this.data).toPromise()
    .then(res=>{
      this.finalArray=res;
      this.spinner.hide();
    })
    .catch(e=>{
      console.log(e);
      this.spinner.hide();
    });
    this.show=true;
  }

 async codeSelect(value){
    this.codeValue=value;
    this.showDiv=false;
    this.disableProgram=true;
    let codeId;
    this.codes.filter(x=>x.code==this.codeValue).forEach(x=>codeId=x.id);
    this.data={
      "courseId":codeId
    }
    await this.getByCourse();
  }

  onClickedOutside(){
    this.showDiv=false;
  }

  async getLevels(){
    this.spinner.show();
    await this.service.getLevels(this.programId).toPromise()
    .then(res=>{
      this.levels=res;
      this.spinner.hide();
    })
    .catch(e=>{
      console.log(e);
      this.spinner.hide();
    });
  }

  async getDetails(){
    this.finalArray = [];
    this.selectedApplicants = [];
    this.selectedApplicantIds = [];
    this.notification = false;
    this.email = false;
    this.sms = false;
    this.spinner.show();
    await this.service.getDetails(this.searchForm.get('program').value).toPromise()
    .then(res=>{
      this.finalArray=res;
      this.spinner.hide();
    })
    .catch(e=>{
      console.log(e);
      this.spinner.hide();
    });
    this.show=true;
  }

  async getCourse(){
    this.spinner.show();
    await this.service.getCourses(this.programId,this.searchForm.get('level').value).toPromise()
    .then(res=>{
      this.courses=res;
      this.spinner.hide();
    })
    .catch(e=>{
      console.log(e);
      this.spinner.hide();
    });
  }

  selectType(val){
    this.finalArray = [];
    this.selectedApplicants = [];
    this.selectedApplicantIds = [];
    this.notification = false;
    this.email = false;
    this.sms = false;
    this.getProgramStarted();
    if(val == "All"){
      this.isSearchingForAllStudents = true;
    }else{
      this.isSearchingForAllStudents = false;
    }
  }

  async getAll(val){
    this.finalArray = [];
    this.selectedApplicants = [];
    this.selectedApplicantIds = [];
    this.notification = false;
    this.email = false;
    this.sms = false;
    this.spinner.show();
    await this.service.getAll(val).toPromise()
    .then(res=>{
      this.finalArray=res;
      this.spinner.hide();
    })
    .catch(e=>{
      console.log(e);
      this.spinner.hide();
    });
  }

  async onProgramme(val){
    this.levels = [];
    this.courses = [];
    this.programStarted.filter(x=>x.programStartedId==this.searchForm.get('program').value).forEach(x=>this.programId=x.program.programId);
    this.searchForm.get('course').setValue("");
    this.searchForm.get('level').setValue("");
    await this.getLevels();
    if(this.searchForm.get('program').value!=""){
      this.disableLevel=false;
      this.disableButton=false;
      this.showFilterCode=false;
    }
    else{
      this.disableLevel=true;
      this.disableButton=true;
      this.showFilterCode=true;
      this.codeValue='';
      this.finalArray=[];
    }
    if(!this.isSearchingForAllStudents){
    this.getDetails();
    }
    else{
      this.getAll(val);
    }
  }

  async onLevel(){
    await this.getCourse();
    this.searchForm.get('course').setValue("");
    if(this.searchForm.get('program').value!=""&&this.searchForm.get('level').value!=""){
      this.disableCourse=false;
    }
    else{
      this.disableCourse=true;
    }
    this.data={
      "programStartedId":this.searchForm.get('program').value,
      "level":this.searchForm.get('level').value
    }
    await this.getByCourse();
  }

  async onCourse(){
    this.data={
      "programStartedId":this.searchForm.get('program').value,
      "level":this.searchForm.get('level').value,
      "courseId":this.searchForm.get('course').value
    }
    await this.getByCourse();
  }

  onSearch(){
    window.location.reload()
  }

  sendSMSToAll(){
    console.log(this.messageToStudent);
    this.spinner.show();
    this.contactAll.initialApplicantIds = [];
    for(let a of this.selectedApplicantIds){
      this.contactAll.initialApplicantIds.push(a);
    }
    this.contactAll.message = this.messageToStudent;
    this.service.sendSMSAll(this.contactAll)
      .subscribe(res => {
        console.log(res);
        this.spinner.hide();
        this.successMessage = "SMSs sent successfully!";
        document.getElementById("sucModal").click();

      }, (err) => {
        this.spinner.hide();
        this.errorMessage = err.error.message;
        document.getElementById("openModal").click();
        console.log(err);
      });
  }

  sendNotiToAll(){
    console.log(this.messageToStudent);
    this.spinner.show();
    this.contactAll.initialApplicantIds = [];
    for(let a of this.selectedApplicantIds){
      this.contactAll.initialApplicantIds.push(a);
    }
    this.contactAll.message = this.messageToStudent;
    this.service.sendNotiAll(this.contactAll)
      .subscribe(res => {
        console.log(res);
        this.spinner.hide();
        this.successMessage = "Notifications created successfully!";
        document.getElementById("sucModal").click();

      }, (err) => {
        this.spinner.hide();
        this.errorMessage = err.error.message;
        document.getElementById("openModal").click();
        console.log(err);
      });
  }

  sendEmailToAll(){
    console.log(this.messageToStudent);
    this.spinner.show();
    this.contactAll.initialApplicantIds = [];
    for(let a of this.selectedApplicantIds){
      this.contactAll.initialApplicantIds.push(a);
    }
    this.contactAll.message = this.messageToStudent;
    this.service.sendEmailAll(this.contactAll)
      .subscribe(res => {
        console.log(res);
        this.spinner.hide();
        this.successMessage = "Emails sent successfully!";
        document.getElementById("sucModal").click();

      }, (err) => {
        this.spinner.hide();
        this.errorMessage = err.error.message;
        document.getElementById("openModal").click();
        console.log(err);
      });
  }

}
