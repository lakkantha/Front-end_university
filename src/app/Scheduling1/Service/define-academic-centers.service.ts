import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class DefineAcademicCentersService {
  readonly url= environment.base_url;
  private mediumUrl = this.url+"/rgp-medium/get";
  private centerUrl = this.url+"/rgm-center/get";
  // private centerUrl = this.url+"/exam-root-center/get/all";
  private CreateDefineAcademicCenter = this.url+"/program-started-academic-center/create/";

  constructor(private http: HttpClient) { }

  getMedium() 
  {
    return this.http.get(this.mediumUrl)
    //console.log(this.mediumUrl);
  }
  getCenter() 
  {
    return this.http.get(this.centerUrl)
    //console.log(this.mediumUrl);
  }
  createDefineAcademicCenter(body,ProgramStartedID)
  {
    let url=this.CreateDefineAcademicCenter+ProgramStartedID;
    return this.http.post(`${url}`,body,{ responseType:'text'});
  }
}
