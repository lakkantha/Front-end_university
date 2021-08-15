import { Component, OnInit, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';

import { EducationalQualificationALService } from '../services/educational-qualification-al.service';
import { QualificationCommonService } from '../services/qualification-common.service';

@Component({
  selector: 'app-template-al',
  templateUrl: './template-al.component.html',
  styleUrls: ['./template-al.component.css']
})
export class TemplateALComponent implements OnInit {

  public eduAL: any = [];   // for list function
  public certificatesAL: any = []; // list certificates function
  public years: any = [];  // list past years
  public medium: any = []; // list all mediums
  public stream: any = []; // list all results
  public alSubjects: any = []; // list all AL subjects
  public result: any = []; // list all results
  public alexams: any = [] // list all exams

  dataAL = {
    initialStudentId: {
      id: ''
    },
    year: '',
    indexNumber: '',
    medium: {
      mediumId: ''
    },
    stream: {
      id: ''
    },
    alSubjects: {
      id: ''
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

  editedDataAL = {
    initialStudentId: {
      id: ''
    },
    year: '',
    indexNumber: '',
    medium: {
      mediumId: ''
    },
    stream: {
      id: ''
    },
    alSubjects: {
      id: ''
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

  certiAL = {
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

  aLSubjects = {
    subject: ''
  }

  aLStreams = {
    stream: ''
  }

  examTypes = {
    examType: ''
  }

  alexamName;
  alexam;
  alNewExamData: any = [];

  alSubjectName;
  examName;
  alSubject;
  alNewSubjectData: any = [];

  alStreamName;
  alStream;
  alNewStreamData: any = [];

  iStudentId: string = '';
  submitted = false;
  id: number;
  isFill = 0;
  programmeId: string = '';
  alFill = true;

  gce = false;
  international = false;
  type = true;
  examType = '';
  certificate = false;

  // upload certificates
  certificateName;
  selectedFiles: FileList;
  currentFileUpload: File = null;
  progress: { percentage: number } = { percentage: 0 };
  alCertiicatedata: any = [];

  base_url = environment.base_url;
  counsellingSavedCertificates;
  counsellingAL = false;
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

  constructor(private modalService: BsModalService, private alService: EducationalQualificationALService, private qualificationCommonService: QualificationCommonService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.iStudentId = localStorage.getItem('initialstudentid');
    this.programmeId = localStorage.getItem("programmeid");

    this.initialApplicantId = localStorage.getItem('initialapplicantid');

    this.getAllExamNames();
    this.getAllYears();
    this.getAllMediums();
    this.getAllStreams();
    this.getAllALSubjects();
    this.getAllResults();
    this.getDataAL(this.iStudentId);
    this.getAllCertificatesAL(this.iStudentId);
    this.getCounsellingSavedCertificates();
  }

  resetFields() {

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

    if (examType == '1') {  // gce
      this.gce = true;
      this.type = false;
      this.dataAL.examTypes.id = this.examType;
      this.editedDataAL.examTypes.id = this.examType;

    } else if (examType == '2' || examType == '3') {  //edexcel or cambridge
      this.international = true;
      this.type = false;
      this.dataAL.examTypes.id = this.examType;
      this.editedDataAL.examTypes.id = this.examType;

    } else {
      this.international = true;
      this.type = false;
    }
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

  // get all mediums
  getAllMediums() {
    this.alService.getAllMediums()
      .subscribe(data => {
        console.log(data);
        this.medium = data;
      });
  }

  // get all streams
  getAllStreams() {
    this.alService.getAllStreams()
      .subscribe(data => {
        console.log(data);
        this.stream = data;
      });
  }

  // get all AL subjects
  getAllALSubjects() {
    this.alService.getAllALSubjects()
      .subscribe(data => {
        console.log(data);
        this.alSubjects = data;
      });
  }

  // get all results
  getAllResults() {
    this.alService.getAllResults()
      .subscribe(data => {
        console.log(data);
        this.result = data;
      });
  }

  // get all AL exam names
  getAllExamNames() {
    this.qualificationCommonService.getAllExams()
      .subscribe(data => {
        this.alexams = data;

        this.alexams.splice(0, 4);
      });
  }

  // Fill form sucess
  formFillComplete() {
    if (this.alFill) {
      this.alService.fillAL("true");
    }
    else {
      this.alService.fillAL("false");
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
      this.certiAL.certificateName = '';
    }
  }

  // set new exam name and add new exam name
  setExamName(exam) {

    this.alNewExamData = [];
    this.alexamName = exam.target.value;
    this.alexam = this.alexams.filter(x => x.examType === this.alexamName)[0];

    if (this.alexam) {
      this.dataAL.examTypes.id = this.alexam.id;
      this.editedDataAL.examTypes.id = this.alexam.id;
    } else {
      this.examTypes.examType = this.alexamName;
      this.alService.saveNewExamName(this.examTypes)
        .subscribe(data => {
          this.alNewExamData = data;
          this.dataAL.examTypes.id = this.alNewExamData.id;
          this.editedDataAL.examTypes.id = this.alNewExamData.id;
        });
    }
  }

  // set subject and add new subject
  setALSubjectIdByName(subject) {
    this.alNewSubjectData = [];
    this.alSubjectName = subject.target.value;
    this.alSubject = this.alSubjects.filter(x => x.subject === this.alSubjectName)[0];

    if (this.alSubject) {
      this.dataAL.alSubjects.id = this.alSubject.id;
      this.editedDataAL.alSubjects.id = this.alSubject.id;
    } else {
      this.aLSubjects.subject = this.alSubjectName;
      this.alService.saveNewALSubject(this.aLSubjects)
        .subscribe(data => {
          this.alNewSubjectData = data;
          this.dataAL.alSubjects.id = this.alNewSubjectData.id;
          this.editedDataAL.alSubjects.id = this.alNewSubjectData.id;
        });
    }
  }

  // set stream and add new stream
  setALStreamIdByName(stream) {
    this.alNewStreamData = [];
    this.alStreamName = stream.target.value;
    this.alStream = this.stream.filter(x => x.stream === this.alStreamName)[0];

    if (this.alStream) {
      this.dataAL.stream.id = this.alStream.id;
      this.editedDataAL.stream.id = this.alStream.id;
    } else {
      this.aLStreams.stream = this.alStreamName;
      this.alService.saveNewALStream(this.aLStreams)
        .subscribe(data => {
          this.alNewStreamData = data;
          this.dataAL.stream.id = this.alNewStreamData.id;
          this.editedDataAL.stream.id = this.alNewStreamData.id;
        });
    }
  }

  // get all A/L data
  getDataAL(iStudentId) {
    this.alService.getAllAL(iStudentId)
      .subscribe(data => {
        this.eduAL = data;
        if (Object.keys(this.eduAL).length === 0) {
          this.alFill = false;
        } else {
          this.alFill = true;
        }
        this.formFillComplete();
      });
  }

  // save A/L data
  saveAL(dataAL) {
    this.submitted = true;

    if (this.examType == '1') {  // gce A/L
      if (dataAL.year == "" || dataAL.indexNumber == null || dataAL.indexNumber == "" || dataAL.medium.mediumId == null || dataAL.alSubjects.id == null || dataAL.result.id == null) {
        this.fill(this.fillMandatory);
      } else {
        dataAL.initialStudentId.id = this.iStudentId;
        dataAL.isFill = 1;
        dataAL.programme.programId = this.programmeId;

        if (dataAL.stream.id == "") {
          dataAL.stream = null;
        }

        this.alService.addEducationalQualificationAL(dataAL)
          .subscribe(data => {
            this.getDataAL(this.iStudentId);
            this.savesuccessfulmsg(this.saveSucessful);
            this.alFill = true;
            this.dataAL.alSubjects.id = null;
          });
      }
    } else {  // gce Edexcel or Cambridge or other
      if (dataAL.year == "" || dataAL.indexNumber == "" || dataAL.indexNumber == null || dataAL.alSubjects.id == "" || dataAL.alSubjects.id == null || dataAL.result.id == null) {
        this.fill(this.fillMandatory);
      } else {
        dataAL.initialStudentId.id = this.iStudentId;
        dataAL.isFill = 1;
        dataAL.programme.programId = this.programmeId;
        dataAL.medium = null;
        dataAL.stream = null;

        this.alService.addEducationalQualificationAL(dataAL)
          .subscribe(data => {
            this.getDataAL(this.iStudentId);
            this.savesuccessfulmsg(this.saveSucessful);
            this.alFill = true;
            this.dataAL.alSubjects.id = "";
          });
      }
    }
  }

  // update A/L data
  updateAL(id: number, editedDataAL) {

    if (this.examType == '1') {  // gce A/L
      if (editedDataAL.year == "" || editedDataAL.indexNumber == null || editedDataAL.indexNumber == "" || editedDataAL.medium.mediumId == null || editedDataAL.alSubjects.id == null || editedDataAL.result.id == null) {
        this.fill(this.fillMandatory);
      } else {

        if (editedDataAL.stream.id == "") {
          editedDataAL.stream = null;
        }

        this.alService.updateEducationalQualificationAL(id, editedDataAL)
          .subscribe(data => {
            this.getDataAL(this.iStudentId);
            this.modalRef.hide();
            this.openEditOk(this.editok);
            this.editedDataAL.alSubjects.id = null;
          });
      }
    } else {  // gce Edexcel or Cambridge or other
      if (editedDataAL.year == "" || editedDataAL.indexNumber == "" || editedDataAL.indexNumber == null || editedDataAL.alSubjects.id == "" || editedDataAL.result.id == "") {
        this.fill(this.fillMandatory);
      } else {
        editedDataAL.stream = null;
        editedDataAL.medium = null;

        this.alService.updateEducationalQualificationAL(id, editedDataAL)
          .subscribe(data => {
            this.getDataAL(this.iStudentId);
            this.modalRef.hide();
            this.openEditOk(this.editok);
            this.editedDataAL.alSubjects.id = null;
          });
      }
    }

  }

  // delete A/L data
  deleteAL(id: number) {
    this.alService.deleteEducationalQualificationAL(id)
      .subscribe(data => {
        this.getDataAL(this.iStudentId);
        this.modalRef.hide();
        this.openDeleteOk(this.deleteok);
      });
  }

  // get all A/Lcertificates
  getAllCertificatesAL(iStudentId) {
    this.alService.getAllCertificatesAL(iStudentId)
      .subscribe(res => this.certificatesAL = res)
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  // upload file
  upload(data: NgForm) {

    //this.progress.percentage = 0;
    this.certificateName = this.alCertiicatedata.id + "_al.pdf";
    this.currentFileUpload = this.selectedFiles.item(0);

    this.qualificationCommonService.upload(this.currentFileUpload, this.certificateName)
      .subscribe(event => {
        console.log(event);
      });

    this.selectedFiles = undefined;
  }

  //save A/L certificates
  saveCertificatesAL(certi) {
    certi.initialStudentId.id = this.iStudentId;
    certi.programme.programId = this.programmeId;
    certi.certificateName = "al"
    certi.examTypes.id = this.examType;

    this.alService.addCertificatesAL(certi)
      .subscribe(res => {
        this.alCertiicatedata = res;
        this.upload(certi);
        this.getAllCertificatesAL(this.iStudentId);
      });
  }

  // delete A/L certificates
  deleteCertificatesAL(id: number) {
    this.alService.deleteCertificatesAL(id)
      .subscribe(res => this.getAllCertificatesAL(this.iStudentId));
  }

  // get certificates by counselling saved table
  getCounsellingSavedCertificates() {

    this.qualificationCommonService.getCounsellingSavedCertificates(this.initialApplicantId)
      .subscribe(data => {
        this.counsellingSavedCertificates = data.message;
        var docs = this.counsellingSavedCertificates.split(",");

        for (let i = 0; i < docs.length; i++) {
          if (docs[i] == 'advancedlevel') {
            this.counsellingAL = true;
          }
        }
      });
  }
}
