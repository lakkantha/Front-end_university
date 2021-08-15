import { Component, OnInit } from '@angular/core';
import { ExamRootCenterBindingEntranceExamCenterService } from "../../Service/exam-root-center-binding-entrance-exam-center.service";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { entranceExam,examRootCentre,entranceExamBinding } from "../../Modal/entranceExam";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-exam-root-center-binding-entrance-exam-center',
  templateUrl: './exam-root-center-binding-entrance-exam-center.component.html',
  styleUrls: ['./exam-root-center-binding-entrance-exam-center.component.css']
})
export class ExamRootCenterBindingEntranceExamCenterComponent implements OnInit {
  entranceExamCentre=new FormGroup({
    cntreName:new FormControl(''),
    address:new FormControl('')
  });
  entranceExamBinding= new FormGroup({
    entranceExamCentre:new FormControl(''),
    examRootCentre:new FormControl('')
  })
  entranceExamTable:entranceExam[];
  examRootCentre:examRootCentre[];
  entranceExamBindingArray:entranceExamBinding[];
  showBindingTable=false;
  constructor(private getData:ExamRootCenterBindingEntranceExamCenterService,private toastr: ToastrService)
  {
    this.getEntranceExam();
    this.getExamRootCentre();
  }

  ngOnInit(): void {
    
  }

  addNew(){
    let body={
        "address": this.entranceExamCentre.get('address').value,
        "centerName": this.entranceExamCentre.get('cntreName').value,
      }
    console.log(body);
    
    this.getData.createEntranceExam(body).toPromise().
  then(s => { this.toastr.success("Successfully Created!",s['message']);this.getEntranceExam();})
  .catch((s) => { this.toastr.error("Error", s['error']['message']); console.log(s);});
}

getEntranceExam(){
  this.getData.getEntranceExam().subscribe
  (res=>{
    this.entranceExamTable=res as entranceExam[];
    console.log(this.entranceExamTable,"getEntranceExam");
  })  
}

getExamRootCentre(){
  this.getData.getExamRootCentre().subscribe
  (res=>{
    this.examRootCentre=res as examRootCentre[];
  })
}

onChangeEntranceExam(value){
  console.log(value);
  this.getData.getEntranceExamBindingTable(value).subscribe
  (res=>{
    this.entranceExamBindingArray=res as entranceExamBinding[];
    console.log(this.entranceExamBindingArray,"a");
    
    if(this.entranceExamBindingArray.length>0){
      console.log(this.entranceExamBindingArray,"b");
      this.showBindingTable=true;
    }
    else{
      console.log(this.entranceExamBindingArray,"c");
      this.showBindingTable=false;
    }
  });  
}
  
submit(){
  let body={
    "entranceExamCenter": {
      "id": this.entranceExamBinding.get('entranceExamCentre').value
    },
    "examRootCenter": {
      "id": this.entranceExamBinding.get('examRootCentre').value 
    },
    "examRootCenterEntranceExamCenterPK":{
      "entranceExamCenterId":this.entranceExamBinding.get('entranceExamCentre').value,
      "examRootCenterId":this.entranceExamBinding.get('examRootCentre').value 
    }
  }
  console.log(body);
  
  this.getData.createEntranceExamBindingWithExamRootCenter(body).toPromise().
  then(s => { this.toastr.success(s['message']);this.onChangeEntranceExam(this.entranceExamBinding.get('examRootCentre').value )})
  .catch((s) => { this.toastr.error("Error", s['error']['message']); console.log(s);});
}
}
