import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';

import { EducationalQualificationAcademicService } from '../services/educational-qualification-academic.service';
import { QualificationCommonService } from '../services/qualification-common.service';

@Component({
  selector: 'app-template-academic',
  templateUrl: './template-academic.component.html',
  styleUrls: ['./template-academic.component.css']
})
export class TemplateAcademicComponent implements OnInit {

  public eduAcademic: any = [];   // for list function
  public certificatesAcademic: any = []; // list certificates function
  public institution: any = []; // list all institutions
  public qualification: any = [];  // list all qualification tyeps

  dataAcademic = {
    initialStudentId: {
      id: ''
    },
    academicQualificationTypes: {
      id: ''
    },
    qualificationName: '',
    duration: '',
    institution: {
      id: ''
    },
    effectiveDate: '',
    isFill: '',
    programme: {
      programId: ''
    },
  }

  editedDataAcademic = {
    initialStudentId: {
      id: ''
    },
    academicQualificationTypes: {
      id: ''
    },
    qualificationName: '',
    duration: '',
    institution: {
      id: ''
    },
    effectiveDate: '',
    isFill: '',
    programme: {
      programId: ''
    },
  }

  certiAcademic = {
    initialStudentId: {
      id: ''
    },
    certificateName: '',
    programme: {
      programId: ''
    },
  }

  qualificationTypes = {
    qualificationType: ''
  }

  qualificationTypeName;
  qualificationType;
  newQualificationTypeData: any = [];

  iStudentId: string = '';
  submitted = false;
  isFill = 0;
  programmeId: string = '';
  academicFill = false;
  successFill = false;
  certificate = false;

  // upload certificates
  certificateName;
  selectedFiles: FileList;
  currentFileUpload: File = null;
  progress: { percentage: number } = { percentage: 0 };
  academicCertiicatedata: any = [];

  base_url = environment.base_url;
  counsellingSavedCertificates;
  counsellingAcademic = false;
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

  constructor(private qualificationCommonService: QualificationCommonService, private modalService: BsModalService, private academicService: EducationalQualificationAcademicService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.iStudentId = localStorage.getItem('initialstudentid');
    console.log(this.iStudentId);
    this.programmeId = localStorage.getItem("programmeid");
    console.log(this.programmeId);

    this.initialApplicantId = localStorage.getItem('initialapplicantid');

    this.getAllQualificationTypes();
    this.getinstitutions();
    this.getDataAcademic(this.iStudentId);
    this.getAllCertificatesAcademic(this.iStudentId);
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

  // get all institutions
  getinstitutions() {
    this.academicService.getAllinstitutions()
      .subscribe(data => {
        console.log(data);
        this.institution = data;
      });
  }

  // get all qualification types
  getAllQualificationTypes() {
    this.academicService.getAllQualificationTypes()
      .subscribe(data => {
        this.qualification = data;
      });
  }

  // Fill form sucess
  formFillComplete() {
    if (this.academicFill) {
      this.academicService.fillAcademic("true");
    }
    else {
      this.academicService.fillAcademic("false");
    }
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
      this.certiAcademic.certificateName = '';
    }
  }

  // set qualification and add new qualification
  setAcademicQualificationIdByName(qualificationType) {
    this.newQualificationTypeData = [];
    this.qualificationTypeName = qualificationType.target.value;
    this.qualificationType = this.qualification.filter(x => x.qualificationType === this.qualificationTypeName)[0];

    if (this.qualificationType) {
      this.dataAcademic.academicQualificationTypes.id = this.qualificationType.id;
      this.editedDataAcademic.academicQualificationTypes.id = this.qualificationType.id;
    } else {
      this.qualificationTypes.qualificationType = this.qualificationTypeName;
      this.academicService.saveNewQualificationType(this.qualificationTypes)
        .subscribe(data => {
          this.newQualificationTypeData = data;
          this.dataAcademic.academicQualificationTypes.id = this.newQualificationTypeData.id;
          this.editedDataAcademic.academicQualificationTypes.id = this.qualificationType.id;
        });
    }
  }

  // get all Academic data
  getDataAcademic(iStudentId) {
    this.academicService.getAllAcademic(iStudentId)
      .subscribe(data => {
        console.log(data);
        this.eduAcademic = data;
        if (Object.keys(this.eduAcademic).length === 0) {
          this.academicFill = false;
        } else {
          this.academicFill = true;
        }
        this.formFillComplete();
      });
  }

  // save Academic data
  saveAcademic(dataAcademic) {
    this.submitted = true;
    if (dataAcademic.qualificationType == "" || dataAcademic.qualificationName == "" || dataAcademic.duration == "" || dataAcademic.institution.id == "" || dataAcademic.effectiveDate == "") {
      this.fill(this.fillMandatory);
    } else {
      dataAcademic.initialStudentId.id = this.iStudentId;
      dataAcademic.isFill = 1;
      dataAcademic.programme.programId = this.programmeId;
      this.academicService.addEducationalQualificationAcademic(dataAcademic)
        .subscribe(data => {
          this.getDataAcademic(this.iStudentId);
          this.savesuccessfulmsg(this.saveSucessful);
          this.academicFill = true;
          this.formFillComplete();
        });
    }
  }

  // update Academic data
  updateAcademic(id: number, editedDataAcademic) {
    if (editedDataAcademic.qualificationType == "" || editedDataAcademic.qualificationName == "" || editedDataAcademic.duration == "" || editedDataAcademic.institution.id == "" || editedDataAcademic.effectiveDate == "") {
      this.fill(this.fillMandatory);
    } else {
      editedDataAcademic.initialStudentId.id = this.iStudentId;
      editedDataAcademic.isFill = 1;
      editedDataAcademic.programme.programId = this.programmeId;
      this.academicService.updateEducationalQualificationAcademic(id, editedDataAcademic)
        .subscribe(data => {
          console.log(data);
          this.getDataAcademic(this.iStudentId);
          this.modalRef.hide();
          this.openEditOk(this.editok);
        });
    }
  }

  // delete Academic data
  deleteAcademic(id: number) {
    this.academicService.deleteEducationalQualificationAcademic(id)
      .subscribe(data => {
        console.log(data);
        this.getDataAcademic(this.iStudentId);
        this.modalRef.hide();
        this.openDeleteOk(this.deleteok);
        this.formFillComplete();
      });
  }

  // get all Academic certificates
  getAllCertificatesAcademic(iStudentId) {
    this.academicService.getAllCertificatesAcademic(iStudentId)
      .subscribe(res => {
        this.certificatesAcademic = res;
        console.log(this.certificatesAcademic);
      })
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  // upload file
  upload(data: NgForm) {

    //this.progress.percentage = 0;
    this.certificateName = this.academicCertiicatedata.id + "_academic.pdf";
    this.currentFileUpload = this.selectedFiles.item(0);

    this.qualificationCommonService.upload(this.currentFileUpload, this.certificateName)
      .subscribe(event => {
        console.log(event);
      });

    this.selectedFiles = undefined;
  }

  //save Academic certificates
  saveCertificatesAcademic(certiAcademic) {
    certiAcademic.initialStudentId.id = this.iStudentId;
    certiAcademic.programme.programId = this.programmeId;
    certiAcademic.certificateName = "academic"
    this.academicService.addCertificatesAcademic(certiAcademic)
      .subscribe(res => {
        this.academicCertiicatedata = res;
        this.upload(certiAcademic);
        this.getAllCertificatesAcademic(this.iStudentId);
      })
  }

  // delete Academic certificates
  deleteCertificatesAcademic(id: number) {
    this.academicService.deleteCertificatesAcademic(id)
      .subscribe(res => {
        console.log(res);
        this.getAllCertificatesAcademic(this.iStudentId);
      });
  }

  // get certificates by counselling saved table

  getCounsellingSavedCertificates() {
    this.qualificationCommonService.getCounsellingSavedCertificates(this.initialApplicantId)
      .subscribe(data => {
        this.counsellingSavedCertificates = data.message;
        var docs = this.counsellingSavedCertificates.split(",");

        for (let i = 0; i < docs.length; i++) {
          if (docs[i] == 'educational') {
            this.counsellingAcademic = true;
          }
        }
      });
  }

}
