import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { ManagePersionalDetailCat1Component } from './manage-persional-detail-cat1.component';

describe('ManagePersonalDetailCat1Component', () => {
  let component: ManagePersionalDetailCat1Component;
  let fixture: ComponentFixture<ManagePersionalDetailCat1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePersionalDetailCat1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePersionalDetailCat1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
