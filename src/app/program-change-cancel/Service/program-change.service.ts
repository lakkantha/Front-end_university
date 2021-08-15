import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProgramChangeObject } from '../Model/ProgramChangeObject'

@Injectable({
  providedIn: 'root'
})
export class ProgramChangeService {

  baseUrl = environment.base_url+'/api/v1';

  constructor(private http : HttpClient) { }


  getAvailableProgramStarted(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAvailableProgramStarted`);
  }

  checkProgramChange(InitialApplicantId: Number, programStarted : Number): Observable<any> {
    return this.http.get(`${this.baseUrl}/checkProgramChange/${InitialApplicantId}/${programStarted}`);
  }

  programChange(programChangeObejct : ProgramChangeObject): Observable<any> {
    return this.http.post(`${this.baseUrl}/programChange`,programChangeObejct);
  }
}
