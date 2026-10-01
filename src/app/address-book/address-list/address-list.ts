import { Component, inject } from '@angular/core';
import { AddressEntry } from '../address-entry';
import { AddressListElement } from '../address-list-element/address-list-element';
import { AddressView } from '../address-view/address-view';
import { NotificationService } from '../notification-service';

@Component({
  selector: 'app-address-list',
  standalone: true,
  imports: [
    AddressListElement,
    AddressView
  ],
  providers: [NotificationService],
  templateUrl: './address-list.html',
  styleUrl: './address-list.css'
})
export class AddressList {
  addresses: AddressEntry[] = [
    new AddressEntry('John', 'Doe', '555-1234', 'john@example.com', 'Colleague from work'),
    new AddressEntry('Jane', 'Smith', '555-5678', 'jane@example.com', 'Friend from university')
  ];
  currentAddress: AddressEntry | null = null;
  notificationService: NotificationService;

  constructor(notificationService?: NotificationService) {
    this.notificationService = notificationService ?? inject(NotificationService);
    if (this.addresses.length > 0) {
      this.select(this.addresses[0]);
    }
  }

  select(address: AddressEntry): void {
    this.currentAddress = address;
    this.notificationService.selectionChanged(address);
  }

  addAddress(): void {
    const newAddress = new AddressEntry('New', 'Entry');
    this.addresses = [newAddress, ...this.addresses];
    this.select(newAddress);
  }

  deleteCurrent(): void {
    this.addresses = this.addresses.filter((address: AddressEntry) => address !== this.currentAddress);
    this.currentAddress = this.addresses.length > 0 ? this.addresses[0] : null;
    if (this.currentAddress) {
      this.notificationService.selectionChanged(this.currentAddress);
    }
  }
}
