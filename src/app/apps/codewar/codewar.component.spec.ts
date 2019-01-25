import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodewarComponent } from './codewar.component';

describe('CodewarComponent', () => {
  let component: CodewarComponent;
  let fixture: ComponentFixture<CodewarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodewarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodewarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
