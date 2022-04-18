import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceSetComponent } from './price-set.component';

describe('PriceSetComponent', () => {
  let component: PriceSetComponent;
  let fixture: ComponentFixture<PriceSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
