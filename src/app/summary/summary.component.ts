import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  tableNumber: string = '';
  subTotal: number = 0;
  tax: number = 0;
  total: number = 0;
  selectedFoods: any = {};

  timestamp: string = '';
  
  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.selectedFoods = nav?.extras?.state?.['selectedFoods'] || {};
    this.tableNumber = nav?.extras?.state?.['tableNumber'] || {};
  }
  
  ngOnInit(): void {
    for (let i = 0; i < this.selectedFoods.length; i++) {
      this.subTotal = this.subTotal + (this.selectedFoods[i].quantity * this.selectedFoods[i].price);
    }
    this.tax = this.roundToTwo(this.subTotal*0.118);
    this.total = this.subTotal + this.tax;
    const now = new Date();
    this.timestamp = now.toLocaleString();
  }
  
  roundToTwo(num: number): number {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }

  printCard(cardId: string) {
    const card = document.getElementById(cardId);
    if (!card) return;
  
    const printWindow = window.open('', '', 'width=800,height=600');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Summary</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .summary-card { border: 1px solid #ccc; padding: 16px; border-radius: 8px; }
              button { display: none; }
              h4 { margin: 0; }
              .timestamp { font-size: 15px; margin-top: 4px; }
              .no-print { display: none !important; }
            </style>
          </head>
          <body>${card.innerHTML}</body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  }

  goToHome() {
    this.router.navigate(['/']);
  }

}
