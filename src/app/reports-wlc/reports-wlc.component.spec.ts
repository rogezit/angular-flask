import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsWlcComponent } from './reports-wlc.component';

describe('ReportsWlcComponent', () => {
  let component: ReportsWlcComponent;
  let fixture: ComponentFixture<ReportsWlcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsWlcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsWlcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
