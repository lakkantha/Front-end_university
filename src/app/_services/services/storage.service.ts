import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, config, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { environment } from "../../../environments/environment";

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const apiUrl = environment.base_url + '/api';

@Injectable({ providedIn: 'root' })

export class StorageService {

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
		return throwError('Something bad happened; please try again later.');
	}

	private extractData(res: Response) {
		let body = res;
		return body || {};
	}

	// add work experience data
	addExperience(data: NgForm): Observable<{}> {
		const url1 = 'work_experience_data';
		const url = `${apiUrl}/${url1}`;
		return this.http.post<{}>(url, data, httpOptions)
			.pipe(
				catchError(this.handleError)
			);
	}

	// get work experience data
	getExperience(iStudentId): Observable<any> {
		const url1 = 'work_experience_data/' + `${iStudentId}`;
		const url = `${apiUrl}/${url1}`;
		return this.http.get(url, httpOptions).pipe(
			catchError(this.handleError),
			map(result => {
				if (result === 0) {
					console.log('Empty');
				}
				else {
					return result;
				}
			}));
	}

	// update work experience data
	updateExperience(id: string, data: NgForm): Observable<any> {
		const url1 = 'work_experience_data';
		const url = `${apiUrl}/${url1}/${id}`;
		return this.http.put<{}>(url, data, httpOptions)
			.pipe(
				catchError(this.handleError),
				map(this.extractData));
	}

	// delete work experience data
	deleteExperience(id: string): Observable<{}> {
		const url1 = 'work_experience_data/';
		const url = `${apiUrl}/${url1}${id}`;
		return this.http.delete(url, httpOptions)
			.pipe(
				catchError(this.handleError)
			);
	}

	// add professional qualification data
	addQualification(data: NgForm): Observable<{}> {
		const url1 = 'professional_data';
		const url = `${apiUrl}/${url1}`;
		console.log(data);
		return this.http.post<{}>(url, data, httpOptions)
			.pipe(
				catchError(this.handleError)
			);
	}

	// get professional qualification data
	getQualification(iStudentId): Observable<any> {
		const url1 = 'professional_data/' + `${iStudentId}`;
		const url = `${apiUrl}/${url1}`;
		return this.http.get(url, httpOptions).pipe(
			catchError(this.handleError),
			map(result => {
				if (result === 0) {
					console.log('Empty');
				}
				else {
					return result;
				}
			}));
	}

	// update professional qualification data
	updateQualification(id: string, data: NgForm): Observable<any> {
		const url1 = 'professional_data';
		const url = `${apiUrl}/${url1}/${id}`;
		return this.http.put<{}>(url, data, httpOptions)
			.pipe(
				catchError(this.handleError),
				map(this.extractData));
	}

	// delete professioanl qualification data
	deleteQualification(id: string): Observable<{}> {
		const url1 = 'professional_data/';
		const url = `${apiUrl}/${url1}${id}`;
		return this.http.delete(url, httpOptions)
			.pipe(
				catchError(this.handleError)
			);
	}

	/* Workcertificates
		* get all 
		  */
	getAllCertificatesWork(iStudentId): Observable<any[]> {
		return this.http.get<any[]>(apiUrl + '/work_certificates/' + `${iStudentId}`);
	}

	/* work certificates
	* add 
	*/
	addCertificatesWork(workCertificates: Object): Observable<Object> {
		return this.http.post(`${apiUrl}` + '/work_certificates', workCertificates);
	}

	/* work certificates
	 * delete
	 */
	deleteCertificatesWork(id: number): Observable<any> {
		return this.http.delete(`${apiUrl}` + '/work_certificates' + `/${id}`, { responseType: 'text' });
	}

	/* Professional certificates
		* get all 
		  */
	getAllCertificatesProfessional(iStudentId): Observable<any[]> {
		return this.http.get<any[]>(apiUrl + '/professional_certificates/' + `${iStudentId}`);
	}

	/* Professional certificates
	* add 
	*/
	addCertificatesProfessional(professioanlCertificates: Object): Observable<Object> {
		return this.http.post(`${apiUrl}` + '/professional_certificates', professioanlCertificates);
	}

	/* Professional certificates
	 * delete
	 */
	deleteCertificatesProfessional(id: number): Observable<any> {
		return this.http.delete(`${apiUrl}` + '/professional_certificates' + `/${id}`, { responseType: 'text' });
	}

	getQualificationId(data): Observable<any> {
		const url1 = 'qualifications/';
		const url = `${apiUrl}/${url1}${data}`;
		return this.http.get(url, httpOptions).pipe(
			catchError(this.handleError),
			map(result => {
				if (result === 0) {
					console.log('Empty');
				} else {
					return result;
				}
			}));
	}

	getExperienceId(data): Observable<any> {
		const url1 = 'experiences/';
		const url = `${apiUrl}/${url1}${data}`;
		return this.http.get(url, httpOptions).pipe(
			catchError(this.handleError),
			map(result => {
				if (result === 0) {
					console.log('Empty');
				} else {
					return result;
				}
			}));
	}

	addInstitution(data: NgForm): Observable<{}> {
		const url1 = 'institution';
		const url = `${apiUrl}/${url1}`;
		return this.http.post<{}>(url, data, httpOptions)
			.pipe(
				catchError(this.handleError)
			);
	}

	addCompany(data: NgForm): Observable<{}> {
		const url1 = 'company';
		const url = `${apiUrl}/${url1}`;
		return this.http.post<{}>(url, data, httpOptions)
			.pipe(
				catchError(this.handleError)
			);
	}

	addDesignation(data: NgForm): Observable<{}> {
		const url1 = 'designation';
		const url = `${apiUrl}/${url1}`;
		return this.http.post<{}>(url, data, httpOptions)
			.pipe(
				catchError(this.handleError)
			);
	}

	// update sequence table
	updateSequenceTable(nic, programId): Observable<any[]> {
		return this.http.get<any[]>(`${apiUrl}` + `/update_sequence/` + `${nic}/` + `${programId}`);
	}
}
