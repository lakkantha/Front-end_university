import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DefineActivityService {

  readonly url= environment.base_url;
  private activityUrl = this.url+"/activity/get/all";
  private activityDateTypeUrl = this.url+"/activity-date-type/get/all";
  private createActivityStarted = this.url+"/activity-start/create";
  private centerType = this.url+"/rgm-center-type/get/all";
  private createActivity = this.url+"/activity/create";
  private CreateDefineActivityProgram = this.url+"/define-activity-program/create";
  private GetAllActivityStart = this.url+"/activity-start/get-all";
  private GetAllDepartments = this.url+"/api/get_all_departments";
  private GetAllDesignation = this.url+"/api/get_all_designations";
  private GetAllFaculties = this.url+"/api/get_all_faculties";
  private GetAccessiblePersons = this.url+"/get/admin-details";
  private GetAccessiblePersonsByFaculty = this.url+"/get/admin-details-by-faculty";
  private GetAccessiblePersonsByDepartment= this.url+"/get/admin-details-by-department";
  private GetAccessiblePersonsByDesignation= this.url+"/get/admin-details-by-designation";
  private GetAccessiblePersonsByFacultyAndDepartment= this.url+"/get/admin-details-by-faculty-and-department";
  private GetAccessiblePersonsByFacultyAndDesignation= this.url+"/get/admin-details-by-faculty-and-designation";
  private GetAccessiblePersonsByDepartmentAndDesignation= this.url+"/get/admin-details-by-department-and-designation";
  private GetAccessiblePersonsByFacultyAndDepartmentAndDesignation= this.url+"/get/admin-details-by-faculty-and-department-and-designation";
  constructor(private http: HttpClient) { }

  getAccessiblePersons() : Observable<any>
  {
    return this.http.get<any>(`${this.GetAccessiblePersons}`)
  }

  getAccessiblePersonsByFaculty(faculty) : Observable<any>
  {
    const url=`${this.GetAccessiblePersonsByFaculty}/${faculty}`
    return this.http.get<any>(url)
  }

  getAccessiblePersonsByDepartment(department) : Observable<any>
  {
    const url=`${this.GetAccessiblePersonsByDepartment}/${department}`
    return this.http.get<any>(url)
  }

  getAccessiblePersonsByDesignation(designation) : Observable<any>
  {
    const url=`${this.GetAccessiblePersonsByDesignation}/${designation}`
    return this.http.get<any>(url)
  }

  getAccessiblePersonsByFacultyAndDepartment(faculty,department) : Observable<any>
  {
    const url=`${this.GetAccessiblePersonsByFacultyAndDepartment}/${faculty}/${department}`
    return this.http.get<any>(url)
  }

  getAccessiblePersonsByFacultyAndDesignation(faculty,designation) : Observable<any>
  {
    const url=`${this.GetAccessiblePersonsByFacultyAndDesignation}/${faculty}/${designation}`
    return this.http.get<any>(url)
  }

  getAccessiblePersonsByDepartmentAndDesignation(department,designation) : Observable<any>
  {
    const url=`${this.GetAccessiblePersonsByDepartmentAndDesignation}/${department}/${designation}`
    return this.http.get<any>(url)
  }
  getAccessiblePersonsByFacultyAndDepartmentAndDesignation(faculty,department,designation) : Observable<any>
  {
    const url=`${this.GetAccessiblePersonsByFacultyAndDepartmentAndDesignation}/${faculty}/${department}/${designation}`
    return this.http.get<any>(url)
  }

  getActivity() : Observable<any>
  {
    return this.http.get<any>(`${this.activityUrl}`)
  }

  getAllDepartments() : Observable<any>
  {
    return this.http.get<any>(`${this.GetAllDepartments}`)
  }

  getAllDesignation() : Observable<any>
  {
    return this.http.get<any>(`${this.GetAllDesignation}`)
  }

  getAllFaculties() : Observable<any>
  {
    return this.http.get<any>(`${this.GetAllFaculties}`)
  }

  getActivityDateType() : Observable<any>
  {
    return this.http.get<any>(`${this.activityDateTypeUrl}`)
  }

  getCenterType(): Observable<any>
  {
    return this.http.get<any>(`${this.centerType}`)
  }

  createDefineActivity(body): Observable<any>
  {
    return this.http.post<any>(`${this.createActivityStarted}`,body);
  }

  createSingleActivity(body): Observable<any>
  {
    return this.http.post<any>(`${this.createActivity}`,body);
  }

  createDefineActivityProgram(body): Observable<any>
  {
    return this.http.post<any>(`${this.CreateDefineActivityProgram}`,body);
  }

  getAllActivityStart(): Observable<any>
  {
    return this.http.get<any>(`${this.GetAllActivityStart}`);
  }
}
