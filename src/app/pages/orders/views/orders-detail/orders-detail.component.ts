import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Order } from '../../models/order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [],
})
export class OrdersDetailComponent implements OnInit {
  order!: Order;
  endsubs$: Subject<any> = new Subject();

  constructor(
    private orderService: OrdersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._getOrder();
  }

  private _getOrder() {
    this.route.params.pipe(takeUntil(this.endsubs$)).subscribe((params) => {
      if (params?.['id']) {
        this.orderService.getOrder(params?.['id']).subscribe((order) => {
          this.order = order;
        });
      }
    });
  }

  deleteOrder(orderId: any) {}

  ngOnDestroy(): void {
    this.endsubs$.next(null);
    this.endsubs$.complete();
  }
}
