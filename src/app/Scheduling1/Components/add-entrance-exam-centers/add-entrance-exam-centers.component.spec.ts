import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntranceExamCentersComponent } from './add-entrance-exam-centers.component';

describe('AddEntranceExamCentersComponent', () => {
  let component: AddEntranceExamCentersComponent;
  let fixture: ComponentFixture<AddEntranceExamCentersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEntranceExamCentersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEntranceExamCentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
