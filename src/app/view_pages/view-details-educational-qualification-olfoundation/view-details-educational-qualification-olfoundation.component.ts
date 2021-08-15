import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';

import { EducationalQualificationOLService } from '../../educational-qulification/services/educational-qualification-ol.service';
import { EducationalQualificationFoundationService } from '../../educational-qulification//services/educational-qualification-foundation.service';


@Component({
  selector: 'app-view-details-educational-qualification-olfoundation',
  templateUrl: './view-details-educational-qualification-olfoundation.component.html',
  styleUrls: ['./view-details-educational-qualification-olfoundation.component.css']
})
export class ViewDetailsEducationalQualificationOLFoundationComponent implements OnInit {

  public eduOL: any = [];   // for list function
  public certificatesOL: any = []; // list certificates function
  public years: any = [];  // list past years
  public medium: any = []; // list all mediums
  public olSubjects: any = []; // list all OL subjects
  public result: any = []; // list all results

  public eduFoundation: any = [];   // for list function

  editedDataOL = {
    initialStudentId: {
      id: ''
    },
    year: '',
    indexNumber: '',
    medium: {
      mediumId: ''
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
  }

  dataFoundation = {
    initialStudentId: {
      id: ''
    },
    year: '',
    indexNumber: '',
    medium: '',
    subject: '',
    result: '',
  }

  iStudentId: string = '';
  submitted = false;
  id: number;
  isFill = 0;
  programmeId: string = '';

  modalRef: BsModalRef;
  fillRef: BsModalRef;

  @ViewChild('deleteok') deleteok;
  @ViewChild('editok') editok;
  @ViewChild('fillMandatory') fillMandatory;

  constructor(private modalService: BsModalService, private olService: EducationalQualificationOLService, private foundationService: EducationalQualificationFoundationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.iStudentId = localStorage.getItem('initialstudentid');
    this.programmeId = localStorage.getItem("programmeid");

    this.getAllYears();
    this.getAllMediums();
    this.getAllOLSubjects();
    this.getAllResults();
    this.getDataOL(this.iStudentId);
    this.getAllCertificatesOL(this.iStudentId);
    this.getDataFoundation(this.iStudentId);
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

  // get all mediums
  getAllMediums() {
    this.olService.getAllMediums()
      .subscribe(data => {
        console.log(data);
        this.medium = data;
      });
  }

  // get all results
  getAllResults() {
    this.olService.getAllResults()
      .subscribe(data => {
        console.log(data);
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

    for (var i = 0; i < 20; i++) {
      year = year - 1;
      this.years.push({ year });
    }
    console.log(this.years);
  }

  // get all O/L data 
  getDataOL(iStudentId) {
    this.olService.getAllOL(iStudentId)
      .subscribe(data => {
        console.log(data);
        this.eduOL = data;
      });
  }

  // update O/L data
  updateOL(id: number, editedDataOL) {
    if (editedDataOL.year == "" || editedDataOL.indexNumber == "" || editedDataOL.medium == "" || editedDataOL.olSubjects == "" || editedDataOL.result == "") {
      this.fill(this.fillMandatory);
    } else {
      editedDataOL.initialStudentId.id = this.iStudentId;
      editedDataOL.isFill = 1;
      editedDataOL.programme.programId = this.programmeId;
      this.olService.updateEducationalQualificationOL(id, editedDataOL)
        .subscribe(data => {
          console.log(data);
          this.getDataOL(this.iStudentId);
          this.modalRef.hide();
          this.openEditOk(this.editok);
        });
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

  // delete O/L certificates
  deleteCertificatesOL(id: number) {
    this.olService.deleteCertificatesOL(id)
      .subscribe(res => this.getAllCertificatesOL(this.iStudentId));
  }

  // get all Foundation data
  getDataFoundation(iStudentId) {
    this.foundationService.getAllFoundation(iStudentId)
      .subscribe(data => this.eduFoundation = data);
  }
}
