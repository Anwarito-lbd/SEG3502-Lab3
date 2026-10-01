import { describe, it, expect, beforeEach } from 'vitest';
import { ShoppingService } from './shopping.service';

describe('ShoppingService', () => {
  let service: ShoppingService;

  beforeEach(() => {
    service = new ShoppingService();
  });

  it('should initialize with 3 default items', () => {
    const items = service.getItems();
    expect(items).toEqual(['5 pommes', '12 oeufs', '1 pain']);
  });

  it('should add a new item successfully', () => {
    const added = service.addItem('brocolli');
    expect(added).toBe(true);
    const items = service.getItems();
    expect(items).toHaveLength(4);
    expect(items[3]).toBe('brocolli');
  });

  it('should trim and ignore empty or whitespace-only items', () => {
    const emptyResult = service.addItem('');
    const spaceResult = service.addItem('   ');
    expect(emptyResult).toBe(false);
    expect(spaceResult).toBe(false);
    expect(service.getItems()).toHaveLength(3);
  });

  it('should delete an item by index', () => {
    // Delete '12 oeufs' at index 1
    service.deleteItem(1);
    const items = service.getItems();
    expect(items).toEqual(['5 pommes', '1 pain']);
  });

  it('should ignore invalid deletion indices', () => {
    service.deleteItem(-1);
    service.deleteItem(99);
    expect(service.getItems()).toHaveLength(3);
  });

  it('should reset back to initial items', () => {
    service.addItem('lait');
    service.deleteItem(0);
    service.reset();
    expect(service.getItems()).toEqual(['5 pommes', '12 oeufs', '1 pain']);
  });
});
