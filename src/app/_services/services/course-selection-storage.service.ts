import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpBackend } from '@angular/common/http';
import { Observable, of, config, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from "../../../environments/environment";

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const apiUrl = environment.base_url + '/api/v1';

@Injectable({ providedIn: 'root' })

export class CourseSelectionStorageService {

	private http2: HttpClient;

	constructor(private http: HttpClient, handler: HttpBackend) {
		this.http2 = new HttpClient(handler)
	}

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

	getPrograms(id): Observable<any> {
		const url1 = environment.base_url + '/program/courseSelection';
		const url = `${url1}/${id}`;
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

	getExemptedBoolean(id): Observable<any> {
		const url1 = environment.base_url + '/api/get/isAppliedForTwelveYears';
		const url = `${url1}/${id}`;
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

	getDefaultCourseFee(programStartedId, applicantType): Observable<any> {
		const url1 = environment.base_url + '/api/v1/courseSelection/getProgramTuitionFee';
		const url = `${url1}/${programStartedId}/${applicantType}`;
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

	getStreams(id): Observable<any> {
		const url1 = 'getAssociatePrograms';
		const url = `${apiUrl}/${url1}/${id}`;
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

	getExemptions(id): Observable<any> {
		const url1 = environment.base_url + '/api/course-selection/get-exempted-courses';
		const url = `${url1}/${id}`;
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

	getCourse(programStartedId, initialApplicantId, streamId): Observable<any> {
		const url1 = 'courses';
		const url = `${apiUrl}/${url1}/${programStartedId}/${initialApplicantId}/${streamId}`;
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

	getNonTuitionFee(programStartedId, initialApplicantId): Observable<any> {
		const url1 = 'courseSelection';
		const url = `${apiUrl}/${url1}/${programStartedId}/${initialApplicantId}`;
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

	getNonTuitionFeeForStudent(initialAppId): Observable<any> {
		const url1 = 'courses/courseRegistrationDetails';
		const url = `${apiUrl}/${url1}/${initialAppId}`;
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

	getProgramVideos(id, initialAppId): Observable<any> {
		const url1 = environment.base_url + '/program/video';
		const url = `${url1}/${id}/${initialAppId}`;
		return this.http.get(url, httpOptions).pipe(
			catchError(this.handleError),
			map(result => {
				console.log(result);
				return result;
			}));
	}

	addpendingPayments(data): Observable<{}> {
		const url1 = 'pendingPayments/makePayment';
		const url = `${apiUrl}/${url1}`;
		return this.http2.post<{}>(url, data, httpOptions)
			.pipe(
				catchError(this.handleError)
			);
	}

	addpendingPaymentsSave(data): Observable<{}> {
		const url1 = 'pendingPayments';
		const url = `${apiUrl}/${url1}`;
		return this.http2.post<{}>(url, data, httpOptions)
			.pipe(
				catchError(this.handleError)
			);
	}

	sendSms(data): Observable<{}> {
		const url = environment.base_url + '/sms/send-sms-new';
		// const body = new HttpParams()
		// 	.set('to', data.mobileNumber)
		// 	.set('smsType', data.type)
		// 	.set('message', data.smsMsg);

		// return this.http.post(url,
		// 	body,
		// 	{
		// 		headers: new HttpHeaders()
		// 			.set('Content-Type', 'application/x-www-form-urlencoded')
		// 	}
		// ).pipe(
		// 	catchError(this.handleError)
		// );
		return this.http.post<{}>(url, data, httpOptions)
			.pipe(
				catchError(this.handleError)
			);
	}

	counsellingHasNotCourse(id, programId, data): Observable<any> {
		const url1 = 'getRecCourse';
		let url = ``;
		if (programId > 0) {
			url = `${apiUrl}/${url1}/${id}/${programId}`;
		} else {
			url = `${apiUrl}/${url1}/${id}`;
		}
		return this.http.post<{}>(url, data, httpOptions)
			.pipe(
				catchError(this.handleError)
			);
	}

	removeExemption(id): Observable<{}> {
		const url1 = environment.base_url + '/api/delete/ExemptionTertiary';
		const url = `${url1}/${id}`;
		return this.http.delete(url, httpOptions)
			.pipe(
				catchError(this.handleError)
			);
	}

	//Info page

	getProgramsInfo(id, nic): Observable<any> {
		const url1 = environment.base_url + '/program/hasActivityDate';
		// const url1 = environment.base_url + '/program/courseSelectionInfo';
		const url = `${url1}/${id}/${nic}`;
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

	hasDate(id): Observable<any> {
		const url1 = environment.base_url + '/program/hasActivityDate';
		const url = `${url1}/${id}`;
		return this.http.get(url, httpOptions).pipe(
			catchError(this.handleError),
			map(result => {
				return result;
			}));
	}

	//View Course selection

	getProgramForView(id): Observable<any> {
		const url1 = environment.base_url + '/program/courseSelectionView';
		const url = `${url1}/${id}`;
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

	isPay(id, initialApplicantId): Observable<any> {
		const url1 = environment.base_url + '/application-pending-payment/isPay';
		const url = `${url1}/${id}/${initialApplicantId}`;
		return this.http.get(url, httpOptions).pipe(
			catchError(this.handleError),
			map(result => {
				return result;
			}));
	}

	getCourseforView(programStartedId, initialAppId, streamId): Observable<any> {
		const url1 = 'courses/getSelectedCourses';
		const url = `${apiUrl}/${url1}/${programStartedId}/${initialAppId}/${streamId}`;
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

	getDuePaymentOldOmis(id): Observable<any> {
		const url1 = environment.base_url + '/api/v1/getDuePaymentOldOmis';
		const url = `${url1}/${id}`;
		return this.http.get(url, httpOptions).pipe(
			catchError(this.handleError),
			map(result => {
				return result;
			}));
	}

	updateOldOmisDuePayment(id): Observable<any> {
		const url1 = environment.base_url + '/api/v1/updateOldOmisDuePayment';
		const url = `${url1}/${id}`;
		return this.http.put<{}>(url, httpOptions)
			.pipe(
				catchError(this.handleError),
				map(this.extractData));
	}

	getLateFee(iniId: number, acaId: number): Observable<any> {
		const url1 = 'api/studentship/getLateFee';
		const url = environment.base_url + `/${url1}/${iniId}/${acaId}`;
		return this.http.get(url, httpOptions).pipe(
			catchError(this.handleError),
			map(result => {
				if (result === null) {
					console.log('Empty');
					return null;
				}
				else {
					return result;
				}
			}));
	}

	//add drop

	CalculateCourseInstallment(data): Observable<{}> {
		const url1 = 'courses/calculateCourseInstallment';
		const url = `${apiUrl}/${url1}`;
		return this.http.post<{}>(url, data, httpOptions)
			.pipe(
				catchError(this.handleError)
			);
	}

	addpendingPaymentsAddDrop(data): Observable<{}> {
		const url1 = 'pendingPayments/makePayment/addDrop';
		const url = `${apiUrl}/${url1}`;
		return this.http2.post<{}>(url, data, httpOptions)
			.pipe(
				catchError(this.handleError)
			);
	}

	saveIsRequestCounselling(data): Observable<{}> {
		const url1 = 'courses/saveIsRequestCounselling';
		const url = `${apiUrl}/${url1}`;
		return this.http2.post<{}>(url, data, httpOptions)
			.pipe(
				catchError(this.handleError)
			);
	}

	//rollback course offering

	getProgramList(nic): Observable<any> {
		const url1 = environment.base_url + '/getPrograms';
		const url = `${url1}/${nic}`;
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

	rollbackCourseOffering(programStartedId,programId,initialApplicantId,initialStudentId): Observable<{}> {
		const url1 = 'pendingPayments/update-sequence-to-course-offering';
		const url = `${apiUrl}/${url1}/${programStartedId}/${programId}/${initialApplicantId}/${initialStudentId}`;
		return this.http2.post<{}>(url, httpOptions)
			.pipe(
				catchError(this.handleError)
			);
	}
}
