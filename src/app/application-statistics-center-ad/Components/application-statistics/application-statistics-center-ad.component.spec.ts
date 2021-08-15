import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationStatisticsCenterAdComponent } from './application-statistics-center-ad.component';

describe('ApplicationStatisticsCenterAdComponent', () => {
  let component: ApplicationStatisticsCenterAdComponent;
  let fixture: ComponentFixture<ApplicationStatisticsCenterAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationStatisticsCenterAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationStatisticsCenterAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
