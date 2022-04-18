import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandOwnerComponent } from './land-owner.component';

describe('LandOwnerComponent', () => {
  let component: LandOwnerComponent;
  let fixture: ComponentFixture<LandOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
