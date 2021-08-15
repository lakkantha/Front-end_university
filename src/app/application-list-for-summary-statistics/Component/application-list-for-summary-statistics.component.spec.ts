import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationListForSummaryStatisticsComponent } from './application-list-for-summary-statistics.component';

describe('ApplicationListForSummaryStatisticsComponent', () => {
  let component: ApplicationListForSummaryStatisticsComponent;
  let fixture: ComponentFixture<ApplicationListForSummaryStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationListForSummaryStatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationListForSummaryStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
