import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminSignupServiceService} from '../_services/admin-signup-service.service';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NavbarShowHideService } from '../_services/navbar-show-hide.service';
import { AdminTokenStorageService } from '../_services/admin-token-storage.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.css']
})
export class AdminSignupComponent implements OnInit {

  form: any = {};
  create: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  spinnerOn = false;
  errorMessage = '';
  roles: string[] = [];
  designations:any[] = [];
  centres:any[] = [];
  gettingPro: any[] =[];
  programs: any[] = [];

  data = {
    fullName: "",
    username: "",
    password: "",
    passwordSecond: "",
    email: "",
    centreId: 0,
    designationId: 0,
    roles: [],
    programId: 0,
    facultyId:0,
    departmentId:0,
    counsellorId:0
  };

  successMessage = "";
  departments:any [] = [];
  faculties:any [] = [];
  counsellors: any = [];
  programId: number = 0;
  facultyId:number = 0;

  @ViewChild('username') username;
  @ViewChild('password') password;
  @ViewChild('passwordSecond') passwordSecond;
  @ViewChild('email') email;

  mainForm:FormGroup;

  modalRef: BsModalRef;
  private _sharedService: any;
  constructor(private fb: FormBuilder, private adminAuthService: AdminSignupServiceService, private tokenStorage: AdminTokenStorageService,
    private router: Router, public nav: NavbarShowHideService) {
      this.mainForm = this.fb.group({
        fullName: new FormControl('', [Validators.required, Validators.nullValidator]),
        username: new FormControl('', [Validators.required, Validators.nullValidator]),
        password: new FormControl('', [Validators.required, Validators.nullValidator]),
        passwordSecond: new FormControl('', [Validators.required, Validators.nullValidator]),
        email: new FormControl('', [Validators.required, Validators.nullValidator, Validators.email]),
        designation: new FormControl(''),
        centre: new FormControl('', [Validators.required, Validators.nullValidator]),
        role: new FormControl('', [Validators.required, Validators.nullValidator]),
        program: new FormControl(''),
        faculty: new FormControl(''),
        counsellors:new FormControl(''),
        departments: new FormControl('')
      })
     }

  ngOnInit() {
    // this.nav.hide();
    if (this.tokenStorage.getToken()) {
      this.getAllCentres();
      this.getAllDesignations();
      this.getAllPrograms();
      this.getAllFaculties();
      this.isLoggedIn = false;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  getAllDesignations(){
     this.adminAuthService.getAllDesignations()
      .subscribe(res => {
        this.designations = res;
        this.designations.sort((a,b) => a.designation.localeCompare(b.designation));
        console.log(this.designations);
      }, err => {
        console.log(err);
      });
  }

  getAllCentres(){
    this.adminAuthService.getAllCentres()
     .subscribe(res => {
       this.centres = res;
       this.centres.sort((a,b) => a.cnt_description.localeCompare(b.cnt_description));
       console.log(this.centres);
     }, err => {
       console.log(err);
     });
 }

 getAllPrograms(){
  this.adminAuthService.getAllPrograms()
   .subscribe(res => {
     this.gettingPro = res;
     console.log(this.gettingPro);
     this.gettingPro.sort((a,b) => a.programName.localeCompare(b.programName));
     this.programs = this.gettingPro;
   }, err => {
     console.log(err);
   });
}

getAllDepartments(facultyId){
  this.adminAuthService.getAllDepartments(facultyId)
   .subscribe(res => {
     this.departments = res;
     console.log(this.departments);
     this.departments.sort((a,b) => a.title.localeCompare(b.title));
   }, err => {
     console.log(err);
   });
}

getAllFaculties(){
  this.adminAuthService.getAllFaculties()
   .subscribe(res => {
     this.faculties = res;
     console.log(this.faculties);
     this.faculties.sort((a,b) => a.title.localeCompare(b.title));
     //this.programs = this.gettingPro;
   }, err => {
     console.log(err);
   });
}

getAllCounsellors(programId){
  this.adminAuthService.getAllCounsellors(programId)
   .subscribe(res => {
     this.counsellors = res;
     console.log(this.counsellors);
     this.counsellors.sort((a,b) => a.title.localeCompare(b.title));
     //this.programs = this.gettingPro;
   }, err => {
     console.log(err);
   });
}

 selectDesignation(val){
   this.data.designationId = val;
   console.log(val);

 }

 selectCentre(val){
   this.data.centreId = val;
   console.log(val);

 }

  passwordfocus(){
    document.getElementById("password").focus();
  }

  passwordSecondFocus(){
    document.getElementById("passwordSecond").focus();
  }

  emailFocus(){
    document.getElementById("email").focus();
  }

  roleFocus(){
    document.getElementById("role").focus();
  }

  loginBtnFocus(){
    document.getElementById("loginBtn").click();
  }

  usernameFocus(){
    document.getElementById("email-signin").focus();
  }

  selDesiFocus(){
    document.getElementById("designation").focus();
  }

  selCenterFocus(){
    document.getElementById("centre").focus();
  }

  selectRole(val){
    this.data.roles.push(val);
  }

  selectProgram(val){
    this.data.programId = val;
    this.programId = val;
    this.getAllCounsellors(val);
  }

  selectFaculty(val){
    this.data.facultyId = val;
    this.facultyId = val;
    this.getAllDepartments(val);
  }

  selectCounsellors(val){
    this.data.counsellorId = val;
  }

  selectDepartments(val){
    this.data.departmentId = val;
  }

  async onFormSubmit(data) {
    // this.nav.hide();
    console.log(data);

    this.spinnerOn = true;
    let res = await this.adminAuthService.register(data).toPromise().catch(err => {
      this.spinnerOn = false;
      this.errorMessage = err.error.message;
      this.isLoginFailed = true;
      document.getElementById("openModal").click();
      this.data.roles = [];
    });

    if(res){
     this.spinnerOn = false;
     this.mainForm.reset();
     this.successMessage = "Account created successfully. User credentials have been sent to " + data.email + ".";
     document.getElementById("sucModal").click();
     this.spinnerOn = false;
    }
    // this.tokenStorage.saveToken(res.token);
    // this.tokenStorage.saveUser(res);
    // this.isLoginFailed = false;
    // this.isLoggedIn = true;
    // this.roles = this.tokenStorage.getUser().roles;

    //this.router.navigate(['admin-login']).then(() => { window.location.reload(); });
  }

}
