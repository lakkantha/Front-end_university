import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgModule } from '@angular/core';
import {
  NG_VALIDATORS, Validator,
  Validators, AbstractControl, ValidatorFn, FormGroup, NgForm
} from '@angular/forms';
import { FormsModule } from '@angular/forms'
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { PersionalDetailCat1Service } from '../../Persional_Details/service/persional-detail-cat1-service.service';
import { PersionalDetailsCat1 } from '../../Persional_Details/persional-details-cat1';


@Component({
  selector: 'app-view-details-personal-details-category1',
  templateUrl: './view-details-personal-details-category1.component.html',
  styleUrls: ['./view-details-personal-details-category1.component.css']
})
export class ViewDetailsPersonalDetailsCategory1Component implements OnInit {

  editedPersonalData = {
    id: 1,
    title: '',
    gender: '',
    dateOfBirth: '',
    nationality: '',
    email: '',
    foriegnAddress: '',
    localAddress: '',
    mobileNoForiegn: '',
    mobileNoLocal: '',
    familyName: '',
    firstName: '',
    middleName: '',
    countryOfBirth: '',
    passportNo: '',
    passportIssuedCountry: '',
    passportExpirydate: '',
    embassyFaxNo: '',
    embassyEmailAddress: '',
    embassyContactNo: '',
  }

  personalDetailsCat1: PersionalDetailsCat1 = new PersionalDetailsCat1();
  applicantAgeToToday: number;
  countryInfo: any[] = [];
  userId = 1;
  userEmail: string = '';

  personalDetails: any[] = [];

  @ViewChild('fillMandatory') fillMandatory;
  @ViewChild('successMessage') message;

  modalRef: BsModalRef;
  fillRef: BsModalRef;

  constructor(private persionalDetailCat1Service: PersionalDetailCat1Service, private router: Router, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getPersonalDetails();

    this.persionalDetailCat1Service.getAllCountries().
    subscribe(data2 => this.countryInfo = data2);
  }

  fill(fillMandatory: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      fillMandatory,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  // open edit pop up
  openEdit(editForm: TemplateRef<any>, id: number) {
    this.modalRef = this.modalService.show(
      editForm,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  // open edit sucess msg pop up
  openEditOk(editok: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      editok,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  // open delete confirmation pop up
  openDelete(deleteConfirmation: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      deleteConfirmation,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  // open delete sucess msg pop up
  openDeleteOk(deleteok: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      deleteok,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  // update personla details
  updatePersonal(personalDetailsCat1) {

  }

  // get personla details
  getPersonalDetails() {
    this.persionalDetailCat1Service.getForeignApplicant()
      .subscribe(data => {
        console.log(data);
        this.personalDetails = data
      });
  }

  // delete personal details
  deletePersonalDetails(id) {

  }

  saveApplicant(data: NgForm) {
    this.persionalDetailCat1Service.saveForeignApplicant(data).subscribe(res => {
      this.router.navigateByUrl('home');
    });
  }

  calculateAge(param: string): number {
    var birthdate = this.personalDetailsCat1.dateOfBirth;
    var splitData = birthdate.toString().split("-", 3);
    var birthdateYear = splitData[0];
    var birthdateMonth = splitData[1];
    var birthdateDay = splitData[2];

    var checkDate: Date;
    var dateString = '2020-01-01'
    var effectiveDate = new Date(dateString);
    var returnAge: number = 0;

    if (param == 'cal') {
      checkDate = new Date();
    } else {
      checkDate = effectiveDate;
    }

    if (birthdate != undefined) {

      var ageyear = checkDate.getFullYear() - Number(birthdateYear);
      var agemonth = checkDate.getMonth() - Number(birthdateMonth);
      var ageday = checkDate.getDate() - Number(birthdateDay);

      if (agemonth <= 0) {
        ageyear--;
        agemonth = (12 + agemonth);
      }
      if (checkDate < birthdate) {
        agemonth--;
        ageday = 30 + ageday;
      } if (agemonth == 12) {
        ageyear = ageyear + 1;
        agemonth = 0;
      }

      if ((checkDate.getMonth() + 1 == Number(birthdateMonth)) && (Number(birthdateDay) <= checkDate.getDate())) {
        ageyear = ageyear + 1;
      }

      if (param == 'cal') {
        if (ageyear < 0) {
          this.applicantAgeToToday = 0;
        } else {
          this.applicantAgeToToday = ageyear;
          this.personalDetailsCat1.age = ageyear;
        }
      } else {
        returnAge = ageyear;
      }


    }
    return returnAge;
  }

  validationsCheckingForContinue(): void {

    if (!this.validateAge()) {
      alert('You should be 18 years old or greater than 18 to apply to this program. Once you are 18 years old OUSL will notify you');
    } else if (!this.validateTotalCreditLimit()) {
      alert('You can’t apply to another program because you exceed the maximum credit limit of OUSL');
    } else if (!this.validateReApply()) {
      alert('You can’t submit twice for same program within same academic year');
    } else {
      alert('Go to next page');
    }
  }

  validateAge(): boolean {
    var isTrue: boolean = true;
    var maxAge: number = 18;
    var applicantAgeToEffectiveDate: number;
    applicantAgeToEffectiveDate = this.calculateAge('val');

    if (applicantAgeToEffectiveDate < maxAge) {
      isTrue = false;
    }
    return isTrue;
  }

  validateTotalCreditLimit(): boolean {
    var isTrue: boolean = true;
    return isTrue;
  }

  validateReApply(): boolean {
    var isTrue: boolean = true;
    return isTrue;
  }

  ListHasError = true;

  validateAList(value) {
    if (value == 'default') {
      this.ListHasError = true;
    }
    else {
      this.ListHasError = false;
    }
  }

  continue() {
    this.router.navigateByUrl('home/professional-qualification');
  }

}
