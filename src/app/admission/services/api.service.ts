import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Subscribable, Observable, throwError } from 'rxjs';
import {environment} from "../../../environments/environment";
import { catchError, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}; const apiUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private url : string =  environment.base_url+ '/api/v1/entryExam';

  constructor(private http : HttpClient) { }

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
    return throwError('Something bad happened; please try again later.');
  }

  getPrograms(nic: string) : Subscribable<any>  {
    const url1 = "getPrograms"
    const apiUrl = `${this.url}/${url1}/${nic}`
    return this.http.get(apiUrl)
       //return this.PROGRAMS;
  }

  getAdmissionDetails(appId, psId, methodId) : Subscribable<any>  {
    const url1 = "getAdmissionDetails"
    const apiUrl = `${this.url}/${url1}/${appId}/${psId}/${methodId}`
    return this.http.get(apiUrl)
       //return this.PROGRAMS;
  }

  getDownloadDetails(appId, psId, methodId): Subscribable<any> {
    const url1 = 'isDownloadAdmission';
    const urlFull = `${this.url}/${url1}/${appId}/${psId}/${methodId}`;
    return this.http.get(urlFull);
  }

  downloadReport(initialApplicantId, progStartedId, methodId): Observable<any> {
    const url1 = 'report/download';
    const urlFull = `${apiUrl}/${url1}/${initialApplicantId}/${progStartedId}/${methodId}`;
    const authKey = localStorage.getItem('auth-token');

    const httpOptions = {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
        'Authorization': authKey,
      })
    };
      
    return this.http.get(urlFull, httpOptions)
      .pipe(
        catchError(this.handleError),
        map(result => {
          return result;
        }));
  }
}
