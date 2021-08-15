import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminAuthService } from '../_services/admin-auth.service';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NavbarShowHideService } from '../_services/navbar-show-hide.service';
import { AdminTokenStorageService } from '../_services/admin-token-storage.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  form: any = {};
  create: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  spinnerOn = false;
  errorMessage = '';
  roles: string[] = [];

  data = {
    username: "",
    password: ""
  };

  @ViewChild('username') username;
  @ViewChild('password') password;

  modalRef: BsModalRef;
  private _sharedService: any;
  constructor(private adminAuthService: AdminAuthService, private tokenStorage: AdminTokenStorageService,
    private router: Router, public nav: NavbarShowHideService) { }

  ngOnInit() {
    this.nav.hide();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = false;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  passwordfocus(){
    document.getElementById("password").focus();
  }


  async onFormSubmit(data) {
    this.nav.hide();
    this.spinnerOn = true;
    let res = await this.adminAuthService.login(data).toPromise().catch(err => {
      this.spinnerOn = false;
      this.errorMessage = err.error.message;
      this.isLoginFailed = true;
      document.getElementById("openModal").click();
    });

    this.spinnerOn = false;
    this.tokenStorage.saveToken(res.token);
    this.tokenStorage.saveUser(res);
    this.isLoginFailed = false;
    this.isLoggedIn = true;
    this.roles = this.tokenStorage.getUser().roles;

    this.router.navigate(['home']).then(() => { window.location.reload(); });

    setTimeout(() => {
      this._sharedService.showSpinner = false;
    }, 500);
  }
}
