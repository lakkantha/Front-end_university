import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Program } from '../models/Program';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApplicantType } from '../models/applicanttype';
import { program } from '../models/programs';
import { Specalization } from '../models/Specilization';
import { PreferedAcademicCenter } from '../models/ProgramAcademicCenter';
import { CenterMedium } from '../models/AcademicMedium';
import { AdminCenter } from '../models/adminCenter';
import { programspecilization } from '../models/programspecilization';
import { Qualifications } from '../models/qualification';
import { District } from '../models/district';
import { InitailUser } from '../models/initialuser';
import {environment} from "../../../environments/environment";
import { InitailStudent } from '../models/initialStudent';
import { Country } from '../models/country';
import { CountryCode } from '../models/countrycode';


@Injectable({
  providedIn: 'root'
})
export class AppserviceService {

  urlc1 = environment.base_url + "/activity-program-date/available-program/get"
  urlapplicanttype= environment.base_url + "/applicant-type/get";
 // urlc1= "http://220.247.242.97:3001/program-start/get";
  urlSpByProgramId = environment.base_url + "/rgm-program-specialization/get";
  urlAcademicCenter = environment.base_url + "/program-started-acedemic-center/get";
  urlStudyMedium = environment.base_url + "/program-started-acedemic-center-medium/get";
  urladmincenter= environment.base_url + "/rgt-admin-center/get";
  urldistrict = environment.base_url + "/district/get";
  usernic = environment.base_url + "/initial-applicant/get-last-applicant/nic";
  userpass = environment.base_url +'/initial-applicant/get-last-applicant/passport'
 
  country = environment.base_url + "/api/v1/countries";

  urlqualification = environment.base_url + "/qualificationwithid"

  urlcountrycode = environment.base_url + "/country-code/get";


  urlapplicantsave=environment.base_url + "/applicant-user/create";
  urlapplicantget=environment.base_url + "/initial-applicant/get";

// urlc1 = "http://220.247.242.97:3004/activity-program-date/available-program/get"
//   urlapplicanttype= "http://220.247.242.97:3004/applicant-type/get";
//  // urlc1= "http://220.247.242.97:3001/program-start/get";
//   urlSpByProgramId = "http://220.247.242.97:3004/rgm-program-specialization/get";
//   urlAcademicCenter = "http://220.247.242.97:3004/program-started-acedemic-center/get";
//   urlStudyMedium = "http://220.247.242.97:3004/program-started-acedemic-center-medium/get";
//   urladmincenter= "http://220.247.242.97:3004/postal-code/get";
//   urldistrict = "http://220.247.242.97:3004/district/get";

//   urlqualification = "http://220.247.242.97:3004/qualificationwithid"


//   urlapplicantsave="http://220.247.242.97:3004/applicant-user/create";
//   urlapplicantget="http://220.247.242.97:3004/initial-applicant/get";






  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  constructor(private http: HttpClient) {}

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

    //sending data to server to get the program
    // findApplicationProgram(id:number):Observable<ApplicantType>{
    //   const url = `${this.url3}/${id}`;
    //   return this.http.get<ApplicantType>(url)
    //   .pipe(

    //   );
    // }

    ///######send data to db
  saveapplicantform(body):Observable<any>{
    return this.http.post(`${this.urlapplicantsave}`,body);
  }

  Getuserbynic(nic:string):Observable<InitailStudent[]>{
    const url = `${this.usernic}/${nic}`;
    return this.http.get<InitailStudent[]>(url);
  }

  GetCountryCode(id:number):Observable<CountryCode[]>{
    const url = `${this.urlcountrycode}/${id}`;
    return this.http.get<CountryCode[]>(url);
  }

  Getuserbypassport(nic:string):Observable<InitailStudent[]>{
    const url = `${this.userpass}/${nic}`;
    return this.http.get<InitailStudent[]>(url);
  }

}
