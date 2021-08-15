import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {DefineAcademicCentersService} from '../../Service/define-academic-centers.service';
import {Medium,Center} from '../../Modal/defineAcademicCenter';
import {ShareServiceService} from '../../Service/share-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-define-academic-centers',
  templateUrl: './define-academic-centers.component.html',
  styleUrls: ['./define-academic-centers.component.css']
})
export class DefineAcademicCentersComponent implements OnInit {

  medium : Medium[];
  center : Center[];
  programStartedID:number;
  constructor(private toastr: ToastrService,private getData:DefineAcademicCentersService,private getShareData: ShareServiceService)
   {
      this.getData.getMedium().subscribe
      (res =>{
      this.medium = res as Medium[]
      }),

      this.getData.getCenter().subscribe
      (res =>{
        this.center = res as Center[]
        this.center.forEach(s=> this.Centers.push(s['cnt_description'])) 
      })  
      this.programStartedID=this.getShareData.ShareData;
      console.log(this.programStartedID);
      
   }
  Centers = [];
  Remove = "false";
  CentersValues:any;
  MediumValues:any;
  CenterID:number;
  ShowCenters="false";
  // FirstArray:{
  //   "value":any;
  //   "medium":any;
  // }[];
  FirstArray=[];
  SecondArray=[];
  ThirdArray=[];
  allCentersId=[];
  MediumID1:number;
  MediumID2:number;
  MediumID3:number;
  indexArray:any;
  AcademicCenters = new FormGroup({
    PreviousSchedule : new FormControl(''),
    Sinhala : new FormControl(''),
    English : new FormControl(''),
    Tamil : new FormControl('')
  });

  ngOnInit(): void 
  {
  }
  onClick(value,i,j)
  {
    this.center.filter(s=>s.cnt_description==value).forEach(s=> this.CenterID=s['cnt_centerId']);
    // console.log(value,i,j);
    // console.log(this.CenterID);
  }

  onRemove()
  {
    this.Remove="true"; 
    this.CentersValues=[];
    this.FirstArray=[];
    this.ThirdArray=[];
    this.SecondArray=[];
  }

  onTextChange(value)
  {
    
    if(this.CentersValues!=[]){
      this.ShowCenters="true";
    }
    else{
      this.ShowCenters="false";
    }
  }

  onItemRemoved(value)
  {
console.log(value.value);

    if(this.CentersValues!=[]){
      this.ShowCenters="true";
    }
    else{
      this.ShowCenters="false";
    }
    this.FirstArray= this.FirstArray.filter(item=>item['center']!==value.value);
    console.log(this.FirstArray);
  }

  mediumValueChange(value1,check,i,j){
    console.log(value1,check,i,j);
    this.center.filter(s=>s.cnt_description==value1).forEach(s=> this.CenterID=s['cnt_centerId']);
    if(j==0&&check){
      this.FirstArray.push({'center':value1,'medium':1,'id':this.CenterID})
    }
    if(j==0&&!check){
      this.FirstArray.filter(item=>item['center']==value1&&item['medium']==0).forEach(s=>this.indexArray=this.FirstArray.indexOf(s))
      this.FirstArray.splice(this.indexArray,1); 
    }
    if(j==1&&check){
      this.FirstArray.push({'center':value1,'medium':2,'id':this.CenterID})
    }
    if(j==1&&!check){
      this.FirstArray.filter(item=>item['center']==value1&&item['medium']==1).forEach(s=>this.indexArray=this.FirstArray.indexOf(s))
      this.FirstArray.splice(this.indexArray,1);
    }
    if(j==2&&check){
      this.FirstArray.push({'center':value1,'medium':3,'id':this.CenterID})
    }
    if(j==2&&!check){
      this.FirstArray.filter(item=>item['center']==value1&&item['medium']==2).forEach(s=>this.indexArray=this.FirstArray.indexOf(s))
      this.FirstArray.splice(this.indexArray,1);
    }
 console.log(this.FirstArray);
 
  }

  Save(){
    this.ThirdArray=[];
    for(let i=0;i<this.CentersValues.length;i++){
      this.SecondArray=[];
     this.FirstArray.filter(s=>s.center==this.CentersValues[i].value).forEach(s=>this.SecondArray.push(
      {
        "med_medium": {
          "med_mediumId": s.medium
        }
      }));
      
      this.center.filter(s=>s.cnt_description==this.CentersValues[i].value).forEach(s=> this.CenterID=s['cnt_centerId']);
      this.ThirdArray.push(        
      {
        "cnt_center": {
          "cnt_centerId": this.CenterID
        },
        "programStartedAcademicCenterMediumList": this.SecondArray
      }
      )
      
    }
    console.log(this.ThirdArray );
    this.getData.createDefineAcademicCenter(this.ThirdArray,this.programStartedID).toPromise()
    .then(s => { this.toastr.success(s);this.onRemove(); console.log(s);
     })
    .catch((s) => { this.toastr.error("error", s['error']['message']); console.log(s);});
  }

}
