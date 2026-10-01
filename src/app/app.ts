import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListComponent } from './shopping-list/shopping-list';
import { HeaderComponent } from './address-book/header/header';
import { AddressList } from './address-book/address-list/address-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ShoppingListComponent,
    HeaderComponent,
    AddressList
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  activeTab: 'shopping' | 'address' = 'shopping';

  setTab(tab: 'shopping' | 'address'): void {
    this.activeTab = tab;
  }
}
