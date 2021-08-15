import { Component, OnInit } from '@angular/core';
//import { CourseSelectionStorageService } from '../_services/services/course-selection-storage.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { ProgramSelectionService } from '../_services/program-selection.service';
import { InitialStudent } from '../make-payment/Models/PendingPayment';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-programme-selection-for-detail-page',
  templateUrl: './programme-selection-for-detail-page.component.html',
  styleUrls: ['./programme-selection-for-detail-page.component.css']
})
export class ProgrammeSelectionForDetailPageComponent implements OnInit {


  selctedProgrammes: any = [];
  userData: any[] = []
  nic: string;

  public user: string = '';
  username: string;
  mobileNo: string = '';
  public effectivedate: '';
  public orderdata: any = [];
  selectedData: any = [];
  Programs: any[] = [];
  initailStudent: InitialStudent[];

  isLoggedIn = false;

  applicantType: '';
  iStudentId: string = '';
  qualification: string = '';

  programmeData = {
    programmeId: '',
  }

  constructor(private api: ProgramSelectionService, private tokenStorageService: TokenStorageService, private appComponent: AppComponent) { }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();

//      this.applicantType = user.initialApplicant[''].applicantType.id;
      this.nic = user.username;
      this.getProgram(this.nic);
    }
  }

  async getProgram(nic) {
    console.log("cgfc",nic);

    await this.api.getPrograms(nic)
      .subscribe(res => {
        console.log("tertrt",res[0]);
        console.log("gfvgfvg");

        this.user = res[0].nic;
        this.mobileNo = res[0].mobileno;
        res.forEach(s => this.Programs.push(s))
        this.userData = res

      }, err => {
        console.log(err);
      });

  }

  // submit selected programme data
  // programme id passed
  submitData(programmeData) {
    this.qualification = localStorage.getItem('qualification');

    let user = this.userData.filter(s => s.id == programmeData)[0]
    console.log(user);
    localStorage.setItem("programmeid", user.programStarted.program.programId);
    console.log("ok");
    console.log(user.programStarted.program.programId);
    localStorage.setItem("applicanttypeid", user.applicantType.id);
    console.log(user.applicantType.id);
    localStorage.setItem("initialstudentid", user.id);
    console.log(user.id);


    if (this.qualification == 'personal')
    this.appComponent.per_det();

    else if (this.qualification == 'education') {
      this.appComponent.edu_qua();
    } else if (this.qualification == 'profession') {
      this.appComponent.pro_qua();
    } else if (this.qualification == 'work') {
      this.appComponent.work_exp();
    }

   
  }

}
