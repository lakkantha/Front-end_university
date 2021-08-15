import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../application.service';
import { Application } from '../application';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  programs : any;
  applicantTypes: any;
  message: string;
  //application: Application = new Application();
  constructor(private applicationService : ApplicationService, private router: Router) { 
    this.applicationService.getProgramsService().subscribe(
      response => this.programs = response
    )
    
    this.applicationService.getapplicanttypeService().subscribe(
      response => this.applicantTypes = response
    )
  }

  form = new FormGroup({
    "programId" : new FormControl("",[Validators.required, Validators.nullValidator]),
    "applicantTypeId" : new FormControl("",[Validators.required, Validators.nullValidator]),
    "prog_det" : new FormControl("",[Validators.required, Validators.nullValidator]),
    "per_det" : new FormControl("",[Validators.required, Validators.nullValidator]),
    "edu_qua" : new FormControl("",[Validators.required, Validators.nullValidator]),
    "pro_qua" : new FormControl("",[Validators.required, Validators.nullValidator]),
    "work_exp" : new FormControl("",[Validators.required, Validators.nullValidator])
  })

  programsClick(id)
  {
    console.log(id)
    var d = id.split("-")
    console.log(d[0])
    this.form.controls['programId'].setValue(d[0])
  }

  register(){

    console.log(this.form.value['programId'])

    if(this.form.value['programId'] != undefined && this.form.value['applicantTypeId'] != undefined)
    {
      let pass = this.form.value;
      pass['program'] = {
        'programId' : this.form.value['programId']
      }
      delete pass['programId']

      pass['applicantType'] = {
        'id' : this.form.value['applicantTypeId']
      }
      delete pass['applicantTypeId']

      console.log(pass)
      this.applicationService.addApplication(this.form.value).subscribe(
        Response => {
          console.log(Response);
          if(Response != null)
          {
              this.message = "successfully added.";
              document.getElementById("errxxx").click();
          }
          else
          {
              this.message = "One program at a time should be entered through tag system.!";
              document.getElementById("downloadErrmsg").click();
          }
          

        },
        Error => {
          console.log(Error)
          //alert("One program at a time should be entered through tag system.");
          this.message = "Please Check Database";
          document.getElementById("downloadErrmsg").click();
        }

      )
    }
    else
    {
      this.message = "Please Reselect Programme And Applicant Type";
      document.getElementById("downloadErrmsg").click();
    }
  }
  //Application: Application[];
  
  // programs = [
  //   {id: 1, name: "Program1"},
  //   {id: 2, name: "Program2"},
  //   {id: 3, name: "Program3"}
  // ];
  

  ngOnInit() {
  }
  //personal_details
  personal_details_category_i()
  {
    this.router.navigate(['home/personal-details/manage_persionalDetailsCat1_details']);
  }
  personal_details_category_ii()
  {
    this.router.navigate(['home/personal-details/manage_persionalDetailsCat2_details']);
  }
  personal_details_category_iii()
  {
    this.router.navigate(['home/personal-details/manage_persionalDetailsCat3_details']);
  }

  //program_details
  program_details_category_i()
  {
    this.router.navigate(['program_details_category_i']);
  }
  program_details_category_ii()
  {
    this.router.navigate(['program_details_category_ii']);
  }
  program_details_category_iii()
  {
    this.router.navigate(['program_details_category_iii']);
  }

  //educational_qualification
  educational_qualification_category_i()
  {
    this.router.navigate(['home/add_educational_qualification_academic']);
  }
  educational_qualification_category_ii()
  {
    this.router.navigate(['home/add_educational_qualification_ol_al']);
  }
  educational_qualification_category_iii()
  {
    this.router.navigate(['home/add_educational_qualification_al_foundation']);
  }
  educational_qualification_category_iv()
  {
    this.router.navigate(['home/add_educational_qualification_ol_al_foundation']);
  }
  educational_qualification_category_v()
  {
    this.router.navigate(['home/add_educational_qualification_ol']);
  }
  educational_qualification_category_vi()
  {
    this.router.navigate(['home/add_educational_qualification_ol_foundation']);
  }
  educational_qualification_category_vii()
  {
    this.router.navigate(['home/add_educational_qualification_al']);
  }
  educational_qualification_category_viii()
  {
    this.router.navigate(['home/add_educational_qualification_ol_al_academic']);
  }

  professional_qualifications()
  {
    this.router.navigate(['home/professional-qualification']);
  }

  working_experience()
  {
    this.router.navigate(['home/work-experience']);
  }


}

