import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Program } from '../Application-details/models/Program';
import { program } from '../programme-selection-for-detail-page/model/programs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProgramSelectionService {

  urlinttialStudentProgram = environment.base_url + '/api/v1/initialstudent/get/paid';

  constructor(private http: HttpClient) { }


	 getPrograms(id) : Observable<program[]>{
    return this.http.get<program[]>(this.urlinttialStudentProgram+"/"+id)
    .pipe(

    );
 
    }

    

}
