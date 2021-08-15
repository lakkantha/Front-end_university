import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpEvent,HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of, config, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}; const apiUrl = environment.base_url;
  const bigdata_url = environment.bigdata_url;

@Injectable({
  providedIn: 'root'
})
export class ReRegistrationServiceService {
  readonly url = environment.base_url;
  // private programStartedUrl = this.url + "/program-start/get-all";
  private programStartedUrl = this.url + "/program-start/get-all";
  private academicCenterUrl = this.url + "/program-started-acedemic-center/get/";
  private programStartedByIdUrl = this.url + "/programme/get-by/";
  // private selectedStudentListUrl = this.url + "/api/v1/initialstudent/get_initial_student_list/";
  private selectedStudentListUrl = this.url + "/api/reRegistration/getRegistrationCallingStudents/";
  private sendCallingNoticeUrl = this.url + "/api/re-registration-process/send-calling-notice";
  private generateLetterUrl = this.url + "/pdfreport";

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getAllProgramStarted() {
    return this.http.get(this.programStartedUrl)
  }

  getAllAcademicCenterByProgramStarted(programStartedId: any) {
    return this.http.get(this.academicCenterUrl + programStartedId)
  }

  getProgramStratedById(programStartedId: any) {
    return this.http.get(this.programStartedByIdUrl + programStartedId)
  }

  getSelectedStudentList(studentFilter: any) {
    console.log("studentFilter**", studentFilter)
    return this.http.get(this.selectedStudentListUrl + studentFilter.program + '/' + studentFilter.academicCenter + '/' + studentFilter.studentType)
  }

  sendCallingNotice(callingNoticeObject: any) {
    return this.http.post(this.sendCallingNoticeUrl, callingNoticeObject, { responseType: 'text' })
  }

  generateLetter(studentListObject: any){
    return this.http.post(this.generateLetterUrl, studentListObject)
  }

  getStudentTypes(): Observable<any> {
    const url1 = 'student-type/get/all';
		const url = `${apiUrl}/${url1}`;
		return this.http.get(url, httpOptions).pipe(
			catchError(this.handleError),
			map(result => {
				if (result === null) {
					console.log('Empty');
				}
				else {
					return result;
				}
			}));
   }

}
