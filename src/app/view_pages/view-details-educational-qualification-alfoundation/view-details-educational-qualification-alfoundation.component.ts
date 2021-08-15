import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';

import { EducationalQualificationALService } from '../../educational-qulification/services/educational-qualification-al.service';
import { EducationalQualificationFoundationService } from '../../educational-qulification/services/educational-qualification-foundation.service';


@Component({
  selector: 'app-view-details-educational-qualification-alfoundation',
  templateUrl: './view-details-educational-qualification-alfoundation.component.html',
  styleUrls: ['./view-details-educational-qualification-alfoundation.component.css']
})
export class ViewDetailsEducationalQualificationALFoundationComponent implements OnInit {

  public eduAL: any = [];   // for list function
  public certificatesAL: any = []; // list certificates function
  public years: any = [];  // list past years
  public medium: any = []; // list all mediums
  public stream: any = []; // list all results
  public alSubjects: any = []; // list all AL subjects
  public result: any = []; // list all results
  public eduFoundation: any = [];   // for list function

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
  }

  dataFoundation = {
    initialStudentId: {
      id: ''
    },
    year: '',
    indexNumber: '',
    medium: '',
    stream: '',
    subject: '',
    result: ''
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

  constructor(private modalService: BsModalService, private alService: EducationalQualificationALService, private foundationService: EducationalQualificationFoundationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.iStudentId = localStorage.getItem('initialstudentid');
    this.programmeId = localStorage.getItem("programmeid");

    this.getAllYears();
    this.getAllMediums();
    this.getAllStreams();
    this.getAllALSubjects();
    this.getAllResults();
    this.getDataAL(this.iStudentId);
    this.getAllCertificatesAL(this.iStudentId);
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

  // get all A/L data
  getDataAL(iStudentId) {
    this.alService.getAllAL(iStudentId)
      .subscribe(data => {
        console.log(data);
        this.eduAL = data
      });
  }

  // update A/L data
  updateAL(id: number, editedDataAL) {
    if (editedDataAL.year == "" || editedDataAL.indexNumber == "" || editedDataAL.medium == "" || editedDataAL.stream == "" || editedDataAL.alSubjects.id == "" || editedDataAL.result == "") {
      this.fill(this.fillMandatory);
    } else {
      editedDataAL.initialStudentId.id = this.iStudentId;
      editedDataAL.isFill = 1;
      editedDataAL.programme.programId = this.programmeId;
      this.alService.updateEducationalQualificationAL(id, editedDataAL)
        .subscribe(data => {
          console.log(data);
          this.getDataAL(this.iStudentId);
          this.modalRef.hide();
          this.openEditOk(this.editok);
        });
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

  // delete A/L certificates
  deleteCertificatesAL(id: number) {
    this.alService.deleteCertificatesAL(id)
      .subscribe(res => this.getAllCertificatesAL(this.iStudentId));
  }

  // get all Foundation data
  getDataFoundation(iStudentId) {
    this.foundationService.getAllFoundation(iStudentId)
      .subscribe(data => this.eduFoundation = data);
  }
}
