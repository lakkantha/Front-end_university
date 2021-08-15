import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ProgramSpecializationService } from 'src/app/_services/program-specialization.service';
import { ProgramStreamService } from 'src/app/_services/program-stream.service';
import { ProgramDisciplineService } from 'src/app/_services/program-discipline.service';
import { InitialStudentService } from 'src/app/_services/initial-student.service';
import { WorkCertificatesService } from 'src/app/_services/work-certificates.service';
import { ProfessionalCertificatesService } from 'src/app/_services/professional-certificates.service';
import { Console } from 'console';
import { environment } from 'src/environments/environment';
import { EducationalQualificationService } from 'src/app/_services/educational-qualification.service';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StorageService } from 'src/app/_services/services/storage.service';
import { NgForm } from '@angular/forms';
import { QualificationCommonService } from 'src/app/educational-qulification/services/qualification-common.service';
import { EducationalQualificationAcademicService } from 'src/app/educational-qulification/services/educational-qualification-academic.service';
import { EducationalQualificationOLService } from 'src/app/educational-qulification/services/educational-qualification-ol.service';
import { EducationalQualificationALService } from 'src/app/educational-qulification/services/educational-qualification-al.service';
import { DocumentVerificationService } from 'src/app/Document_verfication/services/document-verification.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { InitialApplicantComponent } from 'src/app/Update_InitialApplicant/Component/initial-applicant/initial-applicant.component';
import { RedirectToSequeceService } from 'src/app/_services/RedirectToSequece.service';
import { SequenceService } from 'src/app/_services/sequence.service';

@Component({
  selector: 'app-original-certificate-verification',
  templateUrl: './original-certificate-verification.component.html',
  styleUrls: ['./original-certificate-verification.component.css']
})
export class OriginalCertificateVerificationComponent implements OnInit {

  // get master data from search
  facultyList: any = []; // Faculty list
  departmentList: any = []; // Department List
  programmes: any = []; // Program List
  specialization: any = []; // Specialization List
  stream: any = []; // Stream List
  discipline: any = []; // DisciplineF List
  centerList: any = []; // center list

  documentStatus: any = [] // document status list
  initialStudentStatus: any = []; // initial student status list

  initialStudentData: any = []; // initial student data by id
  localApplicantData: any = []; // get local applicant data by nic and programId

  studentData: any = []; // search student data
  applicationData: any = []; // rogram data with qualification types
  application: any = [];
  data: any = [];

  // details page documents list
  personal: any = [];

  educationalQualificationCertificates: any = [];
  olCertificatesList: any = [];
  alCertificatesList: any = [];
  academicCertificatesList: any = [];
  ol: any = [];
  al: any = [];
  academic: any = [];

  professioanlQualificationCertificates: any = [];
  professional: any = [];
  workExperienceCertificates: any = [];
  work: any = [];
  arr: any = [];

  personalDocumentName;

  base_url = environment.base_url;

  searchData = {
    facultyId: '',
    departmentId: '',
    programStartedId: '',
    programId: '',
    specializationId: '',
    streamId: '',
    disciplineId: '',
    centerId: '',
    selectedProgramId: ''
  }

  applicantData = {
    applicantId: '',
    applicantNic: '',
    registrationNumber: '',
    applicantTypeId: ''
  }

  // details qualification availability
  personalDetails = false;
  educationalDetails = false;
  olDetails = false;
  alDetails = false;
  academicDetails = false;
  professionalDetails = false;
  workDetails = false;

  // table checked data (originality, document status, remark)
  documentStatusData = {
    personalDocumentStatusId: [],
    eduDocumentStatusId: [],
    professionalDocumentStatusId: [],
    workDocumentStatusId: []
  }
  initialStudentStatusId = [];
  remark = '';

  // initial student searched data
  applicantTypeId;
  programId;
  applicantId;
  applicantNic;
  nic;
  applicantPassport;

  // program category data
  specializationId = "0";
  streamId = "0";
  disciplineId = "0"

  // pagination data
  name = 'Angular';
  page = 1;
  pageSize = 1;
  items = [];

  // admin user
  adminUserData;
  admin = false;
  superAdmin = false;

  //upload documents
  personalDocument;

  index;
  fileName;
  x = 0;
  initialStudentIndex = 0;
  examTypeOL = '';
  examTypeAL = '';

  //passport
  passport = false;

  // upload certificates
  certificateName;
  selectedFiles: FileList;
  currentFileUpload: File = null;
  progress: { percentage: number } = { percentage: 0 };

  academicCertiicatedata: any = [];
  olCertiicatedata: any = [];
  alCertiicatedata: any = [];
  workCertiicatedata: any = [];
  professionalCertiicatedata: any = [];

  // academic certificates
  certiAcademic = {
    initialStudentId: {
      id: ''
    },
    certificateName: '',
    programme: {
      programId: ''
    },
  }

  // ol certificates
  certiOL = {
    initialStudentId: {
      id: ''
    },
    certificateName: '',
    programme: {
      programId: ''
    },
    examTypes: {
      id: ''
    },
  }

  // al certificates
  certiAL = {
    initialStudentId: {
      id: ''
    },
    certificateName: '',
    programme: {
      programId: ''
    },
    examTypes: {
      id: ''
    },
  }

  // professional certificates
  certiProfessional = {
    initialStudentId: {
      id: ''
    },
    certificateName: '',
    isFill: '',
    programme: {
      programId: ''
    },
  }

  //work experience certificates
  certiWork = {
    initialStudentId: {
      id: ''
    },
    certificateName: '',
    programme: {
      programId: ''
    },
  }

  professionalDocument = 'professional';
  workDocument = 'work';
  academicDocument = 'academic';
  olDocument = 'ol';
  alDocument = 'al';
  personalNIC = 'personal';

  certificate = false;

  msg;

  nicNumber = '';
  nicImage = '';
  nicNo = '';

  // sms msg
  sendsms = {
    to: [],
    message: '',
    smsType: ''
  }

  mobileNo;
  localApplicantId = '';

  // send sms to selected student
  sendMsgSelected = false;
  selectedInitialStudentWithIndex: any = [];
  indexofSelected;

  messageToStudent;
  closeResult = '';
  contactStudent = {
    contact: "",
    message: ""
  }

  // get counselling uploaded documents
  counsellingSavedCertificates;
  counsellingAcademic = false;
  counsellingAL = false;
  counsellingOL = false;

  selectedProgram: any = [];
  applicationDataForSelectedProgram: any = [];
  optional;

  modalRef: BsModalRef;
  sucessRef: BsModalRef;
  viewRef: BsModalRef;
  pdf: BsModalRef;
  commonRef: BsModalRef;

  @ViewChild('deleteok') deleteok;
  @ViewChild('saveSucessful') saveSucessful;
  @ViewChild('editok') editok;
  @ViewChild('pdfOnly') pdfOnly;
  @ViewChild('common') commonMsg;

  constructor(private httpClient: HttpClient, private modalService: BsModalService, private router: Router,
    private programSpecializationService: ProgramSpecializationService, private programStreamService: ProgramStreamService,
    private programDisciplineService: ProgramDisciplineService, private initialStudentService: InitialStudentService, private workCertificatesService: WorkCertificatesService,
    private professionalCertificatesService: ProfessionalCertificatesService,private educationalQualificationService: EducationalQualificationService, private api: StorageService, private qualificationCommonService: QualificationCommonService, private academicService: EducationalQualificationAcademicService, private olService: EducationalQualificationOLService,
    private alService: EducationalQualificationALService, private documentVerificationService: DocumentVerificationService, private modal: NgbModal, private spinner: NgxSpinnerService, private toastr: ToastrService, private redirectToSequeceService: RedirectToSequeceService,
    private sequenceService: SequenceService,
  ) { }

  ngOnInit(): void {
    this.adminUserData = JSON.parse(sessionStorage.getItem('auth-user'));

    if (this.adminUserData.roles[0] == "ROLE_SUPER_ADMIN") {
      this.superAdmin = true;
    }

    this.getFacultyList(); // get  all faculty list
    this.getDepatmentList(); // get all department list
    this.getAllStartedProgrammes(); // get all programs
    this.getAllDocumentStatus(); // get all document status
    this.getAllInitialStudentStatus(); // get all initial student status
  }

  dataLoad() {
    this.items = [];
    var length = (this.initialStudentData.length) * 10;
    for (let i = 1; i <= length; i++) {
      this.items.push({ Name: 'Shop ' + i });
    }
  }

  // open edit pop up
  openEdit(editForm: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      editForm,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  // open edit pop up
  openAttachDocumentPopup(attachDocuments: TemplateRef<any>) {
    this.examTypeOL = '';
    this.examTypeAL = '';
    this.modalRef = this.modalService.show(
      attachDocuments,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  // ccommon msg pop up 
  commonMsgPopUp(common: TemplateRef<any>) {
    this.commonRef = this.modalService.show(
      common,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  // open edit sucess msg pop up 
  openEditOk(editok: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      editok,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  // open delete confirmation pop up
  openDeleteConfirmationPopup(deleteConfirmation: TemplateRef<any>) {
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

  // Add sucessful msg popup
  savesuccessfulmsg(saveSucessful: TemplateRef<any>) {
    this.sucessRef = this.modalService.show(
      saveSucessful,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  // open view qualification pop up
  async viewQualificationData(viewQualification: TemplateRef<any>) {
    if (this.searchData.selectedProgramId == '') {
      this.msg = "Please select the Program to view required qualifications";
      this.commonMsgPopUp(this.commonMsg);
    } else {
      await this.getDataForViewButton();
      this.viewRef = this.modalService.show(
        viewQualification,
        Object.assign({}, { class: 'gray modal-lg' })
      );
    }
  }

  // get all document status
  getAllDocumentStatus() {
    this.documentVerificationService.getDocumentStatusList().
      subscribe(data => {
        this.documentStatus = data;
      });
  }

  // get all initial student status
  getAllInitialStudentStatus() {
    this.documentVerificationService.getStudentStatusList().
      subscribe(data => {
        this.initialStudentStatus = data;
        this.initialStudentStatus.splice(0, 1);
        this.initialStudentStatus[0].description = "Pending"
        console.log(data);
      });
  }

  // get data for view button by program
  async getDataForViewButton() {

    this.olDetails = false;
    this.alDetails = false;
    this.academicDetails = false;
    this.optional = '';

    var applicationData
    applicationData = await this.documentVerificationService.getApplicationByProgram(this.searchData.selectedProgramId).toPromise();

    for (let i = 0; i < applicationData.length; i++) {

      if (applicationData[i].per_det != null) {
        this.personalDetails = true;
      } if (applicationData[i].edu_qua != null) {
        this.educationalDetails = true;

        if (applicationData[i].edu_qua == "2category_1") { // academic
          this.academicDetails = true;
        }
        else if (applicationData[i].edu_qua == "2category_2") { // ol al
          this.olDetails = true;
          this.alDetails = true;
        }
        else if (applicationData[i].edu_qua == "2category_3") { // al foundation
          this.alDetails = true;
        }
        else if (applicationData[i].edu_qua == "2category_4") { // ol al foundation
          this.olDetails = true;
          this.alDetails = true;
        }
        else if (applicationData[i].edu_qua == "2category_5") {// ol
          this.olDetails = true;
        }
        else if (applicationData[i].edu_qua == "2category_6") { // ol foundation
          this.olDetails = true;
        }
        else if (applicationData[i].edu_qua == "2category_7") { // al
          this.alDetails = true;
        }
        else if (applicationData[i].edu_qua == "2category_8") { // ol al academic
          this.olDetails = true;
          this.alDetails = true;
          this.academicDetails = true;
        }
        else if (applicationData[i].edu_qua == "2category_9") { // ol al academic, academic nt mandatory
          this.olDetails = true;
          this.alDetails = true;
          this.academicDetails = true;
          this.optional = "Academic not mandatory"
        }
        else if (applicationData[i].edu_qua == "2category_10") { // ol al academic,  al or academic should fill with OL
          this.olDetails = true;
          this.alDetails = true;
          this.academicDetails = true;
          this.optional = "AL or Academic qualification should fill with OL"
        }
      } if (applicationData[i].pro_qua != null) {
        this.professionalDetails = true;
      } if (applicationData[i].work_exp != null) {
        this.workDetails = true;
      }
    }
  }

  // get all faculties
  getFacultyList() {
    this.facultyList = [];
    this.searchData.facultyId = "";

    this.documentVerificationService.getFacultyList()
      .subscribe(data => {
        this.facultyList = data
        this.facultyList.sort(function (a, b) {
          if (a.description < b.description) { return -1; }
          if (a.description > b.description) { return 1; }
          return 0;
        })
      });
  }

  // get all departments or department by faculty id
  getDepatmentList() {
    this.departmentList = [];
    this.searchData.departmentId = "";

    if (this.searchData.facultyId == "" || this.searchData.facultyId == null) {
      this.documentVerificationService.getDepartmentList() // get all departments
        .subscribe(data => {
          this.departmentList = data;
          this.departmentList.sort(function (a, b) {
            if (a.description < b.description) { return -1; }
            if (a.description > b.description) { return 1; }
            return 0;
          })
        });
    } else {
      this.documentVerificationService.getDepartmentListByFacultyId(this.searchData.facultyId) // get departments by faculty
        .subscribe(data => {
          this.departmentList = data;
          this.departmentList.sort(function (a, b) {
            if (a.description < b.description) { return -1; }
            if (a.description > b.description) { return 1; }
            return 0;
          })
        });
    }
  }

  //get all started programmes
  getAllStartedProgrammes() {
    this.programmes = [];
    this.searchData.programStartedId = '';
    this.searchData.programId = '';

    this.specialization = [];
    this.stream = [];
    this.discipline = [];

    this.searchData.specializationId = "";
    this.searchData.streamId = "";
    this.searchData.disciplineId = "";

    this.centerList = [];
    this.searchData.centerId = '';

    this.documentVerificationService.getAllStartedProgrammes() // get all programmes
      .subscribe(data => {
        this.programmes = data;

        if (this.searchData.departmentId != "") {
          if (this.searchData.departmentId != null) {
            this.programmes = this.programmes.filter(p => p.program.department.departmentId == this.searchData.departmentId);
          } else if (this.searchData.facultyId != "") {
            if (this.searchData.facultyId != null) {
              this.programmes = this.programmes.filter(f => f.program.facultyId.id == this.searchData.facultyId);
            }
          }
        } else if (this.searchData.facultyId != "") {
          if (this.searchData.facultyId != null) {
            this.programmes = this.programmes.filter(f => f.program.facultyId.id == this.searchData.facultyId);
          }
        }

        //  this.programmes = this.programmes.filter(p => p.program.facultyId.id == this.searchData.facultyId);
        this.programmes.sort(function (a, b) {
          if (a.program.code < b.program.code) { return -1; }
          if (a.program.code > b.program.code) { return 1; }
          return 0;
        })
      });
  }

  // get program category by program Id
  loadProgramCategory(programStartedId) {

    this.specialization = [];
    this.stream = [];
    this.discipline = [];

    this.searchData.specializationId = "";
    this.searchData.streamId = "";
    this.searchData.disciplineId = "";

    this.searchData.programId = "0";
    this.specializationId = "0";
    this.streamId = "0";

    var value = Number(programStartedId);
    for (let i = 0; i < this.programmes.length; i++) {
      if (this.programmes[i].programStartedId == value) {
        this.index = i;
      }
    }

    this.searchData.programId = this.programmes[this.index].program.programId;

    var value = Number(programStartedId);
    for (let i = 0; i < this.programmes.length; i++) {
      if (this.programmes[i].programStartedId == value) {
        this.index = i;
      }
    }

    this.searchData.programId = this.programmes[this.index].program.programId;

    if (this.programmes[this.index].program.specilizationApplicable == true) {
      this.programSpecializationService.getSpecializationListByProgramId(this.searchData.programId)
        .subscribe(data => {
          this.specialization = data;
          this.specialization.sort(function (a, b) {
            return a.specilization.description.localeCompare(b.specilization.description);
          })
        });
    } else if (this.programmes[this.index].program.streamApplicable == true) {
      this.programStreamService.getStreamListByProgramId(this.searchData.programId)
        .subscribe(data => {
          this.stream = data;
          this.stream.sort(function (a, b) {
            return a.stream.description.localeCompare(b.stream.description);
          })
        });
    } else if (this.programmes[this.index].program.disciplineApplicable == true) {
      this.programDisciplineService.getDisciplineListByProgramId(this.searchData.programId)
        .subscribe(data => {
          this.discipline = data;
          this.discipline.sort(function (a, b) {
            return a.discipline.description.localeCompare(b.discipline.description);
          })
        });
    } else {
      console.log("none");
    }
  }

  // get all centers by program started id
  getAllCentersByProgram() {
    this.centerList = [];
    this.searchData.centerId = '';

    this.documentVerificationService.getAllCentersByProgramStartedId(this.searchData.programStartedId)
      .subscribe(data => {
        this.centerList = data;
        this.centerList.sort(function (a, b) {
          return a.cnt_center.cnt_description.localeCompare(b.cnt_center.cnt_description);
        })
      });
  }

  //search
  search() {
    this.selectedProgram = [];
    this.initialStudentData = [];
    this.searchData.selectedProgramId = '';

    if (this.applicantData.applicantId) { // applicant id
      this.getInitialStudentsById();
    }
    else if (this.applicantData.applicantNic) { // nic
      this.getInitialStudentsByNic();
    }
    else if (this.applicantData.registrationNumber) { // registration  number
      this.getInitialStudentsByRegistrationNumber();
    }
    else if (this.searchData.programStartedId && this.searchData.centerId) { // program with or without category and center
      this.selectedProgram[0] = this.programmes[this.index];
      this.getInitialStudetsByProgramStartedIdCategoryAndCenter();
    }
    else if (this.searchData.programStartedId && !this.searchData.centerId) {  //program with or without category
      this.selectedProgram[0] = this.programmes[this.index];
      this.getInitialStudetsByProgramStartedIdOrCategory();
    }
    else if (this.searchData.departmentId) {  //department with or without faculty
      this.selectedProgram = this.programmes;
      this.getInitialStudetsByDepartmentId();
    }
    else if (this.searchData.facultyId) { // only faculty
      this.selectedProgram = this.programmes;
      this.getInitialStudetsByFacultyId();
    }
  }

  // get initial student by initial student id - applicant id field
  getInitialStudentsById() {

    this.initialStudentService.getInitialStudentById(this.applicantData.applicantId) // initial student id
      .subscribe(data => {

        this.initialStudentData[0] = data;

        for (let i = 0; i < this.programmes.length; i++) {
          if (this.programmes[i].programStartedId == this.initialStudentData[0].programStarted.programStartedId) {
            this.selectedProgram[0] = this.programmes[i];
          }
        }
        this.getDetailPageCatgoriesByProgramId();
      });
  }

  // get intial student by nic
  getInitialStudentsByNic() {

    var initiallNic;
    if (this.applicantData.applicantNic.includes("V")) {

      initiallNic = this.applicantData.applicantNic.substring(0, this.applicantData.applicantNic.length - 1)
        + this.applicantData.applicantNic[this.applicantData.applicantNic.length - 1].toLowerCase();
    } else {
      initiallNic = this.applicantData.applicantNic;
    }

    this.initialStudentService.getInitialStudentByNic(initiallNic)
      .subscribe(data => {
        this.initialStudentData = data;

        for (let i = 0; i < this.initialStudentData.length; i++) {
          for (let k = 0; k < this.programmes.length; k++) {
            if (this.programmes[k].programStartedId == this.initialStudentData[i].programStarted.programStartedId) {
              this.selectedProgram.push(this.programmes[k]);
            }
          }
        }
        var searchData = []

        searchData.push(this.initialStudentData);
        this.getDetailPageCatgoriesByProgramId();
      });
  }

  // get initial student list by Registration Number
  getInitialStudentsByRegistrationNumber() {
    this.initialStudentService.getInitialStudentById(this.applicantData.registrationNumber) // initial student id registration number not implement yet
      .subscribe(data => {

        this.initialStudentData[0] = data;

        for (let i = 0; i < this.programmes.length; i++) {
          if (this.programmes[i].programStartedId == this.initialStudentData[0].programStarted.programStartedId) {
            this.selectedProgram[0] = this.programmes[i];
          }
        }
        this.getDetailPageCatgoriesByProgramId();
      });
  }


  // get initial student list by Program  started ID and center
  getInitialStudetsByProgramStartedIdCategoryAndCenter() {

    this.specializationId = "0";
    this.streamId = "0";
    this.disciplineId = "0";

    if (this.searchData.specializationId) {
      this.specializationId = this.searchData.specializationId;
    } else if (this.searchData.streamId) {
      this.streamId = this.searchData.streamId;
    } else if (this.searchData.disciplineId) {
      this.disciplineId = this.searchData.disciplineId;
    }

    if (this.specializationId == "0" && this.streamId == "0" && this.disciplineId == "0") {
      // get by program started
      this.initialStudentService.getInitialStudentByProgramStartedIdAndCenter(this.searchData.programStartedId, this.searchData.centerId)
        .subscribe(data => {
          this.initialStudentData = data;

          this.getDetailPageCatgoriesByProgramId();
        });
    } else {
      // get by program started and category and center
      this.initialStudentService.getInitialStudentByProgramStartedIdAndCategoryAndCenter(this.searchData.programStartedId,
        this.specializationId, this.streamId, this.disciplineId, this.searchData.centerId)
        .subscribe(data => {
          this.initialStudentData = data;

          this.getDetailPageCatgoriesByProgramId();
        });
    }
  }

  // get initial student list by Program and category and/or category
  getInitialStudetsByProgramStartedIdOrCategory() {

    this.specializationId = "0";
    this.streamId = "0";
    this.disciplineId = "0";

    if (this.searchData.specializationId) {
      this.specializationId = this.searchData.specializationId;
    } else if (this.searchData.streamId) {
      this.streamId = this.searchData.streamId;
    } else if (this.searchData.disciplineId) {
      this.disciplineId = this.searchData.disciplineId;
    }

    if (this.specializationId == "0" && this.streamId == "0" && this.disciplineId == "0") {
      // get by program started
      this.initialStudentService.getInitialStudentByProgramStartedId(this.searchData.programStartedId)
        .subscribe(data => {
          this.initialStudentData = data;

          //this.getDataByProgramId();
          this.getDetailPageCatgoriesByProgramId();
        });
    } else {
      // get by program started and category
      this.initialStudentService.getInitialStudentByProgramStartedIdAndCategory(this.searchData.programStartedId,
        this.specializationId, this.streamId, this.disciplineId)
        .subscribe(data => {
          this.initialStudentData = data;

          this.getDetailPageCatgoriesByProgramId();
        });
    }
  }

  // get initial student list by department ID
  getInitialStudetsByDepartmentId() {

    this.initialStudentService.getInitialStudentByDepartment(this.searchData.departmentId)
      .subscribe(data => {
        this.initialStudentData = data;

        this.getDetailPageCatgoriesByProgramId();
      });
  }

  // get initial student list by faculty ID
  getInitialStudetsByFacultyId() {

    this.initialStudentService.getInitialStudentByFaculty(this.searchData.facultyId)
      .subscribe(data => {
        this.initialStudentData = data;

        this.getDetailPageCatgoriesByProgramId();
      });
  }

  //get details page cagetories by program and applicant type id
  async getDetailPageCatgoriesByProgramId() {

    this.initialStudentData = this.initialStudentData.filter(p => p.studentStatus.id >= "2")
    this.dataLoad();

    for (let i = 0; i < this.initialStudentData.length; i++) {

      this.initialStudentIndex = i;
      this.applicantPassport = '';

      // add new array to initial student
      this.initialStudentData[i].educationalQualification = this.arr;
      this.initialStudentData[i].professionalQualification = this.arr;
      this.initialStudentData[i].workExperience = this.arr;
      this.initialStudentData[i].personalDetails = [];
      this.selectedInitialStudentWithIndex[i] = false;

      this.applicantTypeId = this.initialStudentData[i].applicantType.id;
      this.programId = this.initialStudentData[i].programStarted.program.programId;
      this.applicantId = this.initialStudentData[i].id;
      this.applicantNic = this.initialStudentData[i].nic;
      this.applicantPassport = this.initialStudentData[i].passport;

      this.applicationData = await this.documentVerificationService.getApplicationByProgramAndApplicantType(this.programId, this.applicantTypeId).toPromise();

     // await this.getCounsellingSavedCertificates(this.initialStudentData[i].initialApplicant.id);
      await this.getPersonalDocumentOfApplication(this.initialStudentIndex);
      await this.getEducationalDocumentOfApplication(this.programId, this.applicantId);
      await this.getProfessionalDocumentOfApplication(this.programId, this.applicantId);
      await this.getWorkExperienceDocumentOfApplication(this.programId, this.applicantId);

    }
  }

  // get counsellig uploaded documents
  getCounsellingSavedCertificates(initialApplicantId) {
    this.qualificationCommonService.getCounsellingSavedCertificates(initialApplicantId)
      .subscribe(data => {
        var counselligUploadedEduCertificates: any = [];
        this.counsellingSavedCertificates = data.message;
        console.log("tt" + this.counsellingSavedCertificates);
        var docs = this.counsellingSavedCertificates.split(",");

        for (let i = 0; i < docs.length; i++) {

          if (docs[i] == 'educational') {
            this.counsellingAcademic = true;
            counselligUploadedEduCertificates.push('educational');
          } if (docs[i] == 'ordinarylevel') {
            this.counsellingOL = true;
            counselligUploadedEduCertificates.push('ordinarylevel');
          } if (docs[i] == 'advancedlevel') {
            this.counsellingAL = true;
            counselligUploadedEduCertificates.push('advancedlevel');
          }
        }

        this.initialStudentData[this.initialStudentIndex].counsellingUploadedEducationalQualification = counselligUploadedEduCertificates;
      });
  }

  // get personal documents
  async getPersonalDocumentOfApplication(i): Promise<any> {

    console.log("Document_verification_personal_details");
    if (this.applicationData[0].per_det) {

      if (this.applicationData[0].per_det == "category_1") {
        this.passport = true;
        var passportNo = this.applicantPassport;
        this.personal = await this.documentVerificationService.getForeignApplicantByPassportNo(passportNo).toPromise();

        if (this.personal == null) {
          this.personalDocumentName;
        } else {
          this.initialStudentData[i].personalDetails[0] = this.personal;
        }

      } else if (this.applicationData[0].per_det == "category_2" || "category_3") {

        this.fileName = this.applicantNic;

        if (this.applicantNic.includes("v")) {
          this.nic = this.applicantNic.substring(0, this.applicantNic.length - 1)
            + this.applicantNic[this.applicantNic.length - 1].toUpperCase();
        }
        else {
          this.nic = this.applicantNic;
        }

        // get data by local applicant table
        this.personal = await this.documentVerificationService.getLocalApplicanthByNicAndProgramId(this.nic, this.programId).toPromise();
        console.log("personal " + this.personal);
        // this.initialStudentData[i].personalDetails[0] = this.personal;

        if (this.personal == null) {
          this.personalDocumentName;
        } else {
          this.initialStudentData[i].personalDetails[0] = this.personal;
          this.personalDocumentName = this.personal.image_path;
        }
      }
    } else {

    }
    return this.localApplicantData;
  }

  // get educational qualification documents
  async getEducationalDocumentOfApplication(programId, applicantId): Promise<any> {


    console.log('getEducationalDocumentOfApplication');
    //  this.olDetails = false;
    //this.alDetails = false;
    //this.academicDetails = false;

    this.olCertificatesList = [];
    this.alCertificatesList = [];
    this.academicCertificatesList = [];
    this.educationalQualificationCertificates = [];

    if (this.applicationData[0].edu_qua) {

      this.olCertificatesList = await this.getOLCertificatesByInitialStudentAndProgramme(programId, applicantId);
      this.alCertificatesList = await this.getALCertificatesByInitialStudentAndProgramme(programId, applicantId);
      this.academicCertificatesList = await this.getAcademicCertificatesByInitialStudentAndProgramme(programId, applicantId);

      if (this.applicationData[0].edu_qua == "2category_1") { // academic
        // this.academicDetails = true;

        this.educationalQualificationCertificates.push(this.academicCertificatesList);
      }
      else if (this.applicationData[0].edu_qua == "2category_2") { // ol al
        // this.olDetails = true;
        // this.alDetails = true;

        this.educationalQualificationCertificates.push(this.olCertificatesList);
        this.educationalQualificationCertificates.push(this.alCertificatesList);
      }
      else if (this.applicationData[0].edu_qua == "2category_3") { // al foundation
        //this.alDetails = true;

        this.educationalQualificationCertificates.push(this.alCertificatesList);
      }
      else if (this.applicationData[0].edu_qua == "2category_4") { // ol al foundation
        //this.olDetails = true;
        //this.alDetails = true;

        this.educationalQualificationCertificates.push(this.olCertificatesList);
        this.educationalQualificationCertificates.push(this.alCertificatesList);
      }
      else if (this.applicationData[0].edu_qua == "2category_5") {// ol
        // this.olDetails = true;

        this.educationalQualificationCertificates.push(this.olCertificatesList);
      }
      else if (this.applicationData[0].edu_qua == "2category_6") { // ol foundation
        // this.olDetails = true;

        this.educationalQualificationCertificates.push(this.olCertificatesList);
      }
      else if (this.applicationData[0].edu_qua == "2category_7") { // al
        // this.alDetails = true;

        this.educationalQualificationCertificates.push(this.alCertificatesList);

      }
      else if (this.applicationData[0].edu_qua == "2category_8" || this.applicationData[0].edu_qua == "2category_9" || this.applicationData[0].edu_qua == "2category_10") { // ol al academic
        // this.olDetails = true;
        // this.alDetails = true;
        // this.academicDetails = true;

        this.educationalQualificationCertificates.push(this.olCertificatesList);
        this.educationalQualificationCertificates.push(this.alCertificatesList);
        this.educationalQualificationCertificates.push(this.academicCertificatesList);
      }
    } else {

    }

    this.initialStudentData[this.initialStudentIndex].educationalQualification = this.educationalQualificationCertificates;

    // alert(this.initialStudentData[0].educationalQualification[0][0].certificateName);
    return this.educationalQualificationCertificates;
  }

  // get OL cetificates by initial studetn id and programme id
  async getOLCertificatesByInitialStudentAndProgramme(programId, applicantId): Promise<any> {

    this.ol = await this.educationalQualificationService.getOLCertificatesByInitialStudentIdAndProgramId(applicantId, programId).toPromise();
    return this.ol;
  }

  // get AL cetificates by initial studetn id and programme id
  async getALCertificatesByInitialStudentAndProgramme(programId, applicantId): Promise<any[]> {
    this.al = await this.educationalQualificationService.getALCertificatesByInitialStudentIdAndProgramId(applicantId, programId).toPromise();
    return this.al;
  }

  // get Academic cetificates by initial studetn id and programme id
  async getAcademicCertificatesByInitialStudentAndProgramme(programId, applicantId): Promise<any[]> {
    this.academic = await this.educationalQualificationService.getAcademicCertificatesByInitialStudentIdAndProgramId(applicantId, programId).toPromise();
    return this.academic;
  }

  // get professional qualification documents 
  async getProfessionalDocumentOfApplication(programId, applicantId): Promise<any> {

    if (this.applicationData[0].pro_qua) {
      if (this.applicationData[0].pro_qua == "3category_1") {

        this.professional = await this.professionalCertificatesService.getProfessionalCertificatesByInitialStudentIdAndProgram(applicantId, programId).toPromise();

        this.initialStudentData[this.initialStudentIndex].professionalQualification = this.professional;
      }
    } else {

    }
    return this.professioanlQualificationCertificates;
  }

  // get work experience documents 
  async getWorkExperienceDocumentOfApplication(programId, applicantId): Promise<any> {

    if (this.applicationData[0].work_exp) {
      if (this.applicationData[0].work_exp == "4category_1") {

        this.work = await this.workCertificatesService.getWorkCertificatesByInitialStudentIdAndProgram(applicantId, programId).toPromise();

        this.initialStudentData[this.initialStudentIndex].workExperience = this.work;
      }
    } else {

    }
    return this.workExperienceCertificates;
  }

  // update originality of documents
  updateOriginality(event, data) {

    if (event.target.checked == true) {

      if (data.localApplicantOriginality == true || data.localApplicantOriginality == false) {
        this.documentVerificationService.updateLocalApplicantOriginalityById(data.id, true)
          .subscribe(data => {
            console.log(data);
          });

      } else if (data.alOriginality == true || data.alOriginality == false) {
        this.educationalQualificationService.updateALCertificateOriginalityById(data.id, true)
          .subscribe(data => {
            console.log(data);
          });

      } else if (data.olOriginality == true || data.olOriginality == false) {
        this.educationalQualificationService.updateOLCertificateOriginalityById(data.id, true)
          .subscribe(data => {
            console.log(data);
          });

      } else if (data.academicOriginality == true || data.academicOriginality == false) {
        this.educationalQualificationService.updateAcademicCertificateOriginalityById(data.id, true)
          .subscribe(data => {
            console.log(data);
          });

      } else if (data.professionalOriginality == true || data.professionalOriginality == false) {
        this.professionalCertificatesService.updateProfessionalCertificateOriginalityById(data.id, true)
          .subscribe(data => {
            console.log(data);
          });

      } else if (data.workOriginality == true || data.workOriginality == false) {
        this.workCertificatesService.updateWorkCertificateOriginalityById(data.id, true)
          .subscribe(data => {
            console.log(data);
          });
      }

    } else {

      if (data.localApplicantOriginality == true || data.localApplicantOriginality == false) {
        this.documentVerificationService.updateLocalApplicantOriginalityById(data.id, false)
          .subscribe(data => {
            console.log(data);
          });

      } else if (data.alOriginality == true || data.alOriginality == false) {
        this.educationalQualificationService.updateALCertificateOriginalityById(data.id, false)
          .subscribe(data => {
            console.log(data);
          });

      } else if (data.olOriginality == true || data.olOriginality == false) {
        this.educationalQualificationService.updateOLCertificateOriginalityById(data.id, false)
          .subscribe(data => {
            console.log(data);
          });

      } else if (data.academicOriginality == true || data.academicOriginality == false) {
        this.educationalQualificationService.updateAcademicCertificateOriginalityById(data.id, false)
          .subscribe(data => {
            console.log(data);
          });

      } else if (data.professionalOriginality == true || data.professionalOriginality == false) {
        this.professionalCertificatesService.updateProfessionalCertificateOriginalityById(data.id, false)
          .subscribe(data => {
            console.log(data);
          });

      } else if (data.workOriginality == true || data.workOriginality == false) {
        this.workCertificatesService.updateWorkCertificateOriginalityById(data.id, false)
          .subscribe(data => {
            console.log(data);
          });
      }
    }
  }

  // update document status of documents
  updateDocumentStatus(data, documentStatusId) {

    if (data.localApplicantOriginality == true || data.localApplicantOriginality == false) {
      this.documentVerificationService.updateLocalApplicantDocumentStatusById(data.id, documentStatusId)
        .subscribe(data => {
          console.log(data);
        });

    } else if (data.alOriginality == true || data.alOriginality == false) {
      this.educationalQualificationService.updateALCertificateDocumentStatusById(data.id, documentStatusId)
        .subscribe(data => {
          console.log(data);
        });

    } else if (data.olOriginality == true || data.olOriginality == false) {
      this.educationalQualificationService.updateOLCertificateDocumentStatusById(data.id, documentStatusId)
        .subscribe(data => {
          console.log(data);
        });

    } else if (data.academicOriginality == true || data.academicOriginality == false) {
      this.educationalQualificationService.updateAcademicCertificateDocumentStatusById(data.id, documentStatusId)
        .subscribe(data => {
          console.log(data);
        });

    } else if (data.professionalOriginality == true || data.professionalOriginality == false) {
      this.professionalCertificatesService.updateProfessionalCertificateDocumentStatusById(data.id, documentStatusId)
        .subscribe(data => {
          console.log(data);
        });

    } else if (data.workOriginality == true || data.workOriginality == false) {
      this.workCertificatesService.updateWorkCertificateDocumentStatusById(data.id, documentStatusId)
        .subscribe(data => {
          console.log(data);
        });
    }
  }

  // update remark of documents
  updateRemark(data, event) {

    this.remark = event.target.value;

    if (data.localApplicantOriginality == true || data.localApplicantOriginality == false) {
      this.documentVerificationService.updateLocalApplicantRemarkById(data.id, this.remark)
        .subscribe(data => {
          console.log(data);
        });

    } else if (data.alOriginality == true || data.alOriginality == false) {
      this.educationalQualificationService.updateALCertificateRemarkById(data.id, this.remark)
        .subscribe(data => {
          console.log(data);
        });

    } else if (data.olOriginality == true || data.olOriginality == false) {
      this.educationalQualificationService.updateOLCertificateRemarkById(data.id, this.remark)
        .subscribe(data => {
          console.log(data);
        });

    } else if (data.academicOriginality == true || data.academicOriginality == false) {
      this.educationalQualificationService.updateAcademicCertificateRemarkById(data.id, this.remark)
        .subscribe(data => {
          console.log(data);
        });

    } else if (data.professionalOriginality == true || data.professionalOriginality == false) {
      this.professionalCertificatesService.updateProfessionalCertificateRemarkById(data.id, this.remark)
        .subscribe(data => {
          console.log(data);
        });

    } else if (data.workOriginality == true || data.workOriginality == false) {
      this.workCertificatesService.updateWorkCertificateRemarkById(data.id, this.remark)
        .subscribe(data => {
          console.log(data);
        });
    }
  }

  // update initial student status
  updateInitialStudentStatus(istudent, initialStudentStatus) {

    this.initialStudentService.updateInitialStudentStatusById(istudent.id, initialStudentStatus)
      .subscribe(data => {

        if (initialStudentStatus == '3') {
          istudent.studentStatus.id = '3';
          this.updateStudentSequence(istudent.initialApplicant.id, 26);
        }
        if (initialStudentStatus == '5') {
          istudent.studentStatus.id = '5';
          this.updateStudentSequence(istudent.initialApplicant.id, 29);
        }
      });
  }

  // update next sequence table with document verification cpmpleted
  updateStudentSequence(initialApplicantId, sequenceId) {

    this.documentVerificationService.updateNextSequenceToGivenSequenceByIitialApplicantId(initialApplicantId, sequenceId)
      .subscribe(data => {
        
        if(sequenceId == 26){
          this.msg = "Document Verification completed of this student";
          this.commonMsgPopUp(this.commonMsg);
        }
        if(sequenceId == 29){
          this.msg = "Program Cancelled of this student";
          this.commonMsgPopUp(this.commonMsg);
        }
      });

  }

  // update initial student remark
  updateInitialStudentRemark(istudent, event) {

    this.remark = event.target.value;

    this.initialStudentService.updateInitialStudentRemarkById(istudent.id, this.remark)
      .subscribe(data => {
        console.log(data);
      });
  }

  // save NIC
  async saveNIC(istudent) {
    this.localApplicantId = istudent.personalDetails[0].id;

    if (!this.selectedFiles) {
      this.msg = "Select file";
      this.commonMsgPopUp(this.commonMsg);
    } else {
      this.nicNo = this.nicNumber.toLowerCase();
      await this.upload(this.personalNIC);
    }
  }

  // update local applicant
  updateLocalApplicant(id) {

    this.documentVerificationService.updateLocalApplicantWithImagePath(id, this.certificateName)
      .subscribe(data => {
        console.log(data);
        this.msg = "Saved successfully";
        this.commonMsgPopUp(this.commonMsg);
        this.modalRef.hide();
        this.getDetailPageCatgoriesByProgramId();
        this.nicNumber = '';
      });
    this.localApplicantId = '';
  }

  //save Academic certificates
  saveCertificatesAcademic(certiAcademic, istudentId, programId) {
    certiAcademic.initialStudentId.id = istudentId;
    certiAcademic.programme.programId = programId;
    certiAcademic.certificateName = "academic"

    if (!this.selectedFiles) {
      this.msg = "Select file";
      this.commonMsgPopUp(this.commonMsg);
    } else {
      this.academicService.addCertificatesAcademic(certiAcademic)
        .subscribe(res => {
          this.academicCertiicatedata = res;
          this.upload(this.academicDocument);
        })
    }

  }

  //save O/L certificates
  saveCertificatesOL(certiOL, istudentId, programId, examType) {
    certiOL.initialStudentId.id = istudentId;
    certiOL.programme.programId = programId;
    certiOL.examTypes.id = examType;
    certiOL.certificateName = "ol"

    if (!this.selectedFiles) {
      this.msg = "Select file";
      this.commonMsgPopUp(this.commonMsg);
    } else if (!examType) {
      this.msg = "fill mandatory fields";
      this.commonMsgPopUp(this.commonMsg);
    } else {
      this.olService.addCertificatesOL(certiOL)
        .subscribe(res => {
          this.olCertiicatedata = res;
          this.upload(this.olDocument);
        });
    }

  }

  //save A/L certificates
  saveCertificatesAL(certi, istudentId, programId, examType) {
    certi.initialStudentId.id = istudentId;
    certi.programme.programId = programId;
    certi.certificateName = "al"
    certi.examTypes.id = examType;

    if (!this.selectedFiles) {
      this.msg = "Select file";
      this.commonMsgPopUp(this.commonMsg);
    } else if (!examType) {
      this.msg = "fill mandatory fields";
      this.commonMsgPopUp(this.commonMsg);
    } else {
      this.alService.addCertificatesAL(certi)
        .subscribe(res => {
          this.alCertiicatedata = res;
          this.upload(this.alDocument);
        });
    }
  }

  //save Professional certificates
  saveCertificatesProfessional(certiProfessional, istudentId, programId) {
    certiProfessional.initialStudentId.id = istudentId;
    certiProfessional.programme.programId = programId;
    certiProfessional.certificateName = "professional"

    if (!this.selectedFiles) {
      this.msg = "Select file";
      this.commonMsgPopUp(this.commonMsg);
    } else {
      this.api.addCertificatesProfessional(certiProfessional)
        .subscribe(res => {
          this.professionalCertiicatedata = res;
          this.upload(this.professionalDocument);
        });
    }
  }

  //save Work certificates
  saveCertificatesWork(certiWork, istudentId, programId) {
    certiWork.initialStudentId.id = istudentId;
    certiWork.programme.programId = programId;
    certiWork.certificateName = "work"

    if (!this.selectedFiles) {
      this.msg = "Select file";
      this.commonMsgPopUp(this.commonMsg);
    } else {
      this.api.addCertificatesWork(certiWork)
        .subscribe(res => {
          this.workCertiicatedata = res;
          this.upload(this.workDocument);
        });
    }
  }

  // upload file
  upload(Document) {
    this.certificateName = '';
    if (Document == "professional") {
      this.certificateName = this.professionalCertiicatedata.id + "_professional.pdf";
    } else if (Document == "work") {
      this.certificateName = this.workCertiicatedata.id + "_work.pdf";
    } else if (Document == "academic") {
      this.certificateName = this.academicCertiicatedata.id + "_academic.pdf";
    } else if (Document == "ol") {
      this.certificateName = this.olCertiicatedata.id + "_ol.pdf";
    } else if (Document == "al") {
      this.certificateName = this.alCertiicatedata.id + "_al.pdf";
    } else if (Document == "personal") {
      this.certificateName = this.nicNo + '.png';
    }

    this.currentFileUpload = this.selectedFiles.item(0);
    var sucess = false;
    var s;

    this.qualificationCommonService.upload(this.currentFileUpload, this.certificateName)
      .subscribe(event => {
        console.log(event);
        sucess = true;
        s = sucess;
      });

    if (s == true) {
      if (Document == "personal") {
        this.updateLocalApplicant(this.localApplicantId);
      } else {
        this.msg = "Saved successfully";
        this.commonMsgPopUp(this.commonMsg);
        this.modalRef.hide();
        this.getDetailPageCatgoriesByProgramId();
      }
    }
    this.selectedFiles = undefined;
  }

  // read upload file
  readFile(fileEvent: any) {
    const file = fileEvent.target.files[0];
    if (file.type == "application/pdf") {
      this.certificate = true;
    } else {
      this.certificate = false;
      this.msg = "Accepted Pdf file format only";
      this.commonMsgPopUp(this.commonMsg);
      this.certiProfessional.certificateName = '';
      this.certiWork.certificateName = '';
    }
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  // clear array
  clear() {

    this.getFacultyList(); // get  all faculty list
    this.getDepatmentList(); // get all department list
    this.getAllStartedProgrammes(); // get all programs

    this.personalDocumentName = '';
    this.educationalQualificationCertificates = [];
    this.professioanlQualificationCertificates = [];
    this.workExperienceCertificates = [];

    this.initialStudentData = [];
    this.items = [];
    this.applicantData.applicantId = '';
    this.applicantData.applicantNic = '';
    this.applicantData.registrationNumber = '';
    this.applicantData.applicantTypeId = '';
    this.sendMsgSelected = false;
    this.selectedProgram = [];
    this.searchData.selectedProgramId = '';
  }

  // reset search criteria fields
  reset() {

    this.getFacultyList(); // get  all faculty list
    this.getDepatmentList(); // get all department list
    this.getAllStartedProgrammes(); // get all programs

    this.personalDocumentName = '';
    this.educationalQualificationCertificates = [];
    this.professioanlQualificationCertificates = [];
    this.workExperienceCertificates = [];

    this.initialStudentData = [];
    this.items = [];
    this.applicantData.applicantId = '';
    this.applicantData.applicantNic = '';
    this.applicantData.registrationNumber = '';
    this.applicantData.applicantTypeId = '';
    this.sendMsgSelected = false;
    this.selectedProgram = [];
    this.searchData.selectedProgramId = '';
  }

  sendSms() {

    this.sendsms.to.push(this.mobileNo);

    this.sendsms.message = "Please confirm the registration of" +
      this.programId + "before" +
      this.data +
      this.data +
      this.data +
      this.data +
      this.data +
      this.data +
      this.data +
      this.data +
      this.data +
      this.data +
      this.data +
      this.data +
      this.data +
      this.data +
      this.data +
      this.data +
      this.data +
      this.data +
      this.data +
      this.data +
      this.data +
      //
      "and unless the student registration will be automatically cancelled.";

    this.sendsms.smsType = "Document Verification";

    this.documentVerificationService.sendSms(this.sendsms)
      .subscribe(res => {
        console.log(res);
      });
  }

  // update next sequence table
  openStudentInterface(initialApplicantId) {
    this.documentVerificationService.updateNextSequence(initialApplicantId)
      .subscribe(data => {
        this.modalRef.hide();
        this.msg = "Student sequence is updated.Please log to system with student username and password";
        this.commonMsgPopUp(this.commonMsg);
      });
  }

  // get initial student id to sed msg
  getInitialStudentIdToSendMsg(event, index) {

    if (event.target.checked == true) {
      if (this.sendMsgSelected == true) {
        //event.target.checked = false;
        this.selectedInitialStudentWithIndex[this.indexofSelected] = false;
        this.selectedInitialStudentWithIndex[index] = true;
        this.indexofSelected = index;
        // this.msg = "Please select only one studet at once to send sms";
        // this.commonMsgPopUp(this.commonMsg);
      } else {
        this.selectedInitialStudentWithIndex[index] = true;
        this.indexofSelected = index;
        this.sendMsgSelected = true;
      }
    } else {
      this.selectedInitialStudentWithIndex[this.indexofSelected] = false;
      this.indexofSelected = -1;
      this.sendMsgSelected = false;
    }
  }

  // send sms to selected initial student
  sendSMSToStudent() {

    console.log(this.messageToStudent);
    this.spinner.show();
    this.contactStudent.contact = this.initialStudentData[this.indexofSelected].mobileno;
    this.contactStudent.message = this.messageToStudent;

    this.documentVerificationService.sendSMS(this.contactStudent)
      .subscribe(res => {
        this.spinner.hide();
        this.modal.dismissAll();
        this.toastr.info("SMS Sent" + "</br> ", "Success!",
          {
            enableHtml: true
          });
      }, (err) => {
        this.spinner.hide();
        this.toastr.error("SMS Sending Failed", "Error")
        console.log(err);
      });
  }

  // send email to selected initial student
  sendEmaiToStudent() {

    console.log(this.messageToStudent);
    this.spinner.show();
    this.contactStudent.contact = this.initialStudentData[this.indexofSelected].email;
    this.contactStudent.message = this.messageToStudent;
    this.documentVerificationService.sendEmail(this.contactStudent)
      .subscribe(res => {
        this.spinner.hide();
        this.modal.dismissAll();
        this.toastr.info("Email Sent" + "</br> ", "Success!",
          {
            enableHtml: true
          });
      }, (err) => {
        this.spinner.hide();
        this.toastr.error("Email Sending Failed", "Error")
        console.log(err);
      });
  }

  // send both sms to email to selected initial student
  sendBoth() {
    this.sendEmaiToStudent();
    this.sendSMSToStudent();
  }

  open(content) {

    this.modal.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
function USER_KEY(USER_KEY: any): string {
  throw new Error('Function not implemented.');
}

