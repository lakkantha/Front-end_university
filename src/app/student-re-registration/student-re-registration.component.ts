import { Component, OnInit } from '@angular/core';
import {StudentReRegistrationService} from './service/student-re-registration.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { EmmitterServiceService } from '../_services/services/emmitter-service.service';



declare function  yeardate():any;
@Component({
  selector: 'app-student-re-registration',
  templateUrl: './student-re-registration.component.html',
  styleUrls: ['./student-re-registration.component.css'],
  providers: [DatePipe]

})
export class StudentReRegistrationComponent implements OnInit {
  initialApplicant: any;
  comingId:number = 0;
  nic:any;
  tableData:any [] = [];
  errorMessage: string;
  attentionMessage:string;
  constructor(private toastr: ToastrService,private spinner: NgxSpinnerService,private api: StudentReRegistrationService , private router:Router,private datePipe: DatePipe, private route: ActivatedRoute, private tokenStorageService: TokenStorageService, private emitterService: EmmitterServiceService) { }
    year='';
    yearnow='';
    initialstudentid:number;
    initialapplicantid:number;
    amount=0;
    today: String;
    studentshipfilter:any;
    academicYearId: number = 0;
    academicYeat:string = "";
  async ngOnInit() {
    this.spinner.show();
    this.route.params.subscribe(params => this.comingId = Number(params.initialApplicantId));
    yeardate();
      this.today=this.datePipe.transform(Date.now(),'yyyy-MM-dd');

        const user = this.tokenStorageService.getUser();
        console.log(user,"user");
        this.nic = JSON.parse(sessionStorage.getItem("auth-user"))['username'];
        for(let i of user.initialApplicant){
          if(i.id == this.comingId){
            this.initialApplicant = i;
          }
        }


      await this.api.getalldata(this.initialApplicant.id).toPromise().then(res=>{
        this.spinner.hide();
        this.studentshipfilter = res;
        let x:boolean = false;
        for(let s of this.studentshipfilter){
          x = true;
          if(s.programApplicableFee){
            let x = {
              academicYear: s.academicYear.year,
              amount: s.programApplicableFee.amount,
              Description: "Studentship fee"
            };

            this.tableData.push(x);
            this.academicYearId = s.academicYear.id;
            this.academicYeat = s.academicYear.year;
          }
        }
        console.log(this.studentshipfilter,"lk");
        if(x){
          this.hasRegisteredForCourses();
        }

      }).catch(a=>{console.log(a);
        this.spinner.hide();});

      for(let i=0 ;i<(this.studentshipfilter.length-1);i++){
        console.log(i,"0000000");
          this.year+= this.studentshipfilter[i]['academicYear']['year'];
        }

      for(let i=0 ;i<=this.studentshipfilter.length;i++){
        //this.amount+=Number(this.studentshipfilter[i]['programApplicableFee']['amount']);

        this.yearnow = this.studentshipfilter[i]['academicYear']['year'];
        console.log(this.amount);

      }

      //this.spinner.hide();
  }

  getDueAmount() {
    this.spinner.show();
    this.api.getDueAmount(this.initialApplicant.id)
      .subscribe(
        response => {
          console.log(response, "DUE    AMOUNT   ");
          this.spinner.hide();
          for (let s of response) {
            //if(s.dueAmount > 0){
              let x = {
                academicYear: "Prevoius",
                amount: s.dueAmount,
                Description: "Previous due amount"
              };
              this.tableData.push(x);
            //}
          }

          this.getLateFees();

        },
        error => {
          this.spinner.hide();
          this.getLateFees();
          console.log(error);
        });
  }

  getLateFees(){
    this.spinner.show();
    this.api.getLateFee(this.initialApplicant.id, this.academicYearId)
      .subscribe(
        response => {
          console.log(response, "LATE    FEE   ");
          this.spinner.hide();
          for (let s of response) {
            if(s.fee > 0){
              let x = {
                academicYear: s.academicYear,
                amount: s.fee,
                Description: "Late fee"
              };
              this.tableData.push(x);
            }
          }

          this.getTotalAmount();

        },
        error => {
          this.spinner.hide();
          this.errorMessage = error.error.message;
          document.getElementById("openModal").click();
          this.getTotalAmount();
          console.log(error);
        });
  }

  hasRegisteredForCourses(){
    this.spinner.show();
    this.api.hasRegisteredForCourses(this.initialApplicant.id, this.academicYearId)
      .subscribe(
        response => {
          this.getDueAmount();
          console.log(response);

        },
        error => {
          this.spinner.hide();
          //this.getTotalAmount();
          console.log(error);
          this.errorMessage = error.error.message;
          document.getElementById("openModal").click();
        });
  }

  getTotalAmount(){
    for(let t of this.tableData){
      this.amount += t.amount;
    }

    if(this.amount < 0){
      this.attentionMessage = "We settled your studentship fee for academic year " + this.academicYeat + " from your previous arrears (Minus arrears). So, you do not need to pay any amount to extend the studentship.";
    }
    if(this.amount == 0){
      this.attentionMessage = "The previous due amount will be settled by your total fee. So, you do not need to pay any amount to extend the studentship for academic year " + this.academicYeat + ".";
    }
    if(this.amount > 0){
      this.attentionMessage = "You need to pay " + this.amount + "(LKR) to extend the studentship for academic year " + this.academicYeat + ".";
    }
  }


  dataload(){
    this.spinner.show();
    this.initialapplicantid=this.initialApplicant.id;
    this.api.getinitalstudent(this.initialApplicant.id).subscribe(res=>{console.log(res),
      this.initialstudentid=res['id'];
      console.log(res, "INITIAL STUDENT");
      this.spinner.hide();
    },
    error => {
      this.spinner.hide();
      console.log(error);
    });

  }

  navigate(){
    this.router.navigate(['Re_registraton_interface']);

  }
 navigatepayment(){
    this.pendingpayment();
    //this.studentstatus();



  }

 async pendingpayment(){
  this.spinner.show();
    let object={
      initialStudent: this.initialApplicant.id,
      dueAmount: this.amount,
      dateToBe: new Date(),
      priority: 15,
      transactionId: 0,
      isPay:false,
      archived:0,
      currencyType:1,
      isMakePayment:false
    }


    await this.api.postpendingpayment(object).toPromise().then(res=>{console.log(res,"/////")
      if(this.amount > 0){
      this.router.navigate(['makePayment']);
      }
      else{
        this.router.navigate(['home']);
      }
      this.emitterService.broadcast({ content_type: 'updateSID' });
      this.spinner.hide();
      }).catch(e=>{console.log(e);
        this.spinner.hide();
        this.errorMessage = "Problem in creating the pending payment. Please contact payments@ousl.lk for more details.";
        document.getElementById("openModal").click();
      });

  }

 async studentstatus(){
  this.spinner.show();
    await this.api.studentstatus(this.initialapplicantid).toPromise().then(res=>{console.log(res,"??//");
    this.spinner.hide();
    }).catch(e=>{console.log(e);
      this.spinner.hide();
    });
    //this.spinner.show();
  }


}
