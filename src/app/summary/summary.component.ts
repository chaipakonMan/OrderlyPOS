import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CapacitorThermalPrinter } from 'capacitor-thermal-printer';

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

  async printCard(cardId: string) {
    if(cardId === "order-card"){
      await CapacitorThermalPrinter.connect({ address:":0C:25:76:6A:EC:E8" });
      await CapacitorThermalPrinter.begin()
      .align('center')
      .bold()
      .underline()
      .text('Store Order\n')
      .doubleWidth()
      .text('ITEMS\n')
      .clearFormatting()
      .text('Item 1: Egg Roll\n')
      .text('Item 2: Somesome\n')
      .align('center')
      .cutPaper()
      .write();
    }

    if(cardId === "receipt-card"){
      await CapacitorThermalPrinter.connect({ address:":0C:25:76:6A:EC:E8" });
      await CapacitorThermalPrinter.begin()
      .align('center')
      .bold()
      .underline()
      .text('Store Receipt\n')
      .doubleWidth()
      .text('ITEMS\n')
      .clearFormatting()
      .text('Item 1: $10.00\n')
      .text('Item 2: $15.00\n')
      .align('right')
      .text('Total: $25.00\n')
      .align('center')
      .cutPaper()
      .write();
    }

    // TODO refactor this method, just set up the print content and address in the if.
    // and print job start here with using text content.
    // example here.
    var content = 'Store Receipt\n\nITEMS\n\n'
        content += 'Store Order\n\nITEMS\n\n';

    await CapacitorThermalPrinter.connect({ address:":0C:25:76:6A:EC:E8" });
    await CapacitorThermalPrinter.begin()
      .align('center')
      .bold()
      .underline()
      .text(content)
      .cutPaper()
      .write();

  }

  goToHome() {
    this.router.navigate(['/']);
  }

}
