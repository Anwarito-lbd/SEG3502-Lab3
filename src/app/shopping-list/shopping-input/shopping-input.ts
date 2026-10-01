import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shopping-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './shopping-input.html',
  styleUrl: './shopping-input.css'
})
export class ShoppingInputComponent {
  @Output() itemAdded = new EventEmitter<string>();

  itemText: string = '';

  onSubmit(): void {
    const trimmed = this.itemText.trim();
    if (trimmed) {
      this.itemAdded.emit(trimmed);
      this.itemText = '';
    }
  }
}
