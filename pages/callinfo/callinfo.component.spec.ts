import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { callinfoComponent } from './callinfo.component';

describe('callinfoComponent', () => {
  let component: callinfoComponent;
  let fixture: ComponentFixture<callinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ callinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(callinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
