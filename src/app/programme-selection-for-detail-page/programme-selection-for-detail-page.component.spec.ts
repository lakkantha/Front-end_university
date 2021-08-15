import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammeSelectionForDetailPageComponent } from './programme-selection-for-detail-page.component';

describe('ProgrammeSelectionForDetailPageComponent', () => {
  let component: ProgrammeSelectionForDetailPageComponent;
  let fixture: ComponentFixture<ProgrammeSelectionForDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgrammeSelectionForDetailPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgrammeSelectionForDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
