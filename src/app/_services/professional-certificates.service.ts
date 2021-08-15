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
export class ProfessionalCertificatesService {

  private apiServer = environment.base_url;

  constructor(private httpClient: HttpClient) { }

  // get professional qualification certificates by initial student id and program id
  getProfessionalCertificatesByInitialStudentIdAndProgram(initialStudentId, programId): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiServer + `/api/professional_certificates_by_initial_student_and_program/` + `${initialStudentId}/` + `${programId}`);
  }

  /*update
   * Originality
   */
  // originality update professional qualification certificates
  updateProfessionalCertificateOriginalityById(id, originality): Observable<any> {
    return this.httpClient.put<{}>(`${this.apiServer}` + `/api/professional_certificates_update_originality/` + `${id}/` + `${originality}`, httpOptions);
  }

  /* update
   * Remark
   */
  // Remark update professional certificates
  updateProfessionalCertificateRemarkById(id, remark): Observable<any> {
    return this.httpClient.put<{}>(`${this.apiServer}` + `/api/professional_certificates_update_remark/` + `${id}/` + `${remark}`, httpOptions);
  }

  /*update
  * Document Status
  */
  // documentStatus update professional qualification certificates
  updateProfessionalCertificateDocumentStatusById(id, documentStatus): Observable<any> {
    return this.httpClient.put<{}>(`${this.apiServer}` + `/api/professional_certificates_update_documentstatus/` + `${id}/` + `${documentStatus}`, httpOptions);
  }
}
