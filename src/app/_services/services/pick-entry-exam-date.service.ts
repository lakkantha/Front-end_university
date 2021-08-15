import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, config, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import {environment} from "../../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}; const apiUrl = environment.base_url + '/api/v1/entryExam';

@Injectable({ providedIn: 'root' })

export class PickEntryExamDateService {

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

  getCenters(id, applicantId, methodId): Observable<any> { 
    const url1 = "getEntranceExamDetails";
    const url = `${apiUrl}/${url1}/${id}/${applicantId}/${methodId}`;
    return this.http.get(url, httpOptions).pipe(
      catchError(this.handleError),
      map(result => {
        if (result === 0) {
          console.log('Empty');
        }
        else {
          return result;
        }
      }));
  }

  getEETypes(id): Observable<any> {
    const api = "getOnlineAllExams";
    const url = `${apiUrl}/${api}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      catchError(this.handleError),
      map(result => {
        if (result === 0) {
          console.log('Empty');
        }
        else {
          return result;
        }
      }));
  }

  getLabs(id, programStartedId): Observable<any> {
    const lab = '/getLabs';
    const url = `${apiUrl}${lab}/${id}/${programStartedId}`;
    return this.http.get(url, httpOptions).pipe(
      catchError(this.handleError),
      map(result => {
        if (result === null) {
          console.log('Empty');
        }
        else {
          return result;
        }
      }));
  }

  getEvents(Pid,methodId,rootId,MId,AId): Observable<any> {
    const url1 = '/timeSlot';
    const url = `${apiUrl}${url1}/${Pid}/${methodId}/${rootId}/${MId}/${AId}`;
    return this.http.get(url, httpOptions).pipe(
      catchError(this.handleError),
      map(result => {
        if (result === null) {
          console.log('Empty');
        }
        else {
          return result;
        }
      }));
  }

  addReserved(data): Observable<{}> {
    const url1 = 'saveScheduledExamPickDate'
    const url = `${apiUrl}/${url1}`;
    return this.http.post<{}>(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteReserve(id: string): Observable<{}> {
		const url = `${apiUrl}/${id}`;
		return this.http.delete(url, httpOptions)
			.pipe(
				catchError(this.handleError)
			);
  }

}
