import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError, tap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import {environment} from "../../../environments/environment";
import { District } from '../../Application-details/models/district';
import{Division} from '../DivisonModel';
import { setClassMetadata } from '@angular/core/src/r3_symbols';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}; 

const apiUrl = environment.base_url + '/api/v1';


const apiUrli =environment.base_url + '/api/file';

@Injectable({
  providedIn: 'root'
})
export class PersionalDetailCat1Service {


  constructor(private http: HttpClient) { }

  urldistrict = environment.base_url + "/district/get";
  urldivision =  environment.base_url + "/api/v1/division/get";
  urlpostalcode = environment.base_url + "/postal-code/get";
  urlchekpostalcode = environment.base_url + "/postal-code-check/get";



 /* uploadFile(body):Observable<any>{
    console.log(body,"fffffffffffff");
    const headers = new HttpHeaders().set(
      'Content-Type',
     'application/x-www-form-urlencoded;'
    );

    
    return this.http.post<{}>(apiUrli+"/ftp",body,{headers: headers });
  }*/
  upload(file: File, fileName: string): Observable<HttpEvent<any>> {

    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', apiUrli+'/upload?name='+fileName, formData, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  getFiles(filename) {
  

    console.log((apiUrli+"/"+filename));
    return this.http.get<any>(apiUrli+"/"+filename);
    
    
  }

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

getdivison(value):Observable<Division[]>{
  const url = `${this.urldivision}`;
  return this.http.get<Division[]>(url+"/"+value);

}

getpostalcode(city):Observable<any>{
  const url = `${this.urlpostalcode}`;
  return this.http.get<any>(url+"/"+city);
}
getpostalcheckcode(city,districts):Observable<any>{

  const url = `${this.urlchekpostalcode}`;
  return this.http.get<any>(url+"/"+city+"/"+districts);
}
  getdistrict():Observable<District[]>{
    const url = `${this.urldistrict}`;
    return this.http.get<District[]>(url);
  }

  getAllCountries(): Observable<any> {
    console.log("Service");
    const url1 = 'countries';
    const url = `${apiUrl}/${url1}`;
    return this.http.get<any>(url);
  }




 /* saveForeignApplicant(data: NgForm): Observable<any> {
    const url1 = 'foreignApplicants';
    const url = `${apiUrl}/${url1}`;
    return this.http.post(url,data,httpOptions);
    
    
  }
*/
  saveForeignApplicant(data:NgForm):Observable<{}>{
    return this.http.post<{}>(apiUrl+"/foreignApplicants",data,httpOptions);
  }

  getForeignApplicant(): Observable<any> {
    const url1 = 'foreignApplicants';
    const url = `${apiUrl}/${url1}`;
    return this.http.get<any>(url);
  }


  saveLocalApplicant(data:NgForm):Observable<{}>{
    return this.http.post<{}>(apiUrl + "/localApplicants",data,httpOptions);
  }
  getLocalPersonalDetails(nic,programid): Observable<any> {
  
    const url1 = 'localApplicants';
    const url = `${apiUrl}/${url1}`;
    return this.http.get<any>(url+"/"+nic+"/"+programid);
  }
  getEmail(user): Observable<any> {
    const url1 = 'custom/userEmail';
    const url = `${apiUrl}/${url1}/${user}`;

    return this.http.get<any>(url, httpOptions).pipe(
      catchError(this.handleError),
      map(result => {

        return result;
      }));
  }
  getNIC(user): Observable<any> {
    const url1 = 'localApplicants/userNIC';
    const url = `${apiUrl}/${url1}/${user}`;

    return this.http.get<any>(url, httpOptions).pipe(
      catchError(this.handleError),
      map(result => {

        return result;
      }));
  }


  getDetailForeignApplicant(passport){
    console.log("*********");
    console.log(passport);
    
    const url1 = 'foreignApplicants/deatils';
    const url = `${apiUrl}/${url1}`;
    return this.http.get<any>(url+"/"+passport);

  }


  getDetailLocalApplicant(nic){
    console.log("*********");
    console.log(nic);
    

    const url1 = 'localApplicants/deatils';
    const url = `${apiUrl}/${url1}`;
    return this.http.get<any>(url+"/"+nic);

  }

}
