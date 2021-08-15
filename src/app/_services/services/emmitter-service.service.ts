import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmmitterServiceService {

  constructor() { }

  private updateSID = new Subject<any>();

  listeningToUpdateSIDChange(): Observable<any> {
    return this.updateSID.asObservable();
  }

  broadcast(data: any) {
    switch (data.content_type) {
      case 'updateSID':
        this.updateSID.next();
        break;
    }
  }
}
