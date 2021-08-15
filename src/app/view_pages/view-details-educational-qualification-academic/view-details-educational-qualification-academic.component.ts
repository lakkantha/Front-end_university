import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { EducationalQualificationAcademicService } from '../../educational-qulification/services/educational-qualification-academic.service';

@Component({
  selector: 'app-view-details-educational-qualification-academic',
  templateUrl: './view-details-educational-qualification-academic.component.html',
  styleUrls: ['./view-details-educational-qualification-academic.component.css']
})
export class ViewDetailsEducationalQualificationAcademicComponent implements OnInit {

  public eduAcademic: any = [];   // for list function
  public certificatesAcademic: any = []; // list certificates function
  public institution: any = []; // list all institutions

  editedDataAcademic = {
    initialStudentId: {
      id: ''
    },
    qualificationType: '',
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

  iStudentId: string = '';
  submitted = false;
  isFill = 0;
  programmeId: string = '';

  modalRef: BsModalRef;
  fillRef: BsModalRef;

  @ViewChild('deleteok') deleteok;
  @ViewChild('editok') editok;
  @ViewChild('fillMandatory') fillMandatory;

  constructor(private modalService: BsModalService, private academicService: EducationalQualificationAcademicService, private router: Router) { }

  ngOnInit() {
    this.iStudentId = localStorage.getItem('initialstudentid');
    this.programmeId = localStorage.getItem("programmeid");

    this.getinstitutions();
    this.getDataAcademic(this.iStudentId);
    this.getAllCertificatesAcademic(this.iStudentId);
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

  // get all institutions
  getinstitutions() {
    this.academicService.getAllinstitutions()
      .subscribe(data => {
        console.log(data);
        this.institution = data;
      });
  }

  // get all Academic data
  getDataAcademic(iStudentId) {
    this.academicService.getAllAcademic(iStudentId)
      .subscribe(data => {
        console.log(data);
        this.eduAcademic = data
      });
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
      });
  }

  // get all Academic certificates
  getAllCertificatesAcademic(iStudentId) {
    this.academicService.getAllCertificatesAcademic(iStudentId)
      .subscribe(res => this.certificatesAcademic = res)
  }

  // delete Academic certificates 1
  deleteCertificatesAcademic(id: number) {
    this.academicService.deleteCertificatesAcademic(id)
      .subscribe(res => {
        console.log(res);
        this.getAllCertificatesAcademic(this.iStudentId);
      });
  }

}
