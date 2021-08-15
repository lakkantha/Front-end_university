import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';



import { WorkExperienceComponent } from './work-experience/work-experience.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { SubmissionComponent } from './submission/submission.component';


import { ViewPaymentComponent } from './view_pages/view-payment/view-payment.component';

import { NotificationComponent } from './notification/notification.component';
import { ApplicationComponent } from './application/application.component';
import { ProfessionalQualificationComponent } from './professional-qualification/professional-qualification.component';


import { ManagePersionalDetailCat1Component } from './Persional_Details/manage-persional-detail-cat1/manage-persional-detail-cat1.component';
import { ManagePersionalDetailCat2Component } from './Persional_Details/manage-persional-detail-cat2/manage-persional-detail-cat2.component';
import { ManagePersionalDetailCat3Component } from './Persional_Details/manage-persional-detail-cat3/manage-persional-detail-cat3.component';
import { EVerficationComponent } from './Document_verfication/e-verfication/e-verfication.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';



import { EducationalQualificationOLComponent } from './educational-qulification/educational-qualification-ol/educational-qualification-ol.component';
import { EducationalQualificationALComponent } from './educational-qulification/educational-qualification-al/educational-qualification-al.component';
import { EducationalQualificationOLALComponent } from './educational-qulification/educational-qualification-olal/educational-qualification-olal.component';
import { EducationalQualificationAcademicComponent } from './educational-qulification/educational-qualification-academic/educational-qualification-academic.component';
import { EducationalQualificationOLALAcademicComponent } from './educational-qulification/educational-qualification-olalacademic/educational-qualification-olalacademic.component';
import { EducationalQualificationALFoundationComponent } from './educational-qulification/educational-qualification-alfoundation/educational-qualification-alfoundation.component';
import { EducationalQualificationOLFoundationComponent } from './educational-qulification/educational-qualification-olfoundation/educational-qualification-olfoundation.component';
import { EducationalQualificationOLALFoundationComponent } from './educational-qulification/educational-qualification-olalfoundation/educational-qualification-olalfoundation.component';


import { ForgotPasswordByPhoneComponent } from './forgot-password-by-phone/forgot-password-by-phone.component';

import { CheckUserAdmin, CheckUserStudent, CheckUserSuperAdmin, CheckUserStaff, CheckUserApplicant, CheckUserAdminOrSuperAdmin, CheckUserAdminOrStudent, CheckUserAdminOrStaff, CheckUserAdminOrApplicant, CheckUserSuperAdminOrApplicant, CheckUserSuperAdminOrStudent, CheckUserSuperAdminOrStaff, CheckUserStudentOrStaff, CheckUserStudentOrApplicant, CheckUserStaffOrApplicant, CheckUserAdminOrSuperAdminOrStudent, CheckUserAdminOrSuperAdminOrStaff, CheckUserAdminOrSuperAdminOrApplicant, CheckUserAdminOrStudentOrApplicant, CheckUserAdminOrStudentOrStaff, CheckUserAdminOrStaffOrApplicant, CheckUserSuperAdminOrStudentOrStaff, CheckUserSuperAdminOrStudentOrApplicant, CheckUserStudentOrStaffOrApplicant, CheckUserSuperAdmintOrStaffOrApplicant, CheckUserAdminOrSuperAdminOrStudentOrStaff, CheckUserAdminOrSuperAdminOrStudentOrApplicant, CheckUserAdminOrSuperAdminOrStaffOrApplicant, CheckUserAdminOrStudentOrStaffOrApplicant, CheckUserSuperAdminOrStudentOrStaffOrApplicant, CheckUserSuperAdminOrStudentOrStaffOrApplicantOrAdmin, CheckUserCounsellor } from './_services/checkUserLogin';

import { ViewDetailsEducationalQualificationAcademicComponent } from './view_pages/view-details-educational-qualification-academic/view-details-educational-qualification-academic.component';
import { ViewDetailsEducationalQualificationOLComponent } from './view_pages/view-details-educational-qualification-ol/view-details-educational-qualification-ol.component';
import { ViewDetailsEducationalQualificationOLALComponent } from './view_pages/view-details-educational-qualification-olal/view-details-educational-qualification-olal.component';
import { ViewDetailsEducationalQualificationALComponent } from './view_pages/view-details-educational-qualification-al/view-details-educational-qualification-al.component';
import { ViewDetailsEducationalQualificationALFoundationComponent } from './view_pages/view-details-educational-qualification-alfoundation/view-details-educational-qualification-alfoundation.component';
import { ViewDetailsEducationalQualificationOLALAcademicComponent } from './view_pages/view-details-educational-qualification-olalacademic/view-details-educational-qualification-olalacademic.component';
import { ViewDetailsEducationalQualificationOLALFoundationComponent } from './view_pages/view-details-educational-qualification-olalfoundation/view-details-educational-qualification-olalfoundation.component';
import { ViewDetailsEducationalQualificationOLFoundationComponent } from './view_pages/view-details-educational-qualification-olfoundation/view-details-educational-qualification-olfoundation.component';
import { ViewDetailsProfessionalQualificationComponent } from './view_pages/view-details-professional-qualification/view-details-professional-qualification.component';
import { ViewDetailsWorkExperienceComponent } from './view_pages/view-details-work-experience/view-details-work-experience.component';
import {VeiwDetailsPersonaldetails3Component} from './view_pages/veiw-details-personaldetails3/veiw-details-personaldetails3.component';
import { ApplicationDetailComponent } from './Application-details/Components/application-detail/application-detail.component';

import { CheckPaymentGuard } from './Persional_Details/service/CheckPayment';
import { from } from 'rxjs';

import { GenerateAttendanceMarkSheetModule } from './exam-division/generate-attendance-mark-sheet/generate-attendance-mark-sheet.module';
import { GenerateAttendanceMarkSheetOnlineModule } from './exam-division/generate-attendance-mark-sheet-online/generate-attendance-mark-sheet-online.module';

import { SequencetableComponent } from './SequenceAdmin/sequencetable/sequencetable.component';
import { SequencebindingComponent } from './SequenceAdmin/sequencebinding/sequencebinding.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

import { FinalMarksApprovalModule } from './final-marks-approval/final-marks-approval.module';

import { AdminSignupComponent } from './admin-signup/admin-signup.component';
import { AdminForgotPasswordComponent} from './admin-forgot-password/admin-forgot-password.component';
import { AdminForgotPasswordSuccessComponent} from './admin-forgot-password-success/admin-forgot-password-success.component';
import { AdminResetPasswordSuccessComponent} from './admin-reset-password-success/admin-reset-password-success.component'

import { InfoPageComponent } from './info-page/info-page.component';
import { StudentReRegistrationComponent } from './student-re-registration/student-re-registration.component';
//import { RollbackStudentshipComponent } from './student-re-registration/rollback-studentship/rollback-studentship.component'

import {ReRegistrationInterfaceComponent} from './student-re-registration/re-registration-interface/re-registration-interface.component';
import { SendCallingNoticeForReRegistrationComponent } from './send-calling-notice-for-re-registration/send-calling-notice-for-re-registration.component';
import { OriginalCertificateVerificationComponent } from './Document_verfication/original-certificate-verification/original-certificate-verification.component';

import { EducationalQualificationOLALAcademicALAcademicNotMandatoryComponent } from './educational-qulification/educational-qualification-olalacademic-alacademic-not-mandatory/educational-qualification-olalacademic-alacademic-not-mandatory.component';
import { RollbackStudentshipComponent } from './student-re-registration/rollback-studentship/rollback-studentship.component';

import { ConsentFormComponent } from './Consent_form/consent-form/consent-form.component';


import { SendNotificationProgramCourseComponent } from './notification/components/send-notification-program-course/send-notification-program-course.component'

const routes: Routes = [
  { path: 'home/send-notifications', component: SendNotificationProgramCourseComponent, canActivate:[CheckUserAdminOrSuperAdmin]},

  { path: 'admin-forgot-password-success', component: AdminForgotPasswordSuccessComponent},
  { path: 'admin-reset-password', component: AdminResetPasswordSuccessComponent},
  { path: 'admin-signup', component: AdminSignupComponent, canActivate:[CheckUserSuperAdmin]},
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'send-calling-notice-for-re-registration', component: SendCallingNoticeForReRegistrationComponent },
  { path: 'profile', component: ProfileComponent },

  { path: '', redirectTo: 'application-details', pathMatch: 'full' },
  //{ path: 'home/select-program', component: SelectProgramComponent },
  { path: 'home/work-experience', component: WorkExperienceComponent },
  { path: 'home/document-upload', component: DocumentUploadComponent },
  { path: 'home/submission', component: SubmissionComponent },
  { path: 'home/view-payment', component: ViewPaymentComponent },

  { path: 'home/notification', component: NotificationComponent },
  { path: 'home/application', component: ApplicationComponent, canActivate:[CheckUserAdmin] },
  { path: 'home/application1', component: ApplicationComponent},
  { path: 'home/professional-qualification', component: ProfessionalQualificationComponent, canActivate:[CheckUserAdminOrSuperAdminOrStudentOrApplicant] },
  { path: 'home/document_verafication/e-verfication', component: EVerficationComponent },
  { path: 'home/personal-details/manage_persionalDetailsCat1_details', component: ManagePersionalDetailCat1Component , canActivate : [CheckUserAdminOrSuperAdminOrStudentOrApplicant,CheckPaymentGuard]},
  { path: 'home/personal-details/manage_persionalDetailsCat2_details', component: ManagePersionalDetailCat2Component, canActivate:[CheckUserAdminOrSuperAdminOrStudentOrApplicant,CheckPaymentGuard] },
  { path: 'home/personal-details/manage_persionalDetailsCat3_details', component: ManagePersionalDetailCat3Component, canActivate:[CheckUserAdminOrSuperAdminOrStudentOrApplicant,CheckPaymentGuard] },
  { path: 'reset', component: ResetPasswordComponent },
  
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'forgotByPhone', component: ForgotPasswordByPhoneComponent },

  // add educational qualification
  { path: 'home/add_educational_qualification_academic', component: EducationalQualificationAcademicComponent },
  { path: 'home/add_educational_qualification_ol', component: EducationalQualificationOLComponent },
  { path: 'home/add_educational_qualification_al', component: EducationalQualificationALComponent },
  { path: 'home/add_educational_qualification_ol_al', component: EducationalQualificationOLALComponent },
  { path: 'home/add_educational_qualification_ol_al_academic', component: EducationalQualificationOLALAcademicComponent },
  { path: 'home/add_educational_qualification_ol_foundation', component: EducationalQualificationOLFoundationComponent },
  { path: 'home/add_educational_qualification_al_foundation', component: EducationalQualificationALFoundationComponent },
  { path: 'home/add_educational_qualification_ol_al_foundation', component: EducationalQualificationOLALFoundationComponent },
  { path: 'home/add_educational_qualification_ol_notmandatory_al_academic', component: EducationalQualificationOLALAcademicALAcademicNotMandatoryComponent },


  {path : "applicationStatistics", loadChildren : () => import('./application-statistics-center-ad/application-statistics.module').then(m=>m.ApplicationStatisticsModule),canActivate: [CheckUserAdminOrSuperAdmin]},
  {path : "applicationLists", loadChildren : () => import('./applications-list/application-list.module').then(m=>m.ApplicationListModule),canActivate: [CheckUserAdminOrSuperAdmin]},
  {path : "sequenceApplicationLists", loadChildren : () => import('./application-list-for-summary-statistics/application-list-for-summary-statistics.module').then(m=>m.ApplicationListForSummaryStatisticsModule),canActivate: [CheckUserAdminOrSuperAdmin]},
  {path : "applicationSummery", loadChildren : () => import('./application-summery-statistics/application-summery-statistics.module').then(m=>m.ApplicationSummeryStatisticsModule),canActivate: [CheckUserAdminOrSuperAdmin]},
 
  { path: 'home/view_educational_qualification_academic', component: ViewDetailsEducationalQualificationAcademicComponent },
  { path: 'home/view_educational_qualification_ol', component: ViewDetailsEducationalQualificationOLComponent },
  { path: 'home/view_educational_qualification_ol_al', component: ViewDetailsEducationalQualificationOLALComponent },
  { path: 'home/view_educational_qualification_al', component: ViewDetailsEducationalQualificationALComponent },
  { path: 'home/view_educational_qualification_al_foundation', component: ViewDetailsEducationalQualificationALFoundationComponent },
  { path: 'home/view_educational_qualification_ol_al_academic', component: ViewDetailsEducationalQualificationOLALAcademicComponent },
  { path: 'home/view_educational_qualification_ol_al_foundation', component: ViewDetailsEducationalQualificationOLALFoundationComponent },
  { path: 'home/view_educational_qualification_ol_foundation', component: ViewDetailsEducationalQualificationOLFoundationComponent },
  { path: 'home/view_professional_qualification', component: ViewDetailsProfessionalQualificationComponent },
  { path: 'home/view_work_experience', component: ViewDetailsWorkExperienceComponent },
  {path : 'home/view_personaldetails', component:VeiwDetailsPersonaldetails3Component},


  { path: 'generate_attendance_mark_sheet', loadChildren:()=>import('./exam-division/generate-attendance-mark-sheet/generate-attendance-mark-sheet.module').then(e=>GenerateAttendanceMarkSheetModule), canActivate: [CheckUserAdminOrSuperAdmin] },
  { path: 'generate_attendance_mark_sheet_online', loadChildren:()=>import('./exam-division/generate-attendance-mark-sheet-online/generate-attendance-mark-sheet-online.module').then(e=>GenerateAttendanceMarkSheetOnlineModule), canActivate: [CheckUserAdminOrSuperAdmin] },

  { path: 'final_marks_approval', loadChildren:()=>import('./final-marks-approval/final-marks-approval.module').then(e=>FinalMarksApprovalModule), canActivate: [CheckUserAdminOrSuperAdmin] },

  { path: 'SequenceBinding', component: SequencebindingComponent,canActivate: [CheckUserAdminOrSuperAdmin] },
  {
    path: 'application-details',
    loadChildren: () => import('../app/Application-details/application-details.module').then(m => m.ApplicationDetailsModule)
  },
  { path: 'admin-login', component: AdminLoginComponent},

  // programme selection for detail page


  //counselling
  
  { path: 'home/admission', loadChildren: () => import('./admission/admission.module').then(e => e.AdmissionModule), canActivate: [CheckUserStudentOrApplicant] },




  { path: 'Re_registration/:initialApplicantId', component: StudentReRegistrationComponent, canActivate:[CheckUserApplicant] },
  { path: 'rollback/studentship', component: RollbackStudentshipComponent, canActivate:[CheckUserSuperAdmin]},

  {path:'Re_registraton_interface', component:ReRegistrationInterfaceComponent, canActivate:[CheckUserApplicant] },
  
   // document verification
   { path: 'original_certificate_verification', component: OriginalCertificateVerificationComponent, canActivate: [CheckUserAdminOrSuperAdmin]  },
   

  { path: 'home/online_registration_consent_form', component: ConsentFormComponent, canActivate: [CheckUserStudentOrApplicant]  },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
