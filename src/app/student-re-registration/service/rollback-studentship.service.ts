import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpEvent,HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, config, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, catchError, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class RollbackStudentshipService {

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

  getPrograms(): Observable<any> {
    const url1 = 'rollback/studentship/getPrograms';
		const url = `${apiUrl}/${url1}`;
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

   getData(nic:string, programId:number): Observable<any> {
    const url1 = 'rollback/studentship/getDetails';
		const url = `${apiUrl}/${url1}/${nic}/${programId}`;
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

   setData(data) {
		const apiUrl1 = 'rollback/studentship/setData';
		const urlFull = `${apiUrl}/${apiUrl1}`;
		console.log(data)
		return this.http.post<{}>(urlFull, data, httpOptions)
			.pipe(
				catchError(this.handleError)
			);
  }


}
