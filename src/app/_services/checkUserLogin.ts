
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CheckUserAdmin implements CanActivate{
  private roles : string[];
  constructor(private tokenStorageService: TokenStorageService,private router: Router){ }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;
    if(this.roles.includes('ROLE_ADMIN')){
      return true;
    }
    else{
    this.router.navigate(['home']);
    return false;
    }
  }
}


@Injectable({
  providedIn: 'root'
})
export class CheckUserStudent implements CanActivate{
  private roles : string[];
  constructor(private tokenStorageService: TokenStorageService,private router: Router){ }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;
    if(this.roles.includes('ROLE_STUDENT')){
      return true;
    }
    else{
    this.router.navigate(['home']);
    return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class CheckUserSuperAdmin implements CanActivate{
  private roles : string[];
  constructor(private tokenStorageService: TokenStorageService,private router: Router){ }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;
    if(this.roles.includes('ROLE_SUPER_ADMIN')){
      return true;
    }
    else{
    this.router.navigate(['home']);
    return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class CheckUserStaff implements CanActivate{
  private roles : string[];
  constructor(private tokenStorageService: TokenStorageService,private router: Router){ }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;
    if(this.roles.includes('ROLE_STAFF')){
      return true;
    }
    else{
    this.router.navigate(['home']);
    return false;
    }
  }
}
@Injectable({
  providedIn: 'root'
})

export class CheckUserApplicant implements CanActivate{
  private roles : string[];
  constructor(private tokenStorageService: TokenStorageService,private router: Router){ }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;
    if(this.roles.includes('ROLE_APPLICANT')){
      return true;
    }
    else{
    this.router.navigate(['home']);
    return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class CheckUserAdminOrSuperAdmin implements CanActivate{
  private roles : string[];
  constructor(private tokenStorageService: TokenStorageService,private router: Router){ }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;
    if(this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_SUPER_ADMIN')){
      return true;
    }
    else{
    this.router.navigate(['home']);
    return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class CheckUserAdminOrStudent implements CanActivate{
  private roles : string[];
  constructor(private tokenStorageService: TokenStorageService,private router: Router){ }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;
    if(this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_STUDENT')){
      return true;
    }
    else{
    this.router.navigate(['home']);
    return false;
    }
  }
}


@Injectable({
  providedIn: 'root'
})

export class CheckUserAdminOrStaff implements CanActivate{
  private roles : string[];
  constructor(private tokenStorageService: TokenStorageService,private router: Router){ }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;
    if(this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_STAFF')){
      return true;
    }
    else{
    this.router.navigate(['home']);
    return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class CheckUserAdminOrApplicant implements CanActivate{
  private roles : string[];
  constructor(private tokenStorageService: TokenStorageService,private router: Router){ }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;
    if(this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_APPLICANT')){
      return true;
    }
    else{
    this.router.navigate(['home']);
    return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class CheckUserSuperAdminOrApplicant implements CanActivate{
  private roles : string[];
  constructor(private tokenStorageService: TokenStorageService,private router: Router){ }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;
    if(this.roles.includes('ROLE_SUPER_ADMIN') || this.roles.includes('ROLE_APPLICANT')){
      return true;
    }
    else{
    this.router.navigate(['home']);
    return false;
    }
  }
}


@Injectable({
  providedIn: 'root'
})

export class CheckUserSuperAdminOrStudent implements CanActivate{
  private roles : string[];
  constructor(private tokenStorageService: TokenStorageService,private router: Router){ }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;
    if(this.roles.includes('ROLE_SUPER_ADMIN') || this.roles.includes('ROLE_STUDENT')){
      return true;
    }
    else{
    this.router.navigate(['home']);
    return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class CheckUserSuperAdminOrStaff implements CanActivate{
  private roles : string[];
  constructor(private tokenStorageService: TokenStorageService,private router: Router){ }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;
    if(this.roles.includes('ROLE_SUPER_ADMIN') || this.roles.includes('ROLE_STAFF')){
      return true;
    }
    else{
    this.router.navigate(['home']);
    return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class CheckUserStudentOrStaff implements CanActivate{
  private roles : string[];
  constructor(private tokenStorageService: TokenStorageService,private router: Router){ }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;
    if(this.roles.includes('ROLE_STUDENT') || this.roles.includes('ROLE_STAFF')){
      return true;
    }
    else{
    this.router.navigate(['home']);
    return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class CheckUserStudentOrApplicant implements CanActivate{
  private roles : string[];
  constructor(private tokenStorageService: TokenStorageService,private router: Router){ }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;
    if(this.roles.includes('ROLE_STUDENT') || this.roles.includes('ROLE_APPLICANT')){
      return true;
    }
    else{
    this.router.navigate(['home']);
    return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class CheckUserStaffOrApplicant implements CanActivate{
  private roles : string[];
  constructor(private tokenStorageService: TokenStorageService,private router: Router){ }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;
    if(this.roles.includes('ROLE_STAFF') || this.roles.includes('ROLE_APPLICANT')){
      return true;
    }
    else{
    this.router.navigate(['home']);
    return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class CheckUserAdminOrSuperAdminOrStudent implements CanActivate{
  private roles : string[];
  constructor(private tokenStorageService: TokenStorageService,private router: Router){ }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;
    if(this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_SUPER_ADMIN') || this.roles.includes('ROLE_STUDENT')){
      return true;
    }
    else{
    this.router.navigate(['home']);
    return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class CheckUserAdminOrSuperAdminOrStaff implements CanActivate{
  private roles : string[];
  constructor(private tokenStorageService: TokenStorageService,private router: Router){ }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;
    if(this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_SUPER_ADMIN') || this.roles.includes('ROLE_STAFF')){
      return true;
    }
    else{
    this.router.navigate(['home']);
    return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class CheckUserAdminOrSuperAdminOrApplicant implements CanActivate{
  private roles : string[];
  constructor(private tokenStorageService: TokenStorageService,private router: Router){ }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;
    if(this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_SUPER_ADMIN') || this.roles.includes('ROLE_APPLICANT')){
      return true;
    }
    else{
    this.router.navigate(['home']);
    return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class CheckUserAdminOrStudentOrApplicant implements CanActivate{
  private roles : string[];
  constructor(private tokenStorageService: TokenStorageService,private router: Router){ }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;
    if(this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_STUDENT') || this.roles.includes('ROLE_APPLICANT')){
      return true;
    }
    else{
    this.router.navigate(['home']);
    return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class CheckUserAdminOrStudentOrStaff implements CanActivate{
  private roles : string[];
  constructor(private tokenStorageService: TokenStorageService,private router: Router){ }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;
    if(this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_STUDENT') || this.roles.includes('ROLE_STAFF')){
      return true;
    }
    else{
    this.router.navigate(['home']);
    return false;
    }
  }
}


@Injectable({
  providedIn: 'root'
})

export class CheckUserAdminOrStaffOrApplicant implements CanActivate{
  private roles : string[];
  constructor(private tokenStorageService: TokenStorageService,private router: Router){ }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;
    if(this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_STAFF') || this.roles.includes('ROLE_APPLICANT')){
      return true;
    }
    else{
    this.router.navigate(['home']);
    return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class CheckUserSuperAdminOrStudentOrStaff implements CanActivate{
  private roles : string[];
  constructor(private tokenStorageService: TokenStorageService,private router: Router){ }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;
    if(this.roles.includes('ROLE_SUPER_ADMIN') || this.roles.includes('ROLE_STUDENT') || this.roles.includes('ROLE_STAFF')){
      return true;
    }
    else{
    this.router.navigate(['home']);
    return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class CheckUserSuperAdminOrStudentOrApplicant implements CanActivate{
  private roles : string[];
  constructor(private tokenStorageService: TokenStorageService,private router: Router){ }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;
    if(this.roles.includes('ROLE_SUPER_ADMIN') || this.roles.includes('ROLE_STUDENT') || this.roles.includes('ROLE_APPLICANT')){
      return true;
    }
    else{
    this.router.navigate(['home']);
    return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class CheckUserStudentOrStaffOrApplicant implements CanActivate{
  private roles : string[];
  constructor(private tokenStorageService: TokenStorageService,private router: Router){ }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;
    if(this.roles.includes('ROLE_STUDENT') || this.roles.includes('ROLE_STAFF') || this.roles.includes('ROLE_APPLICANT')){
      return true;
    }
    else{
    this.router.navigate(['home']);
    return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class CheckUserSuperAdmintOrStaffOrApplicant implements CanActivate{
  private roles : string[];
  constructor(private tokenStorageService: TokenStorageService,private router: Router){ }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;
    if(this.roles.includes('ROLE_SUPER_ADMIN') || this.roles.includes('ROLE_STAFF') || this.roles.includes('ROLE_APPLICANT')){
      return true;
    }
    else{
    this.router.navigate(['home']);
    return false;
    }
  }
}


@Injectable({
  providedIn: 'root'
})

export class CheckUserAdminOrSuperAdminOrStudentOrStaff implements CanActivate{
  private roles : string[];
  constructor(private tokenStorageService: TokenStorageService,private router: Router){ }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;
    if(this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_SUPER_ADMIN') || this.roles.includes('ROLE_STUDENT') || this.roles.includes('ROLE_STAFF')){
      return true;
    }
    else{
    this.router.navigate(['home']);
    return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class CheckUserAdminOrSuperAdminOrStudentOrApplicant implements CanActivate{
  private roles : string[];
  constructor(private tokenStorageService: TokenStorageService,private router: Router){ }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;
    if(this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_SUPER_ADMIN') || this.roles.includes('ROLE_STUDENT') || this.roles.includes('ROLE_APPLICANT')){
      return true;
    }
    else{
    this.router.navigate(['home']);
    return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class CheckUserAdminOrSuperAdminOrStaffOrApplicant implements CanActivate{
  private roles : string[];
  constructor(private tokenStorageService: TokenStorageService,private router: Router){ }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;
    if(this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_SUPER_ADMIN') || this.roles.includes('ROLE_STAFF') || this.roles.includes('ROLE_APPLICANT')){
      return true;
    }
    else{
    this.router.navigate(['home']);
    return false;
    }
  }
}


@Injectable({
  providedIn: 'root'
})

export class CheckUserAdminOrStudentOrStaffOrApplicant implements CanActivate{
  private roles : string[];
  constructor(private tokenStorageService: TokenStorageService,private router: Router){ }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;
    if(this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_STUDENT') || this.roles.includes('ROLE_STAFF') || this.roles.includes('ROLE_APPLICANT')){
      return true;
    }
    else{
    this.router.navigate(['home']);
    return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class CheckUserSuperAdminOrStudentOrStaffOrApplicant implements CanActivate{
  private roles : string[];
  constructor(private tokenStorageService: TokenStorageService,private router: Router){ }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;
    if(this.roles.includes('ROLE_SUPER_ADMIN') || this.roles.includes('ROLE_STUDENT') || this.roles.includes('ROLE_STAFF') || this.roles.includes('ROLE_APPLICANT')){
      return true;
    }
    else{
    this.router.navigate(['home']);
    return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class CheckUserSuperAdminOrStudentOrStaffOrApplicantOrAdmin implements CanActivate{
  private roles : string[];
  constructor(private tokenStorageService: TokenStorageService,private router: Router){ }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;
    if(this.roles.includes('ROLE_SUPER_ADMIN') || this.roles.includes('ROLE_STUDENT') || this.roles.includes('ROLE_STAFF') || this.roles.includes('ROLE_APPLICANT') || this.roles.includes('ROLE_ADMIN')){
      return true;
    }
    else{
    this.router.navigate(['home']);
    return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class CheckUserDirectorOfOperation implements CanActivate{
  constructor(private tokenStorageService: TokenStorageService,private router: Router){ }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    const user = this.tokenStorageService.getUser();
    console.log(user);
    
    if(user.adminDetails[0]['designation']['id']==26){
      return true;
    }
    else{
    this.router.navigate(['home']);
    return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class CheckUserProgramCoOrdinator implements CanActivate{
  constructor(private tokenStorageService: TokenStorageService,private router: Router){ }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    const user = this.tokenStorageService.getUser();
    console.log(user);
    
    if(user.adminDetails[0]['designation']['id']==3){
      return true;
    }
    else{
    this.router.navigate(['home']);
    return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class CheckUserCounsellor implements CanActivate{
  constructor(private tokenStorageService: TokenStorageService,private router: Router){ }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    const user = this.tokenStorageService.getUser();
    console.log(user);
    
    if(user.adminDetails[0].counsellors != null && user.adminDetails[0].counsellors !=undefined){
      return true;
    }
    else{
    this.router.navigate(['home']);
    return false;
    }
  }
}
