import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InitialApplicant } from 'src/app/make-payment/Models/PendingPayment';
import { StudentReRegistrationService } from '../service/student-re-registration.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-re-registration-interface',
  templateUrl: './re-registration-interface.component.html',
  styleUrls: ['./re-registration-interface.component.css']
})
export class ReRegistrationInterfaceComponent implements OnInit {

  constructor(private toastr: ToastrService,private spinner: NgxSpinnerService, private router: Router,private api:StudentReRegistrationService) { }

programreregistration:any;

programstudentshipfilter= [];
show : boolean = false;
initialApplicant : InitialApplicant[] = new Array();
nic:string;
async ngOnInit(){
  this.spinner.show();
    if(sessionStorage.getItem("auth-user")){
      this.show = true;
      this.initialApplicant = JSON.parse(sessionStorage.getItem("auth-user"))['initialApplicant'];
      this.nic = JSON.parse(sessionStorage.getItem("auth-user"))['username'];
      console.log(this.nic,"username");

     await this.api.getuseralldata(this.nic).toPromise().then(res=>{this.programreregistration=res,
        console.log(this.programreregistration,"123")}).catch(a=>{console.log(a)});

    }

let item = this.programreregistration;

this.programreregistration.forEach(l => {
  let b:boolean =false;
  this.programstudentshipfilter.forEach(e => {
    if(l.programStarted.program.programId==e.programStarted.program.programId){
      b=true;
    }

    })
    if(!b){
    this.programstudentshipfilter.push(l);
  }
});

  console.log(this.programstudentshipfilter,"34");

    this.spinner.hide();
  }




  studentship(value){
    console.log(value);
    this.api.value=value;
    this.router.navigate(['Re_registration/'+value]);


  }

  courseselection(){
    this.router.navigate(['profile/courseSelection']);
  }

  counselling(id){
    this.router.navigate(['pick_counselling_time']);
  }

}
