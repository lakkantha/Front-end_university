import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { EducationalQualificationOLService } from '../services/educational-qualification-ol.service';
import { EducationalQualificationALService } from '../services/educational-qualification-al.service';
import { EducationalQualificationFoundationService } from '../services/educational-qualification-foundation.service';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { LangaugeService } from 'src/app/language/Service/langauge.service';
import { RedirectToSequeceService } from 'src/app/_services/RedirectToSequece.service';
import { QualificationCommonService } from '../services/qualification-common.service';

@Component({
  selector: 'app-educational-qualification-olalfoundation',
  templateUrl: './educational-qualification-olalfoundation.component.html',
  styleUrls: ['./educational-qualification-olalfoundation.component.css']
})
export class EducationalQualificationOLALFoundationComponent implements OnInit {

  faInfoCircle = faInfoCircle;
  iStudentId: string = '';
  submitted = false;
  id: number;
  isFill = 0;
  programmeId: string = '';
  olFill = false;
  alFill = false;
  foundationFill = false;
  successFill = false;
  sequence = false;
  nic: string = '';
  initialApplicantId;

  initialApplicant;

  initialApplicantSequence: any = [];
  continueBtn = true;

  constructor(private modalService: BsModalService, private tag: LangaugeService, private olService: EducationalQualificationOLService, private alService: EducationalQualificationALService, private foundationService: EducationalQualificationFoundationService, private qualificationCommonService: QualificationCommonService, private redirectToSequeceService: RedirectToSequeceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    localStorage.setItem("name", 'eduOLALfoundation');
    this.iStudentId = localStorage.getItem('initialstudentid');
    this.programmeId = localStorage.getItem("programmeid");
    this.initialApplicant = localStorage.getItem("initialapplicantid");
    this.getSequence();

    this.nic = localStorage.getItem("nic");

    this.olService.olSource$.subscribe(data => {
      if (data == "true") {
        this.olFill = true;
        this.checkQualifications();
      } else if (data == "false") {
        this.olFill = false;
        this.checkQualifications();
      }
    });

    this.alService.alSource$.subscribe(data => {
      if (data == "true") {
        this.alFill = true;
        this.checkQualifications();
      } else if (data == "false") {
        this.alFill = false;
        this.checkQualifications();
      }
    });

    this.foundationService.foundationSource$.subscribe(data => {
      if (data == "true") {
        this.foundationFill = true;
        this.checkQualifications();
      } else if (data == "false") {
        this.foundationFill = false;
        this.checkQualifications();
      }
    });
  }

  // get sequence number of initial applicant
  getSequence() {
    this.qualificationCommonService.getSequenceNumberByInitialApplicantId(this.initialApplicant)
      .subscribe(data => {
        this.initialApplicantSequence = data;

        if (this.initialApplicantSequence.sequence.id > 8) {
          this.continueBtn = false;
        }
      });
  }

  checkQualifications() {
    if (this.olFill == true && this.alFill == true && this.foundationFill == true) {
      this.successFill = true;
    } else {
      this.successFill = false;
    }
  }

  // update sequence table 
  async updateSequence(): Promise<boolean> {

    this.sequence = false
    if (this.continueBtn == false) {
      this.router.navigate(['/home']);
    } else {
      if (this.sequence == false) {
        this.initialApplicantId = await this.qualificationCommonService.updateSequenceTable(this.nic, this.programmeId).toPromise()
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

}
