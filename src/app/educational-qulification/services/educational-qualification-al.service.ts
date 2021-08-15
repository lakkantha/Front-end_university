import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EducationalQualificationAL } from './educational-qualification-al';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EducationalQualificationALService {

  private apiServer = environment.base_url + "/api";

  private alSource = new Subject<string>();
  alSource$ = this.alSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  //check al qualification
  fillAL(al: string) {
    this.alSource.next(al);
  }

  // get all AL mediums
  getAllMediums(): Observable<any> {
    return this.httpClient.get<any>(this.apiServer + `/al_mediums`);
  }

  // get all AL streams
  getAllStreams(): Observable<any> {
    return this.httpClient.get<any>(this.apiServer + `/al_streams`);
  }

  // get all AL subjects
  getAllALSubjects(): Observable<any> {
    return this.httpClient.get<any>(this.apiServer + `/al_subjects`);
  }


  // get all AL results
  getAllResults(): Observable<any> {
    return this.httpClient.get<any>(this.apiServer + `/al_results`);
  }

  /* A/L
   * get Educational Qualification data
   * all data
   */
  getAllAL(iStudentId): Observable<EducationalQualificationAL[]> {
    return this.httpClient.get<EducationalQualificationAL[]>(this.apiServer + `/al_data/` + `${iStudentId}`);
  }

  /* A/L
   * save new subject
   */
  saveNewALSubject(alSubjectName: Object): Observable<Object> {
    return this.httpClient.post(`${this.apiServer}` + '/save_al_subject', alSubjectName);
  }

  /* A/L
   * save new stream
   */
  saveNewALStream(alStreamName: Object): Observable<Object> {
    return this.httpClient.post(`${this.apiServer}` + '/save_al_stream', alStreamName);
  }

  /* A/L
   * add Educational Qualification data
   */
  addEducationalQualificationAL(alQualification: Object): Observable<Object> {
    return this.httpClient.post(`${this.apiServer}` + `/al_data`, alQualification);
  }

  /* A/L
   * delete Educational Qualification data
   */
  deleteEducationalQualificationAL(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiServer}` + `/al_data` + `/${id}`, { responseType: 'text' });
  }

  /* A/L
   * update Educational Qualification data
   */
  updateEducationalQualificationAL(id: number, value: any): Observable<Object> {
    return this.httpClient.put(`${this.apiServer}` + `/al_update/` + `${id}`, value);
  }

  /* A/L certificates
   * get all 
    */
  getAllCertificatesAL(iStudentId): Observable<EducationalQualificationAL[]> {
    return this.httpClient.get<EducationalQualificationAL[]>(this.apiServer + '/al_certificates/' + `${iStudentId}`);
  }

  /* A/L certificates
  * add 
  */
  addCertificatesAL(alCertificates: Object): Observable<Object> {
    return this.httpClient.post(`${this.apiServer}` + '/al_certificates', alCertificates);
  }

  /* A/L certificates
   * delete
   */
  deleteCertificatesAL(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiServer}` + '/al_certificates' + `/${id}`, { responseType: 'text' });
  }

   /* 
   * save new exam name
   */
  saveNewExamName(examName: Object): Observable<Object> {
    return this.httpClient.post(`${this.apiServer}` + '/save_new_exam_name', examName);
  }
}
