import { Component, OnInit } from '@angular/core';
import { CourseSelectionStorageService } from '../_services/services/course-selection-storage.service';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.css']
})
export class InfoPageComponent implements OnInit {

  username = ""; program = ""; date1 = new Date().toDateString(); date2 = new Date().toDateString();
  localData: any = []; programId = 0; showDescription = false; message = "";
  programs = []; hasDate = false; sequence = 0;

  constructor(private api: CourseSelectionStorageService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("nic");
    this.localData = JSON.parse(localStorage.getItem("auth-user"));
    this.programId = Number(localStorage.getItem("programmeid"));
    for (let i of this.localData.initialApplicant) {
      if (this.programId == i.programStarted.program.programId) {
        this.getProgram(i.programStarted.programStartedId, this.username);
      }
    }
    console.log(this.programId);
  }

  async getProgram(programStartedId, nic) {
    await this.api.getProgramsInfo(programStartedId, nic)
      .subscribe(res => {
        this.program = res.code + " : " + res.title;
        this.date1 = new Date(res.fromDate).toDateString();
        this.date2 = new Date(res.expireDate).toDateString();
        this.sequence = res.sequence;
        this.hasDate = res.hasDate;
        this.message = res.message;
      }, err => {
        console.log(err);
      });
  }
}
