import { describe, it, expect, beforeEach } from 'vitest';
import { AddressView } from './address-view';
import { AddressEntry } from '../address-entry';

describe('AddressView', () => {
  let component: AddressView;
  let sampleAddress: AddressEntry;

  beforeEach(() => {
    component = new AddressView();
    sampleAddress = new AddressEntry('Jean', 'Dupont', '613-111-2222', 'jean@dupont.ca', 'Notes test');
    component.address = sampleAddress;
  });

  it('should initialize edit mode to true in ngOnInit', () => {
    component.ngOnInit();
    expect(component.edit).toBe(true);
  });

  it('should toggle edit mode correctly', () => {
    component.ngOnInit();
    expect(component.edit).toBe(true);

    component.toggleEdit();
    expect(component.edit).toBe(false);

    component.toggleEdit();
    expect(component.edit).toBe(true);
  });

  it('should emit fireDelete with current address when delete is invoked', () => {
    let deletedAddress: AddressEntry | null = null;
    component.fireDelete.subscribe((addr) => {
      deletedAddress = addr;
    });

    component.delete();
    expect(deletedAddress).toBe(sampleAddress);
  });
});
