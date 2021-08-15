import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalMarksApprovalNewComponent } from './final-marks-approval-new.component';

describe('FinalMarksApprovalNewComponent', () => {
  let component: FinalMarksApprovalNewComponent;
  let fixture: ComponentFixture<FinalMarksApprovalNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalMarksApprovalNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalMarksApprovalNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
