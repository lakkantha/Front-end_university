import { Component, OnInit, ViewChild, ElementRef, Version, TemplateRef } from '@angular/core';
import { StorageService } from '../../_services/services/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmmitterServiceService } from '../../_services/services/emmitter-service.service';
import { NgForm } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-view-details-professional-qualification',
  templateUrl: './view-details-professional-qualification.component.html',
  styleUrls: ['./view-details-professional-qualification.component.css']
})
export class ViewDetailsProfessionalQualificationComponent implements OnInit {

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

  iStudentId: string = '';
  isFill = 0;
  programmeId: string = '';

  @ViewChild('deleteok') deleteok;
  @ViewChild('editok') editok;
  @ViewChild('edit') edit;
  @ViewChild('template') template;
  @ViewChild('fillMandatory') fillMandatory;
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];

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
  fillRef: BsModalRef;

  constructor(private api: StorageService, private router: Router, private emitterService: EmmitterServiceService,
    private route: ActivatedRoute, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.iStudentId = localStorage.getItem('initialstudentid');
    this.programmeId = localStorage.getItem("programmeid");

    this.getItem(this.iStudentId);
    this.getAllCertificatesProfessional(this.iStudentId);
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
    this.api.getQualificationId(dataedit)
      .subscribe(res => {
        console.log(res);
        this.editQualification = res.qualification;
        this.editinstitution = res.institution;
        this.editdate = res.edate;
        this.editduration = res.duration;
        this.editid = res.id;
        console.log(this.editQualification, this.editduration, this.editinstitution, this.editdate);
        this.modalRef = this.modalService.show(
          this.edit,
          Object.assign({}, { class: 'gray modal-lg' })
        );
      }, err => {
        console.log(err);
      });
      */
  }

  fill(fillMandatory: TemplateRef<any>) {
    this.fillRef = this.modalService.show(
      fillMandatory,
      Object.assign({}, { class: 'gray modal-md' })
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

  // get all professional data
  async getItem(iStudentId) {
    this.api.getQualification(iStudentId)
      .subscribe(res => {
        this.qualifications = res;
      }, err => {
        console.log(err);
      });
  }

  async reset() {
    window.location.reload();
  }

  // update professional data
  async Update(id, data2) {
    if (data2.qualification == "" || data2.institution == "" || data2.edate == "" || data2.duration == "") {
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
    /*
        console.log(update.id);
        this.api.updateQualification(update.id,update)
          .subscribe(
            response => {
              console.log(response);
              this.modalRef.hide();
              this.getItem();
              this.openEditok(this.editok);
            },
            error => {
              console.log(error);
            });
            */
  }

  async save() {
    //   this.api.updateQualification(id,this.qualifications)
    //     .subscribe(
    //       response => {
    //         console.log(response);
    this.openModalWithClass(this.template);
    //       },
    //       error => {
    //         console.log(error);
    //       });
  }

  // delete professional data
  async delete(id) {
    this.api.deleteQualification(id)
      .subscribe(data => {
        this.getItem(this.iStudentId);
        this.modalRef.hide();
        this.openDeleteOk(this.deleteok);
      });
    /*
        this.api.deleteQualification(id)
          .subscribe(
            response => {
              this.emitterService.broadcast({content_type:"updateQualification"});
              this.getItem();
              this.modalRef.hide();
              this.openDeleteOk(this.deleteok);
            },
            error => {
              console.log(error);
            });
            */
  }

  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  // get all Professional certificates
  getAllCertificatesProfessional(iStudentId) {
    this.api.getAllCertificatesProfessional(iStudentId)
      .subscribe(res => this.certificatesProfessional = res)
  }

  // delete Professional certificates
  deleteCertificatesProfessional(id: number) {
    this.api.deleteCertificatesProfessional(id)
      .subscribe(res => this.getAllCertificatesProfessional(this.iStudentId));
  }
}
