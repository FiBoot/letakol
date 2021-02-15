import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoidStonesComponent } from './void-stones.component';

describe('AtroRpComponent', () => {
  let component: VoidStonesComponent;
  let fixture: ComponentFixture<VoidStonesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoidStonesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoidStonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
