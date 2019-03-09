import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemDateComponent } from './item-date.component';

describe('ItemDateComponent', () => {
  let component: ItemDateComponent;
  let fixture: ComponentFixture<ItemDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemDateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
