import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { EducationalQualificationOL } from './educational-qualification-ol';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EducationalQualificationOLService {

  private apiServer = environment.base_url + "/api";

  private olSource = new Subject<string>();
  olSource$ = this.olSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  //check ol qualification
  fillOL(ol: string) {
    this.olSource.next(ol);
  }

  // get all OL mediums
  getAllMediums(): Observable<any> {
    return this.httpClient.get<any>(this.apiServer + `/ol_mediums`);
  }

  // get all OL results
  getAllResults(): Observable<any> {
    return this.httpClient.get<any>(this.apiServer + `/ol_results`);
  }

  // get all OL Subjects
  getAllOLSubjects(): Observable<any> {
    return this.httpClient.get<any>(this.apiServer + `/ol_subjects`);
  }

  /* O/L
   * get Educational Qualification data
   * all data
   */
  getAllOL(iStudentId): Observable<EducationalQualificationOL[]> {
    return this.httpClient.get<EducationalQualificationOL[]>(this.apiServer + `/ol_data/` + `${iStudentId}`);
  }

  /* O/L
   * save new subject
   */
  saveNewOLSubject(olSubjectName: Object): Observable<Object> {
    return this.httpClient.post(`${this.apiServer}` + '/save_ol_subject', olSubjectName);
  }

  /* O/L
   * add Educational Qualification data
   */
  addEducationalQualificationOL(olQualification: Object): Observable<Object> {
    return this.httpClient.post(`${this.apiServer}` + '/ol_data', olQualification);
  }

  /* O/L
   * update Educational Qualification data
   */
  updateEducationalQualificationOL(id: number, value: any): Observable<Object> {
    return this.httpClient.put(`${this.apiServer}` + `/ol_update/` + `${id}`, value);
  }

  /* O/L
   * delete Educational Qualification data
   */
  deleteEducationalQualificationOL(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiServer}` + '/ol_data' + `/${id}`, { responseType: 'text' });
  }

  /* O/L certificates
   * get all 
    */
  getAllCertificatesOL(iStudentId): Observable<EducationalQualificationOL[]> {
    return this.httpClient.get<EducationalQualificationOL[]>(this.apiServer + '/ol_certificates/' + `${iStudentId}`);
  }

  /* O/L certificates
  * add 
  */
  addCertificatesOL(olCertificates: Object): Observable<Object> {
    return this.httpClient.post(`${this.apiServer}` + '/ol_certificates', olCertificates);
  }

  /* O/L certificates
   * delete
   */
  deleteCertificatesOL(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiServer}` + '/ol_certificates' + `/${id}`, { responseType: 'text' });
  }

   /* 
   * save new exam name
   */
  saveNewExamName(examTypes: Object): Observable<Object> {
    return this.httpClient.post(`${this.apiServer}` + '/save_new_exam_name', examTypes);
  }


}
