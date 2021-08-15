import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SequenceService {

  constructor(private http: HttpClient) { }
  url = environment.base_url;
  save= this.url+"/sequence/create";
  update= this.url+"/updateSequence";
  delete1= this.url+"/deletesequence_data";


  getalldata():Observable<any>{

    return this.http.get<any>(this.url+"/sequence/get-all");

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
  
}
