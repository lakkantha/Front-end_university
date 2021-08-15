import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { NavbarShowHideService } from './_services/navbar-show-hide.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from './application';
import { ApplicationService } from './application.service';

import * as $ from 'jquery';
import { environment } from 'src/environments/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { SendStockService } from "./course-materials/Services/send-stock/send-stock.service";
import { EmmitterServiceService } from './_services/services/emmitter-service.service';
declare const openNav: any;
declare const closeNav: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  StudentNumber = "";
  visible = false;
  isToggle: boolean = false;
  show = false;
  ps: string = '1';
  n:Number;
  nonSuperAdmin=true;
  personalDetailsSuccess = false;
  programmeDetailsSuccess = false;
  educationalDetailsSuccess = false;
  professionalDetailsSuccess = false;
  workExperienceDetailsSuccess = false;
  isAdmin:boolean = false;
  initialApplicantId:number = 0;

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
  fillRef: BsModalRef;
  showSuperAdminBoard=false;
  counsellorId:any;
  showCounsellor=false;
  @ViewChild('fillMandatory') fillMandatory;

  public programmeId: string; //let programId = localStorage.getItem("programmeid");
  public applicationTypeId: string; //let applicationTypeId = localStorage.getItem("applicationTypeId");
  application: Application[];
  showAdminAndSuperAdminBoard=false;
  showStudent = false;
  showForExamResults=false;
  courseMaterial=[];
  centerId:number;
  constructor(private modalService: BsModalService, private tokenStorageService: TokenStorageService, public nav: NavbarShowHideService, private applicationService: ApplicationService, private router: Router,private toastr:ToastrService,private courseMaterialService:SendStockService, private emitterService: EmmitterServiceService) {
    this.emitterService.listeningToUpdateSIDChange().subscribe(() => {
      this.getSID();
    });
    this.setvalues();
    // this.getapplication();
    // this.applicationService.getApplication(this.programmeId, this.applicationTypeId).subscribe((response) => {
    //   this.application = response
    //   console.log(response)
    // })
  }



async getSentCourseMaterials(){
  let temp=[];
  await this.courseMaterialService.getAllByReceiverId(this.centerId).toPromise()
  .then(res=>{
    temp=res;
    console.log(temp);

    for(var i=0;i<temp.length;i++){
      if(temp[i]['notified']==false){

        const toast = this.toastr.info(temp[i]['courseMaterialDistributingTypes']['detailItemCode']+" course materials sent by "+temp[i]['senderRgmCenter']['cnt_description']+" centre. please tap to view the course materials! "+temp[i]['id'],"Course Materials", {
          timeOut:10000,
          tapToDismiss:true,

        });
        toast.onTap.subscribe((x) => {
          console.log(toast.toastId,toast.message);
          console.log(x);

          var str=toast.message;
          var splitted=str.split(" ",15);
          var itemCode=splitted[0];
          var centerID;
          var id=splitted[14];
          temp.filter(x=>x.senderRgmCenter.cnt_description==splitted[5]).forEach(x=>centerID=x.senderRgmCenter.cnt_centerId);

          console.log(id,"id");

          this.courseMaterialService.updateNotified(id).toPromise()
          .then(res=>{
            console.log(res);

          })
          .catch(e=>{
            console.log(e);

          })
          this.router.navigate(['course-materials/receive-stock',{center:centerID,itemCode:itemCode}]);
        });
      }
    }
  })
  .catch(e=>{
    console.log(e);

  });
}

setvalues(){
  this.programmeId = localStorage.getItem("programmeid");
    this.applicationTypeId = localStorage.getItem("applicanttypeid");
    this.iStudentId = localStorage.getItem('initialstudentid');
}
async homevaluepass(value){
  this.n=value
  console.log(this.n,"count");
}

  async getapplication(){
await this.setvalues();

    let a = await this.applicationService.getApplication(this.programmeId,this.applicationTypeId).toPromise();
    this.application=a;



  }

  // this.application[0] => application type id
  callfun() {
    document.getElementById("mySidenav").style.width = "250px";
  }

  callClose() {
    document.getElementById("mySidenav").style.width = "0";
  }

  // fill mandatory
  fill(fillMandatory: TemplateRef<any>) {
    this.fillRef = this.modalService.show(
      fillMandatory,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  // check personal details interface
 async checkPersonal() {
  await this.getapplication();
   await this.applicationService.checkPersonalData(this.programmeId, this.iStudentId)
      .toPromise().then(data => {
        console.log("dgvgdvfdsvf");

        this.isFill = data;
        if (this.isFill == 1) {
          this.personalDetailsSuccess = true;
        } else {
          this.personalDetailsSuccess = false;
        }
      });

  }

  // check educational qualification details interface
  checkEducation() {
    if (this.application[0].edu_qua == "2category_1") {  // academic
      this.checkAcademicData();
      if (this.academic == true) {
        this.educationalDetailsSuccess = true;
      } else {
        this.educationalDetailsSuccess = false;
      }
    }
    else if (this.application[0].edu_qua == "2category_2") {  // ol, al
      this.checkOLData();
      this.checkALData();
      if (this.ol == true && this.al == true) {
        this.educationalDetailsSuccess = true;
      } else {
        this.educationalDetailsSuccess = false;
      }
    }
    else if (this.application[0].edu_qua == "2category_3") {  //al, foundation
      this.checkALData();
      this.checkFoundationData();
      if (this.al == true && this.foundation == true) {
        this.educationalDetailsSuccess = true;
      } else {
        this.educationalDetailsSuccess = false;
      }
    }
    else if (this.application[0].edu_qua == "2category_4") { // ol, al foundation
      this.checkOLData();
      this.checkALData();
      this.checkFoundationData();
      if (this.ol == true && this.al == true && this.foundation == true) {
        this.educationalDetailsSuccess = true;
      } else {
        this.educationalDetailsSuccess = false;
      }
    }
    else if (this.application[0].edu_qua == "2category_5") { // ol
      this.checkOLData();
      if (this.ol == true) {
        this.educationalDetailsSuccess = true;
      } else {
        this.educationalDetailsSuccess = false;
      }
    }
    else if (this.application[0].edu_qua == "2category_6") { // ol, foundation
      this.checkOLData();
      this.checkFoundationData();
      if (this.ol == true && this.foundation == true) {
        this.educationalDetailsSuccess = true;
      } else {
        this.educationalDetailsSuccess = false;
      }
    }
    else if (this.application[0].edu_qua == "2category_7") {  // al
      this.checkALData();
      if (this.al == true) {
        this.educationalDetailsSuccess = true;
      } else {
        this.educationalDetailsSuccess = false;
      }
    }
    else if (this.application[0].edu_qua == "2category_8") { // ol, al, academic
      this.checkOLData();
      this.checkALData();
      this.checkAcademicData();
      if (this.ol == true && this.al == true && this.academic == true) {
        this.educationalDetailsSuccess = true;
      } else {
        this.educationalDetailsSuccess = false;
      }
    }
    else {
      this.router.navigate(['applicantProfile']);
    }

  }

  // check academic data
  checkAcademicData() {
    this.applicationService.checkEducationalAcademicData(this.programmeId, this.iStudentId)
      .subscribe(data => {
        this.isFill = data;
        if (this.isFill == 1) {
          this.academic = true;
        } else {
          this.academic = false;
        }
      });
  }

  // check AL data
  checkALData() {
    this.applicationService.checkEducationalALData(this.programmeId, this.iStudentId)
      .subscribe(data => {
        this.isFill = data;
        if (this.isFill == 1) {
          this.al = true;
        } else {
          this.al = false;
        }
      });
  }

  // check OL data
  checkOLData() {
    this.applicationService.checkEducationalOLData(this.programmeId, this.iStudentId)
      .subscribe(data => {
        this.isFill = data;
        if (this.isFill == 1) {
          this.ol = true;
        } else {
          this.ol = false;
        }
      });
  }

  // check foundation data
  checkFoundationData() {
    this.foundation = true;
  }

  // check professional qualification details interface
  checkProfessional() {
    this.applicationService.checkEducationalProfessionalData(this.programmeId, this.iStudentId)
      .subscribe(data => {
        this.isFill = data;
        if (this.isFill == 1) {
          this.professionalDetailsSuccess = true;
        } else {
          this.professionalDetailsSuccess = false;
        }
      });
  }

  /*load interfaces
  * after check previous interface
  */
  per_det() {
    if (this.application[0].per_det == "category_1") {
      this.router.navigate(['home/personal-details/manage_persionalDetailsCat1_details']);
    }
    else if (this.application[0].per_det == "category_2") {
      this.router.navigate(['home/personal-details/manage_persionalDetailsCat2_details']);
    }
    else if (this.application[0].per_det == "category_3") {
      this.router.navigate(['home/personal-details/manage_persionalDetailsCat3_details']);
    }
    else {
      this.router.navigate(['applicantProfile']);
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
      this.router.navigate(['applicantProfile']);
    }

  }

 async edu_qua() {
   await this.checkPersonal();
    if (this.personalDetailsSuccess == true) {
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
      else {
        this.router.navigate(['applicantProfile']);
      }
    }
    else {
      this.per_det();

      alert("Fill Personal Details");
    }
  }

  pro_qua() {
    this.checkEducation();
    if (this.educationalDetailsSuccess == true) {
      if (this.application[0].pro_qua == "3category_1") {
        this.router.navigate(['home/professional-qualification']);
      }
      else {
        this.router.navigate(['applicantProfile']);
      }
    }
    else {
      this.edu_qua();
      alert("Fill Educational details");
    }
  }

  work_exp() {
    this.checkProfessional();
    if (this.professionalDetailsSuccess == true) {
      if (this.application[0].work_exp == "4category_1") {
        this.router.navigate(['home/work-experience']);
      }
      else {
        this.router.navigate(['applicantProfile']);
      }
    }
    else {
      this.pro_qua();
      alert("Fill Professional details");
    }
  }
  firstPage(){
    let url = environment.base_url+'/application-details';
    this.router.navigateByUrl(url).then(()=>{ this.ngOnInit()});
    //this.router.navigate(['/application-details']).then(this.ngOnInit());
  }
  ngOnInit() {

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.nav.show();
    if (this.isLoggedIn) {
      this.checkAdminOrNot();
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      if(user.adminDetails != undefined && user.adminDetails != null){
        if(user['adminDetails'][0]['rgtAdminCenter']!=null&&user['adminDetails'][0]['rgtAdminCenter']!=undefined){
          this.centerId=user['adminDetails'][0]['rgtAdminCenter']['cnt_centerId'];
          console.log(this.centerId);
        }
        // this.getSentCourseMaterials();
        if(user.adminDetails[0].counsellors != null && user.adminDetails[0].counsellors !=undefined){
          this.counsellorId = user.adminDetails[0].counsellors.id;
          this.showCounsellor=true;
        }
        else{
          this.showCounsellor=false;
        }
      }

      if(user.initialApplicant != undefined && user.initialApplicant != null){
        this.initialApplicantId = user.initialApplicant[0].id;
        if(user.initialApplicant.findIndex(x=>x.programStarted.program.hasEntryExam===true)!=-1){
          this.showForExamResults=true;
        }
        else{
          this.showForExamResults=false;
        }
      }

      this.showSuperAdminBoard = this.roles.includes('ROLE_SUPER_ADMIN');
      this.showAdminBoard=this.roles.includes('ROLE_ADMIN');
      // this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showAdminAndSuperAdminBoard=this.roles.includes('ROLE_SUPER_ADMIN')||this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.showStudent = this.roles.includes('ROLE_STUDENT') || this.roles.includes('ROLE_APPLICANT');
      console.log(this.showStudent)

      this.username = user.username;
      localStorage.setItem("nic", this.username);

      if(this.showStudent){
        this.getSID();
      }  



      // this.checkPersonal();
      // this.checkAcademicData();
      // this.checkALData();
      // this.checkOLData();
      // this.checkFoundationData();
      // this.checkProfessional();

    }

    if (this.isLoggedIn == true) {
      this.show = true;
    }
  }

  getSID(){
    this.applicationService.getSID(this.username)
    .subscribe(data => {
      console.log(data)
      this.StudentNumber = data['sid'];
     }, err => {
      console.log(err);
    });
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  navigateToInitialApplicant(){
    this.router.navigate(['/userProfile']);
  }
  navigateToHome(){
    this.router.navigate(['/home']);
  }

  courseselection() {
    this.router.navigateByUrl('/profile/courseSelection');
  }

  personaldetails() {
    this.qualification = 'personal';
    localStorage.setItem("qualification", this.qualification);
    this.router.navigateByUrl('home/select-program').then(() => {window.location.reload();});
  }

  /*redirect to programme selection
   * from educational qualification link
  */
  educationalDetails() {
    this.qualification = 'education';
    localStorage.setItem("qualification", this.qualification);
    this.router.navigateByUrl('home/select-program').then(() => {window.location.reload();});
  }

  /*redirect to programme selection
   * from professional qualification link
  */
  professionalDetails() {
    this.qualification = 'profession';
    localStorage.setItem("qualification", this.qualification);
    this.router.navigateByUrl('home/select-program').then(() => {window.location.reload();});
  }

  /*redirect to programme selection
   * from work experience link
  */
  workExperienceDetails() {
    this.qualification = 'work';
    localStorage.setItem("qualification", this.qualification);
    this.router.navigateByUrl('home/select-program').then(() => {window.location.reload();});
  }


  checkAdminOrNot(){
    var user = this.tokenStorageService.getUser();
    if(user.adminDetails == undefined || user.adminDetails == null){
      this.isAdmin = false;
    }
    else{
      this.isAdmin = true;
    }
  }

}
