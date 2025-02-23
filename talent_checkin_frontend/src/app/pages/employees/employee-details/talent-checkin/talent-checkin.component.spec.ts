import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentCheckinComponent } from './talent-checkin.component';

describe('TalentCheckinComponent', () => {
  let component: TalentCheckinComponent;
  let fixture: ComponentFixture<TalentCheckinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TalentCheckinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TalentCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
