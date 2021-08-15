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
export class EducationalQualificationService {

  private apiServer = environment.base_url;

  constructor(private httpClient: HttpClient) { }

  // get al certificates name by initial student id and prgram
  getALCertificatesByInitialStudentIdAndProgramId(initialStudentId, programId): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiServer + `/api/al_certificates/` + `${initialStudentId}/` + `${programId}`);
  }

  // get ol certificates name by initial student id and prgram
  getOLCertificatesByInitialStudentIdAndProgramId(initialStudentId, programId): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiServer + `/api/ol_certificates/` + `${initialStudentId}/` + `${programId}`);
  }

  // get academic certificates name by initial student id and prgram
  getAcademicCertificatesByInitialStudentIdAndProgramId(initialStudentId, programId): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiServer + `/api/academic_certificates/` + `${initialStudentId}/` + `${programId}`);
  }

  /*update
   * Originality
   */
  // originality update al certificates
  updateALCertificateOriginalityById(id, originality): Observable<any> {
    return this.httpClient.put<{}>(`${this.apiServer}` + `/api/al_certificates_update_originality/` + `${id}/` + `${originality}`, httpOptions);
  }

  // originality update ol certificates
  updateOLCertificateOriginalityById(id, originality): Observable<any> {
    return this.httpClient.put<{}>(`${this.apiServer}` + `/api/ol_certificates_update_originality/` + `${id}/` + `${originality}`, httpOptions);
  }

  // originality update academic certificates
  updateAcademicCertificateOriginalityById(id, originality): Observable<any> {
    return this.httpClient.put<{}>(`${this.apiServer}` + `/api/academic_certificates_update_originality/` + `${id}/` + `${originality}`, httpOptions);
  }

  /* update
   * Remark
   */
  // Remark update  al certificates
  updateALCertificateRemarkById(id, remark): Observable<any> {
    return this.httpClient.put<{}>(`${this.apiServer}` + `/api/al_certificates_update_remark/` + `${id}/` + `${remark}`, httpOptions);
  }

  // Remark update  ol certificates
  updateOLCertificateRemarkById(id, remark): Observable<any> {
    return this.httpClient.put<{}>(`${this.apiServer}` + `/api/ol_certificates_update_remark/` + `${id}/` + `${remark}`, httpOptions);
  }

  // Remark update  academic certificates
  updateAcademicCertificateRemarkById(id, remark): Observable<any> {
    return this.httpClient.put<{}>(`${this.apiServer}` + `/api/academic_certificates_update_remark/` + `${id}/` + `${remark}`, httpOptions);
  }

  /*update
  * Document Status
  */
  // documentStatus update al certificates
  updateALCertificateDocumentStatusById(id, documentStatus): Observable<any> {
    return this.httpClient.put<{}>(`${this.apiServer}` + `/api/al_certificates_update_documentstatus/` + `${id}/` + `${documentStatus}`, httpOptions);
  }

  // documentStatus update ol certificates
  updateOLCertificateDocumentStatusById(id, documentStatus): Observable<any> {
    return this.httpClient.put<{}>(`${this.apiServer}` + `/api/ol_certificates_update_documentstatus/` + `${id}/` + `${documentStatus}`, httpOptions);
  }

  // documentStatus update academic certificates
  updateAcademicCertificateDocumentStatusById(id, documentStatus): Observable<any> {
    return this.httpClient.put<{}>(`${this.apiServer}` + `/api/academic_certificates_update_documentstatus/` + `${id}/` + `${documentStatus}`, httpOptions);
  }
}
