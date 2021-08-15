import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SearchapplicationService {

  private baseUrl = environment.base_url;
  
  constructor(private http: HttpClient) {
  }

  getInitialapplicantList(nic: String): Observable<any> {
    return this.http.get(`${this.baseUrl}/initial-applicant/get/${nic}`);
  }

  getInitialapplicantListByPassport(ps: String): Observable<any> {
    return this.http.get(`${this.baseUrl}/initial-applicant/getByPassport/${ps}`);
  }

  getClosingDate(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/activity-program-date/get-by-program-started-id/${id}`);
  }

  getPaymentDetails(id:number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/v1/pendingPayments/applicationFee/getByApplicantId/${id}`);
  }

  getEntranceExamsofProgram(id:number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/v1/entryExam/getAllActiveEntryExamMethod/${id}`);
  }

  getApplicantDetailsofEntrance(id:number,pid:number,mid:number)
  {
    return this.http.get(`${this.baseUrl}/api/v1/entryExam/getAdmissionDetailsForAdminPanel/${id}/${pid}/${mid}`);
  }

  getapplicantsequence(id:number){
    return this.http.get(`${this.baseUrl}/api/v1/getSequence/${id}`)
  }

  
}
