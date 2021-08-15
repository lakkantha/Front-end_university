import { Injectable } from '@angular/core';
//import { Application } from './application';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Application } from './application';
import { environment } from "../environments/environment";
 
@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private url: string =  environment.base_url + "/api/application";
  private url2: string = environment.base_url + "/api/application";
  private programurl: string = environment.base_url + "/program/get/order";
  private applicnttypeurl: string = environment.base_url + "/applicant-type/get";
  private apiServer: string = environment.base_url + "/api";
 
  constructor(private http: HttpClient) { }


  getProgramsService(): Observable<any> {
    return this.http.get(this.programurl);
  }

  getapplicanttypeService(): Observable<any> {
    return this.http.get(this.applicnttypeurl);
  }
 
  public addApplication(application: Application){
    return this.http.post(this.url, application);
  }
  public getApplication(programmeId: string, applicationTypeId: string): Observable<Application[]> {
    return this.http.get<Application[]>(this.url2 + "/" + programmeId + "/" + applicationTypeId);
    console.log(this.url2 + "/" + programmeId + "/" + applicationTypeId);
  }
  /*
    public getApplication() : Subscribable<String>{
      return this.http.get(this.url2)
    }
 
    public addApplication(application: Object): Observable<Object> {
      return this.http.post(`${this.url}`, application);
    }
    */
 
  // check personal details fill success cate1
  checkPersonalData(programmeId, iStudentId): Observable<any[]> {
    const url = `${this.apiServer}/v1/applicants/personal_data_success/${programmeId}/${iStudentId}`;
    return this.http.get<any[]>(url);
  }
 
  // check educational qualification fill success Academic
  checkEducationalAcademicData(programmeId, iStudentId): Observable<any[]> {
    const url = `${this.apiServer}/academic_data_success/${programmeId}/${iStudentId}`;
    return this.http.get<any[]>(url);
  }
 
  // check educational qualification fill success AL
  checkEducationalALData(programmeId, iStudentId): Observable<any[]> {
    const url = `${this.apiServer}/al_data_success/${programmeId}/${iStudentId}`;
    return this.http.get<any[]>(url);
  }
 
  // check educational qualification fill success OL
  checkEducationalOLData(programmeId, iStudentId): Observable<number> {
    const url = `${this.apiServer}/ol_data_success/${programmeId}/${iStudentId}`;
    return this.http.get<number>(url);
  }
 
  // check professional qualification fill success
  checkEducationalProfessionalData(programmeId, iStudentId): Observable<any[]> {
    const url = `${this.apiServer}/professional_data_success/${programmeId}/${iStudentId}`;
    return this.http.get<any[]>(url);
  }
 
  getSID(nic) : Observable<{}> {
    const url1 = environment.base_url +'/api/v1/studentNumberReport/getSID';
    const urlFull = `${url1}/${nic}`;
    return this.http.get(urlFull);
  }
}