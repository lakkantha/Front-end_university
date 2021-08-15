import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePersionalDetailCat3Component } from './manage-persional-detail-cat3.component';

describe('ManagePersionalDetailCat3Component', () => {
  let component: ManagePersionalDetailCat3Component;
  let fixture: ComponentFixture<ManagePersionalDetailCat3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePersionalDetailCat3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePersionalDetailCat3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
