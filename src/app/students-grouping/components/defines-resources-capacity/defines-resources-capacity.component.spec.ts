import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinesResourcesCapacityComponent } from './defines-resources-capacity.component';

describe('DefinesResourcesCapacityComponent', () => {
  let component: DefinesResourcesCapacityComponent;
  let fixture: ComponentFixture<DefinesResourcesCapacityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefinesResourcesCapacityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinesResourcesCapacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
