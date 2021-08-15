import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DISTRICTS } from 'src/app/Persional_Details/data-sources/districts';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PersionalDetailCat1Service } from 'src/app/Persional_Details/service/persional-detail-cat1-service.service';
import { Router } from '@angular/router';
import { PersionalDetailsCat2 } from '../../Persional_Details/persional-details-cat2';
import { FormsModule, NgForm } from '@angular/forms'


@Component({
  selector: 'app-view-details-personal-details-category2',
  templateUrl: './view-details-personal-details-category2.component.html',
  styleUrls: ['./view-details-personal-details-category2.component.css']
})
export class ViewDetailsPersonalDetailsCategory2Component implements OnInit {

  modalRef: BsModalRef;
  constructor(private persionalDetailCat1Service: PersionalDetailCat1Service, private router: Router, private modalService: BsModalService) { }

  personalDetailsCat2: PersionalDetailsCat2 = new PersionalDetailsCat2();


  userId: number;
  userNIC = "";
  userEmail = "";


  applicantAgeToToday: number;
  gender: any;
  districts = DISTRICTS;
  birthday: Date;
  birthdayDisplay: string;

  editdata = {
    id: 0,
    nic: '',
    initials: '',
    lastName: '',
    meaningOfInitials: '',
    district: '',
    division: '',
    address: '',
    correspondenceDistrict: '',
    postalCode: '',
    mobileNo: '',
    disable: '',
    reason: '',
    birthCertificateNo: '',
    title: '',
    gender: '',
    dateOfBirth: '',
    nationality: '',
    email: '',
    correspondenceAddress: '',
    contactNo: ''
  }
  personalDetails1: any[] = [];

  @ViewChild('fillMandatory') fillMandatory;
  @ViewChild('successMessage') message;

  
  fillRef: BsModalRef;

  ngOnInit(): void {

    //this.getPersonalDetails();
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
  updatePersonal(personalDetailsCat2) {

  }

  // get personla details
 /* getPersonalDetails() {
    this.persionalDetailCat1Service.getLocalPersonalDetails()
    .subscribe(data => {
      console.log(data);
      this.personalDetails1 = data
    });
  }*/

  // delete personal details
  deletePersonalDetails(id) {

  }

  saveApplicant(data: NgForm) {
    this.persionalDetailCat1Service.saveLocalApplicant(data).subscribe(res => {
      this.router.navigateByUrl('home');
    });
  }

  calculateAge(param: string): number {

    var birthdateString = this.personalDetailsCat2.dateOfBirth;

    var splitData = birthdateString.split("/", 3);
    var birthdateYear = splitData[2];
    var birthdateMonth = splitData[1];
    var birthdateDay = splitData[0];

    var birthdate = new Date(birthdateYear + '-' + birthdateMonth + '-' + birthdateDay);

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

      //  According to above function give age reducing one year for birthday month.
      //     checkDate = "2020/05/10"
      //     birthday =" 2018/05/01 - 2018/05/10"
      //     give ageyear = 1 not 2

      if ((checkDate.getMonth() + 1 == Number(birthdateMonth)) && (Number(birthdateDay) <= checkDate.getDate())) {
        ageyear = ageyear + 1;
      }

      if (param == 'cal') {
        if (ageyear < 0) {
          this.applicantAgeToToday = 0;
        } else {
          this.applicantAgeToToday = ageyear;
          this.personalDetailsCat2.age = ageyear;
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

  
  ListHasError = true;

  validateAList(value) {
    if (value === 'default') {
      this.ListHasError = true;
    }
    else {
      this.ListHasError = false;
    }
  }

  // **************************************
  divisionals: any[];
  loadDivisionalSecretariat(value) {
    if (value != 'default') {
      let variable = this.districts.find(e => e.id == value);
      this.divisionals = variable.divisional;
      this.personalDetailsCat2.postalCode = variable.postalCode;
    }


  }
  //****************************************************************************



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
    var isTrue: boolean = false;

    // Need code 

    return isTrue;
  }
  validateReApply(): boolean {
    var isTrue: boolean = false;

    // Need code 

    return isTrue;
  }

  // ************************************************************

  validateNIC(NICNo) {
    var birthYear;
    var birthMonth;
    var birthDate;
    var dayText = 0;
    var gender = "";

    if (NICNo.length == 10) {

      birthYear = "19" + NICNo.substr(0, 2);
      dayText = parseInt(NICNo.substr(2, 3));

    } else {
      birthYear = NICNo.substr(0, 4);
      dayText = parseInt(NICNo.substr(4, 3));
    
    }

    // Gender
    if (dayText > 500) {
      this.personalDetailsCat2.gender = 2;
      this.gender = 2;
      dayText = dayText - 500;
    } else {
      this.personalDetailsCat2.gender = 1;
      this.gender = 1;

    }

    // Day Digit Validation
    if (dayText < 1 || dayText > 366) {

      alert("NIC is invalid. Check your 3-5 numbers if you are born before 2015. otherwise 5-7 numbers");
    } else {

      //Month

      if (dayText > 335) {
        birthDate = dayText - 335;
        birthMonth = "12";
      }
      else if (dayText > 305) {
        birthDate = dayText - 305;
        birthMonth = "11";
      }
      else if (dayText > 274) {
        birthDate = dayText - 274;
        birthMonth = "10";
      }
      else if (dayText > 244) {
        birthDate = dayText - 244;
        birthMonth = "9";
      }
      else if (dayText > 213) {
        birthDate = dayText - 213;
        birthMonth = "8";
      }
      else if (dayText > 182) {
        birthDate = dayText - 182;
        birthMonth = "7";
      }
      else if (dayText > 152) {
        birthDate = dayText - 152;
        birthMonth = "6";
      }
      else if (dayText > 121) {
        birthDate = dayText - 121;
        birthMonth = "5";
      }
      else if (dayText > 91) {
        birthDate = dayText - 91;
        birthMonth = "4";
      }
      else if (dayText > 60) {
        birthDate = dayText - 60;
        birthMonth = "3";
      }
      else if (dayText < 32) {
        birthDate = dayText;
        birthMonth = "1";
      }
      else if (dayText > 31) {

        birthDate = dayText - 31;
        birthMonth = "2";
      }
    }

    if (birthDate < 10) {
      var birthDateString = '0' + birthDate;
    } else {
      birthDateString = birthDate;
    }
    if (birthMonth < 10) {
      var birthMonthString = '0' + birthMonth;
    } else {
      birthMonthString = birthMonth;
    }

    this.personalDetailsCat2.dateOfBirth = birthDateString + '/' + birthMonthString + '/' + birthYear;


    this.calculateAge('cal');

  }
  // **********************************************************************************



  //************************************************************************************/
 


     
  continue() {
    this.router.navigateByUrl('home/professional-qualification');
  }


}
