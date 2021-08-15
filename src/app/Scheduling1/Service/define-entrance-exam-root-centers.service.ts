import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DefineEntranceExamRootCentersService {
  private GetPostalCodeAdministrativeCenter : string = environment.base_url+"/define-postal-code-administrative-center/get-all";
  private GetAcademicCenters: string = environment.base_url+"/program-started-academic-center/get/";
  private GetProgramMedium: string = environment.base_url+"/program-medium/get/";
  private PostEntranceExam: string = environment.base_url+"/entrance-exam-root-center/create";
  constructor(private http : HttpClient) { }

  getPostalCodeAdministrativeCenter()
  {
    return this.http.get(this.GetPostalCodeAdministrativeCenter);
  }
  getAcademicCenters(programStartedID)
  {
    return this.http.get(this.GetAcademicCenters+programStartedID);
  }
  getProgramMedium(programID)
  {
    return this.http.get(this.GetProgramMedium+programID);
  }
  postEntranceExam(body)
  {
    return this.http.post(`${this.PostEntranceExam}`,body);
  }
}
