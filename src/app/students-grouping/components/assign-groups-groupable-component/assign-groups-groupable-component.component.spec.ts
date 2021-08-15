import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignGroupsGroupableComponentComponent } from './assign-groups-groupable-component.component';

describe('AssignGroupsGroupableComponentComponent', () => {
  let component: AssignGroupsGroupableComponentComponent;
  let fixture: ComponentFixture<AssignGroupsGroupableComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignGroupsGroupableComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignGroupsGroupableComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
