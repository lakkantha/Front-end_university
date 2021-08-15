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
export class NoticeService {

  //url = environment.base_url;

 url=environment.base_url+"api/re-registrationmessage/student";
  deleteurl= environment.base_url+"api/notificaton/delete";

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


//   getinitialapplicatnotice(nic):Observable<any>{
// return this.http.get<any>(this.url+"/"+nic);
//   }

  getinitialapplicatnotice(nic:string): Observable<any> {
    const url1 = 'api/re-registrationmessage/student';
		const url = `${apiUrl}/${url1}/${nic}`;
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


//  delete(id){
//     return this.http.post<any>(this.deleteurl+"/"+id);
//       }


      delete(data): Observable<any>{
        const url1 = 'api/notificaton/delete';
        const url = `${apiUrl}/${url1}/${data}`;
        console.log(data);

        return this.http.post<{}>(url, httpOptions)
          .pipe(
            catchError(this.handleError)
          );
      }

}
