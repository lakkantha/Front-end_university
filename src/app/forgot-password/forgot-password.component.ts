import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { ForgotPasswordService } from '../_services/forgot-password.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NavbarShowHideService } from '../_services/navbar-show-hide.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  form = {
    email: "",
    username: "",
    status:"xx"
  };
  spinnerOn = false;
  data = {
    email: "",
    username: "",
    status:""

  };
  errorMessage = '';
  successMessage = '';

  @ViewChild('emailWrong') emailWrong;
  @ViewChild('resetSuccessful') resetSuccessful;
  modalRef: BsModalRef;
  private _sharedService: any;
  constructor(
    private modalService: BsModalService,
    private fbService: ForgotPasswordService, private router: Router, public nav: NavbarShowHideService) { }

  ngOnInit(): void {
    this.nav.hide();
  }

  clickCheckBox(val){
    if(val == "byEmail"){
      this.form.status = "byEmail"
      this.data.status = "byEmail";
    }
  }

  clickCheckBox1(val){
    if(val == "byPhone"){
      this.form.status = "byPhone"
      this.data.status = "byPhone";
    }
  }


  onFormSubmit(data) {
    this.nav.hide();
    console.log(data.status)
    if(data.status == "xx"){
      this.errorMessage = "Please, choose either 'Using my email' or 'Using my mobile'!";
      document.getElementById("openModal").click();
    }
    else{
      this.spinnerOn= true;
      this.fbService.addForgotPassword(data)
      .subscribe(res => {
        this.spinnerOn = false;
        if(data.status == "byPhone"){
          this.successMessage = "The new password has been sent to your email and mobile number! Click Ok and enter your username and new password to continue";
          document.getElementById("sucModal").click();
          // this.OpenSuccess(this.resetSuccessful);
        }
        else{
          this.router.navigate(['fpsuccess']);
        }
      }, (err) => {
        this.spinnerOn = false;
        this.errorMessage = err.error.message;;
        document.getElementById("openModal").click();
          // this.Open(this.emailWrong);
          console.log(this.errorMessage);
      });
        setTimeout(() => {
        this._sharedService.showSpinner = false;
        }, 5000);

    }



  }


  Open(emailWrong: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      emailWrong,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  OpenSuccess(resetSuccessful: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      resetSuccessful,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
}
