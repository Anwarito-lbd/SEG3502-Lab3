import { describe, it, expect, beforeEach } from 'vitest';
import { ShoppingListComponent } from './shopping-list';
import { ShoppingService } from './shopping.service';

describe('ShoppingListComponent', () => {
  let component: ShoppingListComponent;
  let service: ShoppingService;

  beforeEach(() => {
    service = new ShoppingService();
    service.reset();
    component = new ShoppingListComponent(service);
  });

  it('should initialize with items from service', () => {
    expect(component.items).toEqual(['5 pommes', '12 oeufs', '1 pain']);
  });

  it('should add item through onAddItem', () => {
    component.onAddItem('brocolli');
    expect(component.items).toHaveLength(4);
    expect(component.items[3]).toBe('brocolli');
  });

  it('should delete item through onDeleteItem', () => {
    component.onDeleteItem(0);
    expect(component.items).toEqual(['12 oeufs', '1 pain']);
  });

  it('should reset list through resetList', () => {
    component.onAddItem('lait');
    component.resetList();
    expect(component.items).toEqual(['5 pommes', '12 oeufs', '1 pain']);
  });
});
