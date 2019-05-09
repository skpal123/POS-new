import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-transaction',
  templateUrl: './customer-transaction.component.html',
  styleUrls: ['./customer-transaction.component.css']
})
export class CustomerTransactionComponent implements OnInit {
  customerId:string=null;
  constructor() { }

  ngOnInit() {
    debugger
  }
  getCustomerId($event:string){
    debugger
    this.customerId=$event;
  }
}
