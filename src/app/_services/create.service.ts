import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, config, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import {environment} from "../../environments/environment";

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}; 

const apiUrl = environment.base_url + '/api/auth';

@Injectable({ providedIn: 'root' })
export class CreateService {

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

  create(data: NgForm): Observable<{}> {
		const url1 = 'create-account-url';
		const url = `${apiUrl}/${url1}`;
		console.log(data);
		return this.http.post<{}>(url, data, httpOptions)
			.pipe(
				catchError(this.handleError)
			);
	}

}
