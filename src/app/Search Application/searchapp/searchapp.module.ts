import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SearchApplicationComponent } from '../Component/search-application/search-application.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from '../../_helpers/auth.interceptor';
import {SearchapplicationService} from '../Service/searchapplication.service';
import { AdmissionGenerateComponent} from '../Component/admission-generate/admission-generate.component';
import {AppSearchComponent} from '../Component/app-search/app-search.component';
import { AdmissionPdfComponent } from '../Component/admission-pdf/admission-pdf.component';
const routes : Routes=[
  {path:"searchapplication",component:AppSearchComponent},
]

@NgModule({
  declarations: [
    SearchApplicationComponent,
    AdmissionGenerateComponent,
    AppSearchComponent,
    AdmissionPdfComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports:[RouterModule],
  providers:[HttpClientModule,
    SearchapplicationService,
    AdmissionPdfComponent,
    AdmissionGenerateComponent,
    DatePipe,
    authInterceptorProviders]
})
export class SearchappModule { }
