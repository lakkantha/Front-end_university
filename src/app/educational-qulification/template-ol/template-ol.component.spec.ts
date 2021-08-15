import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateOLComponent } from './template-ol.component';

describe('TemplateOLComponent', () => {
  let component: TemplateOLComponent;
  let fixture: ComponentFixture<TemplateOLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateOLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateOLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
