import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamRootCenterBindingEntranceExamCenterComponent } from './exam-root-center-binding-entrance-exam-center.component';

describe('ExamRootCenterBindingEntranceExamCenterComponent', () => {
  let component: ExamRootCenterBindingEntranceExamCenterComponent;
  let fixture: ComponentFixture<ExamRootCenterBindingEntranceExamCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamRootCenterBindingEntranceExamCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamRootCenterBindingEntranceExamCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
