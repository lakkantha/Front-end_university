import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApplicationStatisticsCenterAdService {
  public setData:any;
  public initialStudents:any;
  public setDataforSummery:any;
  public initialStudentsforSummery:any;
  private GetProgramDate = environment.base_url+"/getprogramdata/";
  private GetFilterdProgramDataWithCenter=environment.base_url+"/datilsnew/find_center/";
  private GetFilterdProgramData=environment.base_url+"/initial-applicant-all-data-sequence";
  private GetActivityProgramDate=environment.base_url+"/activity-program-date/get-by-program-started-id/";
  private GetProgramStart=environment.base_url+"/programme/get-by/";
  private GetAllProgramStart=environment.base_url+"/program-start/get-all";
  constructor(private http : HttpClient) { }
  getProgramDate(Date): Observable<any> {
    const url = `${this.GetProgramDate+Date}`;
    return this.http.get<any>(url);
  }
  getFilterdProgramDataWithCenter(Center): Observable<any> {
    const url = `${this.GetFilterdProgramDataWithCenter+Center}`;
    return this.http.get<any>(url);
  }
  getFilterdProgramData(): Observable<any> {
    const url = `${this.GetFilterdProgramData}`;
    return this.http.get<any>(url);
  }
  getActivityProgramDate(ProgramStartedId): Observable<any> {
    const url = `${this.GetActivityProgramDate+ProgramStartedId}`;
    return this.http.get<any>(url);
  }
  getProgramStart(ProgramStartedId): Observable<any> {
    const url = `${this.GetProgramStart+ProgramStartedId}`;
    return this.http.get<any>(url);
  }
  getAllProgramStart(): Observable<any> {
    const url = `${this.GetAllProgramStart}`;
    return this.http.get<any>(url);
  }
}
