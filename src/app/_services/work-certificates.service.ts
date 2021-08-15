import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class WorkCertificatesService {

  private apiServer = environment.base_url;

  constructor(private httpClient: HttpClient) { }

  // get work experience certificates by initial student id and program id
  getWorkCertificatesByInitialStudentIdAndProgram(initialStudentId, programId): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiServer + `/api/work_certificates_by_initial_student_and_program/` + `${initialStudentId}/` + `${programId}`);
  }

  /* update
   * Originality
   */
  // originality update work experience certificates
  updateWorkCertificateOriginalityById(id, originality): Observable<any> {
    return this.httpClient.put<{}>(`${this.apiServer}` + `/api/work_certificates_update_originality/` + `${id}/` + `${originality}`, httpOptions);
  }

  /* update
   * Remark
   */
  // Remark update work experience certificates
  updateWorkCertificateRemarkById(id, remark): Observable<any> {
    return this.httpClient.put<{}>(`${this.apiServer}` + `/api/work_certificates_update_remark/` + `${id}/` + `${remark}`, httpOptions);
  }

  /* update
   * Document Status
   */
  // documentStatus update work experience certificates
  updateWorkCertificateDocumentStatusById(id, documentStatus): Observable<any> {
    return this.httpClient.put<{}>(`${this.apiServer}` + `/api/work_certificates_update_documentstatus/` + `${id}/` + `${documentStatus}`, httpOptions);
  }
}
