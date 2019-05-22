import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BomberlanComponent } from './bomberlan.component';

describe('BomberlanComponent', () => {
  let component: BomberlanComponent;
  let fixture: ComponentFixture<BomberlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BomberlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BomberlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
