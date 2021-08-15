import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { SearchapplicationService } from 'src/app/Search Application/Service/searchapplication.service';
import { InitialApplicant, ProgramStarted } from '../../../make-payment/Models/PendingPayment';
import { ProgramCancelService } from '../../Service/program-cancel.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ProgramChangeObject } from '../../Model/ProgramChangeObject'
import { ProgramChangeService } from '../../Service/program-change.service';
import { AppserviceService } from 'src/app/Application-details/Services/appservice.service';
import { PreferedAcademicCenter } from '../../../Application-details/models/ProgramAcademicCenter';
import { CenterMedium } from '../../../Application-details/models/AcademicMedium';
import { Qualifications } from '../../../Application-details/models/qualification';

@Component({
  selector: 'app-program-change',
  templateUrl: './program-change.component.html',
  styleUrls: ['./program-change.component.css']
})
export class ProgramChangeComponent implements OnInit {

  options : string [] = ['NIC / Passport', 'Applicant ID']
  searchPlaceHolder : string;
  searchApplicant : InitialApplicant[] = new Array();
  indexSelected;
  applicantIndexSelected;
  availableProgramStarted : ProgramStarted[] = new Array();
  message : string;
  programChangePanel : boolean = false;
  programStartedAcademicCenter : PreferedAcademicCenter[] = new Array()
  medium : CenterMedium[] = new Array
  qualification : Qualifications[] = new Array();

  constructor(private applicantServ : SearchapplicationService, private progCanSer : ProgramCancelService, private spinner: NgxSpinnerService, private toastr:ToastrService, private progChanServ : ProgramChangeService, private applicationServ : AppserviceService) { 
    this.progChanServ.getAvailableProgramStarted().subscribe(s=>{
      this.availableProgramStarted = s;
    })
  }

  searchGroup = new FormGroup({
    searchBy: new FormControl('',[Validators.required]),
    searchInput : new FormControl('', [Validators.required])
 });

  checkGroup = new FormGroup({
    checkProgram: new FormControl('')
 });

  applicationGroup = new FormGroup({
    acadamicCenter : new FormControl('',[Validators.required]),
    centerMedium : new FormControl('',[Validators.required]),
    qualification : new FormControl('',[Validators.required])
  })

  ngOnInit(): void {

  }

  selectSearchOption(option){
    this.searchPlaceHolder = this.searchGroup.get('searchBy').value;
  }

  search(){
    this.programStartedChange()
    this.checkGroup.reset();
    this.indexSelected = -1;
    if(this.searchGroup.get('searchInput').invalid){
      document.getElementById("searchInput").className = document.getElementById("searchInput").className + " error";
    }else{
      document.getElementById("searchInput").className = document.getElementById("searchInput").className.replace(" error", "");
    }

    if(this.searchGroup.get('searchBy').invalid){
      document.getElementById("searchBy").className = document.getElementById("searchBy").className + " error";
    }else{
      document.getElementById("searchBy").className = document.getElementById("searchBy").className.replace(" error", "");
    }

    if(this.searchGroup.valid){
      this.spinner.show();
      if(this.searchPlaceHolder == this.options[0]){
        this.applicantServ.getInitialapplicantList(this.searchGroup.get('searchInput').value)
        .subscribe(s=>{
          this.spinner.hide();
          if(s.length > 0){
            this.searchApplicant = s;
          } else {
            this.searchApplicant = [];
            this.toastr.error("Searched NIC "+this.searchGroup.get('searchInput').value+" Not Found","Applicant Not Found");
            this.applicantServ.getInitialapplicantListByPassport(this.searchGroup.get('searchInput').value)
            .subscribe(s=>{
              this.spinner.hide();
              if(s.length > 0){
                this.searchApplicant = s;
              } else {
                this.searchApplicant = [];
                this.toastr.error("Searched Passport "+this.searchGroup.get('searchInput').value+" Not Found","Applicant Not Found")
              }
            })
          }
        })
        
      }
      if(this.searchPlaceHolder == this.options[1]){
        this.progCanSer.getByinitialApplicantID(this.searchGroup.get('searchInput').value).subscribe(s=>{
          this.spinner.hide()
          if(s){
            this.searchApplicant = [];
            this.searchApplicant.push(s)
          }else{
            this.searchApplicant = [];
            this.toastr.error("Searched Applicant ID "+this.searchGroup.get('searchInput').value+" Not Found","Applicant Not Found")
          }
          
        })
      }
    }
    
  }

  Check(InitialApplicant,i){
    this.programStartedChange()
    this.indexSelected = this.checkGroup.get('checkProgram').value;
    this.applicantIndexSelected = i;

    this.applicationServ.findPreferedAcademicCenter(this.availableProgramStarted[this.checkGroup.get('checkProgram').value].programStartedId).subscribe(s=>{
      this.programStartedAcademicCenter = s;
    })

    this.applicationServ.getQualifications(this.availableProgramStarted[this.checkGroup.get('checkProgram').value].program.programId).subscribe(s=>{
      this.qualification = s;
    })

    this.progChanServ.checkProgramChange(InitialApplicant,this.availableProgramStarted[this.checkGroup.get('checkProgram').value].programStartedId).subscribe(s=>{
      this.message = s.status;
      if(s.statusCode == 8){
        this.programChangePanel = true;
      }else{
        this.programChangePanel = false;
      }
      document.getElementById("openModal").click();
    })
  }

  getMedium(id){
    this.applicationServ.findCenterMedium(this.applicationGroup.get('acadamicCenter').value).subscribe(s=>{
      this.medium = s;
    })
  }

  change(){

    document.getElementById("openModalExemption").click();
  }

  programStartedChange(){
    this.programChangePanel = false;
    this.applicationGroup.reset()
  }

  confirmedByUser(){

    let programChange : ProgramChangeObject = {
      initialApplicantId:this.searchApplicant[this.applicantIndexSelected].id,
      medium:this.applicationGroup.get('centerMedium').value,
      newProgramStarted:this.availableProgramStarted[this.checkGroup.get('checkProgram').value].programStartedId,
      newProgramStatedAcademicCenter:this.applicationGroup.get('acadamicCenter').value,
      qualification:this.applicationGroup.get('qualification').value
    };
    this.spinner.show();

    this.progChanServ.programChange(programChange).subscribe(s=>{
      if(s.statusCode == 2){
        this.toastr.success(s.status,"Program Change");
        this.search();
      }else{
        this.toastr.error(s.status,"Program Change")
      }
    })
  }


}
