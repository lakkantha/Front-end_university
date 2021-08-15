import { Injectable } from '@angular/core';
import { Subscribable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamRootCenterBindingEntranceExamCenterService {
  private CreateEntranceExam : string = environment.base_url+"/entrance-exam-center/create";
  private GetEntranceExam : string = environment.base_url+"/api/v1/CenterList/";
  private GetExamRootCentre: string = environment.base_url+"/exam-root-center/get/all";
  private CreateEntranceExamBindingWithExamRootCenter: string = environment.base_url+"/api/v1/definecenters/rootcenter";
  private GetEntranceExamBindingTable: string = environment.base_url+"/api/v1/getcenterand rootlist/";

  constructor(private http : HttpClient) { }

  createEntranceExam(body)
  {
    return this.http.post(`${this.CreateEntranceExam}`,body);
  }
  getEntranceExam(){
    return this.http.get(this.GetEntranceExam);
  }
  getExamRootCentre(){
    return this.http.get(this.GetExamRootCentre);
  }
  createEntranceExamBindingWithExamRootCenter(body){
    return this.http.post(`${this.CreateEntranceExamBindingWithExamRootCenter}`,body);
  }
  getEntranceExamBindingTable(examRootId){
    return this.http.get(this.GetEntranceExamBindingTable+examRootId);
  }
}
