import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgModule } from '@angular/core';
import {
  NG_VALIDATORS, Validator,
  Validators, AbstractControl, ValidatorFn, FormGroup, NgForm
} from '@angular/forms';
import { FormsModule } from '@angular/forms'
import { FormControl } from '@angular/forms';

import { DataloadService} from '../service/dataload.service';

import { PersionalDetailsCat1 } from '../persional-details-cat1';
import { TokenStorageService } from '../../_services/token-storage.service';
import { NavbarShowHideService } from '../../_services/navbar-show-hide.service';

import { from } from 'rxjs';
import { PersionalDetailCat1Service } from '../service/persional-detail-cat1-service.service';
import { Router } from '@angular/router';
import { DatePipe, formatCurrency, formatDate } from '@angular/common';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponent} from '../../app.component';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import{LangaugeService} from '../../language/Service/langauge.service';
import { environment } from 'src/environments/environment';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { RedirectToSequeceService } from 'src/app/_services/RedirectToSequece.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-persional-detail-cat1',
  templateUrl: './manage-persional-detail-cat1.component.html',
  styleUrls: ['./manage-persional-detail-cat1.component.sass']
})
export class ManagePersionalDetailCat1Component implements OnInit {

  faInfoCircle = faInfoCircle;
  open=1;
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  userNIC : string;
  visible = false;
  isToggle : boolean=false; 
  public initialstudentId: number;
  program_id: string='' ;
  isFill: string='';
  image_path: string='';
  status=1;
  S_status:number;
  show=true;
  public applicanttype: number;
  passport:string='';
  initialApplicantId = "";
  clicked = false;
  
  //fileuploding
  
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  nicuploaded: File;
  base_url= environment.base_url;
  imagename:string='';
  checknumber=0;

  data={
    id:0,
    title:Number,
    gender:'',
    dateOfBirth:'',
    nationality:'',
    email:'',
    foriegnAddress:'',
    localAddress:'',
    mobileNoForiegn:'',
    mobileNoLocal:'',
    familyName:'',
    firstName:'',
    middleName:'',
    countryOfBirth:'',
    passportNo:'',
    passportIssuedCountry:'',
    passportExpirydate:'',
    embassyFaxNo:'',
    embassyEmailAddress:'',
    embassyContactNo:'', 
    initialStudentId:''

  }

  @ViewChild('fillMandatory') fillMandatory;
  @ViewChild('successMessage') message;

  public details: any = [];

  checkimage:string='';
  modalRef: BsModalRef;



  constructor(private api: DataloadService,private toastr: ToastrService ,private redirect:RedirectToSequeceService,private tag:LangaugeService,private tokenStorageService: TokenStorageService,private datepipe: DatePipe, public nav: NavbarShowHideService,private persionalDetailCat1Service: PersionalDetailCat1Service,private router : Router,private modalService: BsModalService,private appComponent:AppComponent) { }

  personalDetailsCat1: PersionalDetailsCat1 = new PersionalDetailsCat1();

  applicantAgeToToday: number;

  countryInfo: any[] = [];

  userId =1;
  userEmail : string='';
  initialstudent_id: string='';
  error: string='';

  //
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload(data:NgForm) {
    this.progress.percentage = 0;
    this.imagename=localStorage.getItem('nic')+'.png';
    if (this.selectedFiles){
      this.currentFileUpload = this.selectedFiles.item(0);
      this.persionalDetailCat1Service.upload(this.currentFileUpload,this.imagename).subscribe(event => {
      
       if (event.type === HttpEventType.UploadProgress) {
         this.progress.percentage = Math.round(100 * event.loaded / event.total);
       } else if (event instanceof HttpResponse) {
     
         data['image_path']= this.imagename+".png";
         this.saveChanges(data)
         console.log('File is completely uploaded!',);
       }
     });
     
    }
    else if(this.checkimage){
      console.log("Past value exitsing");
      this.saveChanges(data);
    }else{
    this.toastr.error('Add image of Passport')
    console.log("notexitvalue warning");
    }

    this.selectedFiles = undefined;
  }
  uploadchanges(data:NgForm) {
    this.progress.percentage = 0;
    this.imagename=localStorage.getItem('nic')+'.png';
    if (this.selectedFiles){
      this.currentFileUpload = this.selectedFiles.item(0);
      this.persionalDetailCat1Service.upload(this.currentFileUpload,this.imagename).subscribe(event => {
      

       if (event.type === HttpEventType.UploadProgress) {
         this.progress.percentage = Math.round(100 * event.loaded / event.total);
       } else if (event instanceof HttpResponse) {
     
         data['image_path']= this.imagename+".png";
         this.validationsCheckingForContinue(data);
         console.log('File is completely uploaded!');
       }
     });
    }


    else if(this.checkimage){
      console.log("Past value exitsing");
      this.validationsCheckingForContinue(data);
    }else{
    this.toastr.error('Add image of Passport')
    console.log("notexitvalue warning");
    }
    this.selectedFiles = undefined;
  }
download(){
  console.log("buttonwork");
  
  this.imagename=localStorage.getItem('nic')+'.png';
  this.persionalDetailCat1Service.getFiles(this.imagename);
}


  saveChanges(data:NgForm){

    data['initialStudentId'] = this.initialstudent_id;
    data['programId'] =this.program_id;
    data['isFill'] =1;
    data['checknumber']=this.checknumber;
    console.log(data);
    

    this.persionalDetailCat1Service.saveForeignApplicant(data).subscribe(res=>{
      this.fill(this.message);
      this.router.navigateByUrl('home');
      console.log(data);
      
    },(err) => {
      console.log(err);
      this.fill(this.fillMandatory);
    });
  }

  fill(fillMandatory: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      fillMandatory,
      Object.assign({}, { class: 'gray modal-sm' })
    );
  }



  saveApplicant(data:NgForm){
    data['initialStudentId'] = this.initialstudent_id;
    data['programId'] = this.program_id;
    data['isFill'] =1;
   // data['image_path']="path";
    this.persionalDetailCat1Service.saveForeignApplicant(data).subscribe(res=>{
      
    this.redirect.RedirectTo(this.initialApplicantId);
      // this.appComponent.edu_qua();
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
          this.personalDetailsCat1.age=ageyear;
        }
      } else {
        returnAge = ageyear;
      }


    }
    return returnAge;
  }
  validationsCheckingForContinue(data:NgForm): void {

    if (!this.validateAge()) {
      alert('You should be 18 years old or greater than 18 to apply to this program. Once you are 18 years old OUSL will notify you');
      this.router.navigateByUrl('home');
    } else if (!this.validateTotalCreditLimit()) {
      alert('You can’t apply to another program because you exceed the maximum credit limit of OUSL');
      this.router.navigateByUrl('home/professional-qualification');
    } else if (!this.validateReApply()) {
      alert('You can’t submit twice for same program within same academic year');
      this.router.navigateByUrl('home/professional-qualification');
    }else{
      this.checknumber=1;
      this.saveApplicant(data);
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

    // Need code

    return isTrue;
  }
  validateReApply(): boolean {
    var isTrue: boolean = true;

    // Need code

    return isTrue;
  }

  // **************************************

  ListHasError =true;

  validateAList(value){
    if(value =='default'){
      this.ListHasError =true;
    }
    else{
      this.ListHasError = false;
    }
  }

  // **************************************

   async  ngOnInit(){

    this.initialApplicantId= localStorage.getItem('initialapplicantid');
    localStorage.setItem("name",'personalF');

 this.persionalDetailCat1Service.getAllCountries().
    subscribe(
      data2 => {
        this.countryInfo = data2;
      },
      err => console.log(err),
      () => console.log('complete')
    );
    this.details = sessionStorage.getItem("details");
 
    this.initialstudentId = Number(localStorage.getItem('initialstudentid'));

    this.initialstudent_id= localStorage.getItem('initialstudentid');
  
this.applicanttype=Number(localStorage.getItem('applicanttypeid'));

   this.passport=localStorage.getItem('nic');

   
   

if(this.applicanttype==2){
    await this.getDetailForeignApplicant(this.passport);

    if(this.error=="No data"){
      
        this.getintitialstudent(this.initialstudentId);
      
      }

    if(this.S_status>=2){
      this.show=false;
      console.log(this.status);

    }
    else{
      this.show=true;
    }

  }
    
    

  }



  async getDetailForeignApplicant(passport){
   // this.initialstudent_id=localStorage.getItem('passport');
    
    this.program_id= localStorage.getItem('programmeid');
        
   
    
  await this.persionalDetailCat1Service.getDetailForeignApplicant(passport).toPromise()
    .then( res=>{console.log("forieng",res);
      this.personalDetailsCat1.passportNo=res['passportNo'];
      this.personalDetailsCat1.passportIssuedCountry=res['passportIssuedCountry'];
      this.personalDetailsCat1.passportExpirydate=res['passportExpirydate'];
      this.personalDetailsCat1.title = res['applicant']['title'];
      this.personalDetailsCat1.familyName=res['familyName'];
      this.personalDetailsCat1.firstName=res['firstName'];
      this.personalDetailsCat1.middleName=res['middleName'];
      this.personalDetailsCat1.nationality=res['applicant']['nationality'];
      this.personalDetailsCat1.foriegnAddress=res['applicant']['foriegnAddress'];
      this.personalDetailsCat1.localAddress=res['applicant']['localAddress'];
      this.personalDetailsCat1.mobileNoForiegn=res['applicant']['mobileNoForiegn'];
      this.personalDetailsCat1.gender=res['applicant']['gender'];
      this.personalDetailsCat1.mobileNoLocal=res['applicant']['mobileNoLocal'];
      this.personalDetailsCat1.email=res['applicant']['email'];
      this.checkimage=res['passportNo'];
      // let personalAge : Date = res['applicant']['dateOfBirth'];
      // let dateage = this.datepipe.transform(personalAge, 'MM/dd/yyyy');
      this.personalDetailsCat1.dateOfBirth=res['applicant']['dateOfBirth'];
      this.personalDetailsCat1.countryOfBirth=res['countryOfBirth'];
     this.personalDetailsCat1.age=this.calculateAge(this.personalDetailsCat1.dateOfBirth.toString());
     this.show = false;
      //this.persionalDetailCat1Service.getdivison(res['district']).subscribe(d=> {this.division = d});
      this.personalDetailsCat1.embassyFaxNo=res['embassyContactNo'];
      this.personalDetailsCat1.embassyEmailAddress=res['embassyEmailAddress'];
      this.personalDetailsCat1.embassyContactNo=res['embassyContactNo'];
     // this.personalDetailsCat1.correspondenceDistrict=res['correspondenceDistrict'];
     


    }).
    catch(e=> {console.log(e['error']['message'])
 this.error= e['error']['message'];
 console.log(this.error,'here comes error');
 
    })

//       this.appservice.saveapplicantform(applicantion).toPromise().
// then(s=>{this.toastr.success("Application Submitted Successfully!",s['message']);this.router.navigate(['/login'])})
// .catch((s)=>{this.toastr.error("Error",s['error']['message']);console.log(s);});
      
      

    
  
  }
  

 async getintitialstudent(initialstudentId){
  console.log("initialstudentId--------------------------");
  console.log(initialstudentId); 
  await this.api.getintitialstudent(initialstudentId)
  .subscribe( res => {
    console.log("ok");
    console.log(res);
    
     this.personalDetailsCat1.foriegnAddress=res['correspondanceaddress'];
     this.personalDetailsCat1.email=res['email'];
     this.personalDetailsCat1.mobileNoForiegn = res['mobileno'];
     this.personalDetailsCat1.passportNo = res['passport'];
    // this.initialstudent_id = res['id'];
     this.program_id = res['programStarted']['program']['programId'];
    this.S_status = res['studentStatus']['id'];
     console.log("indprograme id",this.program_id);
     console.log(this.personalDetailsCat1.foriegnAddress);
    localStorage.setItem("foriengAddress",this.personalDetailsCat1.foriegnAddress);
    
  }, err => {
    console.log(err);
  });



  }



  callopen():void{

    this.tag.filter('open');
  }

      
     
}
