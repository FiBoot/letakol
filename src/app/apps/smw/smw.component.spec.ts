import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmwComponent } from './smw.component';

describe('SmwComponent', () => {
  let component: SmwComponent;
  let fixture: ComponentFixture<SmwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
