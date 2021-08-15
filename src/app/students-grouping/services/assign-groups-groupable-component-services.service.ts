import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssignGroupsGroupableComponentServicesService {

  private myUrl: string = environment.base_url;

  constructor(private http: HttpClient) { }

  getProgramsService(): Observable<any>{
    const url = this.myUrl + '/program/get/order';
    console.log(url)
    return this.http.get(url)
  }

  getSpecializationService(id): Observable<any>{
    console.log(id)
    const url = this.myUrl + '/programme/specialization_list/'+id;
    console.log(url)
    return this.http.get(url)
  }

  getDisciplineService(id): Observable<any>{
    const url = this.myUrl + '/programme/discipline_list/'+id;
    return this.http.get(url)
  }

  getStreamService(id): Observable<any>{
    const url = this.myUrl + '/programme/stream_list/'+id;
    return this.http.get(url)
  }

  getCourseService(): Observable<any>{
    const url = this.myUrl + '/course/all'
    return this.http.get(url)
  }

  getCenterService(): Observable<any>{
    const url = this.myUrl + '/rgm-center/get'
    return this.http.get(url)
  }

//this for wanted services with my table
  getGroupAndSettingData(form): Observable<any>{
    const url = this.myUrl + '/api/get-group-setting/' +form.programme +'/' +form.specialization +'/' +form.course +'/' +form.center;
    console.log(url)
    return this.http.get(url)
  }
  
  getAllDBGroupAndSettingData(): Observable<any>{
    const url = this.myUrl + '/api/group-setting';
    console.log(url)
    return this.http.get(url)	
  }

}
