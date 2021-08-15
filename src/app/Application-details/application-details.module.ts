import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ApplicationDetailComponent } from './Components/application-detail/application-detail.component';
import { ApplicationDetailEngComponent } from './Components/application-details-eng/application-detail-eng/application-detail-eng.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppserviceService } from './Services/appservice.service';
import { LanguageModule } from '../language/language/language.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



const routes : Routes= [
  {path: "", component:ApplicationDetailComponent}
]

@NgModule({
  declarations: [
    ApplicationDetailComponent,
    ApplicationDetailEngComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpClientModule,
    LanguageModule,
    FontAwesomeModule,
   
    // ToastrModule.forRoot(),
  ],
  exports:[RouterModule],
  providers: [
    HttpClientModule,
    AppserviceService,
    DatePipe
  ],
})
export class ApplicationDetailsModule { }
