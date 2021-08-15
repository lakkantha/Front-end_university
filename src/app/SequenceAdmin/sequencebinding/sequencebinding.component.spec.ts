import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequencebindingComponent } from './sequencebinding.component';

describe('SequencebindingComponent', () => {
  let component: SequencebindingComponent;
  let fixture: ComponentFixture<SequencebindingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequencebindingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequencebindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
