import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EducationalQualificationAcademicService {

  private apiServer = environment.base_url + "/api";

  private academicSource = new Subject<string>();
  academicSource$ = this.academicSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  //check academic qualification
  fillAcademic(academic: string) {
    this.academicSource.next(academic);
  }

  // get all institutions
  getAllinstitutions(): Observable<any> {
    return this.httpClient.get<any>(this.apiServer + `/academic_institutions`);
  }

  // get all qualification types
  getAllQualificationTypes(): Observable<any> {
    return this.httpClient.get<any>(this.apiServer + `/get_all_academic_qualification_types`);
  }


  // save new qualification type
  saveNewQualificationType(qualificationTypeName: Object): Observable<Object> {
    return this.httpClient.post(`${this.apiServer}` + '/save_new_qualification_type', qualificationTypeName);
  }

  /* academic
   * get Educational Qualification data
   * all data
   */
  getAllAcademic(iStudentId): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiServer + `/academic_data/` + `${iStudentId}`);
  }

  /* academic
   * add Educational Qualification data
   */
  addEducationalQualificationAcademic(academicEducationalQualification: Object): Observable<Object> {
    return this.httpClient.post(`${this.apiServer}` + '/academic_data', academicEducationalQualification);
  }

  /* academic
   * delete Educational Qualification data
   */
  deleteEducationalQualificationAcademic(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiServer}` + `/academic_data` + `/${id}`, { responseType: 'text' });
  }

  /* academic
   * update Educational Qualification data
   */
  updateEducationalQualificationAcademic(id: number, value: any): Observable<Object> {
    return this.httpClient.put(`${this.apiServer}` + '/academic_update/' + `${id}`, value);
  }

  /* Academic certificates
   * get all 
    */
  getAllCertificatesAcademic(iStudentId): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiServer + '/academic_certificates/' + `${iStudentId}`);
  }

  /* Academic certificates
  * add 
  */
  addCertificatesAcademic(alCertificates: Object): Observable<Object> {
    return this.httpClient.post(`${this.apiServer}` + '/academic_certificates', alCertificates);
  }

  /* Academic certificates
   * delete
   */
  deleteCertificatesAcademic(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiServer}` + `/academic_certificates` + `/${id}`, { responseType: 'text' });
  }

}
