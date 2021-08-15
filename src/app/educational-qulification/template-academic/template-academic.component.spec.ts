import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateAcademicComponent } from './template-academic.component';

describe('TemplateAcademicComponent', () => {
  let component: TemplateAcademicComponent;
  let fixture: ComponentFixture<TemplateAcademicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateAcademicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateAcademicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
