import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopwatchButtonComponent } from './stopwatch-button.component';

describe('StopwatchButtonComponent', () => {
  let component: StopwatchButtonComponent;
  let fixture: ComponentFixture<StopwatchButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StopwatchButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StopwatchButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
