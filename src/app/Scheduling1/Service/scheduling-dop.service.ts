import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent, HttpRequest  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { report } from 'process';

@Injectable({
  providedIn: 'root'
})

export class SchedulingComService {

  auth_token:any;
  
  constructor(private http : HttpClient) {
    this.auth_token=localStorage.getItem('auth-token');
   }

  GetProgram = environment.base_url+"/program/get";
  GetAcademicYear= environment.base_url+"/academic_year/get";
  GetAllUnits= environment.base_url+"/rgm_ousl_unit/get";
  GetAllProgramStarted= environment.base_url+"/program-start/get-all";
  CreateProgramSchedule= environment.base_url+"/program-start/create";
  GetSelectedProgram= environment.base_url+"/program/get-by-facultyId/";
  GetFaculties= environment.base_url+"/api/get_all_faculties";
  GetDepartment= environment.base_url+"/api/get/";
  GetUnit= environment.base_url+"/rgm_ousl_unit/get_by_faculty_id/";
  GetAllDepartment= environment.base_url+"/api/get_all_departments";
  GetActivityStarted= environment.base_url+"/define-activity-program/get-by-program/";
  CreateProgramDate= environment.base_url+"/activity-program-date/create";
  GetActivityProgramDate= environment.base_url+"/activity-program-date/get-by-program-started-id/";
  CreateCenterDate=environment.base_url+"/activity-center-date/create";
  GetActivityCenterDate= environment.base_url+"/activity-center-date/get-by-program-started-id/";
  DeleteProgramDate= environment.base_url+"/activity-program-date/delete";
  DeleteCenterDate= environment.base_url+"/activity-center-date/delete";
  UpdateProgramDate= environment.base_url+"/activity-program-date/update";
  UpdateCenterDate= environment.base_url+"/activity-center-date/update";
  GetLatestProgramDate=environment.base_url+"/activity-program-date/get-latest-data";
  GetLatestCenterDate=environment.base_url+"/activity-center-date/get-latest-data";

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

  getLatestProgramDate(): Observable<any> {
    return this.http.get<any>(`${this.GetLatestProgramDate}`);
  }

  getLatestCenterDate(): Observable<any> {
    return this.http.get<any>(`${this.GetLatestCenterDate}`);
  }

  getProgramsService(): Observable<any> {
      return this.http.get<any>(`${this.GetProgram}`);
  }
  getAcademicYearService(): Observable<any> {
    return this.http.get<any>(`${this.GetAcademicYear}`);
  }
  getAllUnitService(): Observable<any> {
    return this.http.get<any>(`${this.GetAllUnits}`);
  }
  getAllProgramStarted(): Observable<any> {
    return this.http.get<any>(`${this.GetAllProgramStarted}`);
  }
  createProgramSchedule(body): Observable<any> {
    const url = `${this.CreateProgramSchedule}`;
    return this.http.post<any>(url,body);
  }
  getSelectedProgramService(facultyID): Observable<any> {
    const url = `${this.GetSelectedProgram+facultyID}`;

    return this.http.get<any>(url);
  }
  getFacultyService(): Observable<any> {
    const url = `${this.GetFaculties}`;

    return this.http.get<any>(url);
  }
  getDepartmentService(facultyID): Observable<any> {
    const url = `${this.GetDepartment+facultyID}`;

    return this.http.get<any>(url);
  }
  getUnitService(facultyID): Observable<any> {
    const url = `${this.GetUnit+facultyID}`;

    return this.http.get<any>(url);
  }
  getAllDepartmentService(): Observable<any> {
    const url = `${this.GetAllDepartment}`;

    return this.http.get<any>(url);
  }
  getActivityStarted(programID): Observable<any> {
    const url = `${this.GetActivityStarted+programID}`;

    return this.http.get<any>(url);
  }
  createProgramDate(body): Observable<any> {
    const url = `${this.CreateProgramDate}`;

    return this.http.post(url,body, {responseType:'text'});
  }
  getActivityProgramDate(ProgramID): Observable<any> {
    const url = `${this.GetActivityProgramDate+ProgramID}`;

    return this.http.get<any>(url);
  }
  createCenterDate(body): Observable<any> {
    const url = `${this.CreateCenterDate}`;

    return this.http.post(url,body, {responseType:'text'});
  }
  getActivityCenterDate(ProgramID): Observable<any> {
    const url = `${this.GetActivityCenterDate+ProgramID}`;

    return this.http.get<any>(url);
  }
  deleteProgramDate(ProgramID): Observable<any> {
    const url = `${this.DeleteProgramDate}/${ProgramID}`;

    return this.http.put<any>(url,ProgramID);
  }
  deleteCenterDate(ProgramID): Observable<any> {
    const url = `${this.DeleteCenterDate}/${ProgramID}`;

    return this.http.post<any>(url,ProgramID);
  }
  updateProgramDate(body): Observable<any> {
    const url = `${this.UpdateProgramDate}`;

    return this.http.put<any>(url,body);
  }
  updateCenterDate(body): Observable<any> {
    const url = `${this.UpdateCenterDate}`;

    return this.http.post<any>(url,body);
  }

}
