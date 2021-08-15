import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineAcademicCentersComponent } from './define-academic-centers.component';

describe('DefineAcademicCentersComponent', () => {
  let component: DefineAcademicCentersComponent;
  let fixture: ComponentFixture<DefineAcademicCentersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefineAcademicCentersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefineAcademicCentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
