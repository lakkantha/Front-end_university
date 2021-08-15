import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class InitialStudentService {

  private apiServer = environment.base_url;

  constructor(private httpClient: HttpClient) { }

  // get initial student data by faculty id
  getInitialStudentByFaculty(facultyId): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiServer + `/api/v1/initialstudent/get_initial_student_by_faculty/` + `${facultyId}`);
  }

  // get initial student data by initial department id
  getInitialStudentByDepartment(departmentId): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiServer + `/api/v1/initialstudent/get_initial_student_by_department/` + `${departmentId}`);
  }

  // get initial student data by initial program started id
  getInitialStudentByProgramStartedId(programStartedId): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiServer + `/api/v1/initialstudent/get_initial_student_by_program_started_id/` + `${programStartedId}`);
  }

  // get initial student data by initial program started id and Category
  getInitialStudentByProgramStartedIdAndCategory(programStartedId, specialization, stream, discipline): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiServer + `/api/v1/initialstudent/get_initial_student_by_program_started_id_category/` + `${programStartedId}/` + `${specialization}/` + `${stream}/` + `${discipline}`);
  }

  // get initial student data by initial program started id and center
  getInitialStudentByProgramStartedIdAndCenter(programStartedId, centerId): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiServer + `/api/v1/initialstudent/get_initial_student_by_program_started_id_center/` + `${programStartedId}/` + `${centerId}`);
  }

  // get initial student data by initial program started id and Category and centerid
  getInitialStudentByProgramStartedIdAndCategoryAndCenter(programStartedId, specialization, stream, discipline, centerId): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiServer + `/api/v1/initialstudent/get_initial_student_by_program_started_id_category_center/` + `${programStartedId}/` + `${specialization}/` + `${stream}/` + `${discipline}/` + `${centerId}`);
  }

  // get initial student data by initial student id
  getInitialStudentById(initialStudentId): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiServer + `/api/v1/initialstudent/get_initial_student_by_id/` + `${initialStudentId}`);
  }

  // get initial student data by initial nic
  getInitialStudentByNic(nic): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiServer + `/api/v1/initialstudent/get_initial_student_by_nic/` + `${nic}`);
  }

   // update initial student status by id
   updateInitialStudentStatusById(id, initialStudentStatusId): Observable<any> {
    return this.httpClient.put<{}>(`${this.apiServer}` + `/api/v1/initialstudent/update_initial_student_status_by_id/` + `${id}/` + `${initialStudentStatusId}`, httpOptions);
  }

   // update Remark initial student
   updateInitialStudentRemarkById(id, remark): Observable<any> {
    return this.httpClient.put<{}>(`${this.apiServer}` + `/api/v1/initialstudent/update_initial_student_remark_by_id/` + `${id}/` + `${remark}`, httpOptions);
  }
}
