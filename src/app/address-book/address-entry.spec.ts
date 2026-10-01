import { describe, it, expect } from 'vitest';
import { AddressEntry } from './address-entry';

describe('AddressEntry', () => {
  it('should create an instance with all fields', () => {
    const entry = new AddressEntry('Alice', 'Smith', '613-555-0199', 'alice@uottawa.ca', 'Lab partner');
    expect(entry.firstName).toBe('Alice');
    expect(entry.lastName).toBe('Smith');
    expect(entry.phone).toBe('613-555-0199');
    expect(entry.email).toBe('alice@uottawa.ca');
    expect(entry.notes).toBe('Lab partner');
  });

  it('should support optional fields', () => {
    const entry = new AddressEntry('Bob', 'Taylor');
    expect(entry.firstName).toBe('Bob');
    expect(entry.lastName).toBe('Taylor');
    expect(entry.phone).toBeUndefined();
    expect(entry.email).toBeUndefined();
    expect(entry.notes).toBeUndefined();
  });
});
