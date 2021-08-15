import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ForgotPasswordByPhoneService } from '../_services/forgot-password-by-phone.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NavbarShowHideService } from '../_services/navbar-show-hide.service';



@Component({
  selector: 'app-forgot-password-by-phone',
  templateUrl: './forgot-password-by-phone.component.html',
  styleUrls: ['./forgot-password-by-phone.component.css']
})
export class ForgotPasswordByPhoneComponent implements OnInit {

  form: any = {};
  spinnerOn = false;
  data = {
    username: ""
    
  };
  errorMessage = '';
  successMessage = '';
  @ViewChild('emailWrong') emailWrong;
  @ViewChild('resetSuccessful') resetSuccessful;

  modalRef: BsModalRef;
  private _sharedService: any;
  constructor( 
    private modalService: BsModalService,
    private fbService: ForgotPasswordByPhoneService, private router: Router, public nav: NavbarShowHideService) { }

  
  

  ngOnInit(): void {
    this.nav.hide();
  }

  onFormSubmit(data:NgForm) {
    this.nav.hide();
    this.spinnerOn= true;
    this.fbService.forgotPasswordByPhone(this.form)
    .subscribe(res => { 
      this.spinnerOn = false;
      this.successMessage = "Password reset successful! Click Ok and enter your Username and Password to continue";
      this.OpenSuccess(this.resetSuccessful);
    }, (err) => {
      this.spinnerOn = false;
      this.errorMessage = err.error.message;;
        this.Open(this.emailWrong);
        console.log(this.errorMessage);
    });
      setTimeout(() => {
      this._sharedService.showSpinner = false;
      }, 5000);
    
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

