import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePersionalDetailCat2Component } from './manage-persional-detail-cat2.component';

describe('ManagePersionalDetailCat2Component', () => {
  let component: ManagePersionalDetailCat2Component;
  let fixture: ComponentFixture<ManagePersionalDetailCat2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePersionalDetailCat2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePersionalDetailCat2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
