import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {

  private lUrl: string = environment.base_url;
  constructor(private http: HttpClient) { }

  getProgramsService(): Observable<any>{
    const url = this.lUrl + '/program/get/order';
    return this.http.get(url)
  }

  getSpecializationService(id): Observable<any>{
    const url = this.lUrl + '/programme/specialization_list/'+id;
    return this.http.get(url)
  }

  getDisciplineService(id): Observable<any>{
    const url = this.lUrl + '/programme/discipline_list/'+id;
    return this.http.get(url)
  }

  getStreamService(id): Observable<any>{
    const url = this.lUrl + '/programme/stream_list/'+id;
    return this.http.get(url)
  }

  getCourseService(): Observable<any>{
    const url = this.lUrl + '/api/get-all-course'
    return this.http.get(url)
  }

  getCenterService(id): Observable<any>{
    const url = this.lUrl + '/api/get-center/'+id;
    return this.http.get(url)
  }


  getStudentAssigningMethodsService(): Observable<any>{
    const url = this.lUrl + '/api/student-assigning-methods';
    return this.http.get(url)
  }

  public defineAssigningPatterns(myForm){
    const url = this.lUrl + '/api/auto-assigning-patterns';
    return this.http.post(url, myForm);
  }


}
