import { HttpBackend, HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApplicantType } from '../models/applicanttype';
import { program } from '../models/programs';
import { PreferedAcademicCenter } from '../models/ProgramAcademicCenter';
import { CenterMedium } from '../models/AcademicMedium';
import { AdminCenter } from '../models/adminCenter';
import { programspecilization } from '../models/programspecilization';
import { Qualifications } from '../models/qualification';
import { District } from '../models/district';
import { InitailStudent } from '../models/initialStudent';
import { Country } from '../models/country';
import { CountryCode } from '../models/countrycode';
import { env } from 'process';
import { catchError, map } from 'rxjs/operators';

const headeroption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class InitialApplicantService {

  
  urlc1 = environment.base_url + "/activity-program-date/available-program/get"
  urlapplicanttype= environment.base_url + "/applicant-type/get";
 // urlc1= "http://220.247.242.97:3001/program-start/get";
  urlSpByProgramId = environment.base_url + "/rgm-program-specialization/get";
  urlAcademicCenter = environment.base_url + "/program-started-acedemic-center/get";
  urlStudyMedium = environment.base_url + "/program-started-acedemic-center-medium/get";
  urladmincenter= environment.base_url + "/rgt-admin-center/get";
  urldistrict = environment.base_url + "/district/get";
  usernic = environment.base_url + "/initial-applicant/get-last-applicant/nic";
  userpass = environment.base_url +'/initial-applicant/get-last-applicant/passport';
 
  country = environment.base_url + "/api/v1/countries";

  urlqualification = environment.base_url + "/qualificationwithid"

  urlcountrycode = environment.base_url + "/country-code/get";


  urlapplicantsave=environment.base_url + "/applicant-user/create";
  urlapplicantget=environment.base_url + "/initial-applicant/get";
  urlapplicantupdate=environment.base_url+"/initial-applicant/update";
  urlGetSequence=environment.base_url+"/api/v1/getSequence";
  cancelExamBooking=environment.base_url+"/api/v1/entryExam/updateTimeSlot";
  initialApplicant=environment.base_url+"/initial-applicant/get";
  initialGetByNic=environment.base_url+"/initial-applicant/get";
  searchInitialApplicantByNic=environment.base_url+"/search/byNic";
  isExistMail=environment.base_url+"/applicant-user/isExistMail";

  private http2: HttpClient

  constructor(handler : HttpBackend,private http: HttpClient) {
    this.http2 = new HttpClient(handler)
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

  getPrograms() : Observable<any[]>{
    return this.http.get<any[]>(this.urlc1)
    .pipe(

    );

    }
    getApplicant() : Observable<program[]>{
      return this.http.get<program[]>(this.urlc1)
      .pipe(

      );

      }

    IsExistMail(mail:string,nic:string):Observable<any>{
      const url = `${this.isExistMail}/${mail}/${nic}`;
      return this.http.get<any>(url)
    }

    findApplicationProgram(id:number):Observable<programspecilization[]>{
      const url = `${this.urlSpByProgramId}/${id}`;
      return this.http.get<programspecilization[]>(url)

    }

    findPreferedAcademicCenter(id: number):Observable<PreferedAcademicCenter[]> {
      const url = `${this.urlAcademicCenter}/${id}`;
      return this.http.get<PreferedAcademicCenter[]>(url)
    }

    findCenterMedium(id: number): Observable<CenterMedium[]> {
      const url = `${this.urlStudyMedium}/${id}`;
      return this.http.get<CenterMedium[]>(url)
    }

    //MongoDB Data
    getQualifications(id: number): Observable<Qualifications[]> {
      const url = `${this.urlqualification}/${id}`;
      return this.http.get<Qualifications[]>(url);
    }

    getdistrict():Observable<District[]>{
      const url = `${this.urldistrict}`;
      return this.http.get<District[]>(url);
    }

    getAdminCenter(name:number):Observable<AdminCenter[]>{
      const url = `${this.urladmincenter}/${name}`;
      return this.http.get<AdminCenter[]>(url);
    }

    getCountry():Observable<Country[]>{
      const url = `${this.country}`;
      return this.http.get<Country[]>(url)
    }


    // getting application type
    getApplicationType():Observable<ApplicantType[]>{
      return this.http.get<ApplicantType[]>(this.urlapplicanttype)

    }

  saveapplicantform(body):Observable<any>{
    return this.http.post(`${this.urlapplicantsave}`,body);
  }

  Getuserbynic(nic:string):Observable<InitailStudent[]>{
    const url = `${this.usernic}/${nic}`;
    return this.http.get<InitailStudent[]>(url);
  }

  GetuserbynicandProgramId(nic:string,id:number):Observable<any[]>{
    const url = `${this.urlapplicantget}/${nic}/${id}`;
    return this.http.get<any[]>(url);
  }

  GetCountryCode(id:number):Observable<CountryCode[]>{
    const url = `${this.urlcountrycode}/${id}`;
    return this.http.get<CountryCode[]>(url);
  }

  Getuserbypassport(nic:string):Observable<InitailStudent[]>{
    const url = `${this.userpass}/${nic}`;
    return this.http.get<InitailStudent[]>(url);
  }

  UpdateUser(body):Observable<any>{
    return this.http.post(`${this.urlapplicantupdate}`,body);
  }
  UrlGetSequence(id: number): Observable<any> {
    const url = `${this.urlGetSequence}/${id}`;
    return this.http.get<any>(url)
  }
  // CancelExamBooking(id: number,programStartedId:number): Observable<any> {
  //   const url = `${this.cancelExamBooking}/${id}/${programStartedId}`;
  //   return this.http.get<any>(url)
  // }

  CancelExamBooking(id: number,programStartedId:number): Observable<any> {
    const url = `${this.cancelExamBooking}/${id}/${programStartedId}`;
  //  const urlFull = `${apiUrl}/${url1}/${applicationId}/${programId}/${slotId}/${componentId}`;
    return this.http2.get(url, headeroption).pipe(
      catchError(this.handleError),
      map(result => {
        return result;
      }));
  }

  getInitialApplicant(): Observable<any> {
    const url = `${this.initialApplicant}`;
    return this.http.get<any>(url)
  }

  getInitialApplicantByNic(id: string): Observable<any> {
    const url = `${this.initialGetByNic}/${id}`;
    return this.http.get<any>(url)
  }

  SearchInitialApplicantByNic(nic: string): Observable<any> {
    const url = `${this.searchInitialApplicantByNic}/${nic}`;
    return this.http.get<any>(url)
  }

}
