import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, config, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from "../../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}; const apiUrl = environment.base_url + '/api/v1/studentNumberReport';

@Injectable({
  providedIn: 'root'
})
export class StudentNumberReportServiceService {

  constructor(private http: HttpClient) { }

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

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getPrograms(): Observable<any> {
    const url1 = "getPrograms";
    const url = `${apiUrl}/${url1}`;
    return this.http.get(url, httpOptions).pipe(
      catchError(this.handleError),
      map(result => {
        return result;
      }));
  }

  getStudentList(programStartedId, type): Observable<any> {
    const api = "getStudentList";
    const url = `${apiUrl}/${api}/${programStartedId}/${type}`;
    return this.http.get(url, httpOptions).pipe(
      catchError(this.handleError),
      map(result => {
        return result;
      }));
  }

  downloadReport(data): Observable<any> {
    const apiUrl1 = environment.base_url + '/report/student-report/download';
    const authKey = localStorage.getItem('auth-token');

    const httpOptions = {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
        'Authorization': authKey,
      })
    };

    return this.http.post(apiUrl1, data, httpOptions)
      .pipe(
        catchError(this.handleError),
        map(result => {
          return result;
        }));
  }
}
