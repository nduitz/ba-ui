import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketProductsListComponent } from './basket-products-list.component';

describe('BasketProductsListComponent', () => {
  let component: BasketProductsListComponent;
  let fixture: ComponentFixture<BasketProductsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasketProductsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
