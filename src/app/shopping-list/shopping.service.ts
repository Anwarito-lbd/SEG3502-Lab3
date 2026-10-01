import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  private initialItems: string[] = ['5 pommes', '12 oeufs', '1 pain'];
  private itemsSubject = new BehaviorSubject<string[]>([...this.initialItems]);

  readonly items$: Observable<string[]> = this.itemsSubject.asObservable();

  getItems(): string[] {
    return [...this.itemsSubject.getValue()];
  }

  addItem(item: string): boolean {
    const trimmed = item.trim();
    if (!trimmed) {
      return false;
    }
    const current = this.itemsSubject.getValue();
    this.itemsSubject.next([...current, trimmed]);
    return true;
  }

  deleteItem(index: number): void {
    const current = this.itemsSubject.getValue();
    if (index >= 0 && index < current.length) {
      const updated = current.filter((_, i) => i !== index);
      this.itemsSubject.next(updated);
    }
  }

  reset(): void {
    this.itemsSubject.next([...this.initialItems]);
  }
}
