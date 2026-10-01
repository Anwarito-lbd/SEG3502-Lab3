import { describe, it, expect, beforeEach } from 'vitest';
import { ShoppingItemComponent } from './shopping-item';

describe('ShoppingItemComponent', () => {
  let component: ShoppingItemComponent;

  beforeEach(() => {
    component = new ShoppingItemComponent();
  });

  it('should initialize with default inputs', () => {
    expect(component.item).toBe('');
    expect(component.index).toBe(0);
  });

  it('should emit delete event with its index when onDelete is called', () => {
    let deletedIndex: number | null = null;
    component.delete.subscribe((idx) => {
      deletedIndex = idx;
    });

    component.item = '5 pommes';
    component.index = 2;
    component.onDelete();

    expect(deletedIndex).toBe(2);
  });
});
