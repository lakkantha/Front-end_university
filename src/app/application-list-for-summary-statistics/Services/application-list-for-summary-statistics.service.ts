import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApplicationListForSummaryStatisticsService {
  private GetInitialApplicants = environment.base_url+"/datilsnew/findcenterapplicantlistsequence";
  private GetInitialApplicantsByCounsellor=environment.base_url+"/get-next-sequence-details-by-counsellor";
  constructor(private http : HttpClient) { }

  getInitialApplicants(programStartedId,centerId,sequenceId): Observable<any> {
    const url = `${this.GetInitialApplicants}/${programStartedId}/${centerId}/${sequenceId}`;
    return this.http.get<any>(url);
  }

  getInitialApplicantsByCounsellor(programStartedId,counsellorId,centerId,sequenceId): Observable<any> {
    const url = `${this.GetInitialApplicantsByCounsellor}/${programStartedId}/${counsellorId}/${centerId}/${sequenceId}`;
    return this.http.get<any>(url);
  }
}
