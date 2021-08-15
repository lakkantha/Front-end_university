import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import{environment} from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddentranceexamcenterService {

  constructor(private http: HttpClient)  { }

  url = environment.base_url;

  getdata(programcode):Observable<any>{

    console.log("schedulecode");
    
    return this.http.get<any>(this.url+"/entrance-exam-root-center/get-by-program-schedule-code/"+programcode);

  }
  getdataexam(programid):Observable<any>{
console.log("exam");
    return this.http.get<any>(this.url+"/program-entry-exam/get/"+programid);

  }
  getdatcenter(programcode):Observable<any>{
    console.log("fggg");
        return this.http.get<any>(this.url+"/entrance-exam-root-center/get-by-program-schedule-code/"+programcode);
    
  }
  postdata(body){
        return this.http.post(this.url+"/entrance-exam-center-capacity/create",body);
  } 
  postdatalab(body){
    return this.http.post(this.url+"/entrance-exam-lab-capacity/create",body);
  }
  getAllentrancecapacity(programScheduleCode):Observable<any>{
        return this.http.get<any>(this.url+"/entrance-exam-center-capacity/get/"+programScheduleCode);
  }
  getAlllabentrancecapacity(programScheduleCode):Observable<any>{
        return this.http.get<any>(this.url+"/entrance-exam-lab-capacity/get/"+programScheduleCode);
  }
  updated(body){
        return this.http.post(this.url+"/entrance-exam-center-capacity/update",body);
  }
  deleted(id):Observable<any>{
        return this.http.post<any>(this.url+"/entrance-exam-center-capacity/delete/"+id,id);
  }
  deletedlab(id):Observable<any>{
    return this.http.post<any>(this.url+"/entrance-exam-lab-capacity/delete/"+id,id);
  }
  addexamcenter(body){
  return this.http.post(this.url+"/entrance-exam-center/create",body);
  }
  getexamcenter(rootid):Observable<any>{
    return this.http.get<any>(this.url+"/api/v1/getcenterand rootlist/"+rootid);
  }
  gethall(id):Observable<any>{
    return this.http.get<any>(this.url+"/entrance-exam-center-hall/get-by-exam-center/"+id);
  }
  posthall(body){
     return this.http.post(this.url+"/entrance-exam-center-hall/create",body);
  }
  Updatelab(body){
    return this.http.post(this.url+"/entrance-exam-lab-capacity/update",body);
  }
  getDate(programStartedId){
    return this.http.get(this.url+"/api/v1/get/time-slot-table2/data/"+programStartedId);
  }
  getAllExamRootCenter(){
    return this.http.get(this.url+"/api/v1/getcenterand rootlist_center/all");
  }
  entranceExamTimeSlotCreateOne(body){
    return this.http.post(this.url+"/EntranceExamTimeSlot/create/one",body);
  }
  
}
