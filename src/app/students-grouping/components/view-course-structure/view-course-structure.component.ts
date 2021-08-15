import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscriber } from 'rxjs';
import { VcsServiceService } from '../../services/vcs-service.service';
import { ExcelServicesService } from '../../services/excel-services.service'
import { saveAs } from "file-saver";


@Component({
  selector: 'app-view-course-structure',
  templateUrl: './view-course-structure.component.html',
  styleUrls: ['./view-course-structure.component.css']
})
export class ViewCourseStructureComponent implements OnInit {
  courseStructures: any;

  
  message: string;
  programs: any;
  specializations: any;
  disciplines: any;
  streams: any;
  courses: any;
  centers: any;
  mediums: any;
  academicYears: any;
  effectExamType: any;
  components: any;

  constructor(private vcsApi:VcsServiceService, private router: Router) 
  { 
    this.getProgram()
  }

  ngOnInit(): void {

  }
 
  form = new FormGroup({
    programmeId: new FormControl('', Validators.required),
    specializationId: new FormControl('', Validators.required),
    academicYear: new FormControl('', Validators.required),
    courseId: new FormControl('', Validators.required),
    effectedExamType: new FormControl('', Validators.required),
    addComponent: new FormControl('', Validators.required)
  });

  get f(){
    return this.form.controls;
  }
  exit()
  {
    this.router.navigate(['student-group']);
  }

  search()
  {
    console.log(this.form.value);
    this.vcsApi.getSearchData(this.form.value).subscribe(
      arg =>
      {
        this.courseStructures = arg
      } 
    );
    
  }


  getProgram() {
    this.vcsApi.getProgramsService().subscribe(
      response => {
        console.log(response);
        this.programs = response;
      }
    )

    this.vcsApi.getAcademicYearService().subscribe(
      response => this.academicYears = response
    )

    this.vcsApi.getEffectExamTypeService().subscribe(
      response => this.effectExamType = response
    )

    this.vcsApi.getComponentService().subscribe(
      response => this.components = response
    )
    
  }

  getDataBasedOnProgram(id)
  {
    console.log(id)

    this.vcsApi.getSpecializationService(id).subscribe(
      response =>this.specializations = response
    )

    this.vcsApi.getDisciplineService(id).subscribe(
      response => this.disciplines = response
    )

    this.vcsApi.getStreamService(id).subscribe(
      response => this.streams = response
    )

    this.vcsApi.getCourseService().subscribe(
      response => this.courses = response
    )
  }





  editComponentCourse(id)
  {
    console.log(id)
  }


  deleteComponentCourse(id)
  {
    console.log(id)
  }


  myPrograms= [
    {
      id:1,
      Course: "Course1",
      examType: "eligible",
      component:"Lab",
      status:"yes",
      semester:"1semester",
      Element:"Leb1",
      Session:"1",
      centre:"John"
    }, 
    {
      id:2,
      Course: "Course1",
      examType: "eligible",
      component:"Lab",
      status:"yes",
      semester:"1semester",
      Element:"Leb1",
      Session:"2",
      centre:"John"
    },
    {
      id:3,
      Course: "Course1",
      examType: "eligible",
      component:"Lab",
      status:"no",
      semester:"2semester",
      Element:"Leb2",
      Session:"1",
      centre:"John"
    },
    {
      id:4,
      Course: "Course1",
      examType: "final exam",
      component:"cat",
      status:"no",
      semester:"2semester",
      Element:"cat1",
      Session:"",
      centre:"John"
    }, 
    {
      id:5,
      Course: "Course1",
      examType: "final exam",
      component:"cat",
      status:"no",
      semester:"2semester",
      Element:"cat2",
      Session:"",
      centre:"John"
    },
    {
      id:6,
      Course: "Course1",
      examType: "final exam",
      component:"final exam",
      status:"no",
      semester:"2semester",
      Element:"cat2",
      Session:"",
      centre:"John"
    }
    
  ];


  getPDF()
  {
    console.log("ok")
    // this.downLoadFile(this.myPrograms, "application/ms-excel")
    // this.downloadMyFile(this.myPrograms)

    this.downloadMyFiles(this.myPrograms)
   
  }

  downLoadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type});
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
        alert( 'Please disable your Pop-up blocker and try again.');
    }
  }

  downloadMyFile(data: any)
  {
    var blob = new Blob([data], {type: 'application/pdf'});

    var downloadURL = window.URL.createObjectURL(data);
    var link = document.createElement('a');
    link.href = downloadURL;
    link.download = "help.pdf";
    link.click();
  }

  downloadMyFiles(data: any)
  {
    var blob = new Blob([data], {type: 'application/pdf'});
    saveAs(blob, "myFile.pdf");
  }
  

}
