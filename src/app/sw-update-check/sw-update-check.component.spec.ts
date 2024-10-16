import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwUpdateCheckComponent } from './sw-update-check.component';

describe('SwUpdateCheckComponent', () => {
  let component: SwUpdateCheckComponent;
  let fixture: ComponentFixture<SwUpdateCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwUpdateCheckComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwUpdateCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
