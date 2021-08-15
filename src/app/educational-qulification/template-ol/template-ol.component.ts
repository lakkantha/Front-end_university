import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';

import { EducationalQualificationOLService } from '../services/educational-qualification-ol.service';
import { QualificationCommonService } from '../services/qualification-common.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-template-ol',
  templateUrl: './template-ol.component.html',
  styleUrls: ['./template-ol.component.css']
})
export class TemplateOLComponent implements OnInit {

  public eduOL: any = [];   // for list function
  public certificatesOL: any = []; // list certificates function
  public years: any = [];  // list past years
  public medium: any = []; // list all mediums
  public olSubjects: any = []; // list all OL subjects
  public result: any = []; // list all results
  public olexams: any = [] // list all exams

  dataOL = {
    initialStudentId: {
      id: ''
    },
    year: '',
    indexNumber: '',
    medium: {
      mediumId: '',
    },
    olSubjects: {
      id: '',
    },
    result: {
      id: ''
    },
    isFill: '',
    programme: {
      programId: ''
    },
    examTypes: {
      id: ''
    },
  }

  editedDataOL = {
    initialStudentId: {
      id: ''
    },
    year: '',
    indexNumber: '',
    medium: {
      mediumId: '',
    },
    olSubjects: {
      id: '',
    },
    result: {
      id: ''
    },
    isFill: '',
    programme: {
      programId: ''
    },
    examTypes: {
      id: ''
    },
  }

  certiOL = {
    initialStudentId: {
      id: ''
    },
    certificateName: '',
    programme: {
      programId: ''
    },
    examTypes: {
      id: ''
    },
  }

  oLSubjects = {
    subject: ''
  }

  examTypes = {
    examType: ''
  }

  olexamName;
  olexam;
  olNewExamData: any = [];

  olSubjectName;
  olSubject;
  olNewSubjectData: any = [];

  iStudentId: string = '';
  submitted = false;
  id: number;
  isFill = 0;
  programmeId: string = '';
  olFill = false;

  gce = false;
  international = false;
  type = true;
  examType;
  certificate = false;

  // upload certificates
  certificateName;
  selectedFiles: FileList;
  currentFileUpload: File = null;
  progress: { percentage: number } = { percentage: 0 };
  olCertiicatedata: any = [];

  base_url = environment.base_url;
  counsellingSavedCertificates;
  counsellingOL = false;
  initialApplicantId;

  modalRef: BsModalRef;
  fillRef: BsModalRef;
  sucessRef: BsModalRef;
  pdf: BsModalRef;

  @ViewChild('deleteok') deleteok;
  @ViewChild('editok') editok;
  @ViewChild('fillMandatory') fillMandatory;
  @ViewChild('saveSucessful') saveSucessful;
  @ViewChild('pdfOnly') pdfOnly;

  constructor(private modalService: BsModalService, private olService: EducationalQualificationOLService, private qualificationCommonService: QualificationCommonService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.iStudentId = localStorage.getItem('initialstudentid');
    this.programmeId = localStorage.getItem("programmeid");

    this.initialApplicantId = localStorage.getItem('initialapplicantid');

    this.getAllExamNames();
    this.getAllYears();
    this.getAllMediums();
    this.getAllOLSubjects();
    this.getAllResults();
    this.getDataOL(this.iStudentId);
    this.getAllCertificatesOL(this.iStudentId);
    this.getCounsellingSavedCertificates();
  }

  // open delete confirmation pop up
  openDelete(deleteConfirmation: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      deleteConfirmation,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  // open delete sucess msg pop up 
  openDeleteOk(deleteok: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      deleteok,
      Object.assign({}, { class: 'gray modal-md' })
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
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  // fill mandatory
  fill(fillMandatory: TemplateRef<any>) {
    this.fillRef = this.modalService.show(
      fillMandatory,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  // save sucess msg popup
  savesuccessfulmsg(saveSucessful: TemplateRef<any>) {
    this.sucessRef = this.modalService.show(
      saveSucessful,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  // select exam category type
  selectExamType(examType) {
    this.examType = examType;
    this.gce = false;
    this.international = false;

    if (examType == 1) {  // gce
      this.gce = true;
      this.type = false;
      this.dataOL.examTypes.id = this.examType;
      this.editedDataOL.examTypes.id = this.examType;

    } else if (examType == 2 || examType == 3) {  //edexcel or cambridge
      this.international = true;
      this.type = false;
      this.dataOL.examTypes.id = this.examType;
      this.editedDataOL.examTypes.id = this.examType;

    } else {
      this.international = true;
      this.type = false;
    }
  }

  // get all mediums
  getAllMediums() {
    this.olService.getAllMediums()
      .subscribe(data => {
        this.medium = data;
      });
  }

  // get all results
  getAllResults() {
    this.olService.getAllResults()
      .subscribe(data => {
        this.result = data;
      });
  }

  // get all OL Subjects
  getAllOLSubjects() {
    this.olService.getAllOLSubjects()
      .subscribe(data => {
        console.log(data);
        this.olSubjects = data;
      });
  }

  // get all OL exam names
  getAllExamNames() {
    this.qualificationCommonService.getAllExams()
      .subscribe(data => {
        this.olexams = data;

        this.olexams.splice(0, 4);
      });
  }

  // Fill form sucess
  formFillComplete() {
    if (this.olFill) {
      this.olService.fillOL("true");
    }
    else {
      this.olService.fillOL("false");
    }
  }

  //index number add numbers only
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  // get all years
  getAllYears() {
    var date = new Date();
    var year = date.getFullYear();

    for (var i = 0; i < 60; i++) {
      year = year - 1;
      this.years.push({ year });
    }
    console.log(this.years);
  }

  // upload pdf file popup msg
  uploadPdfOnly(pdfOnly: TemplateRef<any>) {
    this.pdf = this.modalService.show(
      pdfOnly,
      Object.assign({}, { class: 'gray modal-sm' })
    );
  }

  // read upload file
  readFile(fileEvent: any) {

    const file = fileEvent.target.files[0];
    if (file.type == "application/pdf") {
      this.certificate = true;
    } else {
      this.certificate = false;
      this.uploadPdfOnly(this.pdfOnly);
      this.certiOL.certificateName = '';
    }
  }

  // set new exam name and add new exam name
  setExamName(exam) {

    this.olNewExamData = [];
    this.olexamName = exam.target.value;
    this.olexam = this.olexams.filter(x => x.examType === this.olexamName)[0];

    if (this.olexam) {
      this.dataOL.examTypes.id = this.olexam.id;
      this.editedDataOL.examTypes.id = this.olexam.id;
    } else {
      this.examTypes.examType = this.olexamName;
      this.olService.saveNewExamName(this.examTypes)
        .subscribe(data => {
          this.olNewExamData = data;
          this.dataOL.examTypes.id = this.olNewExamData.id;
          this.editedDataOL.examTypes.id = this.olNewExamData.id;
        });
    }
  }

  // set subject and add new subject
  setOLSubjectIdByName(subject) {
    this.olNewSubjectData = [];
    this.olSubjectName = subject.target.value;
    this.olSubject = this.olSubjects.filter(x => x.subject === this.olSubjectName)[0];

    if (this.olSubject) {
      this.dataOL.olSubjects.id = this.olSubject.id;
      this.editedDataOL.olSubjects.id = this.olSubject.id;
    } else {
      this.oLSubjects.subject = this.olSubjectName;
      this.olService.saveNewOLSubject(this.oLSubjects)
        .subscribe(data => {
          this.olNewSubjectData = data;
          this.dataOL.olSubjects.id = this.olNewSubjectData.id;
          this.editedDataOL.olSubjects.id = this.olNewSubjectData.id;
        });
    }
  }

  // get all O/L data 
  getDataOL(iStudentId) {
    this.olService.getAllOL(iStudentId)
      .subscribe(data => {
        console.log(data);
        this.eduOL = data;
        if (Object.keys(this.eduOL).length === 0) {
          this.olFill = false;
        } else {
          this.olFill = true;
        }
        this.formFillComplete();
      });
  }

  // save O/L data
  saveOL(dataOL) {
    this.submitted = true;

    if (this.examType == '1') {  // gce O/L
      if (dataOL.year == "" || dataOL.indexNumber == "" || dataOL.indexNumber == null || dataOL.medium.mediumId == null || dataOL.olSubjects.id == null || dataOL.result.id == null) {
        this.fill(this.fillMandatory);

      } else {
        dataOL.initialStudentId.id = this.iStudentId;
        dataOL.isFill = 1;
        dataOL.programme.programId = this.programmeId;

        this.olService.addEducationalQualificationOL(dataOL)
          .subscribe(data => {
            this.savesuccessfulmsg(this.saveSucessful);
            this.getDataOL(this.iStudentId);
            this.olFill = true;
            this.dataOL.olSubjects.id = null;
          });
      }
    } else {  // gce Edexcel or Cambridge or other
      if (dataOL.year == "" || dataOL.indexNumber == "" || dataOL.indexNumber == null || dataOL.olSubjects.id == "" || dataOL.result.id == "") {
        this.fill(this.fillMandatory);
      } else {
        dataOL.initialStudentId.id = this.iStudentId;
        dataOL.isFill = 1;
        dataOL.programme.programId = this.programmeId;
        dataOL.medium = null;

        this.olService.addEducationalQualificationOL(dataOL)
          .subscribe(data => {
            this.savesuccessfulmsg(this.saveSucessful);
            this.getDataOL(this.iStudentId);
            this.olFill = true;
            this.dataOL.olSubjects.id = "";
          });
      }
    }
  }

  // update O/L data
  updateOL(id: number, editedDataOL) {

    if (this.examType == '1') {  // gce O/L
      if (editedDataOL.year == "" || editedDataOL.indexNumber == null || editedDataOL.indexNumber == "" || editedDataOL.medium.mediumId == null || editedDataOL.olSubjects.id == null || editedDataOL.result.id == null) {
        this.fill(this.fillMandatory);

      } else {
        this.olService.updateEducationalQualificationOL(id, editedDataOL)
          .subscribe(data => {
            this.getDataOL(this.iStudentId);
            this.modalRef.hide();
            this.openEditOk(this.editok);
            this.editedDataOL.olSubjects.id = null;
          });
      }
    } else {  // gce Edexcel or Cambridge or other
      if (editedDataOL.year == "" || editedDataOL.indexNumber == "" || editedDataOL.indexNumber == "" || editedDataOL.olSubjects.id == "" || editedDataOL.result.id == "") {
        this.fill(this.fillMandatory);
      } else {
        editedDataOL.medium = null;

        this.olService.updateEducationalQualificationOL(id, editedDataOL)
          .subscribe(data => {
            this.getDataOL(this.iStudentId);
            this.modalRef.hide();
            this.openEditOk(this.editok);
            this.editedDataOL.olSubjects.id = null;
          });
      }
    }
  }

  // delete data
  deleteOL(id: number) {
    this.olService.deleteEducationalQualificationOL(id)
      .subscribe(data => {
        this.getDataOL(this.iStudentId);
        this.modalRef.hide();
        this.openDeleteOk(this.deleteok);
      });
  }

  // get all certificates
  getAllCertificatesOL(iStudentId) {
    this.olService.getAllCertificatesOL(iStudentId)
      .subscribe(res => this.certificatesOL = res);
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  // upload file
  upload(data: NgForm) {

    //this.progress.percentage = 0;
    this.certificateName = this.olCertiicatedata.id + "_ol.pdf";
    this.currentFileUpload = this.selectedFiles.item(0);

    this.qualificationCommonService.upload(this.currentFileUpload, this.certificateName)
      .subscribe(event => {
        console.log(event);
      });

    this.selectedFiles = undefined;
  }

  //save O/L certificates
  saveCertificatesOL(certiOL) {
    certiOL.initialStudentId.id = this.iStudentId;
    certiOL.programme.programId = this.programmeId;
    certiOL.examTypes.id = this.examType;
    certiOL.certificateName = "ol"

    this.olService.addCertificatesOL(certiOL)
      .subscribe(res => {
        this.olCertiicatedata = res;
        this.upload(certiOL);
        this.getAllCertificatesOL(this.iStudentId)
      });
  }

  // delete O/L certificates
  deleteCertificatesOL(id: number) {
    this.olService.deleteCertificatesOL(id)
      .subscribe(res => this.getAllCertificatesOL(this.iStudentId));
  }

  // get certificates by counselling saved table
  getCounsellingSavedCertificates() {

    this.qualificationCommonService.getCounsellingSavedCertificates(this.initialApplicantId)
      .subscribe(data => {
        
        this.counsellingSavedCertificates = data.message;
        var docs = this.counsellingSavedCertificates.split(",");

        for (let i = 0; i < docs.length; i++) {
          if (docs[i] == 'ordinarylevel') {
            this.counsellingOL = true;
          }
        }
      });
  }
}
