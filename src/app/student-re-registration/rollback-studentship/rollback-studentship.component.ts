import { Component, OnInit } from '@angular/core';
import {RollbackStudentshipService} from '../service/rollback-studentship.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
//import { TokenStorageService } from '../_services/token-storage.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rollback-studentship',
  templateUrl: './rollback-studentship.component.html',
  styleUrls: ['./rollback-studentship.component.css']
})
export class RollbackStudentshipComponent implements OnInit {

  programs: any [] = [];
  nic:string = '';
  successMessage:string = "";
  errorMessage:string = "";
  btnClicked:boolean = false;
  responseData:any[] =[];
  selectedProgramId:number = 0;

  postData = {
    initialApplicantId:0,
    registrationId:0,
    pendingPaymentId:0,
    nic:""
  }
  constructor(private toastr: ToastrService,private spinner: NgxSpinnerService,private api: RollbackStudentshipService , private router:Router,private datePipe: DatePipe, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.spinner.show();
    this.api.getPrograms()
      .subscribe(
        response => {
          console.log(response, "Programs ");
          for(let r of response){
            this.programs.push(r);
          }
          this.programs = this.programs.sort();
          console.log(this.programs, " Progams after adding");
          this.spinner.hide();
        },
        error => {
          this.spinner.hide();
          console.log(error);
        });
  }

  submit(){
    this.responseData = [];
    this.spinner.show();
    this.btnClicked = true;
    console.log(this.nic, "NIC");
    console.log(this.selectedProgramId, "Program Id");
    this.api.getData(this.nic, this.selectedProgramId)
      .subscribe(
        response => {
          console.log(response, "Data");
          for(let r of response){
            this.responseData.push(r);
          }
          //this.programs = this.programs.sort();
          console.log(this.responseData, " DATA after adding");
          this.spinner.hide();
        },
        error => {
          this.spinner.hide();
          console.log(error);
          this.errorMessage = error.error.message;
          document.getElementById("openModal").click();
        });
  }

  selectProgram(id){
    console.log(id);
    this.selectedProgramId = id;
  }

  finalCall(iniId, regId, penId){
    this.postData.initialApplicantId = iniId;
    this.postData.registrationId = regId;
    this.postData.pendingPaymentId = penId;
    this.postData.nic = this.nic;
    document.getElementById("sucModalx").click();
  }

  submitData(){
    this.spinner.show();
    this.api.setData(this.postData)
      .subscribe(
        response => {
          console.log(response, "Data");
          this.successMessage = "Success : Rollback is completed successfully!";
          this.spinner.hide();
          document.getElementById("sucModal").click();
        },
        error => {
          this.spinner.hide();
          console.log(error);
          this.errorMessage = error.error.message;
          document.getElementById("openModal").click();
        });

  }

}
