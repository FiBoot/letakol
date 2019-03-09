import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClorusComponent } from './clorus.component';

describe('ClorusComponent', () => {
  let component: ClorusComponent;
  let fixture: ComponentFixture<ClorusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClorusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClorusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
