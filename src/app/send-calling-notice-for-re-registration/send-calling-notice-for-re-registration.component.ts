import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ReRegistrationServiceService } from './../send-calling-notice-for-re-registration/service/re-registration-service.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-send-calling-notice-for-re-registration',
  templateUrl: './send-calling-notice-for-re-registration.component.html',
  styleUrls: ['./send-calling-notice-for-re-registration.component.css']
})
export class SendCallingNoticeForReRegistrationComponent implements OnInit {

  remainingStudentListCount: any;
  Programs: any;
  AcademicYear: any =null;
  AcademicCenters: any;
  StudentTypes: any[] =[];
  formArray: any = [];
  studentFilter: any = {
    program: '',
    adiminCenter: '',
    studentType: '',
    academicYear: ''
  };

  callingNoticeObject: any = {
    message: '',
    sendCallingNoticeType: '',
    studentList: [],
    academicYearId: 0
  }

  selectedStudentList: any;
  studentListToSendMessage: any = [];
  updatedNextStudentListToSendMessage:any = [];
  constructor(private reRegistrationService: ReRegistrationServiceService, private toastr: ToastrService,private spinner: NgxSpinnerService) {
  }

  CallingNoticeForm = new FormGroup({
    Programform: new FormControl(''),
    AcademicYearForm: new FormControl(''),
    AcademicCentersForm: new FormControl(''),
    StudentTypeForm: new FormControl(''),
    commentForm: new FormControl(''),
    sendCallingNoticeTypeForm: new FormControl(''),
    StudentCountsToSendMessageForm: new FormControl('')
  })

  public editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  onSelectChangeProgram(value: any) {
    console.log(value);
    this.selectAcademicYear(value);
    this.selectAcademicCenter(value);
    this.selectProgramStrated(value);
  }

  selectAcademicYear(val){
    for(let p of this.Programs){
      if(p.programStartedId == val){
        this.AcademicYear = p.academicYear;
      }
    }
  }
  selectAcademicCenter(value: any){
    this.spinner.show();
    this.reRegistrationService.getAllAcademicCenterByProgramStarted(value).subscribe
      (res => {
        this.AcademicCenters = res;
        console.log(this.AcademicCenters);
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        console.log(error);
      });
      //this.spinner.hide();
  }

  selectProgramStrated(value:any){
    this.spinner.show();
    this.reRegistrationService.getProgramStratedById(value).subscribe
    (res => {
    this.CallingNoticeForm.controls['AcademicYearForm'].setValue(res[0].academicYear.year);
    this.spinner.hide();
    },
    error => {
      this.spinner.hide();
      console.log(error);
    });
    //this.spinner.hide();
  }

  onCheckChange(event) {
    console.log(event.target.value)
    /* Selected */
    if (event.target.checked) {
      // Add a new control in the arrayForm
      console.log("selected")
      this.formArray.push(event.target.value);
    }
    /* unselected */
    else {
      console.log("unSelected")
      // find the unselected element
      let i: number = 0;

      this.formArray.forEach(obj => {
        if (obj == event.target.value) {
          this.formArray.splice(this.formArray.indexOf(obj), 1)
          return;
        }
        i++
        console.log("***obj", obj)
      });
      // this.formArray.forEach() => {
      //   console.log("***ctrl", ctrl)
      //   if(ctrl.value == event.target.value) {
      //     // Remove the unselected element from the arrayForm
      //     this.formArray.removeAt(i);
      //     return;
      //   }

      //   i++;
      // });
    }

    console.log(this.formArray, "******")
  }

  public filterStudents() {
    this.spinner.show();
    console.log("filterStudents **************");
    this.studentFilter.program = this.CallingNoticeForm.get('Programform').value;
    this.studentFilter.studentType = this.CallingNoticeForm.get('StudentTypeForm').value;
    this.studentFilter.academicCenter = this.CallingNoticeForm.get('AcademicCentersForm').value;
    this.studentFilter.academicYear = this.CallingNoticeForm.get('AcademicYearForm').value;
    console.log(this.studentFilter, "**************");
    this.selectedStudentList = '';
    this.remainingStudentListCount = '';
    this.reRegistrationService.getSelectedStudentList(this.studentFilter).subscribe
      (res => {
        this.selectedStudentList = res;
        this.studentListToSendMessage = res;
        // this.CallingNoticeForm.controls['StudentCountsToSendMessageForm'].setValue(res);
        console.log(this.selectedStudentList);
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        console.log(error);
      });
      //this.spinner.hide();
  }

  public changeStudentCountToSendMessage(studentCount: any){
    this.spinner.show();
    console.log(studentCount, "*******ddddd")
    console.log( this.selectedStudentList.length, 'length*******')
    this.remainingStudentListCount = this.selectedStudentList.length - studentCount;
    this.studentListToSendMessage = []
    for(let i=0; i<studentCount; i++){
      this.studentListToSendMessage.push(this.selectedStudentList[i])
    }
    this.updatedNextStudentListToSendMessage = []
    console.log(studentCount, "*******studentCount")
    console.log( this.selectedStudentList.length, 'FullCountStudentLength*******')
    for(let i=studentCount; i<this.selectedStudentList.length; i++){
      this.updatedNextStudentListToSendMessage.push(this.selectedStudentList[i])
    }
    console.log(this.studentListToSendMessage, "fffff*******")
    console.log(this.updatedNextStudentListToSendMessage, "kkkkkkkk*******")
    this.spinner.hide();
  }

  studentListArray = []
  public sendCallingNotice() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);

    console.log("sendCallingNotice **************");
    this.callingNoticeObject.message = this.CallingNoticeForm.get('commentForm').value;
    this.callingNoticeObject.academicYearId = this.AcademicYear.id;
    //this.callingNoticeObject.studentList = this.studentListToSendMessage;
    this.callingNoticeObject.sendCallingNoticeType = this.formArray;

    // console.log(this.studentListToSendMessage)

    if(this.studentListToSendMessage.length<100)
    {
      this.callingNoticeObject.studentList = this.studentListToSendMessage;
      this.sendCallingNoticeToBackend(this.callingNoticeObject);
      console.log(this.callingNoticeObject,"BB");

    }
    else
    {
      let arrayFor = [];
      let array = [];
      var x = 0;

      for (let i = 0; i < Math.ceil(this.studentListToSendMessage.length/100); i++)
      {
        array = [];

        for(let j = 0; j < 100; j++)
        {
          x++;
          if(x == this.studentListToSendMessage.length + 1)
          {
            break
          }
          array.push(this.studentListToSendMessage[j+(i*100)]);
        }
        arrayFor=[{
        "message":this.CallingNoticeForm.get('commentForm').value,
        "sendCallingNoticeType":this.formArray,
        "studentList":array
      }]

        this.sendCallingNoticeToBackend(arrayFor[0]);
        console.log(arrayFor[0],"cc");

      }
    }
    this.spinner.hide();
  }

  public sendCallingNoticeToBackend(callingNoticeObject)
  {
    this.spinner.show();
    //console.log("sendCallingNotice **************", this.callingNoticeObject);

    this.reRegistrationService.sendCallingNotice(callingNoticeObject).subscribe
      (res => {
        this.spinner.hide();
        console.log(res, "***message")
        this.selectedStudentList = this.updatedNextStudentListToSendMessage;
        this.studentListToSendMessage = this.selectedStudentList;
        console.log(this.selectedStudentList, "**********");
        this.toastr.success(res);
    },
    error => {
      this.spinner.hide();
      console.log(error);
    });
    //this.spinner.hide();
  }

  public generateLetter() {
    this.spinner.show();
    let objectToGenerateLetter = {
      // id: 0,
      message: "string",
      sendCallingNoticeType: [
        "string"
      ],
      studentList: this.studentListToSendMessage
    };

    this.reRegistrationService.generateLetter(objectToGenerateLetter).subscribe
    (res => {
      console.log("**********");
      this.spinner.hide();
    },
    error => {
      this.spinner.hide();
      console.log(error);
    });
    //this.spinner.hide();
  }

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions:DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  public ngOnInit() {
    this.spinner.show();
    this.getStudenttypes();
    this.reRegistrationService.getAllProgramStarted().subscribe
      (res => {
        this.Programs = res;
        console.log(this.Programs);
      },
      error => {
        this.spinner.hide();
        console.log(error);
      });

    this.numberOfStudents = [];
    //this.spinner.hide();
  }

  onSelect() {
    this.CallingNoticeForm.get('Program').value
    this.CallingNoticeForm.get('AcademicYear').value

  }


  numberOfStudents
  dataTable
  openModel()
  {
    this.getData()

    document.getElementById("openModel").click();
  }

  getData()
  {
    this.numberOfStudents = this.studentListToSendMessage
    this.dtTrigger.next();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
   }

   getStudenttypes() {
    this.spinner.show();
    this.reRegistrationService.getStudentTypes()
      .subscribe(
        response => {
          console.log(response);
          this.spinner.hide();
          for (let r of response) {
              this.StudentTypes.push(r);
          }
          this.StudentTypes.sort((a,b) => a.stp_description.localeCompare(b.stp_description));
        },
        error => {
          this.spinner.hide();
          console.log(error);
        });
  }
}
