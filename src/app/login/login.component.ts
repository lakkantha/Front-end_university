import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { CreateService } from '../_services/create.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NavbarShowHideService } from '../_services/navbar-show-hide.service';
import { ApplicationFeePendingPayment } from '../make-payment/Models/PendingPayment';
import { PaymentService } from '../make-payment/Services/payment.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  create: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  spinnerOn = false;
  errorMessage = '';
  public nicfake = "";
  roles: string[] = [];

  data = {
    username: "",
    password: ""
  };
  datacreate = {
    email:""
  }

@ViewChild('username') username;
@ViewChild('password') password;
@ViewChild('emailWrong') emailWrong;

modalRef: BsModalRef;
  private _sharedService: any;
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
    private modalService: BsModalService,  private router: Router, private createService: CreateService, public nav: NavbarShowHideService, private peymentSerrv : PaymentService) { }

  ngOnInit() {
    this.nav.hide();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = false;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }


 async onFormSubmit(data:NgForm) {
    this.nav.hide();
    this.spinnerOn= true;
    let res = await this.authService.login(this.form).toPromise().catch(err=>{
        this.spinnerOn = false;
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        document.getElementById("openModal").click();
        //this.Open(this.emailWrong);
        console.log(this.errorMessage);
    })

    this.spinnerOn = false;
    this.tokenStorage.saveToken(res.accessToken);
    this.tokenStorage.saveUser(res);
    this.isLoginFailed = false;
    this.isLoggedIn = true;
    this.roles = this.tokenStorage.getUser().roles;
    // let initialApplicant = [];
    // for(let i = 0; i < JSON.parse(sessionStorage.getItem("auth-user"))['initialApplicant'].length; i++){
    //   initialApplicant.push(JSON.parse(sessionStorage.getItem("auth-user"))['initialApplicant'][i]['id']);
    // }

    // for(let j = 0; j < initialApplicant.length ; j++) {
    //   let payments = await this.peymentSerrv.getUnpaidApplicationPaymentListByUserId(initialApplicant[j]).toPromise();

    //   if(payments.length > 0){
    //     return this.router.navigate(['makePayment']).then(() => {window.location.reload();});
    //   }
    // }

    this.router.navigate(['home']).then(() => {window.location.reload();});

    setTimeout(() => {
      this._sharedService.showSpinner = false;
      }, 5000);
  }

  reloadPage() {
    window.location.reload();
  }

  Open(emailWrong: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      emailWrong,
      Object.assign({}, { class: 'gray modal-sm' })
    );
  }

  onFormSubmitCreate(data:NgForm) {
    this.createService.create(this.create)
    .subscribe(res => {
        this.router.navigate(['create']);
    }, (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        console.log(this.errorMessage);
        // this.Open(this.emailWrong);
    });
  }
}
