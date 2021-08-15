import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsListComponent } from "./Component/applications-list.component";
import { RouterModule, Routes } from '@angular/router';
import {FormsModule,  ReactiveFormsModule} from '@angular/forms';
import { authInterceptorProviders } from "src/app/_helpers/auth.interceptor";
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {FilterPipe} from './Component/filter.pipe';

const routes: Routes = [

  {
    path: '',
    component: ApplicationsListComponent
  },


];

@NgModule({
  declarations: [
    ApplicationsListComponent,
    FilterPipe
  ],
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
export class ApplicationListModule { }
