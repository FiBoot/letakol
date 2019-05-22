import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProbaComponent } from './card-proba.component';

describe('CardProbaComponent', () => {
  let component: CardProbaComponent;
  let fixture: ComponentFixture<CardProbaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardProbaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardProbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
