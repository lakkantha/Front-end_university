import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Program } from 'src/app/Application-details/models/Program';
import { AppserviceService } from 'src/app/Application-details/Services/appservice.service';

import { element, Key } from 'protractor';
import { FormBuilder, Validators, FormGroup, FormControl, RequiredValidator, NgForm, DefaultValueAccessor, AbstractControl, ValidatorFn } from '@angular/forms';
import { ApplicantType } from 'src/app/Application-details/models/applicanttype';
import { isEmpty, switchMap } from 'rxjs/operators';
import { InitailUser } from 'src/app/Application-details/models/initialuser';
import { program } from 'src/app/Application-details/models/programs';
import { PreferedAcademicCenter } from 'src/app/Application-details/models/ProgramAcademicCenter';
import { Specalization } from 'src/app/Application-details/models/Specilization';
import { CenterMedium } from 'src/app/Application-details/models/AcademicMedium';
import { AdminCenter } from 'src/app/Application-details/models/adminCenter';
import { Observable } from 'rxjs';
import { programspecilization } from '../../models/programspecilization';
import { Qualifications } from '../../models/qualification';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { District } from '../../models/district';
import { InitailStudent } from '../../models/initialStudent';
import { Country } from '../../models/country';
import { CountryCode } from '../../models/countrycode';
import { LangaugeService } from 'src/app/language/Service/langauge.service';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
declare var $:any;

@Component({
  selector: 'app-application-detail',
  templateUrl: './application-detail.component.html',
  styleUrls: ['./application-detail.component.css']
})
export class ApplicationDetailComponent implements OnInit {

  faInfoCircle = faInfoCircle;

  programs: program[] = [];
  programfilter: program[] = [];
  initialuser: InitailUser[];
  arrules: any[];
  spezdisable = true;
  pacdisable = true;
  smdisable = true;
  expandhdn1 = true;
  pdetails = true;
  prgdisable = true;
  public prgms: number;
  searchProgram: string;
  spezid: string;
  r1: boolean;
  r4: string = null;
  quali: boolean = false;
  local: boolean = true;
  issubmit: boolean = true;
  nicno: string;

  i: number;

  //personal details
  applicantnameis: string;
  nic: string;
  address: string;
  phone: number;
  tele: number;
  email: string;

  prgspecilization: programspecilization[];
  specilization: Specalization[];
  preferedAcenter: PreferedAcademicCenter[];
  CenterMedium: CenterMedium[];
  pacenter1: number;
  test11: any;
  admincenter: number;
  Adcenter: AdminCenter[];
  center: string;

  initialuserdata: Observable<InitailUser[]>;
  applicantdata: InitailUser;
  qualification: Qualifications[];
  qulificationSelected: number;
  applicanttype: ApplicantType[];
  district: District[];
  initailstudent: InitailStudent[];
  applicationperiod: Date = new Date();
  mobileno:number;


  //servicescall
  appliId: number;

  //ruleid
  rulecheck = false;
  specilizationids: number;
  medium: number;
  submitted = false;
  radiosel: any;
  isSpezavailable: boolean = false;
  isStreamavailable: boolean = false;
  currdate: String;
  myDate = new Date();
  issubmitted: boolean = false;
  studentadmincenter: Number;
  birthdate: any;
  applidate: program[] = [];
  countrycode: CountryCode[];
  programStartedId: number;
  centerid: number;
  disablebtns: boolean = true;
  country: Country[];
  newruleinput:boolean = false;
  placeholdermobile:string;
  ccode: any;






  constructor(private appservice: AppserviceService, private router: Router,private tag:LangaugeService,
    private toastr: ToastrService) {

  }

  newform(): void {
    // this.initialuser = new Ini
  }

  async ngOnInit() {


    localStorage.setItem("name",'Shortapplication');

    $('[data-toggle="tooltip"]').tooltip();



    // this.appservice.getApplicationType().subscribe(atdata=> {this.applicanttype = atdata
    // });
    this.applicanttype = await this.appservice.getApplicationType().toPromise()
    this.appliId = 1;
    this.ApplicationForm.removeControl("passport");

    this.appservice.getdistrict().subscribe(d => { this.district = d })
    this.appservice.getCountry().subscribe(c => { this.country = c }
    )

    // this.appservice.getPrograms().subscribe((pdata)=> { /*this.programs = pdata*/
    //   pdata.forEach(s=>{ this.applidate=pdata,

    //    this.programs.push(s['programStarted']),
    //     this.programfilter.push(s['programStarted'])

    //   })
    //   console.log(pdata);


    // });
    let programsonly = await this.appservice.getPrograms().toPromise()
    this.applidate = programsonly.filter(s=> s.activity.activityId==1);
    this.applidate.forEach(s => {
      this.programs.push(s['programStarted']),
        this.programfilter.push(s['programStarted'])
      // console.log(this.programs);

    })

    this.onSelectapptype();






    // this.appservice.GetCountryCode(12).subscribe(cc => {this.countrycode = cc} );



  }


  ApplicationForm = new FormGroup({
    apptype: new FormControl('1'),
    programid: new FormControl({ value: -1, disabled: false }, [Validators.required, this.Userselected()]),
    specilizationid: new FormControl({ value: -1, disabled: true }, [Validators.required, this.Userselected()]),
    academiccenterid: new FormControl({ value: '', disabled: true }, [Validators.required, this.Userselected()]),
    med_mediumId: new FormControl({ value: '', disabled: true }, [Validators.required, this.Userselected()]),
    namewithinitials: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z]+(([',.-][a-zA-Z])?[a-zA-Z]*)*$")]),
    fullName: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z ]*)*$")]),
    nic: new FormControl('', [Validators.required, Validators.pattern("^([0-9]{9}[x|X|v|V]|[0-9]{12})$"), this.nicageValidator(this.applicationperiod)]),
    passport: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    address1: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    mobileno: new FormControl('', [Validators.required, Validators.minLength(11), Validators.pattern("^[9]{1}[4]{1}[7]{1}[0-9]{8}$")]),
    lanNo: new FormControl('',[Validators.minLength(9), Validators.maxLength(9),Validators.pattern("^[0-9]*$")]),
    email: new FormControl('', [Validators.required, Validators.email]),
    admincenterid: new FormControl(''),
    rulez1: new FormControl({ value: false }, [Validators.required]),
    userrule:new FormControl(''),
    newrule:new FormControl(''),
    agree : new FormControl(false,[Validators.requiredTrue]),
    countrycode:new FormControl(),
    town : new FormControl(''),
    otherQualification : new FormControl(),
    postalCode: new FormControl(), 
    province : new FormControl()

  });


  get a() {

    return this.ApplicationForm.controls;
  }

  Userselected(): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } | null => {

      if (control.value == -1) {
        return { "selectederror": true };
      } else {
        return null;
      }

    };
  }


  nicageValidator(applicationdate: any): ValidatorFn {

    return (control: AbstractControl): { [key: string]: boolean } | null => {


      if (control.value.length == 10 || control.value.length == 12) {
        let nicno: string = control.value;

        if (nicno.length == 10) {
          nicno = "19" + nicno
        }
        let year = nicno.substr(0, 4)

        let month = nicno.substr(4, 3)

        let intyear: number = Number(year)
        let intmonth: number = Number(month)

        if (intmonth > 500) intmonth = intmonth - 500

        let ymonth: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        let yleapmonth: number[] = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        let actualMonth = 0;
        let actualDate = 0;
        if (intyear % 4 == 0) {
          let total = 0;
          for (let j in yleapmonth) {
            total = total + yleapmonth[j];
            if (total > intmonth) {
              actualMonth = Number(j) + 1;
              total = total - yleapmonth[j]
              actualDate = intmonth - total;
              break;
            }
          }

        }
        else {
          let total = 0;
          for (let j in yleapmonth) {
            total = total + yleapmonth[j];
            if (total > intmonth) {
              actualMonth = Number(j) + 1;
              total = total - yleapmonth[j]
              actualDate = intmonth - total;
              break;
            }
          }

        }





        const dateabc = this.ApplicationForm.value['applicationabc']


        let now = new Date(dateabc);




        let yearNow = now.getFullYear();
        let monthNow = now.getMonth() + 1;
        let dateNow = now.getDate();




        let dob = new Date(intyear,
          actualMonth,
          actualDate
        );



        let yearDob = dob.getFullYear()
        let monthDob = dob.getMonth();
        let dateDob = dob.getDate();


        let age = {};
        // let ageString = "";
        // let yearString = "";
        // let monthString = "";
        // let dayString = "";




        let yearAge = yearNow - yearDob;


        if (monthNow >= monthDob)
          var monthAge = monthNow - monthDob;

        else {
          yearAge--;
          var monthAge = 12 + monthNow - monthDob;

        }




        if (dateNow >= dateDob)
          var dateAge = dateNow - dateDob;
        else {
          monthAge--;
          var dateAge = 31 + dateNow - dateDob;



          if (monthAge < 0) {
            monthAge = 11;
            yearAge--;
          }
        }



        age = {
          years: yearAge,
          months: monthAge,
          days: dateAge
        };






        // console.log(age['years']);

        if (age['years'] >= 18) {


          return null;

        }
        else {


          return { 'ageerror': true }
        }

      }

      return null;
    }


  }



  onSelectapptype() {
    this.ApplicationForm.removeControl("programid");
    this.ApplicationForm.removeControl("specilizationid");
    this.ApplicationForm.removeControl("academiccenterid");
    this.ApplicationForm.removeControl("med_mediumId");
    this.appliId = this.ApplicationForm.value['apptype'];


    this.ApplicationForm.addControl("programid", new FormControl(-1, [Validators.required, this.Userselected()]));
    this.ApplicationForm.addControl("specilizationid", new FormControl(-1, [Validators.required, this.Userselected()]));
    this.ApplicationForm.addControl("academiccenterid", new FormControl(-1, [Validators.required, this.Userselected()]));
    this.ApplicationForm.addControl("med_mediumId", new FormControl(-1, [Validators.required, this.Userselected()]));

  

    this.ApplicationForm.controls.specilizationid.disable();
    this.ApplicationForm.controls.academiccenterid.disable();
    this.ApplicationForm.controls.med_mediumId.disable();
    if (this.appliId == 2) {

       if(this.ApplicationForm.value['countrycode']!=null){
        this.ApplicationForm.get('countrycode').reset()

      }
      this.placeholdermobile=null;
      this.placeholdermobile = "00XXXXXXXX";
      this.local = false;
      this.ApplicationForm.removeControl("nic");
      this.ApplicationForm.removeControl("city");
      this.ApplicationForm.addControl("country", new FormControl('', [Validators.required]));
      this.ApplicationForm.removeControl("mobileno");
      this.ApplicationForm.addControl('mobileno', new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(12)]));
      this.ApplicationForm.addControl("passport", new FormControl('', [Validators.required]));

      this.programs = this.programfilter.filter(x => x.program.hasForiegnStudent == true)
      // this.appservice.getPrograms().subscribe((pdata)=> { /*this.programs = pdata*/
      //   pdata.forEach(s=>{ this.applidate=pdata,

      //    this.programs.push(s['programStarted'])
      //

      //   })


      // });


    } else {
      if(this.ApplicationForm.value['countrycode']!=null){
        this.ApplicationForm.get('countrycode').reset()
      }

      
      
      this.placeholdermobile=null;
      this.placeholdermobile = "7XXXXXXXX";
      this.local = true;
      this.programs = this.programfilter.filter(x => x.program.hasLocalStudent == true)



      this.ApplicationForm.removeControl("passport");
      this.ApplicationForm.removeControl("country");
      this.ApplicationForm.addControl("city", new FormControl('', [Validators.required]));
      this.ApplicationForm.addControl("nic", new FormControl('', [Validators.required, Validators.pattern("^([0-9]{9}[x|X|v|V]|[0-9]{12})$"), this.nicageValidator]));
      this.ApplicationForm.removeControl('mobileno');
      this.ApplicationForm.addControl('mobileno', new FormControl('', [Validators.required, Validators.minLength(9),Validators.maxLength(9), Validators.pattern("^[7][0-9]{8}$")]));


    }

    this.clearfields();
   

  }

  onSelectPrgrm() {
    this.newruleinput = false;
    this.ApplicationForm.removeControl("specilizationid");
    this.ApplicationForm.removeControl("academiccenterid");
    this.ApplicationForm.removeControl("med_mediumId");
    this.ApplicationForm.addControl("specilizationid", new FormControl(-1, [Validators.required, this.Userselected()]));
    this.ApplicationForm.addControl("academiccenterid", new FormControl(-1, [Validators.required, this.Userselected()]));
    this.ApplicationForm.addControl("med_mediumId", new FormControl(-1, [Validators.required, this.Userselected()]));
    this.prgms = this.ApplicationForm.value['programid'];
    this.ApplicationForm.get('newrule').setValue(null);

    this.programStartedId = this.applidate.filter(s => s['programStarted']['program']['programId'] == this.prgms)[0]['programStarted']['programStartedId'];

    // console.log(this.programStartedId);
    // console.log(this.applidate);



    this.ApplicationForm.addControl("academiccenterid", new FormControl(-1, [Validators.required]));
    this.ApplicationForm.controls['academiccenterid'].setValue(null);
    this.ApplicationForm.controls['med_mediumId'].setValue(null);
    this.pdetails = true;

    let validityperiod: program = this.applidate.filter(s => s['programStarted']['program']['programId'] == this.prgms)[0]


    this.applicationperiod = new Date(validityperiod.dateTo);

    this.ApplicationForm.addControl('applicationabc', new FormControl(this.applicationperiod));



    //
    this.ApplicationForm.addControl("specilizationid", new FormControl(-1, [Validators.required]));



    let selectedProgram: program = this.programs.filter(s => s['program']['programId'] == this.prgms)[0]


    if (selectedProgram.program.specilizationApplicable == true) {
      this.isSpezavailable = true;
      this.ApplicationForm.controls.specilizationid.enable();
      this.appservice.findApplicationProgram(this.prgms).subscribe(spez => {
        this.prgspecilization = spez
      });
      this.ApplicationForm.controls.academiccenterid.disable();


    }
    else {
      // console.log("No Specilization");
      this.isSpezavailable = false;
      this.isStreamavailable = false;
      this.ApplicationForm.value['specilizationid'] = null;
      this.ApplicationForm.removeControl("specilizationid");
      this.appservice.findPreferedAcademicCenter(this.programStartedId).subscribe(pacpdata => {
        this.preferedAcenter = pacpdata,
        this.preferedAcenter.sort((a,b)=> (a.cnt_center.cnt_description.toLowerCase()>b.cnt_center.cnt_description.toLowerCase()) ? 1 : -1)
      });
      
      this.ApplicationForm.controls.academiccenterid.enable();

    }

    this.appservice.getQualifications(this.prgms).subscribe(qdata => {
      this.qualification = qdata
      for (let i = 0; i < this.qualification[0].qualifications.length; i++) {
        // console.log(this.qualification[0].qualifications[i]);
        this.ApplicationForm.addControl("rulez" + i, new FormControl(false));
      }
      // this.ApplicationForm.get('rulez1').setValue(false);
      for (let j = 0; j < this.qualification[0].qualifications.length; j++) {
        this.ApplicationForm.get("rulez" + j).setValue(false)
      }
    })

    this.ApplicationForm.controls.med_mediumId.disable();
    // console.log(this.a,"details");
    this.expandhdn1= true;


  }

  onSelectSpez() {


    this.prgms = this.ApplicationForm.value['programid']
    this.ApplicationForm.controls.academiccenterid.enable();
    this.appservice.findPreferedAcademicCenter(this.programStartedId).subscribe(pacpdata => {
      this.preferedAcenter = pacpdata,
      this.preferedAcenter.sort((a,b)=> (a.cnt_center.cnt_description.toLowerCase()>b.cnt_center.cnt_description.toLowerCase()) ? 1 : -1)
    });
    

    this.specilizationids = this.ApplicationForm.value['specilizationid']
  }

  onSelectPac() {
    this.ApplicationForm.controls.med_mediumId.enable();
    this.pacenter1 = this.ApplicationForm.value['academiccenterid']
    this.appservice.findCenterMedium(this.pacenter1).subscribe(cmedium => {
      this.CenterMedium = cmedium

    });

  }

  async getadmincenter(event: any) {



    this.admincenter = event.target.value;

    if (this.appliId == 1) {
      this.ApplicationForm.get('countrycode').setValue(94)
      this.centerid = this.district.filter(ad => ad['description'] == this.admincenter.toString())[0]['id'];
  

      this.appservice.getAdminCenter(this.centerid).subscribe(adc => {
        this.Adcenter = adc,
        this.center = adc['rgtAdminCenter']['adc_description'];
        this.studentadmincenter = adc['rgtAdminCenter']['adc_adminCenterId']
      }
      );
    } else {

      this.appservice.getAdminCenter(5).subscribe(adc => {
        this.Adcenter = adc,
        this.center = adc['rgtAdminCenter']['adc_description'];
        this.studentadmincenter = adc['rgtAdminCenter']['adc_adminCenterId']
      }
      );

      let countryid = this.country.filter(s => s['name'] == this.ApplicationForm.value['country']);
      this.ccode=null;
    this.ccode= await this.appservice.GetCountryCode(countryid[0]["id"]).toPromise();
    
    let c = this.ccode[0]['teleCode']

    this.ApplicationForm.get('countrycode').setValue(c);

    }

  }


  getmedium(event: any) {

    if(this.appliId==1){
      this.ApplicationForm.get('countrycode').setValue(94);
    }

    this.medium = this.ApplicationForm.value['med_mediumId']


    this.expandhdn1 = false;
  


  }

  qualit(event: any, i) {
    this.ApplicationForm.get('userrule').setValue(false);
    this.newruleinput = false;
    this.ApplicationForm.get('newrule').setValue(null);
    this.qulificationSelected = i;
    let q = event.target.value;



    for (let j = 0; j < this.qualification[0].qualifications.length; j++) {
      if (i != j) {
        this.ApplicationForm.get("rulez" + j).setValue(false)
      }
    }

    if(q=="An equivalent or higher qualification acceptable to the Senate"){
      this.qualituser(i);
    }

    this.pdetails = false;

  }

  qualituser(i){
    this.newruleinput = true;
    for (let j = 0; j < this.qualification[0].qualifications.length; j++) {
      if (i != j) {
        this.ApplicationForm.get("rulez" + j).setValue(false)
      }

    }

    

  }

  entering(){ 
    if(this.ApplicationForm.value['newrule']!=null){
      
      this.pdetails = false;
      

      if(this.ApplicationForm.value['newrule']== ""|| this.ApplicationForm.value['newrule']==" "){
        
        this.pdetails = true;
      }
    }
    
    // console.log(this.ApplicationForm.value['newrule']);
    
  }




  async userdetails() {
    
    if (this.appliId == 1) {
      let usernic = this.ApplicationForm.value['nic'];
      if (usernic.length == 10 || usernic.length == 12) {
        let nic = await this.appservice.Getuserbynic(usernic.toLocaleLowerCase()).toPromise()
        this.initailstudent = nic
        // console.log(nic);

        if (nic != null) {
          let nic1: string = nic['correspondanceaddress']
          let add: string[] = nic1.split(",");



          this.ApplicationForm.get("namewithinitials").setValue(nic['namewithinitials']);
          this.ApplicationForm.get("fullName").setValue(nic['fullName']);
          this.ApplicationForm.patchValue({ mobileno: nic['mobileno'].replace('94','') });
          this.ApplicationForm.patchValue({ email: nic['email'] });
          this.ApplicationForm.patchValue({ lanNo: nic['lanNo'].replace('94','') });
          this.ApplicationForm.patchValue({ address: add[0] });
          this.ApplicationForm.patchValue({ address1: add[1].trim() });
          this.ApplicationForm.patchValue({town: nic['town']});
          this.ApplicationForm.get('city').setValue(add[2].trim());
          this.ApplicationForm.get('countrycode').setValue(94);
          
          this.centerid = this.district.filter(ad => ad['description'] == this.ApplicationForm.value['city'])[0]['id'];
        
          this.appservice.getAdminCenter(this.centerid).subscribe(adc => {
            this.Adcenter = (adc)
            this.center = adc['rgtAdminCenter']['adc_description'];
            this.studentadmincenter = adc['rgtAdminCenter']['adc_adminCenterId']

          }
          );

        }
        else if(nic==null){
         
          
        }
        else {
          this.clearfields();
        }



      }
      else if(this.initailstudent == null){
       
        
      }
      else {
        this.clearfields();
      }


    } else if (this.appliId == 2) {

      let usernic = this.ApplicationForm.value['passport'];

      let nic = await this.appservice.Getuserbypassport(usernic).toPromise();
      this.initailstudent = nic
      

      if (nic != null) {
        
        
        let nic1: string = nic['correspondanceaddress']
        let add: string[] = nic1.split(",");
        // this.programStartedId = this.applidate.filter(s => s['programStarted']['program']['programId'] == this.prgms)[0]['programStarted']['programStartedId'];
        let countryid = this.country.filter(s => s['name'] == add[2].trim())[0];
        this.ccode= null;
      this.ccode= await   this.appservice.GetCountryCode(countryid.id).toPromise();
      
      let c = this.ccode[0]['teleCode']
        
        
        this.ApplicationForm.get("namewithinitials").setValue(nic['namewithinitials']);
        this.ApplicationForm.get("fullName").setValue(nic['fullName']);
        this.ApplicationForm.patchValue({ mobileno: nic['mobileno'].replace(c,'')});
        this.ApplicationForm.patchValue({ email: nic['email'] });
        this.ApplicationForm.patchValue({ address: add[0] });
        this.ApplicationForm.patchValue({ address1: add[1] });
        this.ApplicationForm.patchValue({town: nic['town']});
        this.ApplicationForm.get('country').setValue(add[2].trim());
        this.ApplicationForm.patchValue({postalCode:nic['postalCode']});
        this.ApplicationForm.patchValue({province:nic['province']});
        this.ApplicationForm.patchValue({town:nic['town']});
        this.ApplicationForm.patchValue({countrycode:c})
        this.appservice.getAdminCenter(5).subscribe(adc => {
          this.Adcenter = (adc)
          this.center = adc['rgtAdminCenter']['adc_description'];
          this.studentadmincenter = adc['rgtAdminCenter']['adc_adminCenterId']

        }
        );
        
      }
     
      
      else {
        this.clearfields();
      }
    }

    
    
    else {
      this.clearfields();
    }



  }



  clearfields() {

    this.ApplicationForm.get("namewithinitials").setValue('');
    this.ApplicationForm.get("fullName").setValue('');
    this.ApplicationForm.patchValue({ mobileno: '' });
    this.ApplicationForm.patchValue({ email: '' });
    this.ApplicationForm.patchValue({ lanNo: '' });
    this.ApplicationForm.patchValue({ address: '' });
    this.ApplicationForm.patchValue({ address1: '' });
    this.ApplicationForm.patchValue({town: ''});
    this.ApplicationForm.patchValue({postalCode:''});
    this.ApplicationForm.patchValue({province:''});

    if (this.ApplicationForm.value['city'] != null) {
      this.ApplicationForm.get('city').reset();
    }
    if (this.ApplicationForm.value['admincenterid'] != null) {
      this.ApplicationForm.get('admincenterid').reset();
    }
    if (this.ApplicationForm.value['country'] != null) {
      this.ApplicationForm.get('country').reset();
    }
    if(this.ApplicationForm.value['countrycode']!=null){
      this.ApplicationForm.get('countrycode').reset()
    }

    this.center = null;
    this.studentadmincenter = null;


    // this.appservice.formdata(this.ApplicationForm.value)
  }

  agree(event:any){
    if(event == false){
      this.ApplicationForm.invalid;
    }
    else{
      this.ApplicationForm.valid;
    }
    
    this.ApplicationForm.get('otherQualification').setValue(this.ApplicationForm.value['newrule']);
    // console.log(this.ApplicationForm);
    
  }

  submit() {
    this.submitted = true;
    this.disablebtns = false;
    this.toastr.info("Application Data Processing!" + "</br> " + "Wait untill Redirect to Login Page", "Please Wait",
      {
        enableHtml: true
      });

    let count =0;
    if(this.qualification[0].qualifications.length>0){
      for(let i=0;i<this.qualification[0].qualifications.length;i++){
        if(this.ApplicationForm.get('rulez'+i).value == false){
          count++;
          console.log("true",count)
        }
      }
      if(count == this.qualification[0].qualifications.length)
      {
        this.toastr.error("Qualification Not Seletced","Error")
        console.log("No Values Selected");
        return;
      }
    }
     
    if (this.ApplicationForm.invalid) {

      return;
    }
    

    else {
      if (this.appliId == 1) {
        this.ApplicationForm.value['passport'] = null;
        this.nicno = this.ApplicationForm.value['nic']
        this.ApplicationForm.get('nic').patchValue(this.nicno.toLocaleLowerCase());


        this.ApplicationForm.removeControl("passport");
        var ua = this.ApplicationForm.value['address'];
        let a1 = ua.replace(/[^a-zA-Z0-9]+/g, " ") //removing comma(,) user entered
        var ua2 = this.ApplicationForm.value['address1'];
        let a2 = ua2.replace(/[^a-zA-Z0-9]+/g, " ") //removing comma(,) user entered
        var a3 = this.ApplicationForm.value['city'];
        var correspondanceaddress = a1 + ", " + a2 + ", " + a3;
    this.mobileno = (this.ApplicationForm.value['countrycode']+this.ApplicationForm.value['mobileno']);
    if(this.ApplicationForm.value['lanNo']!=null)
    {
      this.ApplicationForm.value['lanNo'] = this.ApplicationForm.value['countrycode']+this.ApplicationForm.value['lanNo'];
    }
    


      }
      else if (this.appliId == 2) {
        this.ApplicationForm.value['nic'] = null;
        this.ApplicationForm.removeControl("nic")
        var ua = this.ApplicationForm.value['address'];
        let a1 = ua.replace(/[^a-zA-Z0-9]+/g, " ") //removing comma(,) user entered
        var ua2 = this.ApplicationForm.value['address1'];
        let a2 = ua2.replace(/[^a-zA-Z0-9]+/g, " ") //removing comma(,) user entered
        var a3 = this.ApplicationForm.value['country'];
        var correspondanceaddress = a1 + ", " + a2 + ", " + a3;
        // this.ApplicationForm.addControl('mobileno', new FormControl('',[Validators.required,Validators.minLength(11),Validators.maxLength(16)]));
        this.mobileno = (this.ApplicationForm.value['countrycode']+this.ApplicationForm.value['mobileno']);
       
      }

    




      delete this.ApplicationForm.value.rulez1;
      delete this.ApplicationForm.value.apptype;

      delete this.ApplicationForm.value.address;
      delete this.ApplicationForm.value.address1;
      delete this.ApplicationForm.value.city;
      delete this.ApplicationForm.value.country;
      delete this.ApplicationForm.value.applicationabc;

      delete this.ApplicationForm.value.admincenterid;
      delete this.ApplicationForm.value.med_mediumId;
      delete this.ApplicationForm.value.programid;

      delete this.ApplicationForm.value.specilizationid;

      delete this.ApplicationForm.value.academiccenterid;
      delete this.ApplicationForm.value.userrule;
      delete this.ApplicationForm.value.newrule;
      

      for (let j = 0; j < this.qualification[0].qualifications.length; j++) {
        delete this.ApplicationForm.value['rulez' + j];
      }

      this.ApplicationForm.value['correspondanceaddress'] = correspondanceaddress;

      this.ApplicationForm.value['applicantType'] = { "id": Number(this.appliId) };
      let selectedProgram: program = this.programs.filter(s => s['program']['programId'] == this.prgms)[0]
      // console.log(selectedProgram);
      // console.log(selectedProgram['program']);

      this.ApplicationForm.value['programStarted'] = { "programStartedId": Number(selectedProgram.programStartedId) };
      // this.ApplicationForm.value['programStartedAcedemicCenter'] = {"adc_adminCenterId": 1};
      if (this.isSpezavailable == true) {
        let selectedSpez: programspecilization = this.prgspecilization.filter(s => s.programspecilizationid == this.specilizationids)[0]
        this.ApplicationForm.value['programSpecialization'] = { "programspecilizationid": Number(selectedSpez.programspecilizationid) };
      }

      this.ApplicationForm.value['programStartedAcedemicCenter'] = { "programstartedacademiccenterid": Number(this.pacenter1) };
      this.ApplicationForm.value['rgtAdminCenter'] = { "adc_adminCenterId": Number(this.studentadmincenter) };
      this.ApplicationForm.value['medium'] = { "mediumId": Number(this.medium) };
      // this.ApplicationForm.value['stream'] = {"id": 1};



      this.ApplicationForm.value['emailverifiedid'] = 'yes';
      this.ApplicationForm.value['mobileverifieid'] = 'yes';
      this.ApplicationForm.value['programEntryQualification'] = Number(this.qulificationSelected);
      this.ApplicationForm.value['id'] = 0;

      let applicationSend = this.ApplicationForm.value;
      delete applicationSend['mobileno'];
      applicationSend['mobileno'] = this.mobileno
      
      // console.log(this.ApplicationForm.value);
      let applicantion = {
        initialApplicant: this.ApplicationForm.value,
        role: [

        ]
      }


      this.appservice.saveapplicantform(applicantion).toPromise().
        then(s => { this.toastr.success("Application Submitted Successfully!", s['message']); this.router.navigate(['/login']) })
        .catch((s) => { this.toastr.error("Error", s['error']['message']); console.log(s); this.disablebtns = true });


      // .subscribe(dbvalue=> {this.initialuser = dbvalue,error=>{
      //   console.log("error");

      //   console.log(error)};
      // this.router.navigateByUrl('/login')},)




    }


  }
  test() {
    let a1: string = this.ApplicationForm.value['address'];

  }
  callopen():void{

    this.tag.filter('open');
  }


}

