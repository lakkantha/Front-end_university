import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollbackStudentshipComponent } from './rollback-studentship.component';

describe('RollbackStudentshipComponent', () => {
  let component: RollbackStudentshipComponent;
  let fixture: ComponentFixture<RollbackStudentshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RollbackStudentshipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RollbackStudentshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
