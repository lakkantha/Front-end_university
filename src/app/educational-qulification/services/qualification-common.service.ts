import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QualificationCommonService {

  private apiServer = environment.base_url + "/api";

  constructor(private httpClient: HttpClient) { }

  // update sequence table
  updateSequenceTable(nic, programId): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiServer}` + `/update_sequence/` + `${nic}/` + `${programId}`);
  }

  // get all exam names
  getAllExams(): Observable<any> {
    return this.httpClient.get<any>(this.apiServer + `/get_all_exams`);
  }


  // upload certificate
  upload(file: File, fileName: string): Observable<HttpEvent<any>> {

    const formData: FormData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', this.apiServer + '/file/upload/s3bucket?name=' + fileName, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpClient.request(req);
  }

  // downlaod certificate
  download(fileName: string): Observable<any[]> {

    return this.httpClient.get<any[]>(this.apiServer + '/download/' + `${fileName}`);
  }

  // get sequence number of initial applicant
  getSequenceNumberByInitialApplicantId(initialApplicantId): Observable<any> {
    return this.httpClient.get<any>(this.apiServer + `/get_sequence_number/` + `${initialApplicantId}`);
  }

  // get certificates by counselling saved table
  getCounsellingSavedCertificates(initialApplicantId): Observable<any> {
    return this.httpClient.get(this.apiServer + `/get_counselling_saved_certificates/` + `${initialApplicantId}`);
  }

}
