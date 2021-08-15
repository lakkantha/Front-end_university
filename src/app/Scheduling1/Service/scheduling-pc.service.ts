import { Injectable } from '@angular/core';
import { Subscribable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SchedulingCoordinatorService {
  private GetProgramStarted : string = environment.base_url+"/program-start/get-by-program-schedule-code?programScheduleCode=";
  private UpdateProgramStartedFee : string = environment.base_url+"/program-start/update-application-fee";
  private GetEntranceExamData: string = environment.base_url+"/details/paper/";
  private GetHall: string = environment.base_url+"/entrance-exam-center-capacity/get/";
  private CreateTimeSlot: string = environment.base_url+"/api/v1/time-slot/create";
  private CreateTimeSlotforMethod: string = environment.base_url+"/api/v1/time-slot2/create";
  private GetTimeSlotBindingTable1: string = environment.base_url+"/api/v1/get/time-slot/data/";

  constructor(private http : HttpClient) { }
 
  getProgramsStartedService(ProgramCode) 
  {  
    return this.http.get(this.GetProgramStarted+ProgramCode)
  }
  updateProgramStartedFee(body)
  {
    return this.http.post(`${this.UpdateProgramStartedFee}`,body);
  }
  getEntranceExamData(programID)
  {
    return this.http.get(this.GetEntranceExamData+programID);
  }
  getHall(scheduleCode){
    return this.http.get(this.GetHall+scheduleCode);
  }
  createTimeSlot(body){
    return this.http.post(`${this.CreateTimeSlot}`,body);
  }
  createTimeSlotforMethod(body){
    return this.http.post(`${this.CreateTimeSlotforMethod}`,body);
  }
  getTimeSlotBindingTable1(programStartedId){
    return this.http.get(this.GetTimeSlotBindingTable1+programStartedId);
  }
}
