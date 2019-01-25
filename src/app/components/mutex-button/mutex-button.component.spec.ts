import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MutexButtonComponent } from './mutex-button.component';

describe('MutexButtonComponent', () => {
  let component: MutexButtonComponent;
  let fixture: ComponentFixture<MutexButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MutexButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MutexButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
