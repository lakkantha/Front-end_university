import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}; 
@Injectable({
  providedIn: 'root'
})



export class LangaugeService {


  


  urlinstructions =  environment.base_url + '/api/v1/instruction';

  constructor(private http: HttpClient) { }

  private _listners = new Subject<any>();

    listen(): Observable<any> {
       return this._listners.asObservable();
    }

    filter(filterBy: string) {
       this._listners.next(filterBy);
    }

    getInstructions(name,meduimid): Observable<any> {
  console.log(name,meduimid);
      return this.http.get<any>(this.urlinstructions+"/"+name+"/"+meduimid);
    }




}
