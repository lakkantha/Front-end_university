import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServicesService } from '../../services/api-services.service';

@Component({
  selector: 'app-define-students-groups',
  templateUrl: './define-students-groups.component.html',
  styleUrls: ['./define-students-groups.component.css']
})
export class DefineStudentsGroupsComponent implements OnInit {
  
  programs: any;
  centers: any;
  specializations: any;
  disciplines: any;
  streams: any;

  message: string
  courses: any;
  mediums: any;
  studentAssigningMethods: any;
  constructor(private api:ApiServicesService, private router: Router) 
  { 
    this.getProgram()

    this.getStudentAssigningMethods()
    
  }

  ngOnInit(): void {
    
  }

  form = new FormGroup({
    programmeId: new FormControl('', Validators.required),
    specializationId: new FormControl('', Validators.required),
    courseId: new FormControl('', Validators.required),
    centerId: new FormControl('', Validators.required),
    studentAssignMethod: new FormControl('', Validators.required),
  });

  get f(){
    return this.form.controls;
  }
  exit()
  {
    this.router.navigate(['student-group']);
  }

  getProgram() {
    this.api.getProgramsService().subscribe(
      response => {
        this.programs = response;
      }
    )
    
  }

  getStudentAssigningMethods()
  {
        this.api.getStudentAssigningMethodsService().subscribe(
      response => this.studentAssigningMethods = response
    )
  }

  getDataFromProgramService(id)
  {

    this.api.getSpecializationService(id).subscribe(
      response =>this.specializations = response
    )

    this.api.getDisciplineService(id).subscribe(
      response => this.disciplines = response
    )

    this.api.getStreamService(id).subscribe(
      response => this.streams = response
    )

    this.api.getCourseService().subscribe(
      response => this.courses = response
    )

    this.api.getCenterService(id).subscribe(
      response =>{this.centers = response
      console.log(this.centers)
      }
    )

  }

  getMediumFromCourseService(id)
  {

  }
   
  submit(){
    let pass = this.form.value;
    pass['program'] = {
      'programId' : this.form.value['programmeId']
    }
    delete pass['programmeId']

    pass['courses'] = {
      'id' : this.form.value['courseId']
    }
    delete pass['courseId']


    pass['rgmCenter'] = {
      'cnt_centerId' : this.form.value['centerId']
    }
    delete pass['centerId']


    pass['studentAssigningMethods'] = {
      'id' : this.form.value['studentAssignMethod']
    }
    delete pass['studentAssignMethod']

    


    this.api.defineAssigningPatterns(this.form.value).subscribe(
      Response => {
        this.message = "Successfully Added.";
        document.getElementById("success").click();
  
      },
      Error => {
        //alert("One program at a time should be entered through tag system.");
        this.message = "Something Error";
        document.getElementById("error").click();
      }
    )
  }
  submitForm()
  {
    //console.log(this.form.value);
  }


}
