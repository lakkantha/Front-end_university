import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineStudentsGroupsComponent } from './define-students-groups.component';

describe('DefineStudentsGroupsComponent', () => {
  let component: DefineStudentsGroupsComponent;
  let fixture: ComponentFixture<DefineStudentsGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefineStudentsGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefineStudentsGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
