import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportApdfsComponent } from './report-apdfs.component';

describe('ReportApdfsComponent', () => {
  let component: ReportApdfsComponent;
  let fixture: ComponentFixture<ReportApdfsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportApdfsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportApdfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
