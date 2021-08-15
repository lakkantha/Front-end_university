import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap, Params  } from '@angular/router';
import { AdminResetPasswordService } from '../_services/admin-reset-password.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NavbarShowHideService } from '../_services/navbar-show-hide.service';


@Component({
  selector: 'app-admin-reset-password-success',
  templateUrl: './admin-reset-password-success.component.html',
  styleUrls: ['./admin-reset-password-success.component.css']
})
export class AdminResetPasswordSuccessComponent implements OnInit {

  form: any = {};
  spinnerOn = false;
  data = {
    password: "",
    retypePassword: ""
  };
  errorMessage = '';
  successMessage = '';
  private _sharedService: any;
  private token: string;

  @ViewChild('password') password;
  @ViewChild('retypePassword') retypePassword;
  @ViewChild('passwordReset') passwordReset;
  @ViewChild('resetSuccessful') resetSuccessful;

  modalRef: BsModalRef;

  constructor(private router: Router, private reset: AdminResetPasswordService, private modalService: BsModalService, private activatedRoute: ActivatedRoute, public nav: NavbarShowHideService) { }

  ngOnInit(): void {
    this.nav.hide();
    this.activatedRoute.params.forEach((params: Params) => {
      this.token = params['token'];
      console.log(this.token);
  });

  this.activatedRoute.paramMap.subscribe(params => {
    this.token = params['token'];
    console.log(params);
  });

  console.log(this.activatedRoute.snapshot.params['token']);

  this.activatedRoute.queryParams.subscribe(params => {
    this.token = params['token'];
    console.log(params['token']);
  });
}

onFormSubmit(data:NgForm) {
  this.nav.hide();
  console.log(this.form);
  this.spinnerOn= true;
  this.reset.addResetPassword(this.form, this.token)
  .subscribe(res => {
      this.spinnerOn = false;
      this.successMessage = "Password reset successful! Click Ok and enter your Username and Password to continue";
      document.getElementById("sucModal").click();
      //this.OpenSuccess(this.resetSuccessful);
      console.log(this.form);
  }, (err) => {
    this.spinnerOn = false;
    this.errorMessage = err.error.message;
    document.getElementById("openModal").click();
    //this.OpenReset(this.passwordReset);
    console.log(err);
  });
  setTimeout(() => {

    }, 5000);
}

OpenReset(passwordReset: TemplateRef<any>) {
  this.modalRef = this.modalService.show(
    passwordReset,
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
