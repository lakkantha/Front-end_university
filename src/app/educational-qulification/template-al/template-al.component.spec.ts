import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateALComponent } from './template-al.component';

describe('TemplateALComponent', () => {
  let component: TemplateALComponent;
  let fixture: ComponentFixture<TemplateALComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateALComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateALComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
