import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-shopping-item',
  standalone: true,
  templateUrl: './shopping-item.html',
  styleUrl: './shopping-item.css'
})
export class ShoppingItemComponent {
  @Input() item: string = '';
  @Input() index: number = 0;
  @Output() delete = new EventEmitter<number>();

  onDelete(): void {
    this.delete.emit(this.index);
  }
}
