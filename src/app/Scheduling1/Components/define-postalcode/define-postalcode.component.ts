
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {PostalCodeService } from '../../Service/postal-code.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-define-postalcode',
  templateUrl: './define-postalcode.component.html',
  styleUrls: ['./define-postalcode.component.css']
})
export class DefinePostalcodeComponent implements OnInit {
 
  title = 'datatables';
  dtOptions: DataTables.Settings = {};
postalcodeid:number;
  AddingPostalcode=[];
  End: any;
  CurrentEditRow: any;
  Province=[];
  District=[];
  City=[];
  Postal_code:any;
  Administrative_Center=[];
  SortValue: any;
  Sorts = ['Province','District','City'];
  id:number;
  id2:number;
  ADDpostalcode=[];
  potalcode:any;
  updateid:number;
  constructor(private api:PostalCodeService,private toastr: ToastrService,private router: Router ) { }

  definePostalCode=new FormGroup({
    Province:new  FormControl(''),
    District:new  FormControl(''),
    City:new  FormControl(''),
    Postal_code:new  FormControl(''),
    Administrative_Center:new  FormControl(''),
    SortPrograms: new FormControl('') 

  })

  async  ngOnInit() {
    this.searchdata();
   
    this.api.getAdministrativeCenter().subscribe(res=>{this.Administrative_Center=res,console.log(res);

      
    });
    

this.api.getProvince().subscribe(res=>{this.Province=res,console.log(this.Province,"province")}
);

this.getAlldata();
  }



  searchdata(){
console.log('test12');

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      columnDefs: [ {
        targets: [0,1], // column index (start from 0)
        orderable: false, // set orderable false for selected columns
     }]
    };

  }
async getAlldata(){
 await this.api.getAlldata().toPromise().then(res=>{this.AddingPostalcode=res,console.log(this.AddingPostalcode,"44444444444");
});

}

  getDistrict(value){
  
    this.id = value;
  
    this.api.getDistrict(this.id).subscribe(res=>{res.forEach(s=> this.District.push(s))
    this.District=res,console.log(res,"di");
    }, err => {
      console.log(err);
    });

  }



  
  getCity(value){
   
    this.id2 = value
    this.api.getCity(this.id,this.id2).subscribe(res=>{res.forEach(s=> this.City.push(s))
    this.City=res}, err => {
      console.log(err);
    });
console.log(this.City,"dffv");

  }



getPostalCode(value){
 
  let c =this.City.filter(c=>c.id==value);
 
  this.potalcode = c[0]["id"];
  this.definePostalCode['Postal_code']=this.potalcode;
  this.EditForm['Postal_code']=this.potalcode;
  this.api.getPostalCode(c[0]["description"]).subscribe(res=>{this.definePostalCode.patchValue({Postal_code:res['postalcode']}),this.EditForm.patchValue({Postal_code:res['postalcode']}),this.postalcodeid=res['id'],console.log(this.postalcodeid,"postal");
  
  });
  console.log(this.definePostalCode.get('Postal_code').value,"dugsvg");
  console.log(this.potalcode,"dugsvg");
  
}




//   onAdd(){




//     console.log("onadd",this.definePostalCode.value);
    
// let a =this.Province.filter(a=>a.id==this.definePostalCode.get('Province').value);
// console.log(this.District,"dfsdfsds");
// console.log(this.City,"dfs");
// let b =this.District.filter(b=>b.id==this.definePostalCode.get('District').value);


// let c =this.City.filter(c=>c.id==this.definePostalCode.get('City').value);
// console.log(this.Administrative_Center,"acghafa");
// let d=this.Administrative_Center.filter(d=>d.adc_adminCenterId==this.definePostalCode.get('Administrative_Center').value)


//     if(this.definePostalCode.value!=""){
//       this.AddingPostalcode.push({
//         "Province":a[0]["description"],
//         "District":b[0]["description"],
//         "City":c[0]["description"],
//         "Postal_code":this.definePostalCode.get('Postal_code').value,
//         "Administrative_Center":d[0]["adc_description"],

        
//       })
//       let e={
        
//           postalcode:Number(this.definePostalCode.get('Postal_code').value),

//           province:{id:Number(this.definePostalCode.get('Province').value)},
        
        
//           district:{id:Number(this.definePostalCode.get('District').value)},
//         city:{id:Number(this.definePostalCode.get('City').value)},
//         admincenter:{adc_adminCenterId:Number(this.definePostalCode.get('Administrative_Center').value)},
//       }
//       this.ADDpostalcode.push(
//         e

//       )
//     }
//   }


  onSubmit(){
let data={

  postalCode: {
   
    id: this.postalcodeid
 
  },
  rgtAdminCenter: {
    adc_adminCenterId: Number(this.definePostalCode.get('Administrative_Center').value)
   
  },
  city: {
     id: Number(this.definePostalCode.get('City').value)
  }

} 
   
 
 
     
    this.api.Postdata(data).subscribe(res=>{
      console.log(res);
      this.toastr.success("PostalCode Submitted Successfully!", res['message']); 
      this.searchdata();
      this.getAlldata();
      
    },error=>console.log(error)
    
    
    );


   }

   onReset(){
    // this.addEntranceExamForm.get('AddEntranceExam').setValue('')  ;
     this.AddingPostalcode.splice(0,this.AddingPostalcode.length);
    // this.addEntranceExamForm.patchValue({ActivityDateType:'Program'});
     this.definePostalCode.get('Province').setValue(''),
     this.definePostalCode.get('District').setValue(''),
     this.definePostalCode.get('City').setValue(''),
     this.definePostalCode.get('Postal_code').setValue(''),
     this.definePostalCode.get('Administrative_Center').setValue('')
    
 
   }


   Delete(i){  
     

    let id= this.AddingPostalcode[i].id;
    this.api.Postdelete(id).subscribe(res=>{
     this.getAlldata();
     this.toastr.warning("Deleted Successfully!", res['message']); 
    })
  //   var delBtn = confirm(" Do you want to delete ?");
  //  if ( delBtn == true ) {
  //    this.AddingPostalcode.splice(i, 1 );
  //  } 
  
  }
 
  EditForm=new FormGroup({
    Province:new  FormControl(''),
    District:new  FormControl(''),
    City:new  FormControl(''),
    Postal_code:new  FormControl(''),
    Administrative_Center:new  FormControl('') 

  })
  Viewpostal=[];



  
  EditTable(i){
console.log(this.AddingPostalcode[i],"edit");

//     let a =this.Province.filter(a=>a.description==this.AddingPostalcode[i].Province);

// let b =this.District.filter(b=>b.description==this.AddingPostalcode[i].District);


// let c =this.City.filter(c=>c.description==this.AddingPostalcode[i].City);

// let d=this.Administrative_Center.filter(d=>d.adc_description==this.AddingPostalcode[i].Administrative_Center)
  

    this.CurrentEditRow = i;
    console.log(this.AddingPostalcode[i].Province);
    this.EditForm.patchValue({Province: this.AddingPostalcode[i].city.district.province.id}); 
    this.getDistrict(this.AddingPostalcode[i].city.district.province.id);
    this.EditForm.patchValue({District :this.AddingPostalcode[i].city.district.id }); 
    this.getCity(this.AddingPostalcode[i].city.district.id);
    this.EditForm.patchValue({City : this.AddingPostalcode[i].city.id }); 
    this.EditForm.patchValue({Postal_code : this.AddingPostalcode[i].postalCode.postalcode}); 
    this.EditForm.patchValue({Administrative_Center : this.AddingPostalcode[i].rgtAdminCenter.adc_adminCenterId });
this.updateid=this.AddingPostalcode[i].id;
    this.Viewpostal[0] = this.AddingPostalcode[i];
  }
 onUpdate(){
    // let y,p,q,r;
  
    
    // let a =this.Province.filter(a=>a.id==this.EditForm.get('Province').value).forEach(x=>y=x.description);

    // let b =this.District.filter(b=>b.id==this.EditForm.get('District').value).forEach(x=>p=x.description);
    
    
    // let c =this.City.filter(c=>c.id==this.EditForm.get('City').value).forEach(x=>q=x.description);
 
    // let d=this.Administrative_Center.filter(d=>d.adc_adminCenterId==this.EditForm.get('Administrative_Center').value).forEach(x=>r=x.adc_description)

   
      
    // this.AddingPostalcode[this.CurrentEditRow]["Province"]= y;
    // this.AddingPostalcode[this.CurrentEditRow]["District"]=p;
    // this.AddingPostalcode[this.CurrentEditRow]["City"]=q;
    // this.AddingPostalcode[this.CurrentEditRow]["Postal_code"] =this.EditForm.get('Postal_code').value,
    // this.AddingPostalcode[this.CurrentEditRow]["Administrative_Center"]=r;
        


    let data={

      id:this.updateid,

      postalCode: {
       
        id: this.postalcodeid
     
      },
      rgtAdminCenter: {
        adc_adminCenterId: Number(this.EditForm.get('Administrative_Center').value)
       
      },
      city: {
         id: Number(this.EditForm.get('City').value)
      }
    
    } 
        
     
      this.api.Postupdate(data).toPromise().then(res=>{
      console.log(res);
      this.toastr.success("PostalCode Updated Successfully!", this.AddingPostalcode[this.CurrentEditRow]['message']);
this.function();
     
    },
    error=>console.log(error)
    
    
    );
      
    
   
     
 



}

async function(){

  this.searchdata();      
 this.getAlldata();
     
  
}
}