import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AddressEntry } from '../address-entry';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-address-view',
  standalone: true,
  templateUrl: './address-view.html',
  styleUrls: ['./address-view.css'],
  imports: [FormsModule]
})
export class AddressView implements OnInit {
  @Input() address!: AddressEntry;
  @Output() fireDelete: EventEmitter<AddressEntry> = new EventEmitter();
  edit: boolean | undefined;

  ngOnInit(): void {
    this.edit = true;
  }

  toggleEdit(): void {
    this.edit = !this.edit;
  }

  delete(): void {
    this.fireDelete.emit(this.address);
  }
}
