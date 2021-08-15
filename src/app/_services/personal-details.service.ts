import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}; const apiUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PersonalDetailsService {

  private apiServer = environment.base_url;

  constructor(private httpClient: HttpClient) { }

  // get personal documents by nic
  getPersonalDocumentsByNic(fileName): Observable<any> {

    return this.httpClient.get(this.apiServer + `/api/ftp/download/`+ `${fileName}`, httpOptions).pipe(
      map(result => {
          return result;
      }));
  }
}
