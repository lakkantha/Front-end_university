import { Component, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { map } from 'jquery';
import { modalConfigDefaults } from 'ngx-bootstrap/modal/modal-options.class';
import { ToastrService } from 'ngx-toastr';
import { fileURLToPath } from 'url';
import { AppComponent } from '../app.component';
import { InitialApplicant } from '../make-payment/Models/PendingPayment';
import { RedirectToSequeceService } from '../_services/RedirectToSequece.service';
import { SequenceService } from '../_services/sequence.service';
import { UserService } from '../_services/user.service';
import { DatapassinghomeService } from './countnotice/datapassinghome.service';
import { NextSequence } from './NextSequenceModel';
import { NoticeService} from './notice.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content: string;
  initialApplicant : InitialApplicant[] = new Array();
  sequence : NextSequence[] = new Array();
  show : boolean = false;
nic:string;
notification:any [] = [];
countofnotificaton:Number;
notice:any;

fragment: string;
mm: string ="";

  constructor(private userService: UserService,private toastr: ToastrService,private api:NoticeService ,private router : Router, private seqServ : SequenceService, private redireceServ : RedirectToSequeceService,private appComponent:AppComponent, private home:DatapassinghomeService, private sanitizer: DomSanitizer) {

this.shownotice();
this.home.listen().subscribe((m:any) => {
  console.log(m);

})

   }

  ngOnInit() {
    if(sessionStorage.getItem("auth-user")){
      this.show = true;
      this.initialApplicant = JSON.parse(sessionStorage.getItem("auth-user"))['initialApplicant'];
      this.nic = JSON.parse(sessionStorage.getItem("auth-user"))['username'];
      console.log(this.nic,"username");
      this.getnotification(this.nic);
      //this.getDueAmount(this.nic);
    }


    if(this.initialApplicant){
      this.initialApplicant.forEach(s=>{
        this.seqServ.getSequenceByInitialApplicantId(s.id).subscribe(res=>{
          this.sequence.push(res);
        })
      })
    }


    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );



  }








  getNextSequence(id){
    return this.sequence.filter(fil => fil.initialApplicant.id == id)[0].sequence.description
  }

  routeToNext(id){
   this.redireceServ.RedirectTo(id)


   let user = this.initialApplicant.filter(s => s.id == id)[0];
   console.log(user,"90");
   localStorage.setItem("programmeid", String(user.programStarted.program.programId));
   localStorage.setItem("applicanttypeid", String(user.applicantType.id));


   console.log(user,"programid");

  }
  switchRoutes(sequence){

    switch(sequence){

      case 1:{
        this.router.navigate(['']);
        break;
      }
      case 2:{
        this.router.navigate(['makePayment']);
        break;
      }
      case 3:{
        this.router.navigate(['entrance_exam']);
        break;
      }
      case 4:{
        this.router.navigate(['counselling_schedule']);
        break;
      }
      case 5:{
        this.router.navigate(['home/select-program']);
        break;
      }
      case 6:{
        this.router.navigate(['makePayment']);
        break;
      }
      case 7:{
        this.appComponent.per_det();
        break;
      }
      case 8:{
        this.appComponent.edu_qua();
        break;
      }


      case 9:{
        this.appComponent.pro_qua() ;
        break;
      }
      case 10:{
        this.appComponent. work_exp();
        break;
      }
      case 11:{
        this.router.navigate(['']);
        break;
      }



    }

  }



//   getnotification(id){

//     this.api.getinitialapplicatnotice(id).subscribe(res=>{this.notification=res,console.log(res,"notification");


//  this.appComponent.homevaluepass(res.length);


// })


//   }

  getnotification(id) {
    //this.spinner.show();
    this.api.getinitialapplicatnotice(id)
      .subscribe(
        response => {
          console.log(response, "NOTIFICATION");
          this.notification=response;
          this.appComponent.homevaluepass(response.length);
          //this.spinner.hide();

        },
        error => {
          //this.spinner.hide();
          //this.getLateFees();
          console.log(error);
        });
  }


// deletenotification(id){
//   this.api.delete(id).subscribe(res=>{

//     this.getnotification(this.nic);
//     this.toastr.warning("Deleted Successfully!", res['message']);
//   })

//   }

  deletenotification(id){
    this.api.delete(id)
      .subscribe(
        response => {
          console.log(response, "NOTIFICATION DELETE");
          this.getnotification(this.nic);
          this.toastr.warning("Deleted Successfully!", response['message']);
          //this.spinner.hide();

        },
        error => {
          //this.spinner.hide();
          //this.getLateFees();
          console.log(error);
        });
  }

shn:boolean=false;
  shownotice(){
    console.log(this.home.value,"homevalue");

   if(this.home.value==1){
if(this.shn==false){
  this.shn=true;
}
else{
  this.shn=false;
}

   }
// {    var bell= document.getElementById('menu1');
//     bell.style.display=;}
console.log("789sh");

  }


  popup(i){
   console.log( this.notification[i],"message"+i);
   this.mm = this.notification[i].message;
    document.getElementById("myModal").click();
   //this.notice= this.notification[i]['message'];

  }


}
