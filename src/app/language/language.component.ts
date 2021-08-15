import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { LangaugeService } from './Service/langauge.service';
import {Instuctions} from './model/instructions';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {

  constructor(private tag:LangaugeService,private sanitizer: DomSanitizer) {
    this.tag.listen().subscribe((m:any) => {
      console.log(m);
      this.onFilterClick(m);
  })
   }


   instruction: Instuctions= new Instuctions();
   imagepath: SafeResourceUrl;
   name: string='';

  ngOnInit(): void {

   
    this.name=localStorage.getItem("name");
    this.english();
  }


  
  onFilterClick(event) {
    document.getElementById("Lange").style.display = "block";
    
    console.log('Fire onFilterClick: ', event);
}
 
  
callCloselang(){
    document.getElementById("Lange").style.display = "none";
  }



  english(){
    
    this.tag.getInstructions(this.name,1).subscribe(res =>{
      console.log("imagpath",res.image);
     this.imagepath=  this.sanitizer.bypassSecurityTrustResourceUrl(res['image']);

    });

  }


  tamil(){

    this.tag.getInstructions(this.name,2).subscribe(res =>{
      console.log("imagpath",res.image);
     this.imagepath= this.sanitizer.bypassSecurityTrustResourceUrl(res['image']);

    });


  }

  sinhala(){

    this.tag.getInstructions(this.name,3).subscribe(res =>{
      console.log("imagpath",res.image);
     this.imagepath= this.sanitizer.bypassSecurityTrustResourceUrl(res['image']);

    });

  }

}
