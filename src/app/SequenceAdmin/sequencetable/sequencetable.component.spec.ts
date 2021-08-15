import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequencetableComponent } from './sequencetable.component';

describe('SequencetableComponent', () => {
  let component: SequencetableComponent;
  let fixture: ComponentFixture<SequencetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequencetableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequencetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
