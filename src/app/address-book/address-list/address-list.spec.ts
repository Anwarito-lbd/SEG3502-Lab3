import { describe, it, expect, beforeEach } from 'vitest';
import { AddressList } from './address-list';
import { NotificationService } from '../notification-service';

describe('AddressList Component', () => {
  let component: AddressList;
  let notificationService: NotificationService;

  beforeEach(() => {
    notificationService = new NotificationService();
    component = new AddressList(notificationService);
  });

  it('should initialize with default addresses and select first', () => {
    expect(component.addresses.length).toBeGreaterThanOrEqual(2);
    expect(component.currentAddress).toBe(component.addresses[0]);
  });

  it('should add a new address and select it', () => {
    const initialCount = component.addresses.length;
    component.addAddress();

    expect(component.addresses.length).toBe(initialCount + 1);
    expect(component.currentAddress?.firstName).toBe('New');
    expect(component.currentAddress?.lastName).toBe('Entry');
  });

  it('should delete current address and reselect if available', () => {
    const toDelete = component.currentAddress;
    component.deleteCurrent();

    expect(component.addresses).not.toContain(toDelete);
  });
});
