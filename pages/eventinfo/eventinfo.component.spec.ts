import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { eventinfoComponent } from './eventinfo.component';

describe('eventinfoComponent', () => {
  let component: eventinfoComponent;
  let fixture: ComponentFixture<eventinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ eventinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(eventinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
