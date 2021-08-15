import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, config, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import {environment} from "../../../environments/environment";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}; const apiUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})


export class SendNotificationProgramCourseService {
  constructor(private http:HttpClient) { }
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
    return throwError(error);
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getProgramStarted():Observable<any>{
    const url1 = 'program-start/get-all';
    const url = `${apiUrl}/${url1}`;
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

  getLevels(pId):Observable<any>{
    const url1 = 'api/sendNotifications/getLevels';
    const url = `${apiUrl}/${url1}/${pId}`;
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

  getDetailsByCourse(data):Observable<any>{
    let params = new HttpParams();
    if(data.courseId!=""&&data.courseId!=undefined){
      params = params.append('courseId', data.courseId);
    }
    if(data.programStartedId!=""&&data.programStartedId!=undefined){
      params = params.append('programStartedId', data.programStartedId);
    }
    if(data.level!=""&&data.level!=undefined){
      params = params.append('level', data.level);
    }
    const url1 = 'api/sendNotifications/getByCourse';
    const url = `${apiUrl}/${url1}`;
    return this.http.get<any>(url, {params: params});
  }

  filterByCode(code):Observable<any>{
    const url1 = 'course/filterByCode';
    const url = `${apiUrl}/${url1}/${code}`;
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

  getDetails(programStartedId):Observable<any>{
    const url1 = 'api/sendNotification/getDetails';
    const url = `${apiUrl}/${url1}/${programStartedId}`;
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

  getAll(programStartedId):Observable<any>{
    const url1 = 'api/sendNotification/getAll';
    const url = `${apiUrl}/${url1}/${programStartedId}`;
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

  getCourses(programId,level):Observable<any>{
    const url1 = 'api/sendNotification/getDetails';
    const url = `${apiUrl}/${url1}/${programId}/${level}`;
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

  sendEmailAll(data): Observable<any>{
    const url1 = 'api/sendNotification/send-email-to-all';
    const url = `${apiUrl}/${url1}`;
    console.log(data);

    return this.http.post<{}>(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  sendSMSAll(data): Observable<any>{
    const url1 = 'api/sendNotification/send-sms-to-all';
    const url = `${apiUrl}/${url1}`;
    console.log(data);

    return this.http.post<{}>(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  sendNotiAll(data): Observable<any>{
    const url1 = 'api/sendNotification/send-notification-to-all';
    const url = `${apiUrl}/${url1}`;
    console.log(data);

    return this.http.post<{}>(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

}
