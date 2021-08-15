import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgramCancelService {

  baseUrl = environment.base_url+'/api/v1';

  constructor(private http : HttpClient) { }


  getInfp(InitialApplicantId: Number): Observable<any> {
    return this.http.get(`${this.baseUrl}/CheckCancelProgram/${InitialApplicantId}`);
  }

  cancelProgram(InitialApplicantId: Number, employeeName : string): Observable<any> {
    return this.http.get(`${this.baseUrl}/cancelProgram/${InitialApplicantId}/${employeeName}`);
  }

  getByinitialApplicantID (InitialApplicantId : Number): Observable<any>{
    return this.http.get(`${environment.base_url}/initial-applicant/get-one/${InitialApplicantId}`);
  }

  displayTotalRefundableAmount(iniId:number ): Observable<any>{
    return this.http.get(`${this.baseUrl}/cancelProgram/displayTotalRefundableAmount/${iniId}`);
  }

  displayTotalRefundableAmountOnClick(iniId:number ): Observable<any>{
    return this.http.get(`${this.baseUrl}/cancelProgram/displayTotalRefundableAmountOnClick/${iniId}`);
  }
}
