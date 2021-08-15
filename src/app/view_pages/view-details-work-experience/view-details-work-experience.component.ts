import { Component, OnInit, ViewChild, ElementRef, Version, TemplateRef } from '@angular/core';
import { StorageService } from '../../_services/services/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmmitterServiceService } from '../../_services/services/emmitter-service.service';
import { NgForm } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-view-details-work-experience',
  templateUrl: './view-details-work-experience.component.html',
  styleUrls: ['./view-details-work-experience.component.css']
})
export class ViewDetailsWorkExperienceComponent implements OnInit {

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

  iStudentId: string = '';
  isFill = 0;
  programmeId: string = '';

  @ViewChild('deleteok') deleteok;
  @ViewChild('editok') editok;
  @ViewChild('edit') edit;
  @ViewChild('fillMandatory') fillMandatory;
  @ViewChild('validateDate') validateDate;

  public experiences: any = [];
  public certificatesWork: any = []; // list certificates function

  enableEdit = false;
  enableEditIndex = null;
  editcompany = '';
  editdesignation = '';
  editdateFrom = '';
  editdateTo = '';
  editid = '';

  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];
  modalRef: BsModalRef;
  fillRef: BsModalRef;

  constructor(private api: StorageService, private router: Router, private emitterService: EmmitterServiceService,
    private route: ActivatedRoute, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.iStudentId = localStorage.getItem('initialstudentid');
    this.programmeId = localStorage.getItem("programmeid");

    this.getItem(this.iStudentId);
    this.getAllCertificatesWork(this.iStudentId);
  }

  // get all work experience data
  async getItem(iStudentId) {
    this.api.getExperience(iStudentId)
      .subscribe(res => {
        this.experiences = res;
      }, err => {
        console.log(err);
      });
  }

  async reset() {
    window.location.reload();
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

  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  openDelete(deletedata: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      deletedata,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  openDeleteOk(deleteok: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      deleteok,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  fill(fillMandatory: TemplateRef<any>) {
    this.fillRef = this.modalService.show(
      fillMandatory,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  openEditok(editdata: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      editdata,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  OpenEdit(edit: TemplateRef<any>, dataedit) {
    this.modalRef = this.modalService.show(
      edit,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    /*
        this.api.getExperienceId(dataedit)
          .subscribe(res => {
            console.log(res);
            this.editcompany = res.company;
            this.editdesignation = res.designation;
            this.editdateFrom = res.dateFrom;
            this.editdateTo = res.dateTo;
            this.editid = res.id;
            console.log(this.editcompany, this.editdesignation, this.editdateFrom, this.editdateTo);
            this.modalRef = this.modalService.show(
              this.edit,
              Object.assign({}, { class: 'gray modal-lg' })
            );
          }, err => {
            console.log(err);
          });
          */
  }

  // get all Work certificates
  getAllCertificatesWork(iStudentId) {
    this.api.getAllCertificatesWork(iStudentId)
      .subscribe(res => this.certificatesWork = res)
  }

  // delete Work certificates
  deleteCertificatesWork(id: number) {
    this.api.deleteCertificatesWork(id)
      .subscribe(res => this.getAllCertificatesWork(this.iStudentId));
  }
}
