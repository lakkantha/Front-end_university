import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {FormsModule,  ReactiveFormsModule} from '@angular/forms';
import { ApplicationStatisticsCenterAdComponent } from './Components/application-statistics/application-statistics-center-ad.component';
import { authInterceptorProviders } from "src/app/_helpers/auth.interceptor";
import { HttpClientModule } from '@angular/common/http';
const routes: Routes = [

  {
    path: '',
    component: ApplicationStatisticsCenterAdComponent
  },


];

@NgModule({
  declarations: [ApplicationStatisticsCenterAdComponent],
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
export class ApplicationStatisticsModule { }
