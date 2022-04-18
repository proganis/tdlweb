import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalePerformanceComponent } from './sale-performance.component';

describe('SalePerformanceComponent', () => {
  let component: SalePerformanceComponent;
  let fixture: ComponentFixture<SalePerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalePerformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalePerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
