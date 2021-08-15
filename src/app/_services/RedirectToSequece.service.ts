import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { async } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Application } from '../application';
import { ApplicationService } from '../application.service';
import { NextSequence } from '../home/NextSequenceModel'
import { ProgramSelectionService } from './program-selection.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectToSequeceService {

  private baseUrl = environment.base_url;
  readonly seqUrl = this.baseUrl + "/api/v1/getSequence/";

  personalDetailsSuccess = false;
  programmeDetailsSuccess = false;
  educationalDetailsSuccess = false;
  professionalDetailsSuccess = false;
  workExperienceDetailsSuccess = false;
  userData: any[] = []

  academic = false;
  ol = false;
  al = false;
  foundation = false;

  personalCate1 = false;
  personalCate2 = false;
  personalCate3 = false;

  isFill;
  iStudentId: string = '';
  qualification: string = '';

  // redirect interface 
  programId;
  applicantTypeId;
  program;

  public programmeId: string; //let programId = localStorage.getItem("programmeid");
  public applicationTypeId: string; //let applicationTypeId = localStorage.getItem("applicationTypeId");
  application: Application[];


  constructor(private http: HttpClient, private router: Router, private applicationService: ApplicationService, private api: ProgramSelectionService) {


    this.programmeId = localStorage.getItem("programmeid");


  }



  async getprogram() {

    this.iStudentId = localStorage.getItem('initialstudentid');
    let user;
    let userStudent;
    if (sessionStorage.getItem("auth-user")) {
      user = JSON.parse(sessionStorage.getItem("auth-user"));
      console.log("userName: " + user.username);

      await this.api.getPrograms(user.username).toPromise().then(res => {
        console.log("all programs: " + res);
        this.userData = res;
        userStudent = res[0];
        console.log("user:" + userStudent);

        this.programmeId = localStorage.getItem("programmeid");
        let user = this.userData.filter(s => s.programStarted.program.programId == this.programmeId)[0];
        localStorage.setItem("initialstudentid", user.id);
        localStorage.setItem("initialapplicantid", user.initialApplicant.id);
        console.log("user for selected program: " + user);


        this.applicationTypeId = localStorage.getItem("applicanttypeid");
        // this.getapplication();
        // this.applicationService.getApplication(this.programmeId, this.applicationTypeId).subscribe((response) => {
        //   this.application = response
        //   console.log(response)
        // })

      })
    }
  }

  async getapplication() {
    await this.getprogram();
    let a = await this.applicationService.getApplication(this.programmeId, this.applicationTypeId).toPromise();
    this.application = a;



  }

  async RedirectTo(initialApplicantId) {
    console.log(initialApplicantId, "initaplicantid");


    this.http.get<NextSequence>(this.seqUrl + initialApplicantId).subscribe(s => {
      this.switchRoutes(s.sequence.id, initialApplicantId)
    })

  }

  switchRoutes(sequence, initialApplicantId) {

    switch (sequence) {

      case 1: {
        this.router.navigate(['']);
        break;
      }
      case 2: {
        this.router.navigate(['makePayment']);
        break;
      }
      case 3: {
        this.router.navigate(['home/pick-entrance-exam-date']);
        break;
      }
      case 4: {
        this.router.navigate(['pick_counselling_time']);
        break;
      }
      case 5: {
        this.router.navigate(['profile/courseSelection']);
        break;
      }
      case 6: {
        this.router.navigate(['makePayment']);
        break;
      }
      case 7: {
        this.loadpersonaldetails();
        break;
      }
      case 8: {
        this.edu_qua();
        break;
      }
      case 9: {
        this.pro_qua();
        break;
      }
      case 10: {
        this.work_exp();
        break;
      }
      case 11: {
        this.router.navigate(['home']);
        break;
      }
      case 12: {
        this.router.navigate(['home/admission']);
        break;
      }
      case 13: {
        this.router.navigate(['entrance_exam/pickExamCenter']);
        break;
      }

      case 15: {
        this.router.navigate(['counselling_based_on_student_preference/' + initialApplicantId]);
        break;
      }

      case 16: {
        this.router.navigate(['info-page/info']);
        break;
      }

      case 19: {
        this.router.navigate(['home/request-exemptions/' + initialApplicantId + '/0']);
        break;
      }

      case 22: {
        this.router.navigate(['exam/results', { id: initialApplicantId }]);
        break;
      }

      case 27: {
        this.consent_form();
        break;
      }

      case 29: {
        this.cancel_program(initialApplicantId);
        break;
      }

    }

  }

  // get Application data by initial applicant id
  async getApplicationDetails(initialApplicantId) {

    this.programId = '';
    this.applicantTypeId = '';
    this.program = '';
    var initialStudentData: any  =[];
    this.application = [];

    var user = JSON.parse(sessionStorage.getItem("auth-user"));
    initialStudentData = await this.api.getPrograms(user.username).toPromise();

    for (let i = 0; i < initialStudentData.length; i++) {
      if (initialStudentData[i].initialApplicant.id == initialApplicantId) {

        this.programId = initialStudentData[i].programStarted.program.programId;
        this.applicantTypeId = initialStudentData[i].applicantType.id;
        this.program = initialStudentData[i].programStarted.program.title;
      }
    }
}


  async loadpersonaldetails() {
    await this.getapplication();
    this.per_det();
  }

  // redirect to online registration consent form
  async consent_form() {
    await this.getapplication();
    this.router.navigate(['home/online_registration_consent_form']);
  }

  // display notification cancel program
  async cancel_program(initialApplicantId) {

    await this.getApplicationDetails(initialApplicantId);
    alert("Your Program has been cancelled for " + this.program);
  }

  per_det() {


    if (this.application[0]?.per_det == "category_1") {
      this.router.navigate(['home/personal-details/manage_persionalDetailsCat1_details']);
    }
    else if (this.application[0]?.per_det == "category_2") {
      this.router.navigate(['home/personal-details/manage_persionalDetailsCat2_details']);
    }
    else if (this.application[0]?.per_det == "category_3") {
      this.router.navigate(['home/personal-details/manage_persionalDetailsCat3_details']);
    }
    else {
      this.router.navigate(['home']);
    }

  }

  prog_det() {
    if (this.application[0].prog_det == "category_1") {
      this.router.navigate(['program_details_category_i']);
    }
    else if (this.application[0].prog_det == "category_2") {
      this.router.navigate(['program_details_category_ii']);
    }
    else if (this.application[0].prog_det == "category_3") {
      this.router.navigate(['program_details_category_iii']);
    }
    else {
      this.router.navigate(['home']);
    }

  }

  async edu_qua() {
    await this.getapplication();
    // this.personalDetailsSuccess = await this.checkPersonal();

    if (this.application[0].edu_qua == "2category_1") {
      this.router.navigate(['home/add_educational_qualification_academic']);
    }
    else if (this.application[0].edu_qua == "2category_2") {
      this.router.navigate(['home/add_educational_qualification_ol_al']);
    }
    else if (this.application[0].edu_qua == "2category_3") {
      this.router.navigate(['home/add_educational_qualification_al_foundation']);
    }
    else if (this.application[0].edu_qua == "2category_4") {
      this.router.navigate(['home/add_educational_qualification_ol_al_foundation']);
    }
    else if (this.application[0].edu_qua == "2category_5") {
      this.router.navigate(['home/add_educational_qualification_ol']);
    }
    else if (this.application[0].edu_qua == "2category_6") {
      this.router.navigate(['home/add_educational_qualification_ol_foundation']);
    }
    else if (this.application[0].edu_qua == "2category_7") {
      this.router.navigate(['home/add_educational_qualification_al']);
    }
    else if (this.application[0].edu_qua == "2category_8") {
      this.router.navigate(['home/add_educational_qualification_ol_al_academic']);
    }
    else if (this.application[0].edu_qua == "2category_10") {
      this.router.navigate(['home/add_educational_qualification_ol_notmandatory_al_academic']);
    }
    else {
      this.router.navigate(['home']);
    }

  }

  async pro_qua() {
    await this.getapplication();
    // this.educationalDetailsSuccess = await this.checkEducation();

    if (this.application[0].pro_qua == "3category_1") {
      this.router.navigate(['home/professional-qualification']);
    }
    else {
      this.router.navigate(['home']);
    }


  }

  async work_exp() {
    await this.getapplication();
    // this.professionalDetailsSuccess = await this.checkProfessional();

    if (this.application[0].work_exp == "4category_1") {
      this.router.navigate(['home/work-experience']);
    }
    else {
      this.router.navigate(['home']);
    }

  }

  async checkPersonal(): Promise<boolean> {
    this.isFill = await this.applicationService.checkPersonalData(this.programmeId, this.iStudentId).toPromise()
    if (this.isFill == 1) {
      this.personalDetailsSuccess = true;
    } else {
      this.personalDetailsSuccess = false;
    }

    return this.personalDetailsSuccess;
  }

  // check educational qualification details interface
  async checkEducation(): Promise<boolean> {
    if (this.application[0].edu_qua == "2category_1") {  // academic
      this.checkAcademicData();
      if (this.academic == true) {
        this.educationalDetailsSuccess = true;
      } else {
        this.educationalDetailsSuccess = false;
      }
    }

    else if (this.application[0].edu_qua == "2category_2") {  // ol, al
      this.ol = await this.checkOLData();
      this.al = await this.checkALData();
      if (this.ol == true && this.al == true) {
        this.educationalDetailsSuccess = true;
      } else {
        this.educationalDetailsSuccess = false;
      }
    }
    else if (this.application[0].edu_qua == "2category_3") {  //al, foundation
      this.al = await this.checkALData();
      this.checkFoundationData();
      if (this.al == true && this.foundation == true) {
        this.educationalDetailsSuccess = true;
      } else {
        this.educationalDetailsSuccess = false;
      }
    }
    else if (this.application[0].edu_qua == "2category_4") { // ol, al foundation
      this.ol = await this.checkOLData();
      this.al = await this.checkALData();
      this.checkFoundationData();
      if (this.ol == true && this.al == true && this.foundation == true) {
        this.educationalDetailsSuccess = true;
      } else {
        this.educationalDetailsSuccess = false;
      }
    }
    else if (this.application[0].edu_qua == "2category_5") { // ol
      this.ol = await this.checkOLData();
      if (this.ol == true) {
        this.educationalDetailsSuccess = true;
      } else {
        this.educationalDetailsSuccess = false;
      }
    }
    else if (this.application[0].edu_qua == "2category_6") { // ol, foundation
      this.ol = await this.checkOLData();
      this.checkFoundationData();
      if (this.ol == true && this.foundation == true) {
        this.educationalDetailsSuccess = true;
      } else {
        this.educationalDetailsSuccess = false;
      }
    }
    else if (this.application[0].edu_qua == "2category_7") {  // al
      this.al = await this.checkALData();
      if (this.al == true) {
        this.educationalDetailsSuccess = true;
      } else {
        this.educationalDetailsSuccess = false;
      }
    }
    else if (this.application[0].edu_qua == "2category_8") { // ol, al, academic
      this.ol = await this.checkOLData();
      this.al = await this.checkALData();
      this.academic = await this.checkAcademicData();
      if (this.ol == true && this.al == true && this.academic == true) {
        this.educationalDetailsSuccess = true;
      } else {
        this.educationalDetailsSuccess = false;
      }
    }
    else if (this.application[0].edu_qua == "2category_10") { // ol, al,academic not mandatory AL and academic  
      this.ol = await this.checkOLData();
      this.al = await this.checkALData();
      this.academic = await this.checkAcademicData();

      if (this.ol == true && this.al == true) {
        this.educationalDetailsSuccess = true;
      } else if (this.ol == true && this.academic == true) {
        this.educationalDetailsSuccess = true;
      } else {
        this.educationalDetailsSuccess = false;
      }
    }
    else {
      this.router.navigate(['applicantProfile']);
    }

    return this.educationalDetailsSuccess;
  }

  // check academic data
  async checkAcademicData(): Promise<boolean> {
    this.isFill = await this.applicationService.checkEducationalAcademicData(this.programmeId, this.iStudentId).toPromise()
    if (this.isFill == 1) {
      this.academic = true;
    } else {
      this.academic = false;
    }

    return this.academic;
  }

  // check AL data
  async checkALData(): Promise<boolean> {
    this.isFill = await this.applicationService.checkEducationalALData(this.programmeId, this.iStudentId).toPromise()
    if (this.isFill == 1) {
      this.al = true;
    } else {
      this.al = false;
    }

    return this.al;
  }

  // check OL data
  async checkOLData(): Promise<boolean> {
    this.isFill = await this.applicationService.checkEducationalOLData(this.programmeId, this.iStudentId).toPromise()
    if (this.isFill == 1) {
      this.ol = true;
    } else {
      this.ol = false;
    }

    return this.ol;
  }

  // check foundation data
  checkFoundationData() {
    this.foundation = true;
  }

  // check professional qualification details interface
  async checkProfessional(): Promise<boolean> {
    this.isFill = await this.applicationService.checkEducationalProfessionalData(this.programmeId, this.iStudentId).toPromise()
    if (this.isFill == 1) {
      this.professionalDetailsSuccess = true;
    } else {
      this.professionalDetailsSuccess = false;
    }

    return this.professionalDetailsSuccess;
  }
}

