import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'process';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApplicationSummeryStatisticsService {

  private GetSequenceData = environment.base_url+"/initial-applicant-all-data-sequence/";
  private GetMedium=environment.base_url+"/datilsnew/findinitialapplicant_center";
  private GetFilteredSequence=environment.base_url+"/getprogramdataforcenter";
  private GetAcademicCenter=environment.base_url+"/program-started-acedemic-center/get/";
  private RgmCenterGetAll=environment.base_url+"/rgm-center/get";
  private ProgramStartedAcademicCenter=environment.base_url+"/program-started-acedemic-center/get";
  private GetSequenceOrder=environment.base_url+"/api/v1/programebindingdata";
  private GetMediumSuperAdmin=environment.base_url+"/applicantsDetails/superAdmin";
  private GetSequenceSuperAdmin=environment.base_url+"/getSequenceBySuperAdmin";
  private GetExcel= environment.base_url+"/initial-applicants-sequence/export-to-excel";
  private GetExcelByCenter= environment.base_url+"/initial-applicants-sequence/export-to-excel/center";
  private GetAllSequence=environment.base_url+"/sequence/get-all";
  
  constructor(private http : HttpClient) { }
  getSequenceData(programId): Observable<any> {
    const url = `${this.GetSequenceData+programId}`;
    return this.http.get<any>(url);
  }
  getMedium(programStartedId,centerId): Observable<any> {
    const url = `${this.GetMedium}/${programStartedId}/${centerId}`;
    return this.http.get<any>(url);
  }
  getFilteredSequence(programStartedId,centerId): Observable<any> {
    const url = `${this.GetFilteredSequence}/${programStartedId}/${centerId}`;
    return this.http.get<any>(url);
  }
  getAcademicCenter(programStartedId): Observable<any> {
    const url = `${this.GetAcademicCenter+programStartedId}`;
    return this.http.get<any>(url);
  }
  rgmCenterGetAll(): Observable<any> {
    const url = `${this.RgmCenterGetAll}`;
    return this.http.get<any>(url);
  }
  programStartedAcademicCenter(programStartedId): Observable<any>{
    const url = `${this.ProgramStartedAcademicCenter}/${programStartedId}`;
    return this.http.get<any>(url);
  }
  getSequenceOrder(programId): Observable<any>{
    const url = `${this.GetSequenceOrder}/${programId}`;
    return this.http.get<any>(url);
  }
  getMediumSuperAdmin(programId): Observable<any>{
    const url = `${this.GetMediumSuperAdmin}/${programId}`;
    return this.http.get<any>(url);
  }
  getSequenceSuperAdmin(programId): Observable<any>{
    const url = `${this.GetSequenceSuperAdmin}/${programId}`;
    return this.http.get<any>(url);
  }
  getExcel(programStartedId): Observable<Blob>{
    const url = `${this.GetExcel}/${programStartedId}`;
    return this.http.get(url,{responseType:'blob'});
  }
  getExcelByCenter(programStartedId,center): Observable<Blob>{
    const url = `${this.GetExcelByCenter}/${programStartedId}/${center}`;
    return this.http.get(url,{responseType:'blob'});
  }
  getAllSequence():Observable<any>{
    const url=`${this.GetAllSequence}`;
    return this.http.get<any>(url);
  }
}
