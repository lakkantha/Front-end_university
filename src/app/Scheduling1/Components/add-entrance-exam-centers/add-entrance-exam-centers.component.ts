import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import {AddEntranceExam,BindingTable2,getEntranceExamCenters,AddingExamCenters} from '../../Modal/add-entrance-exam';
import {DatapassingService} from '../../Service/datapassing.service';
import {AddentranceexamcenterService} from '../../Service/addentranceexamcenter.service';
import { ShareServiceService } from "../../Service/share-service.service";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-entrance-exam-centers',
  templateUrl: './add-entrance-exam-centers.component.html',
  styleUrls: ['./add-entrance-exam-centers.component.css']
})
export class AddEntranceExamCentersComponent implements OnInit {


   medium:any;
  hallno:[];
  programcode:string;
Center="Kandy";
Manual="Manual";
Type="";
root_center=[];
Conducting="";
Medium=[];
r_id:number;
AddingExamCenter=[];
examcenter:[];
updateid:number;
AddExamCenter=[];
Sorts = ['ExamCenter'];
programid:number;
programentranid:number;
programstratedid:number;
hall=[];
mediumid:number;
mediums:Array<{id:number}>=[];
centerid:number;
End: any;
CurrentEditRow: any;
centers:AddEntranceExam[];
maxcapacity:number;
ViewCenters=[];
getDates=[];
getBindingTable2:BindingTable2[];
getMethodofSelection=[];
programStartedID:any;
getAllExamCenters:getEntranceExamCenters[];
getFilteredExamCenters=[];
examRootCenter=[];
centerIds=[];
bindingTable2ID:any;
tablValues:AddingExamCenters[];
startTime:any;
endTime:any;
idForBindingTable2:any;
addEntranceExamForm = new FormGroup({
  entrance_exam_name:new FormControl(''),
  entrance_exam_center: new FormControl(''),
  hall_number:new FormControl(''),
  Medium:new FormControl(''),
  Capacity:new FormControl('',[Validators.min(0), (control: AbstractControl) => Validators.max(this.maxcapacity)(control)]),
  selected_date:new FormControl(''),
  selected_method:new FormControl('')
});
AddExamCenters=new FormGroup({
  address: new FormControl(''),
  centerName : new FormControl(''),
  examRootCenter: new FormControl('')
})
AddExamHall=new FormGroup({
  capacity: new FormControl(''),
  HallName : new FormControl(''),
  examCenter: new FormControl(''),
  entrance_exam_center:new FormControl('')
})
EditForm=new FormGroup({ 
  entrance_exam_center: new FormControl(''),
  hall_number:new FormControl(''),
  Medium:new FormControl(''),
  Capacity:new FormControl('',[Validators.min(0), (control: AbstractControl) => Validators.max(this.maxcapacity)(control)]),
  selected_date:new FormControl('')
})
  constructor(private getShareData: ShareServiceService,private data:DatapassingService,private api:AddentranceexamcenterService,private toastr: ToastrService,private router: Router) 
  { 
    this.getAllCenters();
    this.programcode= this.data.shareddata;
    this.programStartedID=this.data.startedID;
    console.log("sucesspassing value",this.programcode);
    console.log("startedId",this.programStartedID);
    this.getalldata(this.programcode);
    this.getDate(this.programStartedID);
    this.getdata(this.programcode);
  }
  ngOnInit(): void {

  }

  async getAllCenters(){
  this.api.getAllExamRootCenter().subscribe
  (res=>{
this.getAllExamCenters=res as getEntranceExamCenters[];
  })
  }
  getalldata(programScheduleCode){
this.api.getAllentrancecapacity(programScheduleCode).subscribe(res=>{this.AddingExamCenter = res, console.log(res,"alldata");

console.log(this.AddingExamCenter,"this.AddingExamCenter");

});  
this.api.getAllentrancecapacity(programScheduleCode).subscribe
(res=>{
  this.tablValues=res as AddingExamCenters[];
})
  }
async  getdata(programcode){
  this.getFilteredExamCenters=[];
  this.centerIds=[];
 let a= await this.api.getdata(programcode).toPromise();
     console.log(a,'45');
      this.Type=a['examCenterType']['description'];
      this.examRootCenter=a['examRootCenter'];      
      if(this.examRootCenter.length>0){
        for(var i=0;i<this.examRootCenter.length;i++){
          this.r_id=this.examRootCenter[i]['id'];
          this.centerIds.push(this.r_id);
        }
      }
console.log(this.centerIds,"this.centerIds");
console.log(this.getAllExamCenters,"this.getAllExamCenters");

      if(this.centerIds.length>0){
        for(var i=0;i<this.centerIds.length;i++){
          this.getAllExamCenters.filter(x=>x.examRootCenter.id==this.centerIds[i]).forEach(x=>this.getFilteredExamCenters.push(x));
        }
      }

      
    this.Conducting=a['isEntryExamMediumAndProgMediumEqual'];
    this.Medium=a['examMediums']; 
    for(let i=0; i<this.Medium.length;i++){
      this.EditForm.addControl("Medium"+i,new FormControl());
    }
console.log(this.r_id,"rootCenterID");

    this.examcenter=a['examRootCenter'];
    this.programid=a['programStarted']['program']['programId'];
       this.programstratedid=a['programStarted']['programStartedId'];
      console.log(this.programid,"programid");
      this.getdataexam(this.programid);
    //  this.getcenter(this.r_id);
     

  }
  getcenter(r_id){
    this.api.getexamcenter(r_id).subscribe(res=>{this.root_center=res,console.log(res,"center");
    
    });

  }
  gethallno(id){

    let c= this.hall.filter(c =>c.id==id);
    this.maxcapacity=Number(c[0]['capacity']);
    console.log(c,"///");
    

  }
  gethall(id){
    this.centerid=id;
    this.api.gethall(id).subscribe(res=>{this.hall=res,console.log(res,"hall");
    
    });
  }
 async getdataexam(programid){
  let a= await this.api.getdataexam(programid).toPromise();
  this.addEntranceExamForm.patchValue({entrance_exam_name:a['description']});
  this.programentranid=a['id'];
console.log(a,"examname");
console.log(this.programentranid,"examname");
  }
get c(){
  return this.addEntranceExamForm.controls;
}
  onSubmit(){

    let data= {
      capacity: this.addEntranceExamForm.get('Capacity').value,
      entranceExamCenter: {
        id: this.addEntranceExamForm.get('entrance_exam_center').value
      },
      entranceExamCenterHall: {
        id: this.addEntranceExamForm.get('hall_number').value
      },
      examMediumsList: this.mediums,
      programEntryExam: {
        id: this.programentranid
      },
      programStarted: {
        programStartedId: this.programstratedid
      }
    }

    let data1={
      "capacity": this.addEntranceExamForm.get('Capacity').value,
     
      "entranceExamCenterHall": {
    
        "id": this.addEntranceExamForm.get('hall_number').value,
    
        "programStarted": {
    
          "programStartedId": this.programstratedid
        }
      },
      "examMediumsList": this.mediums,
     
      "isAchieved": false,
      "programEntryExam": {
    
        "id": this.programentranid
      },
      "programSchedulesselectionmethoddateandtimeTable2": {
    
    
        "id": Number(this.bindingTable2ID)
    
      }
    }

    let data2={
      "assignedDate": this.addEntranceExamForm.get('selected_date').value,
      "capacityPerMedium": this.addEntranceExamForm.get('Capacity').value,
      "endTime":this.endTime,
      "entranceExamCenterHall": {
        "id": this.addEntranceExamForm.get('hall_number').value,
      },
      "entryExamMethod": {
        "id": this.addEntranceExamForm.get('selected_method').value,
      },
      "examMediums": {
        "id": this.addEntranceExamForm.get('Medium').value,
      },
      "hidden": false,
      "programStarted": {   
        "programStartedId": this.programstratedid
      },
      "startTime": this.startTime
    }
    

    this.api.postdata(data1).subscribe(res=>{
      console.log(res);
      this.getalldata(this.programcode);
      this.toastr.success("Center Capacity Submitted Successfully!", res['message']); 
    },error=>console.log(error)
    );

    this.api.entranceExamTimeSlotCreateOne(data2).subscribe(res=>{
      console.log(res);
      this.toastr.success("Entrance Exam Time Slot Created Successfully!", res['message']); 
    },error=>console.log(error)
    );

  }
  EditTable(i){
//  for(let a=0; a<= this.AddingExamCenter[i].examMediumsList.length;a++){
//   this.EditForm.patchValue({Medium : this.AddingExamCenter[i].examMediumsList[a].medium}); 
//  }

// let a = this.AddingExamCenter[i].examMediumsList.forEach(element => { this.medium=element.id,console.log(element,"element");

  
// });
console.log(this.tablValues[i],"this.tablValues[i]");
this.idForBindingTable2=this.tablValues[i].programSchedulesselectionmethoddateandtimeTable2.id;
let b = this.tablValues[i].examMediumsList;


    this.CurrentEditRow = i;

    console.log(b,"22");
    
   
    this.EditForm.patchValue({entrance_exam_center : this.tablValues[i].entranceExamCenterHall.entranceExamCenter.id}); 
    this.gethall(this.tablValues[i].entranceExamCenterHall.entranceExamCenter.id);
    this.EditForm.patchValue({hall_number : this.tablValues[i].entranceExamCenterHall.id}); 
   
    console.log(this.Medium,"34");

    for(let i=0; i<this.Medium.length;i++)
    {
      this.EditForm.get('Medium'+(this.Medium[i]['id']-1)).setValue(false); 
      this.Onmedium(this.Medium[i]['id'],false);}
    
    for(let i=0; i<this.Medium.length;i++)
    {
     
      for(let e=0;e<b.length;e++)
      {
        console.log(this.Medium[i]['id'],b[e]['id'],"==");
if(this.Medium[i]['id']== b[e]['id'])
{

  this.EditForm.get('Medium'+(this.Medium[i]['id']-1)).setValue(true);
  this.Onmedium(this.Medium[i]['id'],true);
}
     
}
    }
  
    this.EditForm.patchValue({Capacity : this.tablValues[i].capacity}); 
this.updateid= this.tablValues[i].id;
  }
  onUpdate(){
    // let y,p

    // let a =this.root_center.filter(a=>a.id==this.EditForm.get('entrance_exam_center').value).forEach(x=>y=x.description);

    // let b =this.Medium.filter(b=>b.id==this.EditForm.get('Medium').value).forEach(x=>p=x.medium);

    // this.AddingExamCenter[this.CurrentEditRow]["entrance_exam_center"]= y;
    // this.AddingExamCenter[this.CurrentEditRow]["Medium"]=p;
    // this.AddingExamCenter[this.CurrentEditRow]["hall_number"]=this.EditForm.get('hall_number').value;
    // this.AddingExamCenter[this.CurrentEditRow]["Capacity"] =this.EditForm.get('Capacity').value;


    let data= {
      "capacity": Number(this.EditForm.get('Capacity').value),
     
      "entranceExamCenterHall": {
    
        "id": this.EditForm.get('hall_number').value,
    
        "programStarted": {
    
          "programStartedId": this.programstratedid
        }
      },
      "examMediumsList": this.mediums,
     
      "isAchieved": false,
      "programEntryExam": {
    
        "id": this.programentranid
      },
      "programSchedulesselectionmethoddateandtimeTable2": {
    
    
        "id": Number(this.idForBindingTable2)
    
      },
      "id":this.updateid
    }
    this.api.updated(data).subscribe(res=>{
    
      this.getalldata(this.programcode);
      this.toastr.success("Updated Successfully!", res['message']); 
    
    },error=>console.log(error)
    
    
    );
    
    
 
  }
  Delete(i){
    
   let id= this.AddingExamCenter[i].id;
   this.api.deleted(id).subscribe(res=>{
    this.getalldata(this.programcode);
    this.toastr.warning("Deleted Successfully!", res['message']); 
   })

  //   var delBtn = confirm(" Do you want to delete ?");
  // if ( delBtn == true ) {
  //   this.AddingExamCenter.splice(i, 1 );
  // }
 }
  onReset(){
   // this.addEntranceExamForm.get('AddEntranceExam').setValue('')  ;
    this.AddingExamCenter.splice(0,this.AddingExamCenter.length);
   // this.addEntranceExamForm.patchValue({ActivityDateType:'Program'});
    this.addEntranceExamForm.get('entrance_exam_name').setValue(''),
    this.addEntranceExamForm.get('entrance_exam_center').setValue(''),
    this.addEntranceExamForm.get('hall_number').setValue(''),
    this.addEntranceExamForm.get('Medium').setValue(''),
   this.addEntranceExamForm.get('capacity').setValue('')

  }
  Update(){
    let a ={
      address: this.AddExamCenters.get('address').value,
      centerName: this.AddExamCenters.get('centerName').value,
      examRootCenter:{
        id:this.AddExamCenters.get('examRootCenter').value
      }
     
    }

this.api.addexamcenter(a).subscribe(res=>{ this.getcenter(this.r_id);
  this.toastr.success("Created Successfully!", res['message']); })

  }
  Updatehall(){
    let a ={


      
        capacity: this.AddExamHall.get('capacity').value,
        description: this.AddExamHall.get('HallName').value,
        entranceExamCenter: {
          id: this.centerid,
        },
        programStarted: {
          programStartedId: this.programstratedid
        }
      
      
     
     
    }
    console.log("hall upadte");
    

this.api.posthall(a).subscribe(res=>{ this.gethall(this.centerid);
  this.toastr.success("Created  Successfully!", res['message']); })

  }
  Onmedium(value,isChecked: boolean){
    this.mediums=[];
    console.log(value,"55");
    
    this.mediumid=value;
if(isChecked){
    this.mediums.push({id:Number(this.mediumid)});
    
} else{
  let index = this.mediums.findIndex(x => x.id == this.mediumid )
    this.mediums.splice(index,1);
}

console.log(this.mediums);
  }
  addCenter(){
    this.router.navigate(['scheduling/examRootCenterBinding']);
  }
  setDate(value){
    this.getBindingTable2.filter(x=>x.assigndate==value).forEach(x=>this.bindingTable2ID=x.id);
    this.getBindingTable2.filter(x=>x.id==this.bindingTable2ID).forEach(x=>this.startTime=x.starttime);
    this.getBindingTable2.filter(x=>x.id==this.bindingTable2ID).forEach(x=>this.endTime=x.endTime);
    console.log(this.bindingTable2ID,"this.bindingTable2ID");
    
  }
  getDate(programStartedID){
    this.api.getDate(programStartedID).subscribe
    (res=>{
      this.getBindingTable2=res as BindingTable2[];
      const result = Array.from(this.getBindingTable2.reduce((m, t) => m.set(t.programEntryExamMethod.entryExamMethod.id, t), new Map()).values());
      this.getMethodofSelection=result;
    });
  }
  setMethodofSelection(value){
    this.getDates=[];
    this.getBindingTable2.filter(x=>x.programEntryExamMethod.entryExamMethod.id==value).forEach(x=>this.getDates.push(x));
  }
  //   onAdd(){


        
// let a =this.root_center.filter(a=>a.id==this.addEntranceExamForm.get('entrance_exam_center').value);

// let b =this.Medium.filter(b=>b.id==this.addEntranceExamForm.get('Medium').value);

//     if(this.addEntranceExamForm.value!=""){
//       this.AddingExamCenter.push({
//         "entrance_exam_name":this.programid,
        
//         "entrance_exam_center":a[0]["description"],
//         "hall_number":this.addEntranceExamForm.get('hall_number').value,
//         "Medium":b[0]["medium"],
//         "Capacity":this.addEntranceExamForm.get('Capacity').value
        
//       });
//       console.log("entrance_exam_name",this.programid);
//       let e={
//         capacity:this.addEntranceExamForm.get('Capacity').value,
//         examMediumsList:[{id:this.addEntranceExamForm.get('Medium').value}],
//         examRootCenter: {id:this.addEntranceExamForm.get('entrance_exam_center').value},
//         hallNo:this.addEntranceExamForm.get('hall_number').value,
//         programEntryExam:{id:this.programentranid},
//       }
//       this.AddExamCenter.push(
      
//         e
//       );



//     }



//   }
}
