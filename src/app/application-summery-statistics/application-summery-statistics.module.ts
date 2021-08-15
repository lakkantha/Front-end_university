import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationSummeryStatisticsComponent } from './Components/application-summery/application-summery-statistics.component';
import { authInterceptorProviders } from "src/app/_helpers/auth.interceptor";
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import {FormsModule,  ReactiveFormsModule} from '@angular/forms';
const routes: Routes = [

  {
    path: '',
    component: ApplicationSummeryStatisticsComponent
  },


];

@NgModule({
  declarations: [ApplicationSummeryStatisticsComponent],
  imports: [
    [RouterModule.forChild(routes)],
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers :
  [
    authInterceptorProviders
  ]
})
export class ApplicationSummeryStatisticsModule { }
