import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProgramChangeComponent } from './Component/program-change/program-change.component';
import { ProgramCancelComponent } from './Component/program-cancel/program-cancel.component';
import { ProgramChangeService } from './Service/program-change.service';
import { ProgramCancelService } from './Service/program-cancel.service';
import { NgxSpinnerModule } from "ngx-spinner";

const routes: Routes = [
  {path : "programChange",component: ProgramChangeComponent},
  {path : "programCancel",component: ProgramCancelComponent},
]

@NgModule({
  declarations: [ProgramChangeComponent, ProgramCancelComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  exports : [RouterModule],
  providers :[
    ProgramCancelService,
    ProgramChangeService
  ]
})
export class ProgramChangeCancelModule { }
