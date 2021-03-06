import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgramStreamService {

  private apiServer = environment.base_url;

  constructor(private httpClient: HttpClient) { }

  // get stream list by program id
  getStreamListByProgramId(programId): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiServer + `/programme/stream_list/` + `${programId}`);
  }
}
