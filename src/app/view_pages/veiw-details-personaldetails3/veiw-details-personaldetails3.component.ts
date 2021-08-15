import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DISTRICTS } from 'src/app/Persional_Details/data-sources/districts';
import { PersionalDetailsCat2 } from 'src/app/Persional_Details/persional-details-cat2';
import { PersionalDetailCat1Service } from 'src/app/Persional_Details/service/persional-detail-cat1-service.service';
import { Router } from '@angular/router';
import { District } from '../../Application-details/models/district';

@Component({
  selector: 'app-veiw-details-personaldetails3',
  templateUrl: './veiw-details-personaldetails3.component.html',
  styleUrls: ['./veiw-details-personaldetails3.component.css']
})
export class VeiwDetailsPersonaldetails3Component implements OnInit {

  applicant = new FormGroup({
    nic: new FormControl(),
    title: new FormControl(),
    initials: new FormControl(),
    lastName:new FormControl(),
    meaningOfInitials:new FormControl(),
    dateOfBirth:new FormControl(),
    birthCertificateNo:new FormControl(),
    age:new FormControl(),
    gender: new FormControl(),
    email: new FormControl(),
    nationality: new FormControl(),
    district: new FormControl(),
    division: new FormControl,
    address: new FormControl(),
    correspondenceDistrict: new FormControl(),
    correspondenceAddress: new FormControl(),
    postalCode: new FormControl(),
    mobileNo: new FormControl(),
    contactNo: new FormControl(),
    disable: new FormControl(),
    reason: new FormControl()

  });

  modalRef: BsModalRef;
  constructor(private persionalDetailCat1Service: PersionalDetailCat1Service, private router: Router, private modalService: BsModalService) { }

  personalDetailsCat2: PersionalDetailsCat2 = new PersionalDetailsCat2();

  

  userId: number;
  userNIC = "";
  userEmail = "";
  division:any[];

nic: string ='';
programid: number;
  applicantAgeToToday: number;
  gender: any;
  districts = DISTRICTS;
  birthday: Date;
  birthdayDisplay: string;
  userbirthday: string='';
  age:number;

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
  district: District[];
  districtid:number;

  @ViewChild('fillMandatory') fillMandatory;
  @ViewChild('successMessage') message;

  
  fillRef: BsModalRef;

  async ngOnInit() {

    
    this.applicant.disable();
    this.nic =localStorage.getItem('nic');
    this.programid = Number(localStorage.getItem('programmeid'));
    await this.persionalDetailCat1Service.getdistrict().subscribe(d=> {this.district = d});
    this.getPersonalDetails(this.nic,this.programid);
   
    
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
  async getPersonalDetails(nic,programid) {

   let data = await this.persionalDetailCat1Service.getLocalPersonalDetails(nic,programid).toPromise()
   console.log(data);
      this.personalDetails1 = data;
      let title;
      if(data['applicant']['title']==1){
        title='Mr'
      }
      else if(data['applicant']['title']==2) {
           title='Ms'
      }
      else if(data['applicant']['title']==3){
        title='Mrs'
      }
      else if(data['applicant']['title']==4){
        title='Rev'
      }
      else if(data['applicant']['title']==5){
        title='Prof'
      }

      else if(data['applicant']['title']==6){
        title='Doctor'
      }
      // this.applicant.

      let gender;
      if(data['applicant']['gender']==1){
        gender='Male'
      }else{
        gender='Female'
      }
  

      let disable;
      if(data['disable']==1){

        disable='yes'
      }else{

        disable='no'
      }
      this.applicant.get('nic').patchValue(data['nic']);
      this.applicant.get('title').setValue(title);
      this.applicant.get('initials').patchValue(data['initials']);
      this.applicant.get('lastName').patchValue(data['lastName']);
      this.applicant.get('meaningOfInitials').patchValue(data['meaningOfInitials']);
      this.applicant.get('dateOfBirth').patchValue(data['applicant']['dateOfBirth']);
      this.applicant.get('birthCertificateNo').patchValue(data['birthCertificateNo']);
      this.userbirthday=data['applicant']['dateOfBirth'];
      this.calculateAge(this.userbirthday);
      this.applicant.get('age').setValue(this.age);
      this.applicant.get('gender').setValue(gender);
      this.applicant.get('email').patchValue(data['applicant']['email']);
      this.applicant.get('nationality').patchValue(data['applicant']['nationality']);

    this.getdistrict(data);
    this.applicant.get('address').patchValue(data['address']);
    this.applicant.get('correspondenceAddress').patchValue(data['applicant']['foriegnAddress']);
    this.applicant.get('postalCode').patchValue(data['postalCode']);
    this.applicant.get('mobileNo').patchValue(data['mobileNo']);
    this.applicant.get('contactNo').patchValue(data['applicant']['mobileNoLocal']);

    this.applicant.get('disable').setValue(disable);
    this.applicant.get('reason').patchValue(data['reason']);
  }



 async getdistrict(data){
    this.applicant.get('district').patchValue(this.district.filter(s=> s.id == data['district'])[0]['description']);
    this.applicant.get('correspondenceDistrict').patchValue(this.district.filter(s=> s.id == data['correspondenceDistrict'])[0]['description']);
    this.division = await this.persionalDetailCat1Service.getdivison(this.district.filter(s=> s.id == data['district'])[0]['id']).toPromise()

      this.applicant.get('division').patchValue(this.division.filter(n=> n.id == data['division'])[0]['description']);

  }
  // delete personal details
  deletePersonalDetails(id) {

  }

  saveApplicant(data: NgForm) {
    this.persionalDetailCat1Service.saveLocalApplicant(data).subscribe(res => {
      this.router.navigateByUrl('home');
    });
  }

  calculateAge(param: string): number {

    var birthdateString = this.userbirthday;
 

    var splitData = birthdateString.split("-", 3);
    var birthdateYear = splitData[0];
    var birthdateMonth = splitData[1];
    var birthdateDay = splitData[2];


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
    
    this.age=returnAge;
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
