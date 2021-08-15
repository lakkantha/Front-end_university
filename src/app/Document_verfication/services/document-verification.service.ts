import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NextSequence } from 'src/app/home/NextSequenceModel';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DocumentVerificationService {

  private apiServer = environment.base_url;

  constructor(private httpClient: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }

  // send sms before endig the document verification
  sendSms(data): Observable<{}> {
    const url = this.apiServer + '/sms/send-sms-new';

    return this.httpClient.post<{}>(url, data, httpOptions);
  }

  // get faculty list
  getFacultyList(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiServer + `/api/get_all_faculties`);
  }

  // get department list
  getDepartmentList(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiServer + `/api/get_all_departments`);
  }

  // get department list by faculty id
  getDepartmentListByFacultyId(facultyId): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiServer + `/api/get_all_departments_by_faculty/` + `${facultyId}`);
  }

  // get all started programmes
  getAllStartedProgrammes(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiServer + `/programme/get_all_started_programs`);
  }

  /*
   * document status service
   */
  // get document status list
  getDocumentStatusList(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiServer + `/api/get_all_document_status`);
  }

  /*
   * student status service
   */
  // get studet status list
  getStudentStatusList(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiServer + `/api/get_all_student_status`);
  }

  // get all centers by program startedId
  getAllCentersByProgramStartedId(programStartedId): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiServer + `/program-started-acedemic-center/get/` + `${programStartedId}`);
  }

  /*
   * Application service
   */
  // get applicantion data by program and appicantTypeId
  getApplicationByProgramAndApplicantType(programId, applicantTypeId): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiServer + `/api/application/` + `${programId}/` + `${applicantTypeId}`);
  }

  // get applicantion data by program
  getApplicationByProgram(programId): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiServer + `/api/application_by_program/` + `${programId}`);
  }

  /*
   * Local Applicant 
   */
  // update remark
  updateLocalApplicantWithImagePath(id, imagePath): Observable<any> {
    return this.httpClient.put<{}>(`${this.apiServer}` + `/api/v1/localApplicants/local_applicant_update_image_path/` + `${id}/` + `${imagePath}`, httpOptions);
  }

  /*
   * next sequence
   */
  // update next sequence
  updateNextSequence(initialApplicantId): Observable<any> {
    return this.httpClient.put<{}>(`${this.apiServer}` + `/api/update_next_sequence/` + `${initialApplicantId}`, httpOptions);
  }

  /*
   * Foreign applicant table
   */
  getForeignApplicantByPassportNo(passportNo): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiServer + `/api/v1/foreignApplicants/get_details/` + `${passportNo}`);
  }

  // send sms to selected initial student
  sendSMS(data): Observable<any> {
    return this.httpClient.post<{}>(this.apiServer + `/api/document_verification/send-sms-to-student`, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // sed email to selected initial student
  sendEmail(data): Observable<any> {
    return this.httpClient.post<{}>(this.apiServer + `/api/document_verification/send-mail-to-student`, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // get certificates by counselling saved table
  getCounsellingSavedCertificates(initialApplicantId): Observable<any> {
    return this.httpClient.get(this.apiServer + `/get_counselling_saved_certificates/` + `${initialApplicantId}`);
  }

  /*
   * Next sequence table data opearate
  */
  // update sequence table
  updateNextSequenceToGivenSequenceByIitialApplicantId(initialApplicantId, sequenceId): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiServer}` + `/api/update_sequence_by_initial_applicant/` + `${initialApplicantId}/` + `${sequenceId}`);
  }

  /*
   * local applicant server
   */

  // get local applicant file names by nic
  getLocalApplicanthByNicAndProgramId(nic, programId): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiServer + `/api/v1/localApplicants/get_localapplicant/` + `${nic}/` + `${programId}`);
  }

  /* update
   * Originality
   */
  // originality update local applicant
  updateLocalApplicantOriginalityById(id, originality): Observable<any> {
    return this.httpClient.put<{}>(`${this.apiServer}` + `/api/v1/localApplicants/local_applicant_update_originality/` + `${id}/` + `${originality}`, httpOptions);
  }

  /* update
   * Remark
   */
  // Remark update local applicant
  updateLocalApplicantRemarkById(id, remark): Observable<any> {
    return this.httpClient.put<{}>(`${this.apiServer}` + `/api/v1/localApplicants/local_applicant_update_remark/` + `${id}/` + `${remark}`, httpOptions);
  }

  /* update
   * Document Status
   */
  // documentStatus update local applicant
  updateLocalApplicantDocumentStatusById(id, documentStatus): Observable<any> {
    return this.httpClient.put<{}>(`${this.apiServer}` + `/api/v1/localApplicants/local_applicant_update_documentstatus/` + `${id}/` + `${documentStatus}`, httpOptions);
  }
}

