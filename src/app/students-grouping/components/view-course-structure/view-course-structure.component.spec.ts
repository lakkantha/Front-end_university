import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCourseStructureComponent } from './view-course-structure.component';

describe('ViewCourseStructureComponent', () => {
  let component: ViewCourseStructureComponent;
  let fixture: ComponentFixture<ViewCourseStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCourseStructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCourseStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
