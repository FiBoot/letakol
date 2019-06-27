import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayObjectComponent } from './display-object.component';

describe('DisplayObjectComponent', () => {
  let component: DisplayObjectComponent;
  let fixture: ComponentFixture<DisplayObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
