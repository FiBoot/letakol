import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GolComponent } from './gol.component';

describe('GolComponent', () => {
  let component: GolComponent;
  let fixture: ComponentFixture<GolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
