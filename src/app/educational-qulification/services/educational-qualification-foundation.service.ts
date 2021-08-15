import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EducationalQualificationFoundation } from './educational-qualification-foundation';
import { Observable, Subject } from 'rxjs';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EducationalQualificationFoundationService {

  private apiServer = environment.base_url + "/api";

  private foundationSource = new Subject<string>();
  foundationSource$ = this.foundationSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  //check foundation qualification
  fillFoundation(foundation: string) {
    this.foundationSource.next(foundation);
  }

  /* Foundation
   * get Educational Qualification data
   * all data
   */
  getAllFoundation(iStudentId): Observable<EducationalQualificationFoundation[]> {
    return this.httpClient.get<EducationalQualificationFoundation[]>(this.apiServer + '/foundation_data/' + `${iStudentId}`);
  }

}
