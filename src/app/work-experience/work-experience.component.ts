import { Component, OnInit, ViewChild, ElementRef, Version, TemplateRef } from '@angular/core';
import { StorageService } from '../_services/services/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmmitterServiceService } from './../_services/services/emmitter-service.service';
import { NgForm } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { LangaugeService } from '../language/Service/langauge.service';
import { RedirectToSequeceService } from '../_services/RedirectToSequece.service';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { QualificationCommonService } from '../educational-qulification/services/qualification-common.service';

@Component({
  selector: 'app-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.css']
})
export class WorkExperienceComponent implements OnInit {
  // work experience data
  faInfoCircle = faInfoCircle;
  data = {
    initialStudentId: {
      id: ''
    },
    company: "",
    designation: "",
    dateFrom: "",
    dateTo: "",
    isFill: '',
    programme: {
      programId: ''
    },
  };

  //updated work experience data
  data2 = {
    initialStudentId: {
      id: ''
    },
    company: "",
    designation: "",
    dateFrom: "",
    dateTo: "",
    isFill: '',
    programme: {
      programId: ''
    },
  };

  //work experience certificates
  certiWork = {
    initialStudentId: {
      id: ''
    },
    certificateName: '',
    programme: {
      programId: ''
    },
  }

  iStudentId: string = '';
  isFill = 0;
  programmeId: string = '';
  workFill = false;
  successFill = false;

  // upload certificates
  certificateName;
  selectedFiles: FileList;
  currentFileUpload: File = null;
  progress: { percentage: number } = { percentage: 0 };
  workCertiicatedata: any = [];

  base_url = environment.base_url;
  counsellingSavedCertificates;
  counsellingWorkExp = false;

  modalRef: BsModalRef;
  fillRef: BsModalRef;
  sucessRef: BsModalRef;
  pdf: BsModalRef;

  sequence = false;
  nic: string = '';
  initialApplicantId;

  currentDate;
  msg = '';

  @ViewChild('deleteok') deleteok;
  @ViewChild('editok') editok;
  @ViewChild('edit') edit;
  @ViewChild('fillMandatory') fillMandatory;
  @ViewChild('validateDate') validateDate;
  @ViewChild('saveSucessful') saveSucessful;
  @ViewChild('pdfOnly') pdfOnly;

  public experiences: any = [];
  public certificatesWork: any = []; // list certificates function

  enableEdit = false;
  enableEditIndex = null;
  editcompany = '';
  editdesignation = '';
  editdateFrom = '';
  editdateTo = '';
  editid = '';
  certificate = false;

  initialApplicant;

  initialApplicantSequence: any = [];
  continueBtn = true;

  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];

  constructor(private qualificationCommonService: QualificationCommonService, private datePipe: DatePipe, private redirectToSequeceService: RedirectToSequeceService, private api: StorageService, private tag: LangaugeService, private router: Router, private emitterService: EmmitterServiceService,
    private route: ActivatedRoute, private modalService: BsModalService) {
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    localStorage.setItem("name", 'workexperience');
    this.iStudentId = localStorage.getItem('initialstudentid');
    this.programmeId = localStorage.getItem("programmeid");
    this.initialApplicant = localStorage.getItem("initialapplicantid");
    this.getSequence();

    this.nic = localStorage.getItem("nic");

    console.log(this.iStudentId);
    this.getItem(this.iStudentId);
    this.getAllCertificatesWork(this.iStudentId);
    this.getCounsellingSavedCertificates();
  }

  // get sequence number of initial applicant
  getSequence() {
    this.qualificationCommonService.getSequenceNumberByInitialApplicantId(this.initialApplicant)
      .subscribe(data => {
        this.initialApplicantSequence = data;

        if (this.initialApplicantSequence.sequence.id > 10) {
          this.continueBtn = false;
        }
      });
  }

  // save sucess msg popup
  savesuccessfulmsg(saveSucessful: TemplateRef<any>) {
    this.sucessRef = this.modalService.show(
      saveSucessful,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  openDelete(deletedata: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      deletedata,
      Object.assign({}, { class: 'gray modal-sm' })
    );
  }

  openDeleteOk(deleteok: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      deleteok,
      Object.assign({}, { class: 'gray modal-sm' })
    );
  }

  OpenEdit(edit: TemplateRef<any>, dataedit) {
    this.modalRef = this.modalService.show(
      edit,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  openEditok(editdata: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      editdata,
      Object.assign({}, { class: 'gray modal-sm' })
    );
  }

  fill(fillMandatory: TemplateRef<any>) {
    this.fillRef = this.modalService.show(
      fillMandatory,
      Object.assign({}, { class: 'gray modal-sm' })
    );
  }

  // upload pdf file popup msg
  uploadPdfOnly(pdfOnly: TemplateRef<any>) {
    this.pdf = this.modalService.show(
      pdfOnly,
      Object.assign({}, { class: 'gray modal-sm' })
    );
  }

  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-sm' })
    );
  }

  // Fill form sucess
  formFillComplete() {
    if (this.workFill) {
      this.successFill = true;
    }
    else {
      this.successFill = false;
    }
  }

  // read upload file
  readFile(fileEvent: any) {
    const file = fileEvent.target.files[0];
    if (file.type == "application/pdf") {
      this.certificate = true;
    } else {
      this.certificate = false;
      this.uploadPdfOnly(this.pdfOnly);
      this.certiWork.certificateName = '';
    }
  }

  // get all work experience data
  async getItem(iStudentId) {
    this.api.getExperience(iStudentId)
      .subscribe(res => {
        this.experiences = res;
        if (Object.keys(this.experiences).length === 0) {
          this.workFill = false;
        } else {
          this.workFill = true;
        }
        this.formFillComplete();
      }, err => {
        console.log(err);
      });
  }

  async reset() {
    window.location.reload();
  }

  // reset form fileds
  resetFileds() {

    this.data.company = '';
    this.data.designation = '';
    this.data.dateFrom = '';
    this.data.dateTo = '';
  }

  // save work experience data
  async onFormSubmit(data) {
    if (data.company == "" || data.designation == "" || data.duration == "" || data.dateFrom == "" || data.dateTo == "") {
      this.fill(this.fillMandatory);
    } else {
      data.initialStudentId.id = this.iStudentId;
      data.isFill = 1;
      data.programme.programId = this.programmeId;

      if (data.dateFrom >= this.currentDate) {
        this.msg = "Don't select current date or future date for Date From field";
        this.validatedate();
      } else if (data.dateTo > this.currentDate) {
        this.msg = "Don't select future date for Date To field";
        this.validatedate();
      } else {
        if (data.dateFrom > data.dateTo) {
          this.msg = "Select correct dates";
          this.validatedate();
        } else {
          this.api.addExperience(data)
            .subscribe(data => {
              this.getItem(this.iStudentId);
              this.workFill = true;
              this.formFillComplete();
              this.savesuccessfulmsg(this.saveSucessful);
              this.resetFileds();
            });
        }
      }

    }
  }

  // update work experience data
  async Update(id, data2) {
    if (data2.company == "" || data2.designation == "" || data2.duration == "" || data2.dateFrom == "" || data2.dateTo == "") {
      this.fill(this.fillMandatory);
    } else {
      data2.initialStudentId.id = this.iStudentId;
      data2.isFill = 1;
      data2.programme.programId = this.programmeId;
      if (data2.dateFrom > data2.dateTo) {
        this.validatedate();
      } else {
        this.api.updateExperience(id, data2)
          .subscribe(
            response => {
              console.log(response);
              this.modalRef.hide();
              this.getItem(this.iStudentId);
              this.openEditok(this.editok);
            },
            error => {
              console.log(error);
            });
      }
    }
  }

  // delete work experience data
  delete(id) {
    this.api.deleteExperience(id)
      .subscribe(
        response => {
          console.log(response);
          this.emitterService.broadcast({ content_type: "updateExperience" });
          this.getItem(this.iStudentId);
          this.modalRef.hide();
          this.openDeleteOk(this.deleteok);
        },
        error => {
          console.log(error);
        });
  }

  validatedate() {
    this.modalRef = this.modalService.show(
      this.validateDate,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  // get all Work certificates
  getAllCertificatesWork(iStudentId) {
    this.api.getAllCertificatesWork(iStudentId)
      .subscribe(res => this.certificatesWork = res)
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  // upload file
  upload(data: NgForm) {

    //this.progress.percentage = 0;
    this.certificateName = this.workCertiicatedata.id + "_work.pdf";
    this.currentFileUpload = this.selectedFiles.item(0);

    this.qualificationCommonService.upload(this.currentFileUpload, this.certificateName)
      .subscribe(event => {
        console.log(event);
      });

    this.selectedFiles = undefined;
  }

  //save Work certificates
  saveCertificatesWork(certiWork) {
    certiWork.initialStudentId.id = this.iStudentId;
    certiWork.programme.programId = this.programmeId;
    certiWork.certificateName = "work"

    this.api.addCertificatesWork(certiWork)
      .subscribe(res => {
        this.workCertiicatedata = res;
        this.upload(certiWork);
        this.getAllCertificatesWork(this.iStudentId)
      });
  }

  // delete Work certificates
  deleteCertificatesWork(id: number) {
    this.api.deleteCertificatesWork(id)
      .subscribe(res => this.getAllCertificatesWork(this.iStudentId));
  }

  // update sequence table 
  async updateSequence(): Promise<boolean> {

    this.sequence = false
    if (this.continueBtn == false) {
      this.router.navigate(['/home']);
    } else {
      if (this.sequence == false) {
        this.initialApplicantId = await this.api.updateSequenceTable(this.nic, this.programmeId).toPromise()
        this.sequence = true;
      } else {
        console.log("sequence not update");
      }
    }


    return this.sequence;
  }

  async continue() {
    localStorage.setItem("programmeid", this.programmeId);
    this.sequence = await this.updateSequence();
    this.redirectToSequeceService.RedirectTo(this.initialApplicantId);
  }

  callopen(): void {

    this.tag.filter('open');
  }

  // get certificates by counselling saved table
  getCounsellingSavedCertificates() {
    this.qualificationCommonService.getCounsellingSavedCertificates(this.initialApplicant)
      .subscribe(data => {

        this.counsellingSavedCertificates = data.message;
        var docs = this.counsellingSavedCertificates.split(",");

        for (let i = 0; i < docs.length; i++) {
          if (docs[i] == 'workexp') {
            this.counsellingWorkExp = true;
          }
        }
      });
  }

}
