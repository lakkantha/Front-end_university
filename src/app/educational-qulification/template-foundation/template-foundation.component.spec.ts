import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateFoundationComponent } from './template-foundation.component';

describe('TemplateFoundationComponent', () => {
  let component: TemplateFoundationComponent;
  let fixture: ComponentFixture<TemplateFoundationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateFoundationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateFoundationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
