import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentStatusWidgetComponent } from './experiment-status-widget.component';

describe('ExperimentStatusWidgetComponent', () => {
  let component: ExperimentStatusWidgetComponent;
  let fixture: ComponentFixture<ExperimentStatusWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperimentStatusWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentStatusWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
