import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgramDisciplineService {

  private apiServer = environment.base_url;

  constructor(private httpClient: HttpClient) { }

  // get discipline list by program id
  getDisciplineListByProgramId(programId): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiServer + `/programme/discipline_list/` + `${programId}`);
  }
}
