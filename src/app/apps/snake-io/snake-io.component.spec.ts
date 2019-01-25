import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakeIoComponent } from './snake-io.component';

describe('SnakeIoComponent', () => {
  let component: SnakeIoComponent;
  let fixture: ComponentFixture<SnakeIoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnakeIoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnakeIoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
