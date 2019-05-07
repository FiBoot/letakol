import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerlinTerrainComponent } from './perlin-terrain.component';

describe('PerlinTerrainComponent', () => {
  let component: PerlinTerrainComponent;
  let fixture: ComponentFixture<PerlinTerrainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerlinTerrainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerlinTerrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
