import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { OrdersService } from '../../services/orders.service';
import { ORDER_STATUS } from '../../order.constants';
import { Order } from '../../models/order';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [],
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];
  orderStatus: any = ORDER_STATUS;
  endsubs$: Subject<any> = new Subject();

  constructor(private orderService: OrdersService, private router: Router) {}

  ngOnInit(): void {
    this._getOrders();
  }

  _getOrders() {
    this.orderService
      .getOrders()
      .pipe(takeUntil(this.endsubs$))
      .subscribe((orders) => (this.orders = orders));
  }

  showOrder(orderId: any) {
    this.router.navigateByUrl(`orders/${orderId}`);
  }

  deleteOrder(orderId: any) {}

  ngOnDestroy(): void {
    this.endsubs$.next(null);
    this.endsubs$.complete();
  }
}
