import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { SearchapplicationService } from 'src/app/Search Application/Service/searchapplication.service';
import { InitialApplicant } from '../../../make-payment/Models/PendingPayment';
import { ProgramCancelService } from '../../Service/program-cancel.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-program-cancel',
  templateUrl: './program-cancel.component.html',
  styleUrls: ['./program-cancel.component.css']
})
export class ProgramCancelComponent implements OnInit {

  options : string [] = ['NIC / Passport', 'Applicant ID']
  searchPlaceHolder : string;
  searchApplicant : InitialApplicant[] = new Array();
  indexCancel;
  refundableAmount:number = 0;
  refundedAmounts:any[] =[];

  constructor(private applicantServ : SearchapplicationService, private progCanSer : ProgramCancelService, private spinner: NgxSpinnerService, private toastr:ToastrService) { }

  searchGroup = new FormGroup({
    searchBy: new FormControl('',[Validators.required]),
    searchInput : new FormControl('', [Validators.required])
 });

  ngOnInit(): void {

  }

  selectSearchOption(option){
    this.searchPlaceHolder = this.searchGroup.get('searchBy').value;
  }

  search(){
    this.indexCancel = -1;
    if(this.searchGroup.get('searchInput').invalid){
      document.getElementById("searchInput").className = document.getElementById("searchInput").className + " error";
    }else{
      document.getElementById("searchInput").className = document.getElementById("searchInput").className.replace(" error", "");
    }

    if(this.searchGroup.get('searchBy').invalid){
      document.getElementById("searchBy").className = document.getElementById("searchBy").className + " error";
    }else{
      document.getElementById("searchBy").className = document.getElementById("searchBy").className.replace(" error", "");
    }

    if(this.searchGroup.valid){
      this.spinner.show();
      if(this.searchPlaceHolder == this.options[0]){
        this.applicantServ.getInitialapplicantList(this.searchGroup.get('searchInput').value)
        .subscribe(s=>{
          this.spinner.hide();
          if(s.length > 0){
            this.searchApplicant = s;
            for(let i = 0 ; i < this.searchApplicant.length ; i++){
              this.displayTotalRefundableAmount(this.searchApplicant[i].id);
              this.searchApplicant[i].disabled = false;
              this.progCanSer.getInfp(this.searchApplicant[i].id).subscribe(r=>{
                this.searchApplicant[i].info = r.status;
              })
            }
          } else {
            this.searchApplicant = [];
            this.toastr.error("Searched NIC "+this.searchGroup.get('searchInput').value+" Not Found","Applicant Not Found");
            this.applicantServ.getInitialapplicantListByPassport(this.searchGroup.get('searchInput').value)
            .subscribe(s=>{
              this.spinner.hide();
              if(s.length > 0){
                this.searchApplicant = s;
                for(let i = 0 ; i < this.searchApplicant.length ; i++){
                  this.displayTotalRefundableAmount(this.searchApplicant[i].id);
                  this.searchApplicant[i].disabled = false;
                  this.progCanSer.getInfp(this.searchApplicant[i].id).subscribe(r=>{
                    this.searchApplicant[i].info = r.status;
                  })
                }
              } else {
                this.searchApplicant = [];
                this.toastr.error("Searched Passport "+this.searchGroup.get('searchInput').value+" Not Found","Applicant Not Found")
              }
            })
          }
        })

      }
      if(this.searchPlaceHolder == this.options[1]){
        this.progCanSer.getByinitialApplicantID(this.searchGroup.get('searchInput').value).subscribe(s=>{
          this.spinner.hide()
          if(s){
            this.searchApplicant = [];
            this.searchApplicant.push(s)
            for(let i = 0 ; i < this.searchApplicant.length ; i++){
              this.displayTotalRefundableAmount(this.searchApplicant[i].id);
              this.searchApplicant[i].disabled = false;
              this.progCanSer.getInfp(this.searchApplicant[i].id).subscribe(r=>{
                this.searchApplicant[i].info = r.status;
              })
            }
          }else{
            this.searchApplicant = [];
            this.toastr.error("Searched Applicant ID "+this.searchGroup.get('searchInput').value+" Not Found","Applicant Not Found")
          }

        })
      }
    }

  }

  cancel(InitialApplicant,i){
    this.displayTotalRefundableAmountOnClick(this.searchApplicant[i].id)
    this.indexCancel = i;
    document.getElementById("openModalExemption").click();


  }

  confirmedByUser(){
    this.spinner.show();
    this.searchApplicant[this.indexCancel].disabled = true;
    let employeeName = localStorage.getItem('nic');
    this.progCanSer.cancelProgram(this.searchApplicant[this.indexCancel].id,employeeName).subscribe(s=>{
      this.toastr.info(s.status,"Program Cancel")
      this.spinner.hide();
      this.search()
    })
  }

  displayTotalRefundableAmount(id) {
    this.spinner.show();
    this.progCanSer.displayTotalRefundableAmount(id)
      .subscribe(
        response => {
          console.log(response);
          this.refundableAmount = response;
          var x = {
            applicantId:id,
            amount:this.refundableAmount
          }
          var isAvailable = false;
          for(let ra of this.refundedAmounts){
            if(ra.applicantId == id){
              isAvailable = true;
            }
          }
          if(!isAvailable){
          this.refundedAmounts.push(x);
          }
          else{
            for(let ra of this.refundedAmounts){
              if(ra.applicantId == id){
                ra.amount = response;
              }
            }
          }
          this.spinner.hide();
        },
        error => {
          this.spinner.hide();
          console.log(error);
        });
  }

  displayTotalRefundableAmountOnClick(id) {
    this.refundableAmount = 0;
    this.spinner.show();
    this.progCanSer.displayTotalRefundableAmountOnClick(id)
      .subscribe(
        response => {
          console.log(response);
          this.refundableAmount = response;
          this.spinner.hide();
        },
        error => {
          this.spinner.hide();
          console.log(error);
        });
  }

}
