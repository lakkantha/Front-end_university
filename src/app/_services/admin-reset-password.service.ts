import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, config, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import {environment} from "../../environments/environment";

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const apiUrl = environment.base_url + '/api/auth-admin/';

@Injectable({
  providedIn: 'root'
})
export class AdminResetPasswordService {

  constructor(private http: HttpClient) { }

  addResetPassword(credentials, token: string): Observable<any> {
		return this.http.post(apiUrl + 'reset-password/email?token=' + token, {
		  password: credentials.password,
		  retypePassword: credentials.retypePassword
		}, httpOptions);
	  }
}
