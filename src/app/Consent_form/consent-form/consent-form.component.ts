import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConsentFormService } from 'src/app/Consent_form/consent-form.service';
import { RedirectToSequeceService } from 'src/app/_services/RedirectToSequece.service';
import { StorageService } from 'src/app/_services/services/storage.service';

@Component({
  selector: 'app-consent-form',
  templateUrl: './consent-form.component.html',
  styleUrls: ['./consent-form.component.css']
})
export class ConsentFormComponent implements OnInit {

  msg;
  initialApplicantId;
  initialApplicantData: any = [];
  programName;
  applicantName;
  registeredAcademicYear;
  phoneNumber;
  emailAddress;

  // send notification
  messageToStudent;
  closeResult = '';
  contactStudent = {
    contact: "",
    message: ""
  }

  commonRef: BsModalRef;
  @ViewChild('common') commonMsg;

  constructor(private modalService: BsModalService, private toastr: ToastrService, private spinner: NgxSpinnerService, private modal: NgbModal, private redirectToSequeceService: RedirectToSequeceService,
    private consentFormService: ConsentFormService, private api: StorageService,) { }

  ngOnInit(): void {
    this.initialApplicantId = localStorage.getItem("initialapplicantid");
    this.getDataByInitialApplicantId();
  }

  // common msg pop up 
  commonMsgPopUp(common: TemplateRef<any>) {
    this.commonRef = this.modalService.show(
      common,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  getDataByInitialApplicantId() {
    this.consentFormService.getInitialApplicantDataById(this.initialApplicantId)
      .subscribe(data => {
        this.initialApplicantData = data;
        console.log("initial Applicant: " + this.initialApplicantData);
      });
  }

  // click I Agree button
  completeRegistration() {

    this.programName = this.initialApplicantData.programStarted.program.title;
    this.applicantName = this.initialApplicantData.namewithinitials;
    this.registeredAcademicYear = this.initialApplicantData.programStarted.academicYear.year;
    this.phoneNumber = this.initialApplicantData.mobileno;
    this.emailAddress = this.initialApplicantData.email;
    this.msg = "Your online registration process is successfully completed for the programme of " +this.programName;
    this.messageToStudent ="Dear Student,\nYour registration of " +this.programName + " has been successfully completed for" +this.registeredAcademicYear; 

    this.commonMsgPopUp(this.commonMsg);
    this.sendBoth();
    this.updateSequenceToRegistrationCompleted();
  }

  // send both sms to email to selected initial student
  sendBoth() {
    this.sendEmaiToStudent();
    this.sendSMSToStudent();
  }

  // send sms to selected initial student
  sendSMSToStudent() {

    this.contactStudent.contact = this.phoneNumber;
    this.contactStudent.message = this.messageToStudent;

    this.consentFormService.sendSMS(this.contactStudent)
      .subscribe(res => {
        this.toastr.info("SMS Sent" + "</br> ", "Success!",
          {
            enableHtml: true
          });
      }, (err) => {
        this.toastr.error("SMS Sending Failed", "Error")
        console.log(err);
      });
  }

  // send email to selected initial student
  sendEmaiToStudent() {

    this.contactStudent.contact = this.emailAddress;
    this.contactStudent.message = this.messageToStudent;
    this.consentFormService.sendEmail(this.contactStudent)
      .subscribe(res => {
        this.toastr.info("Email Sent" + "</br> ", "Success!",
          {
            enableHtml: true
          });
      }, (err) => {
        this.toastr.error("Email Sending Failed", "Error")
        console.log(err);
      });
  }

  // update next sequence as registration completed
  async updateSequenceToRegistrationCompleted() {
    await this.api.updateSequenceTable(this.initialApplicantData.nic, this.initialApplicantData.programStarted.program.programId).toPromise()
    this.redirectToSequeceService.RedirectTo(this.initialApplicantId);
  }

}
