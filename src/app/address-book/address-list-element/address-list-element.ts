import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { AddressEntry } from '../address-entry';
import { NotificationService } from '../notification-service';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-address-list-element',
  standalone: true,
  templateUrl: './address-list-element.html',
  styleUrls: ['./address-list-element.css'],
  imports: [NgClass]
})
export class AddressListElement implements OnInit, OnDestroy {
  @Input() address: AddressEntry | undefined;
  selected = false;
  subscription: Subscription | undefined;
  notificationService = inject(NotificationService, { optional: true });

  ngOnInit(): void {
    if (this.notificationService) {
      this.subscription = this.notificationService.selectedElement.subscribe((newAddress) => {
        this.selected = newAddress === this.address;
      });
    }
  }

  getFullName(): string {
    return `${this.address?.firstName ?? ''}, ${this.address?.lastName ?? ''}`;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
