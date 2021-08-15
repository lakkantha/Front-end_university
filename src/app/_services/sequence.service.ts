import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NextSequence } from '../home/NextSequenceModel'

@Injectable({
  providedIn: 'root'
})
export class SequenceService {

  private baseUrl = environment.base_url;
  readonly seqUrl = this.baseUrl + "/api/v1/getSequence/"

  constructor(private http : HttpClient) { }

  getSequenceByInitialApplicantId(id){
    return this.http.get<NextSequence>(this.seqUrl+id)
  }

}


