import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumGridComponent } from './num-grid.component';

describe('NumGridComponent', () => {
  let component: NumGridComponent;
  let fixture: ComponentFixture<NumGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
