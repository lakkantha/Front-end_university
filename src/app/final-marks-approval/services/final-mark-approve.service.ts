import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'inspector';
import { Observable, Subscribable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map } from 'rxjs/operators';
import { environment } from "../../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}; const apiUrl = environment.base_url + '/api/v1/entryExam';

@Injectable({
  providedIn: 'root'
})
export class FinalMarkApproveService {

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

  getProgram(): Observable<any> {
    const url1 = 'getProgramsWithDefinedEntryExam';
    const urlFull = `${apiUrl}/${url1}`;
    return this.http.get(urlFull, httpOptions).pipe(
      catchError(this.handleError),
      map(result => {
        return result;
      }));
  }

  getCenters(id): Observable<any> {
    const url1 = 'getAcademicCentresForDefiningMarksCriteria';
    const urlFull = `${apiUrl}/${url1}/${id}`;
    return this.http.get(urlFull, httpOptions).pipe(
      catchError(this.handleError),
      map(result => {
        return result;
      }));
  }

  getEntryExamDetailsForGeneratingAttendance(id): Observable<any> {
    const url1 = 'getEntryExamDetailsForGeneratingAttendance';
    const urlFull = `${apiUrl}/${url1}/${id}`;
    return this.http.get(urlFull, httpOptions).pipe(
      catchError(this.handleError),
      map(result => {
        return result;
      }));
  }

  viewCriteriaList(id): Observable<any> {
    const url1 = 'viewCriteriaList';
    const urlFull = `${apiUrl}/${url1}/${id}`;
    return this.http.get(urlFull, httpOptions).pipe(
      catchError(this.handleError),
      map(result => {
        return result;
      }));
  }

  loadMarksDetailsToProcess(programId, centreId, mediumId): Observable<any> {
    const url1 = 'gettingProcessMarkDetailsForApproval';
    const urlFull = `${apiUrl}/${url1}/${programId}/${centreId}/${mediumId}`;
    return this.http.get(urlFull, httpOptions).pipe(
      catchError(this.handleError),
      map(result => {
        return result;
      }));
  }

  processMark(id): Observable<any> {
    const url1 = 'processMark';
    const urlFull = `${apiUrl}/${url1}/${id}`;
    return this.http.get(urlFull, httpOptions).pipe(
      catchError(this.handleError),
      map(result => {
        return result;
      }));
  }

  validateSecondaryCriteria(id): Observable<any> {
    const url1 = 'validateSecondaryCriteria';
    const urlFull = `${apiUrl}/${url1}/${id}`;
    return this.http.get(urlFull, httpOptions).pipe(
      catchError(this.handleError),
      map(result => {
        return result;
      }));
  }

  getSubcomponents(id): Observable<any> {
    const url1 = 'getAllActiveExamComponentsForGivenProgram';
    const urlFull = `${apiUrl}/${url1}/${id}`;
    return this.http.get(urlFull, httpOptions).pipe(
      catchError(this.handleError),
      map(result => {
        return result;
      }));
  }

  downloadFile(filedata) : Observable<any> {
    const apiUrl1 = 'downloadFinalApprovalMarkSheetWithApplicantExamStatus';
    const urlFull = `${apiUrl}/${apiUrl1}`;
    const authKey = localStorage.getItem('auth-token');

    const httpOptions = {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
        'Authorization': authKey,
      })
    };

    return this.http.post(urlFull, filedata, httpOptions)
      .pipe(
        catchError(this.handleError),
        map(result => {
          return result;
        }));
  }

  saveProcessedMarksDetails(adminDetailId, programId, academicCentreId, mediumId) {
    const apiUrl1 = 'saveProcessedMarksApprovalDetails';
    const urlFull = `${apiUrl}/${apiUrl1}/${adminDetailId}/${programId}/${academicCentreId}/${mediumId}`;
    return this.http.post<{}>(urlFull, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getStatusCriteria(programId, academicCentreId, mediumId): Observable<any> {
    const apiUrl1 = 'updateEntryExamProcessMarkStatus';
    const urlFull = `${apiUrl}/${apiUrl1}/${programId}/${academicCentreId}/${mediumId}`;
    return this.http.get(urlFull, httpOptions).pipe(
      catchError(this.handleError),
      map(result => {
        return result;
      }));
  }

  sortProcessMarkDetailsForApproval(id, programId, rgmCentreId, mediumId): Observable<any> {
    const url1 = 'sortProcessMarkDetailsForApproval';
    const urlFull = `${apiUrl}/${url1}/${id}/${programId}/${rgmCentreId}/${mediumId}`;
    return this.http.get(urlFull, httpOptions).pipe(
      catchError(this.handleError),
      map(result => {
        return result;
      }));
  }

  getCriteria(programId): Observable<any> {
    const apiUrl1 = 'hasDefineMarkStatusCriteria';
    const urlFull = `${apiUrl}/${apiUrl1}/${programId}`;
    return this.http.get(urlFull, httpOptions).pipe(
      catchError(this.handleError),
      map(result => {
        return result;
      }));
  }

}

