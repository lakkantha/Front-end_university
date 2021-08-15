import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { BsModalService } from 'ngx-bootstrap/modal';
import { LangaugeService } from 'src/app/language/Service/langauge.service';
import { RedirectToSequeceService } from 'src/app/_services/RedirectToSequece.service';
import { EducationalQualificationAcademicService } from '../services/educational-qualification-academic.service';
import { EducationalQualificationALService } from '../services/educational-qualification-al.service';
import { EducationalQualificationOLService } from '../services/educational-qualification-ol.service';
import { QualificationCommonService } from '../services/qualification-common.service';

@Component({
  selector: 'app-educational-qualification-olalacademic-alacademic-not-mandatory',
  templateUrl: './educational-qualification-olalacademic-alacademic-not-mandatory.component.html',
  styleUrls: ['./educational-qualification-olalacademic-alacademic-not-mandatory.component.css']
})
export class EducationalQualificationOLALAcademicALAcademicNotMandatoryComponent implements OnInit {
  
  faInfoCircle = faInfoCircle;
  iStudentId: string = '';
  submitted = false;
  id: number;
  isFill = 0;
  programmeId: string = '';
  olFill = false;
  alFill = false;
  academicFill = false;
  successFill = false;
  sequence = false;
  nic: string = '';
  initialApplicantId;

  initialApplicant;

  initialApplicantSequence: any = [];
  continueBtn = true;

  constructor(private modalService: BsModalService, private tag: LangaugeService, private olService: EducationalQualificationOLService, private alService: EducationalQualificationALService, private academicService: EducationalQualificationAcademicService, private qualificationCommonService: QualificationCommonService, private redirectToSequeceService: RedirectToSequeceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    localStorage.setItem("name", 'eduOLALAcademic');
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
    if (this.olFill == true && this.academicFill == true) {
      this.successFill = true;
    } else if (this.olFill == true && this.alFill == true) {
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

