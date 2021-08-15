import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {FormsModule,  ReactiveFormsModule} from '@angular/forms';
import { FinalMarksApprovalComponent } from './final-marks-approval.component';
import { FinalMarksApprovalNewComponent } from './final-marks-approval-new/final-marks-approval-new.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const routes: Routes = [

  {
    path: '',
    component: FinalMarksApprovalComponent
  },
  {
    path: 'new',
    component: FinalMarksApprovalNewComponent
  },
  {
    path : "**",
    component : FinalMarksApprovalComponent
  },
];

@NgModule({
  declarations: [FinalMarksApprovalComponent, FinalMarksApprovalNewComponent],
  imports: [
    [RouterModule.forChild(routes)],
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FinalMarksApprovalModule { }
