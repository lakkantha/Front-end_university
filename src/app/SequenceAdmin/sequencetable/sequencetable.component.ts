import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SequenceService } from '../Service/sequence.service';

@Component({
  selector: 'app-sequencetable',
  templateUrl: './sequencetable.component.html',
  styleUrls: ['./sequencetable.component.css']
})
export class SequencetableComponent implements OnInit {

  deleteid:number;
  Sequence=[];
  CurrentEditRow: any;
  checkvalue=false;
  nextid:number;

  constructor(private api:SequenceService,private toastr: ToastrService) { 
    this.getAlldata();
  }

  ngOnInit() {


  }


async  getAlldata(){
  await  this.api.getalldata().toPromise().then(res=>{console.log(res),this.Sequence=res,this.nextid=res.length+1
    
    })

    this.SequenceTable.patchValue({Id:this.nextid});
  }
  SequenceTable=new FormGroup({
    Id:new  FormControl(''),
    Application_name:new  FormControl('')
  })



  save(){

 let data=   {
      description: this.SequenceTable.get('Application_name').value,
      id: Number(this.SequenceTable.get('Id').value)
    }

    this.api.Postdata(data).subscribe(res=>{console.log(res);
      this.getAlldata();this.toastr.success( res['message']);
    })


    this.SequenceTable.patchValue({Id:''});
    this.SequenceTable.patchValue({Application_name:''});
  }

  SequenceEditTable=new FormGroup({
    Id:new  FormControl(''),
    Application_name:new  FormControl('')
  })

  EditTable(i){
    this.CurrentEditRow=i;
this.SequenceEditTable.patchValue({Id:this.Sequence[i].id});
this.SequenceEditTable.patchValue({Application_name:this.Sequence[i].description});

  }

  Update(){
 
    
    let data={
      description: this.SequenceEditTable.get('Application_name').value,
          id: Number(this.SequenceEditTable.get('Id').value)
    }
    this.api.updatedata(this.SequenceEditTable.get('Id').value,data).subscribe(res=>{console.log(res);
      this.getAlldata();this.toastr.success("Updated New Application Successfully!", res['message']);
    })
  }

  Delete(i){
    this. deleteid=this.Sequence[i].id;
    
    

  }
  SequenceDelete= new FormGroup({});

 
  focusFunction() {
    this.checkvalue=true;
    console.log('focusFunction called');
  }
  focusOutFunction() {

    this.checkvalue=false;
    console.log('focusOutFunction called');
  }


  Deletedata(){
    this.api.delete(this. deleteid).subscribe(res=>{ this.getAlldata();this.toastr.warning("Deleted New Application Successfully!", this. deleteid['message']);})
  }
}
