import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTalentCheckinComponent } from './create-talent-checkin.component';

describe('CreateTalentCheckinComponent', () => {
  let component: CreateTalentCheckinComponent;
  let fixture: ComponentFixture<CreateTalentCheckinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTalentCheckinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTalentCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
