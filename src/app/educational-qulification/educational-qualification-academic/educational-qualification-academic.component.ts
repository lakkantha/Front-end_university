import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import { EducationalQualificationAcademicService } from '../services/educational-qualification-academic.service';
import { LangaugeService } from 'src/app/language/Service/langauge.service';
import { RedirectToSequeceService } from 'src/app/_services/RedirectToSequece.service';
import { QualificationCommonService } from '../services/qualification-common.service';

@Component({
  selector: 'app-educational-qualification-academic',
  templateUrl: './educational-qualification-academic.component.html',
  styleUrls: ['./educational-qualification-academic.component.css']
})
export class EducationalQualificationAcademicComponent implements OnInit {

  faInfoCircle = faInfoCircle;
  iStudentId: string = '';
  submitted = false;
  id: number;
  isFill = 0;
  programmeId: string = '';
  academicFill = false;
  successFill = false;
  sequence = false;
  nic: string = '';
  initialApplicantId;
  initialApplicant;

  initialApplicantSequence: any = [];
  continueBtn = true;

  constructor(private academicService: EducationalQualificationAcademicService, private qualificationCommonService: QualificationCommonService, private redirectToSequeceService: RedirectToSequeceService, private tag: LangaugeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    localStorage.setItem("name", 'eduAcademic');
    this.iStudentId = localStorage.getItem('initialstudentid');
    this.programmeId = localStorage.getItem("programmeid");
    this.initialApplicant = localStorage.getItem("initialapplicantid");
    this.getSequence();

    this.nic = localStorage.getItem("nic");

    this.academicService.academicSource$.subscribe(data => {
      if (data == "true") {
        this.academicFill = true;
        this.checkQualifications();
      } else if (data == "false") {
        this.academicFill = false;
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
    if (this.academicFill == true) {
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
