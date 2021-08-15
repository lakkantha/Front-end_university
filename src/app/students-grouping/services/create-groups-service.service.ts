import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateGroupsServiceService {


  private lUrl: string = environment.base_url;

  constructor(private http: HttpClient) { }

  getProgramsService(): Observable<any>{
    const url = this.lUrl + '/api/get-program-details';
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

  getCourseService(id): Observable<any>{
    const url = this.lUrl + '/api/get-course-details/'+id
    return this.http.get(url)
  }

  getCenterService(id): Observable<any>{
    const url = this.lUrl + '/api/get-center-details/'+id
    return this.http.get(url)
  }

  getMediumService(programStartedId,id): Observable<any>{
    const url = this.lUrl + '/api/get-medium-details/'+programStartedId+'/'+id;
    return this.http.get(url)
  }

  

  getGroup(form): Observable<any>{
    //const url = environment.base_url + '/program/getSpecialization/'+id;
    
    const url = this.lUrl + '/api/get-group-one/' +form.programme +'/' +form.specialization +'/' +form.course +'/' +form.center +'/' +form.medium;
    return this.http.get(url)

  }

  public createGroup(form){
    //const url = environment.base_url + '/program/post';
    const url = this.lUrl + '/api/create-group'
    return this.http.post(url, form);
  }


  expandGroup(data)
  {
    const url = this.lUrl + '/api/update-group-count'
    return this.http.put(url,data);
  }



  // Group Setting
  getOfferingType(): Observable<any>
  {
    const url = this.lUrl + '/api/get-offering-type'
    return this.http.get(url)
  }

  getDayType(): Observable<any>
  {
    const url = this.lUrl + '/api/get-day-type'
    return this.http.get(url)
  }

  groupSetting(groupSettingForm)
  {
    const url = this.lUrl + '/api/group-setting'
    return this.http.post(url,groupSettingForm);
  }

  expandGroupCapacity(expandGroupCapacityData)
  {
    const url = this.lUrl + '/api/update-group-capacity'
    return this.http.put(url,expandGroupCapacityData);
  }

}
