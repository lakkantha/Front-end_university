import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RedirectToSequeceService } from 'src/app/_services/RedirectToSequece.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.scss']
})
export class AdmissionComponent implements OnInit {

  programs: any; fromHome = false;
  initialAppId = '';
  progStartedId = '';
  public nic: string;
  center = false;
  examCenter = [];
  map = new Map();
  downloadTimes = '';
  message = "";
  constructor(private router: Router, private apiService: ApiService, private redirect: RedirectToSequeceService) { }

  ngOnInit() {
    let nic = localStorage.getItem("nic");
    this.apiService.getPrograms(nic).subscribe((response) => {
      this.programs = response;
      this.downloadTimes = response.downloadTimes;
      console.log(this.programs);
    });
    if (localStorage.getItem("downloadBtnClick")) {
      localStorage.removeItem("downloadBtnClick");
      this.redirect.RedirectTo(this.initialAppId);
    }
  }

  firstComponentFunction(iniAppId, progStrtId, methodId, fromHome) {
    this.fromHome = fromHome;
    if (this.fromHome) {
      this.apiService.getAdmissionDetails(iniAppId, progStrtId, methodId)
        .subscribe(res => {
          this.router.navigateByUrl('home/admission/info-home-based');
          localStorage.setItem("downloadBtnClick", "1");
        }, err => {
          console.log(err);
        });
    } else {
      this.initialAppId = iniAppId;
      this.progStartedId = progStrtId;
      localStorage.setItem("iniAppId", this.initialAppId);
      localStorage.setItem("progStrtId", this.progStartedId);
      localStorage.setItem("methodId", methodId);
      this.apiService.getDownloadDetails(iniAppId, progStrtId, methodId)
        .subscribe(res => {
          if (res['not download'] == 0) {
            document.getElementById("openModal").click();
          }
          if (res['download'] == 1) {
            this.message = "Your entrance exam admission has already generated. Do you want to download it again?"
            document.getElementById("openModalfirst").click();
          }
          if (res['not register'] == -2) {
            this.message = "You have not registered this exam."
            document.getElementById("openModalerr").click();
          }
          if (res['invalid data'] == -3) {
            this.message = "Invalid Data"
            document.getElementById("openModalerr").click();
          }
        }, err => {
          console.log(err);
        });
    }
  }

  open() {
    this.router.navigateByUrl('home/admission/admissiongenerate');
    localStorage.setItem("downloadBtnClick", "1");
  }

  goToHome() {
    this.router.navigateByUrl('home');
  }
}

