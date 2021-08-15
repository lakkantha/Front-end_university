import { Component, OnInit, ViewChild, ElementRef, Version, TemplateRef } from '@angular/core';
import { StorageService } from '../_services/services/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmmitterServiceService } from './../_services/services/emmitter-service.service';
import { NgForm } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { LangaugeService } from '../language/Service/langauge.service';
import { RedirectToSequeceService } from '../_services/RedirectToSequece.service';
import { environment } from 'src/environments/environment';
import { QualificationCommonService } from '../educational-qulification/services/qualification-common.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-qualification',
  templateUrl: './professional-qualification.component.html',
  styleUrls: ['./professional-qualification.component.css']
})
export class ProfessionalQualificationComponent implements OnInit {
  faInfoCircle = faInfoCircle;
  data = {
    initialStudentId: {
      id: ''
    },
    qualification: '',
    institution: '',
    edate: '',
    duration: '',
    isFill: '',
    programme: {
      programId: ''
    },
  };

  data2 = {
    initialStudentId: {
      id: ''
    },
    qualification: '',
    institution: '',
    edate: '',
    duration: '',
    isFill: '',
    programme: {
      programId: ''
    },
  };

  certiProfessional = {
    initialStudentId: {
      id: ''
    },
    certificateName: '',
    isFill: '',
    programme: {
      programId: ''
    },
  }

  iStudentId: string = '';
  isFill = 0;
  programmeId: string = '';
  professionalFill = false;
  successFill = false;
  sucessRef: BsModalRef;
  certificate = false;

  sequence = false;
  nic: string = '';
  initialApplicantId;

  currentDate;
  msg = '';

  // upload certificates
  certificateName;
  selectedFiles: FileList;
  currentFileUpload: File = null;
  progress: { percentage: number } = { percentage: 0 };
  professionalCertiicatedata: any = [];

  base_url = environment.base_url;
  counsellingSavedCertificates;
  counsellingProfessional = false;

  initialApplicant;
  initialApplicantSequence: any = [];
  continueBtn = true;

  fillRef: BsModalRef;
  pdf: BsModalRef;

  @ViewChild('deleteok') deleteok;
  @ViewChild('editok') editok;
  @ViewChild('edit') edit;
  @ViewChild('template') template;
  @ViewChild('fillMandatory') fillMandatory;
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];
  @ViewChild('saveSucessful') saveSucessful;
  @ViewChild('pdfOnly') pdfOnly;
  @ViewChild('validateDate') validateDate;

  public qualifications: any = [];
  public certificatesProfessional: any = []; // list certificates function
  certificateId = null;
  enableEdit = false;
  enableEditIndex = null;
  dataSource = null;
  editQualification = '';
  editdate = '';
  editduration = '';
  editinstitution = '';
  editid = '';
  modalRef: BsModalRef;

  constructor(private qualificationCommonService: QualificationCommonService, private redirectToSequeceService: RedirectToSequeceService, private api: StorageService, private tag: LangaugeService, private router: Router, private emitterService: EmmitterServiceService,
    private route: ActivatedRoute, private modalService: BsModalService, private datePipe: DatePipe,) {
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    localStorage.setItem("name", 'profesional');
    this.iStudentId = localStorage.getItem('initialstudentid');
    this.programmeId = localStorage.getItem("programmeid");
    this.initialApplicant = localStorage.getItem("initialapplicantid");
    this.getSequence();

    this.nic = localStorage.getItem("nic");

    console.log(this.iStudentId);
    this.getItem(this.iStudentId);
    this.getAllCertificatesProfessional(this.iStudentId);
    this.getCounsellingSavedCertificates();
  }

  // get sequence number of initial applicant
  getSequence() {
    this.qualificationCommonService.getSequenceNumberByInitialApplicantId(this.initialApplicant)
      .subscribe(data => {
        this.initialApplicantSequence = data;

        if (this.initialApplicantSequence.sequence.id > 9) {
          this.continueBtn = false;
        }
      });
  }

  //duration add numbers only
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  // save sucess msg popup
  savesuccessfulmsg(saveSucessful: TemplateRef<any>) {
    this.sucessRef = this.modalService.show(
      saveSucessful,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  validatedate() {
    this.modalRef = this.modalService.show(
      this.validateDate,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  async reset() {
    window.location.reload();
  }


  // reset form fileds
  resetFileds() {
    this.data.qualification = '';
    this.data.institution = '';
    this.data.edate = '';
    this.data.duration = '';
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

  openEditok(editdata: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      editdata,
      Object.assign({}, { class: 'gray modal-sm' })
    );
  }

  OpenEdit(edit: TemplateRef<any>, dataedit) {
    this.modalRef = this.modalService.show(
      edit,
      Object.assign({}, { class: 'gray modal-lg' })
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

  enableEditMethod(e, i) {
    if (i = i) {
      this.enableEdit = true;
    }
    else {
      this.enableEdit = false;
    }
    this.enableEditIndex = i;
    console.log(i, e);
    // myFunction();
  }

  // Fill form sucess
  formFillComplete() {
    if (this.professionalFill) {
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
      this.certiProfessional.certificateName = '';
    }
  }

  // get all professional data
  async getItem(iStudentId) {
    this.api.getQualification(iStudentId)
      .subscribe(res => {
        this.qualifications = res;
        if (Object.keys(this.qualifications).length === 0) {
          this.professionalFill = false;
        } else {
          this.professionalFill = true;
        }
        this.formFillComplete();
      }, err => {
        console.log(err);
      });
  }

  // save professional data
  async onFormSubmit(data) {
    if (data.qualification == "" || data.institution == "" || data.duration == "") {
      this.fill(this.fillMandatory);
    } else if (data.edate > this.currentDate) {
      this.msg = "Don't select future date for Effective Date field";
      this.validatedate();
    } else {
      data.initialStudentId.id = this.iStudentId;
      data.isFill = 1;
      data.programme.programId = this.programmeId;

      this.api.addQualification(data)
        .subscribe(data => {
          this.getItem(this.iStudentId);
          this.professionalFill = true;
          this.formFillComplete();
          this.savesuccessfulmsg(this.saveSucessful);
          this.resetFileds();
        });
    }
  }

  // update professional data
  async Update(id, data2) {
    if (data2.qualification == "" || data2.institution == "" || data2.duration == "") {
      this.fill(this.fillMandatory);
    } else {
      data2.initialStudentId.id = this.iStudentId;
      data2.isFill = 1;
      data2.programme.programId = this.programmeId;
      this.api.updateQualification(id, data2)
        .subscribe(data => {
          console.log(data);
          this.getItem(this.iStudentId);
          this.modalRef.hide();
          this.openEditok(this.editok);
        });
    }
  }

  async save() {
    this.openModalWithClass(this.template);
  }

  // delete professional data
  async delete(id) {
    this.api.deleteQualification(id)
      .subscribe(data => {
        this.getItem(this.iStudentId);
        this.modalRef.hide();
        this.openDeleteOk(this.deleteok);
      });
  }

  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-sm' })
    );
  }

  // get all Professional certificates
  getAllCertificatesProfessional(iStudentId) {
    this.api.getAllCertificatesProfessional(iStudentId)
      .subscribe(res => this.certificatesProfessional = res)
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  // upload file
  upload(data: NgForm) {

    //this.progress.percentage = 0;
    this.certificateName = this.professionalCertiicatedata.id + "_professional.pdf";
    this.currentFileUpload = this.selectedFiles.item(0);

    this.qualificationCommonService.upload(this.currentFileUpload, this.certificateName)
      .subscribe(event => {
        console.log(event);
      });

    this.selectedFiles = undefined;
  }

  //save Professional certificates
  saveCertificatesProfessional(certiProfessional) {
    certiProfessional.initialStudentId.id = this.iStudentId;
    certiProfessional.programme.programId = this.programmeId;
    certiProfessional.certificateName = "professional"

    this.api.addCertificatesProfessional(certiProfessional)
      .subscribe(res => {
        this.professionalCertiicatedata = res;
        this.upload(certiProfessional);
        this.getAllCertificatesProfessional(this.iStudentId)
      });
  }

  // delete Professional certificates
  deleteCertificatesProfessional(id: number) {
    this.api.deleteCertificatesProfessional(id)
      .subscribe(res => this.getAllCertificatesProfessional(this.iStudentId));
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
          if (docs[i] == 'proffe') {
            this.counsellingProfessional = true;
          }
        }
      });
  }
}
