import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramCancelComponent } from './program-cancel.component';

describe('ProgramCancelComponent', () => {
  let component: ProgramCancelComponent;
  let fixture: ComponentFixture<ProgramCancelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramCancelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
