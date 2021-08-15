import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EducationalQualificationFoundationService } from '../services/educational-qualification-foundation.service';

@Component({
  selector: 'app-template-foundation',
  templateUrl: './template-foundation.component.html',
  styleUrls: ['./template-foundation.component.css']
})
export class TemplateFoundationComponent implements OnInit {

  public eduFoundation: any = [];   // for list function

  dataFoundation = {
    initialStudentId: {
      id: ''
    },
    year: '',
    indexNumber: '',
    medium: '',
    stream: '',
    subject: '',
    result: ''
  }

  iStudentId: string = '';
  submitted = false;
  id: number;
  isFill = 0;
  programmeId: string = '';
  foundationFill = false;
  successFill = false;

  constructor(private foundationService: EducationalQualificationFoundationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.iStudentId = localStorage.getItem('initialstudentid');
    this.programmeId = localStorage.getItem("programmeid");

    this.getDataFoundation(this.iStudentId);
  }

  // Fill form sucess
  formFillComplete() {
    if (this.foundationFill) {
      this.foundationService.fillFoundation("true");
    }
    else {
      this.foundationService.fillFoundation("false");
    }
  }

  // get all Foundation data
  getDataFoundation(iStudentId) {
    this.foundationService.getAllFoundation(iStudentId)
      .subscribe(data =>{
        this.eduFoundation = data;
        if (Object.keys(this.eduFoundation).length === 0) {
          this.foundationFill = false;
        } else {
          this.foundationFill = true;
        }
        this.formFillComplete();
      });
  }
}
