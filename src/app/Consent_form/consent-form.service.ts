import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ConsentFormService {

  private apiServer = environment.base_url;

  constructor(private httpClient: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(error);
  }

  // send sms to selected initial student
  sendSMS(data): Observable<any> {
    return this.httpClient.post<{}>(this.apiServer + `/api/consent_form/send-sms-to-student`, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // sed email to selected initial student
  sendEmail(data): Observable<any> {
    return this.httpClient.post<{}>(this.apiServer + `/api/consent_form/send-mail-to-student`, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // get initial applicant data by initial applicant id
  getInitialApplicantDataById(initialApplicantId): Observable<any> {
    return this.httpClient.get(this.apiServer + `/initial-applicant/get-one/` + `${initialApplicantId}`);
  }
}
