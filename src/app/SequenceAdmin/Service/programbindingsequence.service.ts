import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgrambindingsequenceService {




  constructor(private http: HttpClient) { }
  url = environment.base_url;
  save= this.url+"/api/v1/programebinding/create";
  update= this.url+"/api/v1/updateprogramSequence";
  delete1= this.url+"/api/v1/programbinding_data";
program =this.url+"/program/get/order";



getsealldata():Observable<any>{

  return this.http.get<any>(this.url+"/sequence/get-all");

}
  getalldata():Observable<any>{

    return this.http.get<any>(this.url+"/api/v1/prgramsequence/get-all");

  }

  Postdata(data){
    return this.http.post(`${this.save}`,data);
  }

  updatedata(id,data){
    return this.http.post(`${this.update}`+"/"+id,data);
  }

  delete(id){
    return this.http.delete(`${this.delete1}`+"/"+id);
  }
  getprogram(){
    return this.http.get<any>(`${this.program}`);
  }
}
