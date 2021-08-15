import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import {AddEntryLab,BindingTable2,getEntranceExamCenters,AddingExamCenters} from '../../Modal/add-entryLab';
import {DatapassingService} from '../../Service/datapassing.service';
import {AddentranceexamcenterService} from '../../Service/addentranceexamcenter.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ShareServiceService } from "../../Service/share-service.service";

@Component({
  selector: 'app-add-entry-exam-lab-capacity',
  templateUrl: './add-entry-exam-lab-capacity.component.html',
  styleUrls: ['./add-entry-exam-lab-capacity.component.css']
})
export class AddEntryExamLabCapacityComponent implements OnInit {
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
  mediumid:number;
mediums:Array<{id:number}>=[];
  updateid:number;
  programcode:string;
  Center="Kandy";
  Manual="Online";
  Type="";
  root_center=[];
  Conducting="";
  Medium=[];
  AddingExamLab=[];
  AddExamLab=[];
  programentranid:number;
  r_id:number;
  Sorts = ['ExamCenter'];
  programid:number;
  examcenter:[];
  End: any;
  CurrentEditRow: any;
  labs:AddEntryLab[];
  programstratedid:any;
maxcapacity:number;
startTime:any;
endTime:any;
  hall=[];
  idForBindingTable2:any;

centerid:number;

AddExamHall=new FormGroup({

  capacity: new FormControl(''),
  HallName : new FormControl(''),
  examCenter: new FormControl(''),
  entrance_exam_center:new FormControl('')


})
addEntranceExamForm = new FormGroup({ 
    entrance_exam_name:new FormControl(''),
    entrance_exam_center: new FormControl(''),
    LabNo: new FormControl(''),
    Medium:new FormControl(''),
    capacity:new FormControl(''),
    selected_date:new FormControl(''),
    selected_method:new FormControl('')
});
EditForm=new FormGroup({
    entrance_exam_center: new FormControl(''),
        LabNo: new FormControl(''),
      
        Medium:new FormControl(''),
        capacity:new FormControl('',[Validators.min(0), (control: AbstractControl) => Validators.max(this.maxcapacity)(control)]),
        selected_date:new FormControl('')
})
AddExamCenters=new FormGroup({
        examRootCenter: new FormControl(''),
        address: new FormControl(''),
        centerName : new FormControl('')
      
})
EditForm1=new FormGroup({

  
        capacity:new FormControl('',[Validators.min(0), (control: AbstractControl) => Validators.max(this.maxcapacity)(control)])
    
})
  constructor(private data:DatapassingService,private api:AddentranceexamcenterService,private toastr: ToastrService,private router: Router) 
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
  getDate(programStartedID){
    this.api.getDate(programStartedID).subscribe
    (res=>{
      this.getBindingTable2=res as BindingTable2[];
      const result = Array.from(this.getBindingTable2.reduce((m, t) => m.set(t.programEntryExamMethod.entryExamMethod.id, t), new Map()).values());
      this.getMethodofSelection=result;
    });
  }
  async getAllCenters(){
    this.api.getAllExamRootCenter().subscribe
    (res=>{
  this.getAllExamCenters=res as getEntranceExamCenters[];

    })
    }
  gethall(id){
    this.centerid=id;
    this.api.gethall(id).subscribe(res=>{this.hall=res,console.log(res,"hall");
    
    });
  }
  getselcthall(id){

    let c= this.hall.filter(c =>c.id==id);
    console.log(c,"//");
    this.maxcapacity=Number(c[0]['capacity']);
    console.log(this.maxcapacity,"max");

    

  }
async  getdata(programcode){
  this.getFilteredExamCenters=[];
  this.centerIds=[];
    let a= await this.api.getdata(programcode).toPromise();
        console.log(a);
         this.Type=a['examCenterType']['description'];
         this.root_center=a['examRootCenter'];
       this.Conducting=a['isEntryExamMediumAndProgMediumEqual'];
       this.Medium=a['examMediums'];
       for(let i=0; i<this.Medium.length;i++){
        this.EditForm.addControl("Medium"+i,new FormControl());
      }
       this.examcenter=a['examRootCenter'];
       this.examRootCenter=a['examRootCenter'];
       this.programid=a['programStarted']['program']['programId'];
       this.programstratedid=a['programStarted']['programStartedId'];
       this.r_id=a['entranceExamRootCenterId'];
       console.log(this.examcenter,"this.examcenter");
       console.log("this.getFilteredExamCenters");
       if(this.examRootCenter.length>0){
         
        
        for(var i=0;i<this.examRootCenter.length;i++){
          this.r_id=this.examRootCenter[i]['id'];
          this.centerIds.push(this.r_id);
        }
      }
      if(this.centerIds.length>0){
        for(var i=0;i<this.centerIds.length;i++){
          this.getAllExamCenters.filter(x=>x.examRootCenter.id==this.centerIds[i]).forEach(x=>this.getFilteredExamCenters.push(x));
        }
        
      }
         console.log(this.programid);
         this.getdataexam(this.programid);
   this.addEntranceExamForm.patchValue({capacity:20}); 
   //this.getcenter(this.r_id);    
   
     }
async getdataexam(programid){
      let a= await this.api.getdataexam(programid).toPromise();
      this.addEntranceExamForm.patchValue({entrance_exam_name:a['description']});
      this.programentranid=a['id'];
    console.log(a,"examname");
    }
    onAdd(){

      let b =this.Medium.filter(b=>b.id==this.addEntranceExamForm.get('Medium').value);
      console.log(b,"sadas");
      
      if(this.addEntranceExamForm.value!=""){
        this.AddingExamLab.push({
          "entrance_exam_name":this.programentranid,
          "LabNo":this.addEntranceExamForm.get('LabNo').value,
          "Medium":b[0]["medium"],
          "capacity":this.addEntranceExamForm.get('capacity').value
        })


        let e={
          
          examMediumsList:[{id:this.addEntranceExamForm.get('Medium').value}],
          labNo:this.addEntranceExamForm.get('LabNo').value,
          programEntryExam:{id:this.programentranid},
          qtyPerLab:this.addEntranceExamForm.get('Capacity').value,
        }
        this.AddExamLab.push(
        
          e
        );
      }
  
  
  
    }
    getalldata(programScheduleCode){
      this.api.getAlllabentrancecapacity(programScheduleCode).subscribe(res=>{this.AddingExamLab = res, console.log(res,"alldata");
      });
      this.api.getAlllabentrancecapacity(programScheduleCode).subscribe
(res=>{
  this.tablValues=res as AddingExamCenters[];
})    
    }
    onSubmit(){
      console.log(this.addEntranceExamForm.get('LabNo').value,"value");
            
      let data= {

 
        examMediumsList: this.mediums,
        entranceExamCenter: {
          id: this.addEntranceExamForm.get('entrance_exam_center').value
         },
         entranceExamCenterHall: {
          id:this.addEntranceExamForm.get('LabNo').value,
         },
       
        programStarted: { programStartedId:this.programstratedid },
        programEntryExam: {
          id: this.programentranid
        },
        qtyPerLab: this.addEntranceExamForm.get('capacity').value,
        isAchieved : false
      }

      let data1={
        "entranceExamCenterHall": {
          "id": this.addEntranceExamForm.get('LabNo').value,
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
          },
          "qtyPerLab": this.addEntranceExamForm.get('capacity').value,
      }
      
      let data2={
        "assignedDate": this.addEntranceExamForm.get('selected_date').value,
        "capacityPerMedium": this.addEntranceExamForm.get('capacity').value,
        "endTime":this.endTime,
        "entranceExamCenterHall": {
          "id": this.addEntranceExamForm.get('LabNo').value,
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
      
    

      this.api.postdatalab(data1).subscribe(res=>{
        console.log(res);
        this.getalldata(this.programcode);
        this.toastr.success("Lab Capacity Submitted Successfully!", res['message']);
      },error=>console.log(error)
      );
console.log(data2,"data2");

      this.api.entranceExamTimeSlotCreateOne(data2).subscribe(res=>{
        console.log(res);
        this.toastr.success("Entrance Exam Time Slot Submitted Successfully!", res['message']);
      },error=>console.log(error)
      );
    }
    viewLabs=[];
    get c(){
      return this.EditForm.controls;
    }
    EditTable(i){
      console.log("edit");

    
     
      this.CurrentEditRow = i;

      let b = this.tablValues[i].examMediumsList;

      this.idForBindingTable2=this.tablValues[i].programSchedulesselectionmethoddateandtimeTable2.id;
      this.EditForm.patchValue({entrance_exam_center : this.tablValues[i].entranceExamCenterHall.entranceExamCenter.id}); 
      this.gethall(this.tablValues[i].entranceExamCenterHall.entranceExamCenter.id);
      this.EditForm.patchValue({LabNo : this.tablValues[i].entranceExamCenterHall.id}); 
      this.EditForm.patchValue({capacity : this.tablValues[i].qtyPerLab}); 
      console.log(this.AddingExamLab[i]);
      
      this.updateid= this.tablValues[i].id;

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
    
      
    

  

    }
    onUpdate(){

      // let data= {

 
      //   examMediumsList: this.mediums,
      //   entranceExamCenter: {
      //     id: this.EditForm.get('entrance_exam_center').value
      //    },
      //    entranceExamCenterHall: {
      //     id:this.EditForm.get('LabNo').value,
      //    },
      //    id:this.updateid,
      //   programStarted: { programStartedId:this.programstratedid },
      //   programEntryExam: {
      //     id: this.programentranid
      //   },
      //   qtyPerLab: this.EditForm.get('capacity').value,
      //   isAchieved : false
      // }

      let data={
        "entranceExamCenterHall": {
          "id": this.EditForm.get('LabNo').value,
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
          "qtyPerLab": Number(this.EditForm.get('capacity').value),
          "id":this.updateid
      }
    
      // let p
      this.api.Updatelab(data).subscribe(res=>{
    
        this.getalldata(this.programcode);
        this.toastr.success("Updated Successfully!", res['message']); 
      
      },error=>console.log(error)
      
      
      );
    

    // let b =this.Medium.filter(b=>b.id==this.EditForm.get('Medium').value).forEach(x=>p=x.medium);

   
    // this.AddingExamLab[this.CurrentEditRow]["Medium"]=p;
    // this.AddingExamLab[this.CurrentEditRow]["LabNo"]=this.EditForm.get('LabNo').value;
    // this.AddingExamLab[this.CurrentEditRow]["capacity"] =this.EditForm.get('capacity').value;
    
    // this.toastr.success(" Updated Successfully!", this.AddingExamLab[this.CurrentEditRow]['message']);
    }  

    Edit(){
      console.log("edit");
      
     
    
      this.EditForm1.patchValue({capacity:20}); 
  
      this.viewLabs = this.AddingExamLab;
    }
    onUpdated(){
      this.addEntranceExamForm.patchValue({capacity:this.EditForm1.get('capacity').value});
      this.toastr.success(" Updated Successfully!", this.EditForm1.get('capacity').value);
 
    }
    Delete(i){ 
    //    var delBtn = confirm(" Do you want to delete ?");
    // if ( delBtn == true ) {
    //   this.AddingExamLab.splice(i, 1 );
    // } 
    let id= this.AddingExamLab[i].id;
    this.api.deletedlab(id).subscribe(res=>{
     this.getalldata(this.programcode);
     this.toastr.warning("Deleted Successfully!", res['message']); 
    })
  
  }    
    onReset(){
     // this.addEntranceExamForm.get('AddEntranceExam').setValue('')  ;
      this.AddingExamLab.splice(0,this.AddingExamLab.length);
     // this.addEntranceExamForm.patchValue({ActivityDateType:'Program'});
      this.addEntranceExamForm.get('AddLab').get('entrance_exam_name').setValue(''),
      this.addEntranceExamForm.get('AddLab').get('LabNo').setValue(''),
    
      this.addEntranceExamForm.get('AddLab').get('Medium').setValue(''),
     this.addEntranceExamForm.get('AddLab').get('capacity').setValue('')
  
    }
    getcenter(root_center){
      this.api.getexamcenter(root_center).subscribe(res=>{this.root_center=res});
  
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
    setMethodofSelection(value){
      this.getDates=[];
      this.getBindingTable2.filter(x=>x.programEntryExamMethod.entryExamMethod.id==value).forEach(x=>this.getDates.push(x));
    }
}
