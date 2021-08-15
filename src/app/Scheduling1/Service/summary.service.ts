import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import{environment} from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  constructor(private http: HttpClient)  { }

  url = environment.base_url;



getprogramcode():Observable<any>{
  return this.http.get<any>(this.url+"/program-start/get-all");
}



  getdata(programcode):Observable<any>{

    return this.http.get<any>(this.url+"/program-started-acedemic-center-medium/get-by-program-schedule-code/"+programcode);

  }


  getdatcenter(programcode):Observable<any>{
    console.log("fggg");
        return this.http.get<any>(this.url+"/entrance-exam-root-center/get-by-program-schedule-code/"+programcode);
    
      }


      getentranceCapacity(programcode):Observable<any>{
        return this.http.get<any>(this.url+"/entrance-exam-center-capacity/get/"+programcode);
      }
  

      getActivityCenter(programcode):Observable<any>{
        console.log(programcode,"check1");
        
        return this.http.get<any>(this.url+"/activity-center-date/get-by-program-schedule-code/"+programcode);
      }

      getActivityProgram(programcode):Observable<any>{
        return this.http.get<any>(this.url+"/activity-program-date/get-by-program-schedule-code/"+programcode);
      }
      getexamcenter(rootid):Observable<any>{
       
        return this.http.get<any>(this.url+"/entrance-exam-center/get-by-entrance-exam-root-centers/"+rootid);
    
      }
    
}
