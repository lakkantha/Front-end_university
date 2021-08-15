import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {InitailStudent} from '../../Application-details/models/initialStudent';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DataloadService {

  urlinttialStudent =  environment.base_url + '/api/v1/initialstudent/get';


  constructor(private http: HttpClient) { }

  
  getintitialstudent(initialstudentId) : Observable<InitailStudent[]>{
    return this.http.get<InitailStudent[]>(this.urlinttialStudent+"/"+initialstudentId)
    .pipe(
      

    );
 
    }
}
