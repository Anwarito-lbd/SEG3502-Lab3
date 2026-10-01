import { describe, it, expect, beforeEach } from 'vitest';
import { ShoppingListDisplayComponent } from './shopping-list-display';

describe('ShoppingListDisplayComponent', () => {
  let component: ShoppingListDisplayComponent;

  beforeEach(() => {
    component = new ShoppingListDisplayComponent();
  });

  it('should initialize with empty items array', () => {
    expect(component.items).toEqual([]);
  });

  it('should accept items input', () => {
    component.items = ['5 pommes', '12 oeufs', '1 pain'];
    expect(component.items).toHaveLength(3);
  });

  it('should emit itemDeleted event when onDelete is called', () => {
    let deletedIdx: number | null = null;
    component.itemDeleted.subscribe((idx) => {
      deletedIdx = idx;
    });

    component.onDelete(1);
    expect(deletedIdx).toBe(1);
  });
});
