import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { FinalMarkApproveService } from '../final-marks-approval/services/final-mark-approve.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-final-marks-approval',
  templateUrl: './final-marks-approval.component.html',
  styleUrls: ['./final-marks-approval.component.css']
})
export class FinalMarksApprovalComponent implements OnInit {

  download = {
    dataList: [],
    total: 0,
    pass: 0,
    fail: 0,
    withHeld: 0,
    rejected: 0,
    program: '',
    examName: '',
    academicCentre: '',
    medium: '',
    filePath: '',
    category: 2
  }

  mainForm: FormGroup; mainForm2: FormGroup; mainForm3: FormGroup; submitted = false; programId = '';
  Programs = []; GenProName = 'Entry Exam Name'; academicCenter = []; medium = []; centreId = ""; adminDetailId = 0;
  withHeld = 0; total = 0; fail = 0; pass = 0; message = ""; mediumId = 0; downloadBtnEnable = false;
  markSheetData = []; entries = 0; sortId = 0; slotId = 0; mainArray = []; headingTopic = []; loadMarkSheetDetails: any[] = [];

  constructor(private fb: FormBuilder, private api: FinalMarkApproveService, private spinner: NgxSpinnerService) {
    this.mainForm = this.fb.group({
      programName: new FormControl('', [Validators.required, Validators.nullValidator]),
      entryExamName: new FormControl(''),
      academicCenter: new FormControl('', [Validators.required, Validators.nullValidator]),
      medium: new FormControl('', [Validators.required, Validators.nullValidator])
    });
    this.mainForm2 = this.fb.group({
      SortPrograms: new FormControl('', [Validators.required, Validators.nullValidator])
    });
    this.mainForm3 = this.fb.group({
      Entries: new FormControl('', [Validators.required, Validators.nullValidator])
    });
  }

  ngOnInit(): void {
    this.getEntryExamProgram();
    this.adminDetailId = 1;
    this.adminDetailId = JSON.parse(localStorage.getItem("auth-user")).adminDetails[0].id;
  }

  get mainFormControl() {
    return this.mainForm.controls;
  }

  getEntryExamProgram() {
    this.api.getProgram().subscribe(
      response => {
        this.Programs = response;
      }, (err) => {
        console.log(err);
      });
  }

  getExaminationComponents(value) {
    this.downloadBtnEnable = false;
    this.mainForm.get("entryExamName").patchValue("");
    this.mainForm.get("academicCenter").patchValue("");
    this.mainForm.get("medium").patchValue("");
    this.programId = value;
    this.academicCenter = [];
    this.getEntryExamDetailsForGeneratingAttendance(value);
    this.getCenters(value);
    this.medium = [];
    this.GenProName = 'Entry Exam Name';
    for (let p of this.Programs) {
      if (p.id == value) {
        this.download.program = p.title;
      }
    }
    this.total = 0;
    this.pass = 0;
    this.fail = 0;
    this.withHeld = 0;
  }

  getCenters(id) {
    this.api.getCenters(id)
      .subscribe(
        response => {
          this.academicCenter = response;
        }, err => {
          console.log(err);
        });
  }

  getEntryExamDetailsForGeneratingAttendance(id) {
    this.api.getEntryExamDetailsForGeneratingAttendance(id)
      .subscribe(
        response => {
          this.download.examName = response.examName;
          this.GenProName = response.examName;
          // this.academicCenter = response.examRootCenters;
        }, err => {
          console.log(err);
        });
  }

  selectAcademicCentre(val) {
    this.medium = [];
    this.centreId = val;
    this.total = 0;
    this.pass = 0;
    this.fail = 0;
    this.withHeld = 0;
    for (let c of this.academicCenter) {
      if (c.rgmCenterId == val) {
        console.log(val);
        this.medium = c.mediumlist;
        this.download.academicCentre = c.rgmCenterDescription;
      }
    }
  }

  selectMedium(val) {
    this.total = 0;
    this.pass = 0;
    this.fail = 0;
    this.withHeld = 0;
    if (val = 1) {
      this.download.medium = "English";
    } else if (val = 2) {
      this.download.medium = "Sinhala";
    } else if (val = 3) {
      this.download.medium = "Tamil";
    }
    this.mediumId = val;
    this.api.getCriteria(this.programId)
      .subscribe(
        response => {
          if (!response) {
            this.message = "Please click on the View Entrance Exam Marks Criteria link and define the criteria.";
            document.getElementById("successmsg").click();
          } else {
            this.api.getStatusCriteria(this.programId, this.centreId, val)
              .subscribe(
                response => {
                  if (response['invalid'] == 1) {
                    this.message = "Please click on the View Entrance Exam Marks Criteria link and define the criteria.";
                    document.getElementById("successmsg").click();
                  } else {
                    this.loadMarksDetailsToProcess(this.programId, this.centreId, val);
                  }
                }, err => {
                  console.log(err);
                });
          }
        }, err => {
          console.log(err);
        });
  }

  loadMarksDetailsToProcess(programId, centreId, mediumId) {
    this.spinner.show();
    this.api.loadMarksDetailsToProcess(programId, centreId, mediumId)
      .subscribe(
        response => {
          this.spinner.hide();
          this.headingTopic = [];
          this.loadMarkSheetDetails = response.dataList;
          this.mainArray = this.loadMarkSheetDetails;
          this.markSheetData = this.mainArray;
          this.entries = this.loadMarkSheetDetails.length;
          for (let s of this.loadMarkSheetDetails) {
            for (let c of s.componentsList) {
              this.headingTopic.push(c.component);
            }
            break;
          }
          this.withHeld = response.withHeld;
          this.fail = response.fail;
          this.pass = response.pass;
          this.total = response.total;
          let list = [];
          for (let d of response.dataList) {
            let array = {
              programStartedId: 0,
              applicationNo: 0,
              indexNo: '',
              overallMark: 0.0,
              status: '',
              remark: '',
              medium: '',
              rootCentre: '',
              rootCentreId: 0,
              mediumId: 0,
              pageNo: 0,
              componentsList: [],
              nic: ''
            }
            array.programStartedId = d.programStartedId;
            array.applicationNo = d.applicationNo;
            array.indexNo = d.indexNo;
            array.overallMark = d.overallMark;
            array.status = d.status;
            array.remark = d.remark;
            array.medium = d.medium;
            array.rootCentre = d.rootCentre;
            array.rootCentreId = d.rootCentreId;
            array.mediumId = d.mediumId;
            array.pageNo = d.pageNo;
            array.componentsList = d.componentsList;
            array.nic = d.nic;
            list.push(array);
          }
          for (let d of list) {
            this.download.dataList.push(d);
          }

          this.download.fail = response.fail;
          this.download.pass = response.pass;
          this.download.total = response.total;
          this.download.withHeld = response.withHeld;
          this.download.rejected = response.rejected;
        }, err => {
          console.log(err);
        });
  }

  getStatus(value) {
    let temp = false;
    if (value == 2) {
      temp = true;
    } else if (value == 1) {
      temp = true;
    } else if (value == 3) {
      temp = true;
    } else if (value == 4) {
      temp = true;
    } else if (value == 5) {
      temp = true;
    }
    return temp;
  }

  counter(i: number) {
    return new Array(i);
  }

  selectEntries(val) {
    let array = [];
    let count = 1;
    for (let e of this.mainArray) {
      if (count <= val) {
        array.push(e);
        count = count + 1;
      }
    }
    this.markSheetData = array;
  }

  downloadFile() {
    this.download.filePath = "C:\\Users\\IT workshop\\Downloads";
    this.spinner.show();
    this.api.downloadFile(this.download)
      .subscribe(res => {
        this.spinner.hide();
        let blob = new Blob([res], { type: 'application/octet-stream' });

        var downloadURL = window.URL.createObjectURL(res);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = "Final_Approved_Applicant_Mark_Sheet.xlsx";
        link.click();
        this.message = "Downloaded successfully to Downloads folder.";
        document.getElementById("successmsg").click();
        this.mainForm.reset();
        this.mainForm.get("medium").patchValue("");
        this.mainForm.get("academicCenter").patchValue("");
        this.mainForm.get("programName").patchValue("");
        this.mainForm2.get("SortPrograms").patchValue("");
        this.mainForm3.get("Entries").patchValue("");
      }, (err) => {
        console.log(err);
      });
  }

  sortData(id) {
    this.sortId = id;
  }

  getTable() {
    this.api.sortProcessMarkDetailsForApproval(this.sortId, this.programId, this.centreId, this.mediumId)
      .subscribe(res => {
        console.log(res);
        this.markSheetData = res;
      }, err => {
        console.log(err);
      });
  }

  exit() {
    window.close();
  }

  approve() {
    this.spinner.show();
    this.api.saveProcessedMarksDetails(this.adminDetailId, this.programId, this.centreId, this.mediumId)
      .subscribe(res => {
        this.spinner.hide();
        console.log(res);
        if (res['invalid details'] == -1) {
          this.message = "Please, process the marks.";
          document.getElementById("downloadErrmsg").click();
        }
        if (res['updated'] == 2) {
          this.message = "Updated Successfully.";
          document.getElementById("successmsg").click();
          this.downloadBtnEnable = true;
        }
        if (res['saved'] == 1) {
          this.message = "Approved successfully.";
          document.getElementById("successmsg").click();
          this.downloadBtnEnable = true;
        }
        this.mainForm.reset();
        this.mainForm.get("medium").patchValue("");
        this.mainForm.get("academicCenter").patchValue("");
        this.mainForm.get("programName").patchValue("");
        this.mainForm2.get("SortPrograms").patchValue("");
        this.mainForm3.get("Entries").patchValue("");
      }, err => {
        console.log(err);
      });
  }

}
