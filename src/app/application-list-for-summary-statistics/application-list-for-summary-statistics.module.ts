import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {FormsModule,  ReactiveFormsModule} from '@angular/forms';
import { ApplicationListForSummaryStatisticsComponent } from "./Component/application-list-for-summary-statistics.component";
import { authInterceptorProviders } from "src/app/_helpers/auth.interceptor";
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {FilterPipe} from './Component/filter.pipe';
const routes: Routes = [

  {
    path: '',
    component: ApplicationListForSummaryStatisticsComponent
  },


];
@NgModule({
  declarations: [ApplicationListForSummaryStatisticsComponent,FilterPipe],
  imports: [
    [RouterModule.forChild(routes)],
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule
  ],
  providers :
  [
    authInterceptorProviders
  ]
})
export class ApplicationListForSummaryStatisticsModule { }
