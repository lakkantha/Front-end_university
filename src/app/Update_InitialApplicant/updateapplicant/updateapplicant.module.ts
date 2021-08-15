import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { InitialApplicantService } from '../Service/initial-applicant.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InitialApplicantComponent } from '../Component/initial-applicant/initial-applicant.component';
import { authInterceptorProviders } from 'src/app/_helpers/auth.interceptor';
import {FilterPipe} from '../Component/initial-applicant/filter.pipe';

const routes : Routes= [
  {path: "", component:InitialApplicantComponent}
]

@NgModule({
  declarations: [
    InitialApplicantComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
   
    // ToastrModule.forRoot(),
  ],
  exports:[RouterModule],
  providers: [
    HttpClientModule,
    InitialApplicantService,
    DatePipe,
    authInterceptorProviders
  ],
})
export class UpdateapplicantModule { }
