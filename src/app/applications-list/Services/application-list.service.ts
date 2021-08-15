import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { HttpClient, HttpParams } from '@angular/common/http';
import { env } from 'process';
@Injectable({
  providedIn: 'root'
})
export class ApplicationListService {
  private GetInitialApplicant = environment.base_url+"/datilsnew/findinitialapplicant/";
  private GetInitialApplicantByCenter = environment.base_url+"/datilsnew/findcenterapplicantlist";
  private GetInitialApplicantPendingPayment=environment.base_url+"/api/v1/pendingPayments/get-initial-applicant";
  private GetInitialApplicantApplicationPendingPayment=environment.base_url+"/application-pending-payment/get-initial-applicant";

  constructor(private http : HttpClient) { }

  getInitialApplicant(programStartedId): Observable<any> {
    const url = `${this.GetInitialApplicant+programStartedId}`;
    return this.http.get<any>(url);
  }
  getInitialApplicantByCenter(programStartedId,centerId): Observable<any> {
    const url = `${this.GetInitialApplicantByCenter}/${programStartedId}/${centerId}`;
    return this.http.get<any>(url);
  }
  getInitialApplicantPendingPayment(programStartedId,centerId,priorityId,isPay): Observable<any> {
    const url = `${this.GetInitialApplicantPendingPayment}/${programStartedId}/${centerId}/${priorityId}/${isPay}`;
    return this.http.get<any>(url);
  }
  getInitialApplicantApplicationPendingPayment(programStartedId,centerId,isPay): Observable<any> {
    const url = `${this.GetInitialApplicantApplicationPendingPayment}/${programStartedId}/${centerId}/${isPay}`;
    return this.http.get<any>(url);
  }
}
