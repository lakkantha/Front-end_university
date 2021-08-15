import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from "../../environments/environment";

const AUTH_API = environment.base_url + '/api/auth-admin/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AdminSignupServiceService {

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
    return throwError(error);
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  login(credentials): Observable<any> {
    if (this.isUserAuthenticated()) {
      return this.http.post(AUTH_API + 'admin-signin', {
        username: credentials.username,
        password: credentials.password
      }, httpOptions);
    }
    else {
      alert("You cannot login to this site because another user is logged in to this site using this web browser.");
      window.location.reload();
    }
  }

  register(data): Observable<any> {
    return this.http.post(AUTH_API + 'admin-signup', data, httpOptions);
  }

  isUserAuthenticated(): boolean {
    if (window.localStorage.getItem('auth-user') != null) {
      window.localStorage.removeItem('auth-user');
      window.localStorage.removeItem('auth-token');
      return true;
    }
    else {
      return true;
    }
  }

  getAllDesignations(): Observable<any> {
    const url1 = 'getAllDesignations';
    const url = `${AUTH_API}${url1}`;
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

  getAllCentres(): Observable<any> {
    const url1 = 'getAllCentres';
    const url = `${AUTH_API}${url1}`;
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

  getAllPrograms(): Observable<any> {
    const url1 = 'getAllPrograms';
    const url = `${AUTH_API}${url1}`;
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

  getAllDepartments(facultyId:number): Observable<any> {
    const url1 = 'getAllDepartments';
    const url = `${AUTH_API}${url1}/${facultyId}`;
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

  getAllFaculties(): Observable<any> {
    const url1 = 'getAllFaculties';
    const url = `${AUTH_API}${url1}`;
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

  getAllCounsellors(programId:number): Observable<any> {
    const url1 = 'getAllCounsellors';
    const url = `${AUTH_API}${url1}/${programId}`;
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
}
