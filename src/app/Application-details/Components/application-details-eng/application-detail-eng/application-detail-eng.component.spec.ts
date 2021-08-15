import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationDetailEngComponent } from './application-detail-eng.component';

describe('ApplicationDetailEngComponent', () => {
  let component: ApplicationDetailEngComponent;
  let fixture: ComponentFixture<ApplicationDetailEngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationDetailEngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationDetailEngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
