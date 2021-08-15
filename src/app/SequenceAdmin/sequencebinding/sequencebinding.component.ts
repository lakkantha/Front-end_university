import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';
import {ProgrambindingsequenceService}from '../Service/programbindingsequence.service';

@Component({
  selector: 'app-sequencebinding',
  templateUrl: './sequencebinding.component.html',
  styleUrls: ['./sequencebinding.component.css']
})
export class SequencebindingComponent implements OnInit {

  deleteid:number;
  Sequence=[];
  CurrentEditRow: any;
  program=[];
  Sequences=[];
  constructor(private api:ProgrambindingsequenceService,private toastr: ToastrService) { 
    this.getAlldata();
    this.getprogram();
    this.getsequencedata();
  }

  ngOnInit() {


  }
getsequencedata(){
  this.api.getsealldata().subscribe(res=>{this.Sequences=res
  })
}

  getprogram(){
    this.api.getprogram().subscribe(res=>{
    this.program=res
    })
  }

  getAlldata(){
    this.api.getalldata().subscribe(res=>{this.Sequence=res
    })
  }
  SequenceTable=new FormGroup({
    Id:new  FormControl(''),
    Application_name:new  FormControl('')
  })



  save(){


 let data=   {
  program: Number(this.SequenceTable.get('Id').value),
  sequence: this.SequenceTable.get('Application_name').value
      
    }

    

    this.api.Postdata(data).subscribe(res=>{console.log(res);
      this.getAlldata();this.toastr.success("Created New Application Successfully!", res['message']);
    })

  }

  SequenceEditTable=new FormGroup({
    Aid:new  FormControl(''),
    Id:new  FormControl(''),
    Application_name:new  FormControl('')
  })

  EditTable(i){
    this.CurrentEditRow=i;
    this.SequenceEditTable.patchValue({Aid:this.Sequence[i].id});

this.SequenceEditTable.patchValue({Id:this.Sequence[i].program.programId});
this.SequenceEditTable.patchValue({Application_name:this.Sequence[i].sequence});

  }

  Update(){
 
    
    let data={
      program: Number(this.SequenceEditTable.get('Id').value),
      sequence: this.SequenceEditTable.get('Application_name').value
     
    }
    this.api.updatedata(this.SequenceEditTable.get('Aid').value,data).subscribe(res=>{console.log(res);
      this.getAlldata();this.toastr.success("Updated New Application Successfully!", res['message']);
    })
  }

  

  SequenceDelete= new FormGroup({});
  Delete(i){
    this. deleteid=this.Sequence[i].id;
    
   

  }

  Deletedata(){
    this.api.delete(this. deleteid).subscribe(res=>{ this.getAlldata();this.toastr.warning("Deleted New Application Successfully!", this. deleteid['message']);})
  }
}
