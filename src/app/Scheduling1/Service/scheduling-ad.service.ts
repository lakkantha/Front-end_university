import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SchedulingAdService {
  private GetProgramEntranceExamTypeId : string = environment.base_url+"/program-entry-exam/get/";
  private UpdateCenterDate: string=environment.base_url+"/activity-center-date/update-date-list/";

  constructor(private http : HttpClient) { }

  getProgramEntranceExamTypeId(ProgramID)
  {
    return this.http.get(this.GetProgramEntranceExamTypeId+ProgramID);
  }
  updateCenterDate(body,CenterDateID)
  {
    let url=this.UpdateCenterDate+CenterDateID;
    return this.http.post(`${url}`,body,{ responseType:'text'});
  }
}
