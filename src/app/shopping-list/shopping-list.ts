import { Component, inject } from '@angular/core';
import { ShoppingInputComponent } from './shopping-input/shopping-input';
import { ShoppingListDisplayComponent } from './shopping-list-display/shopping-list-display';
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [ShoppingInputComponent, ShoppingListDisplayComponent],
  templateUrl: './shopping-list.html',
  styleUrl: './shopping-list.css'
})
export class ShoppingListComponent {
  private shoppingService: ShoppingService;
  items: string[] = [];

  constructor(shoppingService?: ShoppingService) {
    this.shoppingService = shoppingService ?? inject(ShoppingService);
    this.shoppingService.items$.subscribe((items) => {
      this.items = items;
    });
  }

  onAddItem(item: string): void {
    this.shoppingService.addItem(item);
  }

  onDeleteItem(index: number): void {
    this.shoppingService.deleteItem(index);
  }

  resetList(): void {
    this.shoppingService.reset();
  }
}
