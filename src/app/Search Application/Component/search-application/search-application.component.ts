import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
//Created By Rifkhan for Application List More Button
import { ActivatedRoute } from '@angular/router';
//Created By Rifkhan for Application List More Button
import { ToastrService } from 'ngx-toastr';

import { SearchapplicationService } from '../../Service/searchapplication.service';
import { AdmissionGenerateComponent } from '../admission-generate/admission-generate.component';

import { AdmissionPdfComponent } from '../admission-pdf/admission-pdf.component';

@Component({
  selector: 'app-search-application',
  templateUrl: './search-application.component.html',
  styleUrls: ['./search-application.component.css']
})
export class SearchApplicationComponent implements OnInit {

  constructor(
    //Created By Rifkhan for Application List More Button
    private router:ActivatedRoute,
    //Created By Rifkhan for Application List More Button
    private searchappservice: SearchapplicationService,
    private pdf: AdmissionPdfComponent,
    private adpdf:AdmissionGenerateComponent,
    private toastr: ToastrService) {
      //Created By Rifkhan for Application List More Button
       if(this.router.snapshot.paramMap.get('nic')!=""){
        this.myform.get("nic1").patchValue(this.router.snapshot.paramMap.get('nic'));
       };
       //Created By Rifkhan for Application List More Button
     }


  myform = new FormGroup({
    atype:new FormControl(),
    nic1: new FormControl('', [Validators.required, Validators.pattern("^([0-9]{9}[x|X|v|V]|[0-9]{12})$")]),
  })

  groupTwo = new FormGroup({
    examids:new FormControl(),
  })
  initialApps = [];
  activityprgm = [];
  tabledata = [];
  currdate = new Date();
  date;
  Time;
  showdetails: boolean = false;
  showtable: boolean = false;
  sequnce = [];
  applicantSeq = [];
  sbtn:boolean=false;
  searchTearm:String="NIC";
  pdfterm:string="National NIC No";
  ngOnInit(): void {
    // this.searchappservice.getSequence().toPromise().then(
    //   data=>this.sequnce=data).catch(error=>console.log(error));
    this.myform.get('atype').setValue('1');
  }

  NicOrPassport(){
    this.myform.get('nic1').reset();
    if(this.myform.get('atype').value=='1'){
      this.myform.get("nic1").setValidators([Validators.required, Validators.pattern("^([0-9]{9}[x|X|v|V]|[0-9]{12})$")]);
      this.pdfterm="National NIC No"
this.searchTearm="NIC";
    }
    else{
      this.myform.get('nic1').clearValidators();
      this.searchTearm="PASSPORT Number";
      this.pdfterm="Passport Number"
    }
  }

  get a() {
    return this.myform.controls;
  }

  async searchfunc() {
    
    this.showdetails = false;
    this.showtable = false;
    if (this.myform.invalid) {
      this.toastr.error("Please Enter Valid NIC");
      return;
    }
    this.sbtn=true;
    let getNic = this.myform.get('nic1').value;
    this.Time = this.currdate.toLocaleTimeString();
    // this.callprint();
    this.initialApps = [];
    this.activityprgm = [];
    this.tabledata = [];
    this.applicantSeq = [];
    if(this.myform.get('atype').value=='1'){
      await this.searchappservice.getInitialapplicantList(getNic.toLowerCase()).toPromise().
      then(data=>this.initialApps=data).catch(e=>console.log(e));
    }
    else{
      await this.searchappservice.getInitialapplicantListByPassport(getNic.toLowerCase()).toPromise().
      then(data=>this.initialApps=data).catch(e=>console.log(e));
    }
   

    if (this.initialApps.length == 0) {
      this.toastr.error("NIC not Found", "404");
      this.sbtn=false;
      return;
    }
    this.toastr.info("Content Loading", "Please Wait");
    // console.log(this.initialApps, this.initialApps[0]['programStarted']['programStartedId']);
    let c = [];
    for (let j = 0; j < this.initialApps.length; j++) {
      let b = await this.searchappservice.getClosingDate(this.initialApps[j]['programStarted']['programStartedId']).toPromise();
      b = b.filter(s => s.activity.activityId == 1)[0];
      c.push(b);

      let f = await this.searchappservice.getapplicantsequence(this.initialApps[j]['id']).toPromise();
      this.applicantSeq.push(f);
    }
    this.activityprgm = c;
    // console.log(this.activityprgm, this.applicantSeq);
    // this.activityprgm = this.activityprgm.filter(s=> s.activity.activityId==1);
    // console.log(this.activityprgm);
    for (let i = 0; i < this.initialApps.length; i++) {
      let d = this.activityprgm.filter(s => s.programStarted.programStartedId == this.initialApps[i]['programStarted']['programStartedId'])[0];
      let e = this.applicantSeq.filter(e => e.initialApplicant.id == this.initialApps[i]['id'])[0];
      let a = {
        id: this.initialApps[i]['id'],
        pname: this.initialApps[i]['programStarted']['program']['title'],
        ayear: this.initialApps[i]['programStarted']['academicYear']['year'],
        status: e['sequence']['description'],
        closedate: d['dateTo']
      }

      this.tabledata.push(a);
    }
    this.showtable = true;
    this.sbtn=false;

    

  }

  applicant;
  payment = [];
  exams=[];
  voucherNo:string;
  async getId(id: number) {
    let applicant = this.initialApps.filter(s => s.id == id);
    this.payment = await this.searchappservice.getPaymentDetails(applicant[0]['id']).toPromise();
    console.log(applicant[0], "not here", this.payment, "here");
    this.searchappservice.getEntranceExamsofProgram(applicant[0]['programStarted']['program']['programId']).toPromise().then(
      data=>this.exams=data).catch(e=>console.log(e));
      this.exams.sort();
      this.voucherNo = this.payment['id'];
    this.applicant = {
      applino: applicant[0]['id'],
      program: applicant[0]['programStarted']['program']['title'],
      name: applicant[0]['namewithinitials'],
    
      fee: this.payment['dueAmount'],
      paid: this.payment['pay'],
      center: applicant[0]['programStartedAcedemicCenter']['cnt_center']['cnt_description'],
      medium: applicant[0]['medium']['description']
    }
    if(applicant[0]['applicantType']['id']==1){
this.applicant['nic'] = applicant[0]['nic']


    }
    else{
      this.applicant['nic'] = applicant[0]['passport']
    }
    this.showdetails = true;
  }
  callprint() {
    let b = this.initialApps.filter(s => s.id == this.applicant.applino)[0];
    // console.log(b.id, "we here");


    let a = {
      applino: b.id,
      name: b.namewithinitials,
      pstudy: b.programStarted.program.title,
      ayear: b.programStarted.academicYear.year,
      center: b.programStartedAcedemicCenter.cnt_center.cnt_description,
      medium: b.medium.description,
      nic: b.nic,
      address: b.correspondanceaddress,
      mobile: b.mobileno,
      tel: b.lanNo,
      email: b.email,
      studenttype:this.pdfterm
    }
    if(b['applicantType']['id']==1){
      a['nic'] = b['nic']
    }
    else{
      a['nic'] = b['passport']
    }
    this.pdf.first(a);
    // this.pdf.first({pname:"Bachelor of Software"});



    // window.open(url, '_blank');
    // this.myEvent.emit({name:"kaif",index:1});
  }

  async callAdmission(){
    let examid = this.groupTwo.get('examids').value;
    let c;
    let b = this.initialApps.filter(s => s.id == this.applicant.applino)[0];
    let aid= b['id'];
    let prgid=b['programStarted']['programStartedId']; 
    await this.searchappservice.getApplicantDetailsofEntrance(aid,prgid,examid).toPromise().then
    (data=>c=data).catch(e=>console.log(e));
    // console.log(c);
    if(examid==1)
    {
      if(c!=undefined)
      {
        let a = {
          head:'Selection Test Admission Form',
          applino: c['indexNo'],
          name: c['fullName'],
          pstudy: c['programName'],
          ayear: c['academicYear'],
          center: c['center'],
          centeraddress:c['addressOfExamCenter'],
          medium: c['programMediums'][0]['description'],
          smedium:c['selectionTestMedium'],
          etime:c['examTime'],
          edate:c['examDate'],
          nic: c['nic'],
          address: b.correspondanceaddress,
          mobile: b.mobileno,
          tel: b.lanNo,
          email: b.email
        }
        this.groupTwo.get('examids').reset();
        this.adpdf.first(a);
      }else{
        this.toastr.warning("The admission for the selection test has not generated yet by the applicant","No Admission")
      }
    }
    else if(examid==2)
    {
      this.toastr.warning("The admission for the VIVA has not generated yet by the applicant","No Admission")
    }
    else if(examid==3)
    {
      this.toastr.warning("The admission for the Practical Test has not generated yet by the applicant","No Admission")
    }
    else if(examid==4)
    {
      this.toastr.warning("The admission for the Interview has not generated yet by the applicant","No Admission")
    }
    else{
      this.toastr.error("Please Select A Valid Exam Type","Error")
      
    }


    // this.adpdf.first(a)
  }

  resetall() {
    this.myform.reset();
    this.myform.get('atype').setValue('1');
    this.showdetails = false;
    this.showtable = false;
    this.tabledata = [];
    this.applicant = [];
    this.NicOrPassport();
  }

}
