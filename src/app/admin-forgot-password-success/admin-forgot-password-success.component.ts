import { Component, OnInit } from '@angular/core';
import { NavbarShowHideService } from '../_services/navbar-show-hide.service';

@Component({
  selector: 'app-admin-forgot-password-success',
  templateUrl: './admin-forgot-password-success.component.html',
  styleUrls: ['./admin-forgot-password-success.component.css']
})
export class AdminForgotPasswordSuccessComponent implements OnInit {

  constructor(public nav: NavbarShowHideService) { }

  ngOnInit(): void {
    this.nav.hide();
  }

}
