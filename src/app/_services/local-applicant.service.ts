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
export class LocalApplicantService {

  private apiServer = environment.base_url;

  constructor(private httpClient: HttpClient) { }

  // get local applicant file names by nic
  getLocalApplicanthByNicAndProgramId(nic, programId): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiServer + `/api/v1/localApplicants/` + `${nic}/` + `${programId}`);
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
