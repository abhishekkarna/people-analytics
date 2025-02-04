import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceDataComponent } from './performance-data.component';

describe('PerformanceDataComponent', () => {
  let component: PerformanceDataComponent;
  let fixture: ComponentFixture<PerformanceDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformanceDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformanceDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
