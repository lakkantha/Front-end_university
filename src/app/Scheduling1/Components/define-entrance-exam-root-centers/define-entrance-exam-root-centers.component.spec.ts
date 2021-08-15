import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineEntranceExamRootCentersComponent } from './define-entrance-exam-root-centers.component';

describe('DefineEntranceExamRootCentersComponent', () => {
  let component: DefineEntranceExamRootCentersComponent;
  let fixture: ComponentFixture<DefineEntranceExamRootCentersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefineEntranceExamRootCentersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefineEntranceExamRootCentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
