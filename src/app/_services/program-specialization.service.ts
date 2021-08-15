import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgramSpecializationService {

  private apiServer = environment.base_url;

  constructor(private httpClient: HttpClient) { }

  // get specialization list by program id
  getSpecializationListByProgramId(programId): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiServer + `/programme/specialization_list/` + `${programId}`);
  }
}
