import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  foods = [
    { name: 'Egg Roll', selected: false , category: 'Appetizer', price: 8, quantity: 1, comment: ""},
    { name: 'Tom Yum', selected: false , category: 'Soup', price: 10, quantity: 1, comment: ""},
    { name: 'BBQ Pork Rice', selected: false , category: 'RichDish', price: 10, quantity: 1, comment: ""},
    { name: 'Papaya Salad', selected: false , category: 'Salad', price: 10, quantity: 1, comment: ""},
    { name: 'Pad Thai', selected: false , category: 'StirFryNoodle', price: 10, quantity: 1, comment: ""},
    { name: 'Favor Fish', selected: false , category: 'Entree', price: 15, quantity: 1, comment: ""},
    { name: 'Mango Sticky Rice', selected: false , category: 'Dessert', price: 7, quantity: 1, comment: ""},
    { name: 'Extra Meat', selected: false , category: 'AddOn', price: 3, quantity: 1, comment: ""},
    { name: 'Extra Vegetable', selected: false , category: 'AddOn', price: 2, quantity: 1, comment: ""},
    { name: 'Extra noodle/rice', selected: false , category: 'AddOn', price: 2, quantity: 1, comment: ""},
    { name: 'Egg Roll 1', selected: false , category: 'Appetizer', price: 8, quantity: 1, comment: ""},
    { name: 'Tom Yum 1', selected: false , category: 'Soup', price: 10, quantity: 1, comment: ""},
    { name: 'BBQ Pork Rice 1', selected: false , category: 'RichDish', price: 10, quantity: 1, comment: ""},
    { name: 'Papaya Salad 1', selected: false , category: 'Salad', price: 10, quantity: 1, comment: ""},
    { name: 'Pad Thai 1', selected: false , category: 'StirFryNoodle', price: 10, quantity: 1, comment: ""},
    { name: 'Favor Fish 1', selected: false , category: 'Entree', price: 15, quantity: 1, comment: ""},
    { name: 'Mango Sticky Rice 1', selected: false , category: 'Dessert', price: 7, quantity: 1, comment: ""},
    { name: 'Extra Meat 1', selected: false , category: 'AddOn', price: 3, quantity: 1, comment: ""},
    { name: 'Extra Vegetable 1', selected: false , category: 'AddOn', price: 2, quantity: 1, comment: ""},
    { name: 'Extra noodle/rice 1', selected: false , category: 'AddOn', price: 2, quantity: 1, comment: ""},
    { name: 'Extra noodle/rice 2', selected: false , category: 'AddOn', price: 2, quantity: 1, comment: ""}
  ];

  constructor(private router: Router) {}
  
  comment: string = "";

  selectedFoods: any[] = [];

  onToggleSelect(food: any) {
    // food.selected = !food.selected;
    this.updateSelectedFoods(food);
  }

  updateSelectedFoods(food: any) {
    if(this.selectedFoods.includes(food)){
      food.quantity++;
    }else{
      this.selectedFoods.push(food);
    }
  }
  
  addComment(food: any){
    console.log(this.comment);
    console.log(food.name);
    food.comment = this.comment;
    this.comment = "";
  }

  removeFood(food: any) {
    food.quantity = 1;
    food.comment = "";
    const index = this.selectedFoods.indexOf(food, 0);
    this.selectedFoods = this.removeItemWithSlice(index);
  }

  add(food: any){
    food.quantity = food.quantity + 1;
  }

  subtract(food: any){
    if(food.quantity < 2){
      this.removeFood(food);
    }else{
      food.quantity = food.quantity - 1;
    }
  }

  removeItemWithSlice(index) {
    return [...this.selectedFoods.slice(0, index), ...this.selectedFoods.slice(index + 1)]
  }

  selectedCategory: string = 'All';

  setFilter(category: string) {
    this.selectedCategory = category;
  }

  get filteredFoods(): any[] {
    if (this.selectedCategory === 'All') return this.foods;
    return this.foods.filter(food => food.category === this.selectedCategory);
  }
  tableNumber: string = '';
  goToSummary() {
    this.router.navigate(['/summary'], {
      state: { selectedFoods: this.selectedFoods, tableNumber: this.tableNumber}
    });
  }

}
