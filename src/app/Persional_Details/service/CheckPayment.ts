
import { Component, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, RouterLink, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";
import {InitailStudent} from '../../Application-details/models/initialStudent';
import { HttpClient } from '@angular/common/http';
import { DataloadService} from '../service/dataload.service';
import { map } from 'rxjs/operators';
import { TokenStorageService } from '../../_services/token-storage.service';



@Injectable()
export class CheckPaymentGuard implements CanActivate {


    public initialstudentId: number;
    S_status:number;
    private roles : string[];
constructor(private http: HttpClient,private api: DataloadService,private tokenStorageService: TokenStorageService, private router : Router) {
    
    console.log('paymentGuard');
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.initialstudentId = Number(localStorage.getItem('initialstudentid'));
    console.log(this.initialstudentId);
    

    this.getintitialstudent(this.initialstudentId);

   
    
 }
    


ngOnInit(): void {

}

        
 async getintitialstudent(initialstudentId){
    console.log("initialstudentid");
    console.log(initialstudentId); 
    let res = await this.api.getintitialstudent(initialstudentId).toPromise()
    console.log("ok");
      console.log(res);
     this.S_status = res['studentStatus']['id'];
      console.log("Status");
      console.log(this.S_status);
  
    }
  
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {

        const user = this.tokenStorageService.getUser();
        this.roles = user.roles;
        if(this.roles.includes('ROLE_ADMIN')){
          return true;
        }
        else{

        this.initialstudentId = Number(localStorage.getItem('initialstudentid'));
    console.log(this.initialstudentId);

   return this.api.getintitialstudent(this.initialstudentId).pipe(map(res=>{
        console.log(res);
        
        let status = res['studentStatus']['id'];
        if(status>=2){
            console.log(status,'true -------');
            
            return true;
        } else{
            console.log(status,'else <--');
            this.router.navigate(['makePayment']);
          return false;
        }
    }))
}
    //  if(this.S_status>=2){
    //     console.log(this.S_status,'true -------');
        
    //     return true;
    // } 
    // else{
    //     console.log(this.S_status,'else <--');
    //     this.router.navigate(['makePayment']);

    // }
}

}