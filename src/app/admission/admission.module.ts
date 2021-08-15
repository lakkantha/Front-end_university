import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmissionComponent } from './admission/admission.component';
import { AdmissionGenerateComponent } from './admission-generate/admission-generate.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { ApiService } from './services/api.service';
import { Routes, RouterModule } from '@angular/router';
import { QrCodeModule } from 'ng-qrcode';
import { InfoHomeBasedComponent } from './info-home-based/info-home-based.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: AdmissionComponent
  },
  {
    path: 'admissiongenerate',
    component: AdmissionGenerateComponent
  },
  {
    path: 'info-home-based',
    component: InfoHomeBasedComponent
  },
  {
    path: "**",
    component: AdmissionComponent
  }
];

@NgModule({
  declarations: [AdmissionComponent, AdmissionGenerateComponent, InfoHomeBasedComponent],
  imports: [
    [RouterModule.forChild(routes)],
    CommonModule,
    NgxBarcodeModule,
    QrCodeModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ApiService]
})
export class AdmissionModule { }
