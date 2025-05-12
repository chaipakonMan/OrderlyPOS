import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.css']
})
export class FoodCardComponent {
  @Input() food: any;
  @Output() toggleSelect = new EventEmitter<void>();

  toggleSelection() {
    this.toggleSelect.emit();
  }

}
