import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationSummeryStatisticsComponent } from './application-summery-statistics.component';

describe('ApplicationSummeryStatisticsComponent', () => {
  let component: ApplicationSummeryStatisticsComponent;
  let fixture: ComponentFixture<ApplicationSummeryStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationSummeryStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationSummeryStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
