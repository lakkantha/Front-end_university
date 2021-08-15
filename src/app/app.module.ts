import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatVideoModule } from 'mat-video';
import { AppRoutingModule } from './app-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import { NgxSpinnerModule } from "ngx-spinner";
import { HttpClientModule } from '@angular/common/http';
import { PaymentSharedModuleModule } from './SharedModules/payment-shared-module/payment-shared-module.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { HomeComponent } from './home/home.component';

import { ProfileComponent } from './profile/profile.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';


import { DocumentUploadComponent } from './document-upload/document-upload.component';
// import { MakePaymentComponent } from './make-payment/make-payment.component';
import { SubmissionComponent } from './submission/submission.component';


import { ViewPaymentComponent } from './view_pages/view-payment/view-payment.component';

import { NotificationComponent } from './notification/notification.component';
import { ApplicationComponent } from './application/application.component';
import { EVerficationComponent } from './Document_verfication/e-verfication/e-verfication.component';
import { WorkExperienceComponent } from './work-experience/work-experience.component';
import { ProfessionalQualificationComponent } from './professional-qualification/professional-qualification.component';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ManagePersionalDetailCat1Component } from './Persional_Details/manage-persional-detail-cat1/manage-persional-detail-cat1.component';
import { ManagePersionalDetailCat2Component } from './Persional_Details/manage-persional-detail-cat2/manage-persional-detail-cat2.component';
import { ManagePersionalDetailCat3Component } from './Persional_Details/manage-persional-detail-cat3/manage-persional-detail-cat3.component';

import { PersionalDetailCat1Service } from './Persional_Details/service/persional-detail-cat1-service.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


import { CheckUserAdmin, CheckUserStudent, CheckUserSuperAdmin, CheckUserStaff, CheckUserApplicant, CheckUserAdminOrSuperAdmin, CheckUserAdminOrStudent, CheckUserAdminOrStaff, CheckUserAdminOrApplicant, CheckUserSuperAdminOrApplicant, CheckUserSuperAdminOrStudent, CheckUserSuperAdminOrStaff, CheckUserStudentOrStaff, CheckUserStudentOrApplicant, CheckUserStaffOrApplicant, CheckUserAdminOrSuperAdminOrStudent, CheckUserAdminOrSuperAdminOrStaff, CheckUserAdminOrSuperAdminOrApplicant, CheckUserAdminOrStudentOrApplicant, CheckUserAdminOrStudentOrStaff, CheckUserAdminOrStaffOrApplicant, CheckUserSuperAdminOrStudentOrStaff, CheckUserSuperAdminOrStudentOrApplicant, CheckUserStudentOrStaffOrApplicant, CheckUserSuperAdmintOrStaffOrApplicant, CheckUserAdminOrSuperAdminOrStudentOrStaff, CheckUserAdminOrSuperAdminOrStudentOrApplicant, CheckUserAdminOrSuperAdminOrStaffOrApplicant, CheckUserAdminOrStudentOrStaffOrApplicant, CheckUserSuperAdminOrStudentOrStaffOrApplicant, CheckUserSuperAdminOrStudentOrStaffOrApplicantOrAdmin } from './_services/checkUserLogin';

import { EducationalQualificationOLService } from './educational-qulification/services/educational-qualification-ol.service';
import { EducationalQualificationOLComponent } from './educational-qulification/educational-qualification-ol/educational-qualification-ol.component';
import { EducationalQualificationALComponent } from './educational-qulification/educational-qualification-al/educational-qualification-al.component';
import { EducationalQualificationOLALComponent } from './educational-qulification/educational-qualification-olal/educational-qualification-olal.component';
import { EducationalQualificationAcademicComponent } from './educational-qulification/educational-qualification-academic/educational-qualification-academic.component';
import { EducationalQualificationOLALAcademicComponent } from './educational-qulification/educational-qualification-olalacademic/educational-qualification-olalacademic.component';
import { EducationalQualificationALFoundationComponent } from './educational-qulification/educational-qualification-alfoundation/educational-qualification-alfoundation.component';
import { EducationalQualificationOLFoundationComponent } from './educational-qulification/educational-qualification-olfoundation/educational-qualification-olfoundation.component';
import { EducationalQualificationOLALFoundationComponent } from './educational-qulification/educational-qualification-olalfoundation/educational-qualification-olalfoundation.component';


import { ForgotPasswordByPhoneComponent } from './forgot-password-by-phone/forgot-password-by-phone.component';


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


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { CheckPaymentGuard } from './Persional_Details/service/CheckPayment';
import { ViewDetailsPersonalDetailsCategory1Component } from './view_pages/view-details-personal-details-category1/view-details-personal-details-category1.component';
import { ViewDetailsPersonalDetailsCategory2Component } from './view_pages/view-details-personal-details-category2/view-details-personal-details-category2.component';
import { VeiwDetailsPersonaldetails3Component } from './view_pages/veiw-details-personaldetails3/veiw-details-personaldetails3.component';


import { ToastrModule } from 'ngx-toastr';
import { ProgrammeSelectionForDetailPageComponent } from './programme-selection-for-detail-page/programme-selection-for-detail-page.component';
import { DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { LanguageComponent } from './language/language.component';
import { SequenceService } from './_services/sequence.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RedirectToSequeceService } from './_services/RedirectToSequece.service'
import {LanguageModule} from '../app/language/language/language.module';
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
  resourceTimeGridPlugin
]);

// counselling

import { SelectDropDownModule } from 'ngx-select-dropdown';

import { TemplateALComponent } from './educational-qulification/template-al/template-al.component';
import { TemplateAcademicComponent } from './educational-qulification/template-academic/template-academic.component';
import { from } from 'rxjs';
import { TemplateOLComponent } from './educational-qulification/template-ol/template-ol.component';
import { TemplateFoundationComponent } from './educational-qulification/template-foundation/template-foundation.component';
import { SequencetableComponent } from './SequenceAdmin/sequencetable/sequencetable.component';
import { SequencebindingComponent } from './SequenceAdmin/sequencebinding/sequencebinding.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

import { OriginalCertificateVerificationComponent } from './Document_verfication/original-certificate-verification/original-certificate-verification.component';

/*
import { StudentProgressComponent } from './StudentProgress/Components/student-progress/student-progress.component';
import { CreditSummaryComponent } from './CreditSummary/Components/credit-summary/credit-summary.component';
*/
import { FileUploadComponent } from './Document_verfication/file-upload/file-upload.component';
import { InfoPageComponent } from './info-page/info-page.component';
import { AdminSignupComponent } from './admin-signup/admin-signup.component';
import { AdminForgotPasswordComponent } from './admin-forgot-password/admin-forgot-password.component';
import { AdminForgotPasswordSuccessComponent } from './admin-forgot-password-success/admin-forgot-password-success.component';
import { AdminResetPasswordSuccessComponent } from './admin-reset-password-success/admin-reset-password-success.component';
import { StudentReRegistrationComponent } from './student-re-registration/student-re-registration.component';
import { CountBadgeBodyComponent } from '../app/home/countnotice/count-badge-body/count-badge-body.component';
import { BaseBadgeDirective } from './home/countnotice/base-badge.directive';
import { CountBadgeDirective } from './home/countnotice/count-badge.directive';
import {DatapassinghomeService} from './home/countnotice/datapassinghome.service';
import { ReRegistrationInterfaceComponent } from './student-re-registration/re-registration-interface/re-registration-interface.component';
import { RouterModule } from '@angular/router';
import { SendCallingNoticeForReRegistrationComponent } from './send-calling-notice-for-re-registration/send-calling-notice-for-re-registration.component';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TooltipModule } from 'ng2-tooltip-directive';
// import { LanguageComponent } from './lang./Scheduling1/Components/define-postalcode/define-postalcode.component
import { DataTablesModule } from 'angular-datatables';
import { EducationalQualificationOLALAcademicALAcademicNotMandatoryComponent } from './educational-qulification/educational-qualification-olalacademic-alacademic-not-mandatory/educational-qualification-olalacademic-alacademic-not-mandatory.component';

import { ConsentFormComponent } from './Consent_form/consent-form/consent-form.component';

import { SendNotificationProgramCourseComponent } from './notification/components/send-notification-program-course/send-notification-program-course.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    MyFilterPipe,


    DocumentUploadComponent,
    SubmissionComponent,

    ViewPaymentComponent,

    NotificationComponent,
    ApplicationComponent,
    EVerficationComponent,
    WorkExperienceComponent,
    ProfessionalQualificationComponent,
    ManagePersionalDetailCat1Component,
    ManagePersionalDetailCat2Component,
    ManagePersionalDetailCat3Component,
    ForgotPasswordComponent,
    ResetPasswordComponent,

    FpSuccessComponent,

    EducationalQualificationOLComponent,
    EducationalQualificationALComponent,
    EducationalQualificationOLALComponent,
    EducationalQualificationAcademicComponent,
    EducationalQualificationOLALAcademicComponent,
    EducationalQualificationALFoundationComponent,
    EducationalQualificationOLFoundationComponent,
    EducationalQualificationOLALFoundationComponent,
    TemplateALComponent,
    TemplateAcademicComponent,
    TemplateOLComponent,
    TemplateFoundationComponent,




    ForgotPasswordByPhoneComponent,

    ViewDetailsEducationalQualificationAcademicComponent,
    ViewDetailsEducationalQualificationOLComponent,
    ViewDetailsEducationalQualificationOLALComponent,
    ViewDetailsEducationalQualificationALComponent,
    ViewDetailsEducationalQualificationALFoundationComponent,
    ViewDetailsEducationalQualificationOLALAcademicComponent,
    ViewDetailsEducationalQualificationOLALFoundationComponent,
    ViewDetailsEducationalQualificationOLFoundationComponent,
    ViewDetailsProfessionalQualificationComponent,
    ViewDetailsWorkExperienceComponent,
    ViewDetailsPersonalDetailsCategory1Component,
    ViewDetailsPersonalDetailsCategory2Component,
    VeiwDetailsPersonaldetails3Component,
   
    ProgrammeSelectionForDetailPageComponent,
    // LanguageComponent,



    // counselling
    // counselling
 



   // LanguageComponent,


     SequencetableComponent,
     SequencebindingComponent,
     AdminLoginComponent,

     AdminLoginComponent,
     OriginalCertificateVerificationComponent,
     /*StudentProgressComponent,
     CreditSummaryComponent,
     */
     FileUploadComponent,

     InfoPageComponent,
     AdminSignupComponent,
     AdminForgotPasswordComponent,
     AdminForgotPasswordSuccessComponent,
     AdminResetPasswordSuccessComponent,
     StudentReRegistrationComponent,
     CountBadgeBodyComponent,
     BaseBadgeDirective,
     CountBadgeDirective,
     ReRegistrationInterfaceComponent,
     SendCallingNoticeForReRegistrationComponent,

     EducationalQualificationOLALAcademicALAcademicNotMandatoryComponent,

     RollbackStudentshipComponent,
     
     StudentViewCourseSelectionComponent,
     ConsentFormComponent,
    SendNotificationProgramCourseComponent
   ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    PaymentSharedModuleModule,
    BrowserAnimationsModule,
    CommonModule,
    MatVideoModule,
    FullCalendarModule,
    ToastrModule.forRoot(),
    YouTubePlayerModule,
    SelectDropDownModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgbModule,
    LanguageModule,
    AngularEditorModule,
    RouterModule.forRoot([]),
    NgxSpinnerModule,
    TooltipModule,
    DataTablesModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [
    authInterceptorProviders,
    DatePipe,
    PersionalDetailCat1Service,
    EducationalQualificationOLService,
    CheckUserAdmin, CheckUserStudent,
    CheckUserSuperAdmin,
    CheckUserStaff,
    CheckUserApplicant,
    CheckUserAdminOrSuperAdmin,
    CheckUserAdminOrStudent,
    CheckUserAdminOrStaff,
    CheckUserAdminOrApplicant,
    CheckUserSuperAdminOrApplicant,
    CheckUserSuperAdminOrStudent,
    CheckUserSuperAdminOrStaff,
    CheckUserStudentOrStaff,
    CheckUserStudentOrApplicant,
    CheckUserStaffOrApplicant,
    CheckUserAdminOrSuperAdminOrStudent,
    CheckUserAdminOrSuperAdminOrStaff,
    CheckUserAdminOrSuperAdminOrApplicant,
    CheckUserAdminOrStudentOrApplicant,
    CheckUserAdminOrStudentOrStaff,
    CheckUserAdminOrStaffOrApplicant,
    CheckUserSuperAdminOrStudentOrStaff,
    CheckUserSuperAdminOrStudentOrApplicant,
    CheckUserStudentOrStaffOrApplicant,
    CheckUserSuperAdmintOrStaffOrApplicant,
    CheckUserAdminOrSuperAdminOrStudentOrStaff,
    CheckUserAdminOrSuperAdminOrStudentOrApplicant,
    CheckUserAdminOrSuperAdminOrStaffOrApplicant,
    CheckUserAdminOrStudentOrStaffOrApplicant,
    CheckUserSuperAdminOrStudentOrStaffOrApplicant,
    CheckUserSuperAdminOrStudentOrStaffOrApplicantOrAdmin,
    CheckPaymentGuard,
    SequenceService,
    RedirectToSequeceService,
    DatapassinghomeService
  ],
  bootstrap: [AppComponent],
  entryComponents: [CountBadgeBodyComponent]
})
export class AppModule { }
