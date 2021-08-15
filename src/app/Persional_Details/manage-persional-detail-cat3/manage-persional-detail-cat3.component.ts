import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {
  NG_VALIDATORS, Validator,
  Validators, AbstractControl, ValidatorFn, FormGroup, NgForm
} from '@angular/forms';

import {PersionalDetailsCat2} from '../persional-details-cat2';
import {DISTRICTS} from '../data-sources/districts';

import { TokenStorageService } from '../../_services/token-storage.service';
import { NavbarShowHideService } from '../../_services/navbar-show-hide.service';

import {PersionalDetailCat1Service} from '../service/persional-detail-cat1-service.service';
import {Router} from '@angular/router';
import { DatePipe, formatCurrency, formatDate } from '@angular/common';

import {forkJoin} from 'rxjs';

import { District } from '../../Application-details/models/district';

import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import { DataloadService} from '../service/dataload.service';
import { AppComponent } from '../../app.component';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { LangaugeService } from '../../language/Service/langauge.service';
import { environment } from 'src/environments/environment';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { RedirectToSequeceService } from 'src/app/_services/RedirectToSequece.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-manage-persional-detail-cat3',
  templateUrl: './manage-persional-detail-cat3.component.html',
  styleUrls: ['./manage-persional-detail-cat3.component.sass']
})
export class ManagePersionalDetailCat3Component implements OnInit {

  @ViewChild('fillMandatory') fillMandatory;
  @ViewChild('successMessage') message;

  modalRef: BsModalRef;

  constructor(private api: DataloadService,private toastr: ToastrService ,private redirect:RedirectToSequeceService,private tag:LangaugeService,private appComponent: AppComponent,private datepipe: DatePipe,private tokenStorageService: TokenStorageService, public nav: NavbarShowHideService,private persionalDetailCat1Service: PersionalDetailCat1Service, private router: Router, private modalService: BsModalService) {
  }

  personalDetailsCat2: PersionalDetailsCat2 = new PersionalDetailsCat2();

  faInfoCircle = faInfoCircle;
  userId: number;
  error: string='';
  initialApplicantId = "";
  userEmail = '';
  clicked = false;
    //fileuploding
    show = true;
    selectedFiles: FileList;
    currentFileUpload: File;
    progress: { percentage: number } = { percentage: 0 };
    nicuploaded: File;
    base_url= environment.base_url;
    imagename:string=''
    districts:string;
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  userNIC : string;
  visible = false;
  isToggle : boolean=false; 
  initialstudent_id: string='';
  program_id: string='' ;
  isFill: string='';
  image_path: string='';
  public initialstudentId: number;
  public districtid:number;
  public address: string='';
  public applicanttype:number;
nic:string='';
checkimage:string='';
checknumber=0;

  applicantAgeToToday: number;

  gender: any;
  district: District[];
  division:any[]=[];
  birthday: Date;
  birthdayDisplay: string;
  postalcode: string='';
  city: string='';

  data = {
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
  };



  selectFile(event) {
    this.selectedFiles = event.target.files;
  }







  upload(data:NgForm) {
    this.progress.percentage = 0;
    this.imagename=localStorage.getItem('nic')+'.png';
if (this.selectedFiles) {
  this.currentFileUpload = this.selectedFiles.item(0);
  console.log("exitvalue");
  this.persionalDetailCat1Service.upload(this.currentFileUpload,this.imagename).subscribe(event => {
     
    if (event.type === HttpEventType.UploadProgress) {
      this.progress.percentage = Math.round(100 * event.loaded / event.total);
    } else if (event instanceof HttpResponse) {
  
      data['image_path']= this.imagename+".png";
      this.saveChanges(data)
      console.log('File is completely uploaded!',);
    }
  });
  
} else if(this.checkimage){
  console.log("Past value exitsing");
  this.saveChanges(data);
}else{
this.toastr.error('Add image of NIC')
console.log("notexitvalue warning");
}
   
    

    this.selectedFiles = undefined;
  }
  uploadchanges(data:NgForm) {
    this.progress.percentage = 0;
    this.imagename=localStorage.getItem('nic')+'.png';

    if (this.selectedFiles) {
      this.currentFileUpload = this.selectedFiles.item(0);
      this.persionalDetailCat1Service.upload(this.currentFileUpload,this.imagename).subscribe(event => {
      
       if (event.type === HttpEventType.UploadProgress) {
         this.progress.percentage = Math.round(100 * event.loaded / event.total);
       } else if (event instanceof HttpResponse) {
     
         data['image_path']= this.imagename+".png";
         this.validationsCheckingForContinue(data);
         console.log('File is completely uploaded!',);
       }
     });
    }
    else if(this.checkimage){
      console.log("Past value exitsing");
      this.validationsCheckingForContinue(data);
    }else{
    this.toastr.error('Add image of NIC')
    console.log("notexitvalue warning");
    }

    

    this.selectedFiles = undefined;
  }
download(){
  console.log("buttonwork");
  
  this.imagename=localStorage.getItem('nic')+'.png';
  this.persionalDetailCat1Service.getFiles(this.imagename);
}
  saveChanges(data: NgForm): void {

    data['initialStudentId'] = this.initialstudent_id;
    data['programId'] = this.program_id;
    data['isFill'] =1;
    data['image_path']="path";
    data['checknumber']=this.checknumber;
console.log(data,"sksjjj");

    var birthdateString = this.personalDetailsCat2.dateOfBirth;
    if (birthdateString) {
      var splitData = birthdateString.split('/', 3);
      var birthdateYear = splitData[0];
      var birthdateMonth = splitData[1];
      var birthdateDay = splitData[2];
      var birthdate = new Date(birthdateYear + '-' + birthdateMonth + '-' + birthdateDay);
    
      
      data['dateOfBirth'] = birthdate;
      
    }
    this.persionalDetailCat1Service.saveLocalApplicant(data).subscribe(res => {
      this.fill(this.message);
      this.router.navigateByUrl('home');
    }), (err) => {
      console.log(err);
      this.fill(this.fillMandatory);
    };
  }

  fill(fillMandatory: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      fillMandatory,
      Object.assign({}, {class: 'gray modal-sm'})
    );
  }

  saveLocalApplicant(data: NgForm): void {

    
    data['initialStudentId'] = this.initialstudent_id;
    data['programId'] = this.program_id;
    data['isFill'] =1;
    data['image_path']= this.nic;
    var birthdateString = this.personalDetailsCat2.dateOfBirth;
    var splitData = birthdateString.split('/', 3);
    var birthdateYear = splitData[0];
    var birthdateMonth = splitData[1];
    var birthdateDay = splitData[2];
    var birthdate = new Date(birthdateYear + '-' + birthdateMonth + '-' + birthdateDay);

    data['dateOfBirth'] = new Date(birthdate);
  
    this.persionalDetailCat1Service.saveLocalApplicant(data).subscribe(res => {
      this.fill(this.message);
      this.redirect.RedirectTo(this.initialApplicantId);
      // this.appComponent.edu_qua();
    }),(err) => {
      console.log(err);
      this.fill(this.fillMandatory);
    };

  }


  calculateAge(param: string): number {

    var birthdateString = this.personalDetailsCat2.dateOfBirth;

    var splitData = birthdateString.split('/', 3);
    var birthdateYear = splitData[0];
    var birthdateMonth = splitData[1];
    var birthdateDay = splitData[2];

    var birthdate = new Date(birthdateYear + '-' + birthdateMonth + '-' + birthdateDay);


    var checkDate: Date;
    var dateString = '2021-01-01';
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
      }
      if (agemonth == 12) {
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

  // **************************************

  ListHasError = true;

  validateAList(value) {
    localStorage.setItem("districtid", value);
    if (value === 'default') {
      this.ListHasError = true;
    } else {
      this.ListHasError = false;
    }
  }

  // **************************************
  divisionals: any[];

  loadDivisionalSecretariat(value) {
    if (value != 'default') {

      console.log("divison");
      this.persionalDetailCat1Service.getdivison(value).subscribe(res =>{console.log(res);
        res.forEach(s=> this.division.push(s))
        this.division=res }, err => {
          console.log(err);
        });

        
      //let variable = this.districts.find(e => e.id == value);
      //this.divisionals = variable.divisional;
     // this.personalDetailsCat2.postalCode = variable.postalCode;
    }


  }
  // getcities(city){
  //   let a =  this.district.filter(a=>a.id==city);
    
  // this.getcity(a[0]["description"]);

  // }

  //****************************************************************************

  validationsCheckingForContinue(data: NgForm): void {
    if (!this.validateAge()) {
      alert('You should be 18 years old or greater than 18 to apply to this program. Once you are 18 years old OUSL will notify you');
      this.router.navigateByUrl('home');
    } else if (this.validateTotalCreditLimit()) {
      alert('You can’t apply to another program because you exceed the maximum credit limit of OUSL');
      this.router.navigateByUrl('home');
    } else if (this.validateReApply()) {
      alert('You can’t submit twice for same program within same academic year');
      this.router.navigateByUrl('home');
    } else {
      this.checknumber=1;
      this.saveLocalApplicant(data);
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
    var gender = '';

    if (NICNo.length == 10) {

      birthYear = '19' + NICNo.substr(0, 2);
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

      alert('NIC is invalid. Check your 3-5 numbers if you are born before 2015. otherwise 5-7 numbers');
    } else {

      //Month

      if (dayText > 335) {
        birthDate = dayText - 335;
        birthMonth = '12';
      } else if (dayText > 305) {
        birthDate = dayText - 305;
        birthMonth = '11';
      } else if (dayText > 274) {
        birthDate = dayText - 274;
        birthMonth = '10';
      } else if (dayText > 244) {
        birthDate = dayText - 244;
        birthMonth = '9';
      } else if (dayText > 213) {
        birthDate = dayText - 213;
        birthMonth = '8';
      } else if (dayText > 182) {
        birthDate = dayText - 182;
        birthMonth = '7';
      } else if (dayText > 152) {
        birthDate = dayText - 152;
        birthMonth = '6';
      } else if (dayText > 121) {
        birthDate = dayText - 121;
        birthMonth = '5';
      } else if (dayText > 91) {
        birthDate = dayText - 91;
        birthMonth = '4';
      } else if (dayText > 60) {
        birthDate = dayText - 60;
        birthMonth = '3';
      } else if (dayText < 32) {
        birthDate = dayText;
        birthMonth = '1';
      } else if (dayText > 31) {

        birthDate = dayText - 31;
        birthMonth = '2';
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

    this.personalDetailsCat2.dateOfBirth = birthYear+ '/' + birthMonthString + '/' +birthDateString ;
//birthDateString + '/' + birthMonthString + '/' + birthYear

    this.calculateAge('cal');

  }

  // **********************************************************************************


  //************************************************************************************/
  async  ngOnInit() {
    this.initialApplicantId= localStorage.getItem('initialapplicantid');
    localStorage.setItem("name",'personalL2');
    this.persionalDetailCat1Service.getdistrict().subscribe(d=> {this.district = d});
    this.districtid = Number(localStorage.getItem('districtid'));
 
    

  /*  if (!this.userNIC) {
      this.persionalDetailCat1Service.getEmail(this.userId).subscribe(res => {
        this.userEmail = res.email;
        this.personalDetailsCat2.email = res.email;
      }, err => {
        console.log(err, 'eror');
      });


      this.persionalDetailCat1Service.getNIC(this.userId).subscribe(res => {
        this.userNIC = res.email;
        this.personalDetailsCat2.nic = res.email;
        this.validateNIC(this.userNIC);
      }, err => {
        console.log(err, 'eror');
      });
    }*/
    this.initialstudent_id= localStorage.getItem('initialstudentid');
    this.initialstudentId = Number(localStorage.getItem('initialstudentid'));
    console.log(this.initialstudentId);
     this.applicanttype=Number(localStorage.getItem('applicanttypeid'));
     this.nic= localStorage.getItem('nic');
   
if(this.applicanttype==1){

    await this.getDetailLocalApplicant(this.nic);

    if(this.error=="No data"){
      
        this.getintitialstudent(this.initialstudentId);
      
      }
  
    this.city = localStorage.getItem("city");
    console.log(this.city);

    
    }
  }



  async getcity(city,districts){
    console.log("test");
    await this.persionalDetailCat1Service.getpostalcheckcode(city,districts).toPromise().then(s=>{
      console.log(s,"test");
      this.personalDetailsCat2.postalCode =s['postalcode'];
  }
     );
  
  }
  
  async getDetailLocalApplicant(nic){
   // this.initialstudent_id=localStorage.getItem('nic');
    
    this.program_id= localStorage.getItem('programmeid');
        
   
    console.log('nodata');
  await this.persionalDetailCat1Service.getDetailLocalApplicant(nic).toPromise()
    .then( res=>{
      this.personalDetailsCat2.nic=res['nic'];
      this.personalDetailsCat2.title = res['applicant']['title'];
      this.personalDetailsCat2.initials=res['initials'];
      this.personalDetailsCat2.lastName=res['lastName'];
      this.personalDetailsCat2.meaningOfInitials=res['meaningOfInitials'];
      this.personalDetailsCat2.nationality=res['applicant']['nationality'];
      this.personalDetailsCat2.postalCode=res['postalCode'];
      this.personalDetailsCat2.reason=res['reason'];
      this.personalDetailsCat2.disable=res['disable'];
      this.personalDetailsCat2.gender=res['applicant']['gender'];
      this.personalDetailsCat2.mobileNo=res['mobileNo'];
      this.personalDetailsCat2.email=res['applicant']['email'];
      this.personalDetailsCat2.birthCertificateNo=res['birthCertificateNo'];
      this.show = false;
      this.checkimage=res['nic'];
      // let personalAge : Date = res['applicant']['dateOfBirth'];
      // let dateage = this.datepipe.transform(personalAge, 'MM/dd/yyyy');
      this.personalDetailsCat2.dateOfBirth=this.datepipe.transform(res['applicant']['dateOfBirth'],"yyyy/MM/dd");4
      console.log(res['applicant']['dateOfBirth']);
      
      if(this.personalDetailsCat2.dateOfBirth.trim()!=null){
        this.personalDetailsCat2.age =this.calculateAge(this.personalDetailsCat2.dateOfBirth.toString());
      }
      
      this.personalDetailsCat2.address=res['address'];
      this.personalDetailsCat2.district=res['district'];
    
      this.persionalDetailCat1Service.getdivison(res['district']).subscribe(d=> {this.division = d});
      this.personalDetailsCat2.division=res['division'];
      
      
      this.personalDetailsCat2.contactNo=res['applicant']['mobileNoLocal'];
      this.personalDetailsCat2.correspondenceAddress=res['applicant']['foriegnAddress'];
      this.personalDetailsCat2.correspondenceDistrict=res['correspondenceDistrict'];
     console.log(res,"log");


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
    console.log("initialstudentid");
    console.log(initialstudentId); 

    await this.api.getintitialstudent(initialstudentId)
    .subscribe( res => {
      console.log("ok");
      console.log(res);
      
       this.personalDetailsCat2.correspondenceAddress=res['correspondanceaddress'];
       this.address=this.personalDetailsCat2.correspondenceAddress;
       var town = res['town'];

       this.districts= this.address.split(" ").pop();
  
       console.log(this.districts);
       localStorage.setItem("city",town );
       this.getcity(town,this.districts);
       this.personalDetailsCat2.email=res['email'];
       this.personalDetailsCat2.mobileNo = res['mobileno'];
       this.personalDetailsCat2.nic = res['nic'];
      // this.initialstudent_id = res['id'];
       this.program_id = res['programStarted']['program']['programId'];
       console.log(this.personalDetailsCat2.address);
    this.validateNIC(this.personalDetailsCat2.nic);
      
    }, err => {
      console.log(err);
    });
  
  
  
    }


    callopen():void{

      this.tag.filter('open');
    }
  


}
