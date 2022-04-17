import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherProdcutComponent } from './other-prodcut.component';

describe('OtherProdcutComponent', () => {
  let component: OtherProdcutComponent;
  let fixture: ComponentFixture<OtherProdcutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherProdcutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherProdcutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
