import { describe, it, expect, beforeEach } from 'vitest';
import { ShoppingInputComponent } from './shopping-input';

describe('ShoppingInputComponent', () => {
  let component: ShoppingInputComponent;

  beforeEach(() => {
    component = new ShoppingInputComponent();
  });

  it('should initialize with empty itemText', () => {
    expect(component.itemText).toBe('');
  });

  it('should emit itemAdded and clear itemText when submitting valid text', () => {
    let emittedValue: string | null = null;
    component.itemAdded.subscribe((val) => {
      emittedValue = val;
    });

    component.itemText = 'brocolli';
    component.onSubmit();

    expect(emittedValue).toBe('brocolli');
    expect(component.itemText).toBe('');
  });

  it('should trim text before emitting', () => {
    let emittedValue: string | null = null;
    component.itemAdded.subscribe((val) => {
      emittedValue = val;
    });

    component.itemText = '   fromage râpé   ';
    component.onSubmit();

    expect(emittedValue).toBe('fromage râpé');
    expect(component.itemText).toBe('');
  });

  it('should not emit itemAdded when submitting empty or blank text', () => {
    let emitted = false;
    component.itemAdded.subscribe(() => {
      emitted = true;
    });

    component.itemText = '   ';
    component.onSubmit();

    expect(emitted).toBe(false);
  });
});
