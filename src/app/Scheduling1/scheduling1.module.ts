import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {FormsModule,  ReactiveFormsModule} from '@angular/forms';
import { SchedulingComComponent } from './Components/scheduling-dop/scheduling-dop.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {FilterPipe} from './Components/scheduling-dop/filter.pipe';
import { SchedulingComService } from './Service/scheduling-dop.service';
import { HttpClientModule } from '@angular/common/http';
import { SchedulingCoordinatorComponent } from './Components/scheduling-pc/scheduling-pc.component';
import { SchedulingCoordinatorService } from './Service/scheduling-pc.service';
import {DefineAcademicCentersComponent} from './Components/define-academic-centers/define-academic-centers.component';
import { TagInputModule } from 'ngx-chips';
import {DefineAcademicCentersService } from './Service/define-academic-centers.service';
import { ActivityComComponent } from './Components/activity/activity-com.component';
import {DefineEntranceExamRootCentersComponent} from './Components/define-entrance-exam-root-centers/define-entrance-exam-root-centers.component';
import {SchedulingCenterAdComponent} from './Components/scheduling-center-ad/scheduling-center-ad.component';
import {AddEntranceExamCentersComponent} from './Components/add-entrance-exam-centers/add-entrance-exam-centers.component';
import {DefinePostalcodeComponent} from './Components/define-postalcode/define-postalcode.component';
import { AddEntryExamLabCapacityComponent } from './Components/add-entry-exam-lab-capacity/add-entry-exam-lab-capacity.component';
import {ExamRootCenterBindingEntranceExamCenterComponent} from './Components/exam-root-center-binding-entrance-exam-center/exam-root-center-binding-entrance-exam-center.component'
import { SummaryComponent } from './Components/summary/summary.component';
import{DatapassingService} from '../Scheduling1/Service/datapassing.service';
import { from } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';
import { authInterceptorProviders } from "src/app/_helpers/auth.interceptor";
import {NgxPaginationModule} from 'ngx-pagination';
import { CheckUserAdminOrSuperAdmin,CheckUserDirectorOfOperation } from './../_services/checkUserLogin';

const routes: Routes = [

  {
    path: '',
    component: SchedulingComComponent,
    canActivate:[CheckUserAdminOrSuperAdmin]
  },
  {
    path : "scheduling-dop",
    component : SchedulingComComponent,
    canActivate:[CheckUserAdminOrSuperAdmin]
  },
  {
    path: 'scheduling-pc',
    component: SchedulingCoordinatorComponent,
    canActivate:[CheckUserAdminOrSuperAdmin]
  },
  {
    path : "define-academic-centre",
    component : DefineAcademicCentersComponent,
    canActivate:[CheckUserAdminOrSuperAdmin]
  },
  {
    path : "define-activity",
    component : ActivityComComponent,
    canActivate:[CheckUserDirectorOfOperation]
  },
  {
    path : "define-entrance-exam-root-centres",
    component : DefineEntranceExamRootCentersComponent,
    canActivate:[CheckUserAdminOrSuperAdmin]
  },
  {
    path: "scheduling-ad",
    component: SchedulingCenterAdComponent,
    canActivate:[CheckUserAdminOrSuperAdmin]
  },
  {
    path: "add-entrance-exam-centres",
    component: AddEntranceExamCentersComponent,
    canActivate:[CheckUserAdminOrSuperAdmin]
  },
  {
    path: "add-entry-exam-lab-capacity",
    component: AddEntryExamLabCapacityComponent,
    canActivate:[CheckUserAdminOrSuperAdmin]
  },
  {
    path: "define-postal-code",
    component: DefinePostalcodeComponent,
    canActivate:[CheckUserAdminOrSuperAdmin]
  },
  {
    path: "summary",
    component: SummaryComponent,
    canActivate:[CheckUserAdminOrSuperAdmin]
  },
  {
    path: "exam-root-centre-binding",
    component: ExamRootCenterBindingEntranceExamCenterComponent,
    canActivate:[CheckUserAdminOrSuperAdmin]
  },
];

@NgModule({
  declarations:
  [
    SchedulingComComponent,
    SchedulingCoordinatorComponent,
    FilterPipe,
    DefineAcademicCentersComponent,
    ActivityComComponent,
    DefineEntranceExamRootCentersComponent,
    SchedulingCenterAdComponent,
    AddEntranceExamCentersComponent,
    DefinePostalcodeComponent,
    AddEntryExamLabCapacityComponent,
    SummaryComponent,
    ExamRootCenterBindingEntranceExamCenterComponent
  ],
  imports:
  [
    [RouterModule.forChild(routes)],
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    TagInputModule,
    DataTablesModule,
    NgxPaginationModule

  ],
  providers :
  [
    SchedulingComService,
    SchedulingCoordinatorService,
    DefineAcademicCentersService,
    DatapassingService,
    authInterceptorProviders,
    CheckUserDirectorOfOperation,
    CheckUserAdminOrSuperAdmin

  ]
})
export class Scheduling1Module { }
