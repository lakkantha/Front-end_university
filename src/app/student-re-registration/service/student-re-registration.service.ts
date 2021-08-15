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
export class StudentReRegistrationService {

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


  url = environment.base_url;

  value:number;

  getalldata(initialApplicantId):Observable<any>{

    return this.http.get<any>(this.url+"/studentship/get/"+initialApplicantId);

  }


  getuseralldata(username):Observable<any>{

    return this.http.get<any>(this.url+"/getstudentshipDataOfUser/"+username);
  }


  getinitalstudent(initialapplicantid):Observable<any>{
    return this.http.get<any>(this.url+"/initialstudent/"+initialapplicantid);
  }

  getDueAmount(iniId:number): Observable<any> {
    const url1 = 'api/studentship/getDueAmount';
		const url = `${apiUrl}/${url1}/${iniId}`;
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

   getLateFee(iniId:number, acaId:number): Observable<any> {
    const url1 = 'api/studentship/getLateFee';
		const url = `${apiUrl}/${url1}/${iniId}/${acaId}`;
		return this.http.get(url, httpOptions).pipe(
			catchError(this.handleError),
			map(result => {
				if (result === null) {
					console.log('Empty');
          return null;
				}
				else {
					return result;
				}
			}));
   }

   hasRegisteredForCourses(iniId:number, acaId:number): Observable<any> {
    const url1 = 'studentship/hasRegisteredForCourses';
		const url = `${apiUrl}/${url1}/${iniId}/${acaId}`;
		return this.http.get(url, httpOptions).pipe(
			catchError(this.handleError),
			map(result => {
				if (result === null) {
					console.log('Empty');
          return null;
				}
				else {
					return result;
				}
			}));
   }



  postpendingpayment(object):Observable<{}>{

  return this.http.post<{}>(this.url+"/studentship/pendingPayment",object,httpOptions);
}


studentstatus(id):Observable<any>{
  return this.http.post<any>(this.url+"/updatepayment/"+id,httpOptions);

}

}
