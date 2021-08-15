import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class VcsServiceService {

  private lUrl: string = environment.base_url;
  constructor(private http: HttpClient) { }


  getProgramsService(): Observable<any>{
    const url = this.lUrl + '/program/get/order';
    console.log(url)
    return this.http.get(url)
  }

  getSpecializationService(id): Observable<any>{
    console.log(id)
    const url = this.lUrl + '/programme/specialization_list/'+id;
    console.log(url)
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
    const url = this.lUrl + '/course/all'
    return this.http.get(url)
  }



  getAcademicYearService(): Observable<any>{
    const url = this.lUrl + '/academic_year/get';
    return this.http.get(url)
  }

  getEffectExamTypeService(): Observable<any>{
    const url = this.lUrl + '/effect-exam-type/';
    return this.http.get(url)
  }

  getComponentService(): Observable<any>{
    const url = this.lUrl + '/component/';
    return this.http.get(url)
  }




  getSearchData(searchForm): Observable<any>{
    return this.http.get(this.lUrl)
  }

  deleteSearchData(id)
  {

  }

  getSearchDataById(id): Observable<any>{
    return this.http.get(this.lUrl)
  }

}
