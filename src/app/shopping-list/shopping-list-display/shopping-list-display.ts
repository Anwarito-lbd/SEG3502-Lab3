import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShoppingItemComponent } from '../shopping-item/shopping-item';

@Component({
  selector: 'app-shopping-list-display',
  standalone: true,
  imports: [ShoppingItemComponent],
  templateUrl: './shopping-list-display.html',
  styleUrl: './shopping-list-display.css'
})
export class ShoppingListDisplayComponent {
  @Input() items: string[] = [];
  @Output() itemDeleted = new EventEmitter<number>();

  onDelete(index: number): void {
    this.itemDeleted.emit(index);
  }
}
