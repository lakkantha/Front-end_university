import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntryExamLabCapacityComponent } from './add-entry-exam-lab-capacity.component';

describe('AddEntryExamLabCapacityComponent', () => {
  let component: AddEntryExamLabCapacityComponent;
  let fixture: ComponentFixture<AddEntryExamLabCapacityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEntryExamLabCapacityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEntryExamLabCapacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
