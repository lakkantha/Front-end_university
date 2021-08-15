import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalMarksApprovalComponent } from './final-marks-approval.component';

describe('FinalMarksApprovalComponent', () => {
  let component: FinalMarksApprovalComponent;
  let fixture: ComponentFixture<FinalMarksApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalMarksApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalMarksApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
