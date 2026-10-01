import { describe, it, expect } from 'vitest';
import { NotificationService } from './notification-service';
import { AddressEntry } from './address-entry';

describe('NotificationService', () => {
  it('should initialize with null selected element', () => {
    const service = new NotificationService();
    expect(service.selectedElement.getValue()).toBeNull();
  });

  it('should emit selected address when selectionChanged is called', () => {
    const service = new NotificationService();
    const entry = new AddressEntry('Claire', 'Dumont');

    let notified: AddressEntry | null = null;
    service.selectedElement.subscribe((val) => {
      notified = val;
    });

    service.selectionChanged(entry);
    expect(notified).toBe(entry);
    expect(service.selectedElement.getValue()?.firstName).toBe('Claire');
  });
});
