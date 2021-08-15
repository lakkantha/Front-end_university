import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-admission-generate',
  templateUrl: './admission-generate.component.html',
  styleUrls: ['./admission-generate.component.scss']
})
export class AdmissionGenerateComponent implements OnInit {

  program: any;
  admission: any = [];
  initialApplicantId = '';
  progStartedId = ''; qrValue = "";
  methodId = ''; isLoggedIn = false; initialApplicant = []; programId = 0;

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService, private tokenStorageService: TokenStorageService, private spinner: NgxSpinnerService) {

  }

  ngOnInit() {
    // this.isLoggedIn = !!this.tokenStorageService.getToken();
    // if (this.isLoggedIn) {
    //   const user1 = this.tokenStorageService.getUser();
    //   this.initialApplicant = user1.initialApplicant;
    //   this.programId = Number(localStorage.getItem('programmeid'));
    //   for(let i of this.initialApplicant){
    //     if(this.programId == i.programStarted.program.programId){
    //       this.initialApplicantId = i.
    //       this.progStartedId = i.programStarted.programStartedId;
    //     }
    //   }
    // }
    this.initialApplicantId = localStorage.getItem('iniAppId');
    this.progStartedId = localStorage.getItem('progStrtId');
    this.methodId = localStorage.getItem('methodId');
    this.apiService.getAdmissionDetails(this.initialApplicantId, this.progStartedId, this.methodId).subscribe((response) => {
      this.admission = response;
      this.qrValue = "Program Name : " + this.admission.programName + "\nAcademic Year: " + this.admission.academicYear + "\nNIC : " + this.admission.nic + "\nIndex No : " + this.admission.indexNo;
      this.downloadReport(this.initialApplicantId, this.progStartedId, this.methodId);
    });
    // setTimeout(() => {
    //   this.download()
    // }, 1000)
  }

  downloadReport(initialApplicantId, programStartedId, methodId) {
    this.spinner.show();
    this.apiService.downloadReport(initialApplicantId, programStartedId, methodId)
      .subscribe(
        response => {
          this.spinner.hide();
          let blob = new Blob([response], { type: 'application/octet-stream' });

          var downloadURL = window.URL.createObjectURL(response);
          var link = document.createElement('a');
          link.href = downloadURL;
          link.download = "Admission.pdf";
          link.click();
          this.navigate();
        }, err => {
          console.log(err);
        });
  }

  print() {
    setTimeout(() => {
      this.navigate()   //java script is object
    }, 1000)
    window.print();
  }

  download() {
    var element = document.getElementById('table');
    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png')
      var doc = new jspdf.jsPDF('p', 'mm', 'a4')
      var imgHeight = canvas.height * 208 / canvas.width;
      doc.addImage(imgData, 0, 0, 208, imgHeight)
      doc.save('Admission.pdf'); // Generated PDF
    })
  }

  navigate() {
    console.log("Navigating");
    this.router.navigate(['home']);
  }


}
