import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { OrdersListComponent } from './views/orders-list/orders-list.component';
import { OrdersDetailComponent } from './views/orders-detail/orders-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: OrdersListComponent,
  },
  {
    path: ':id',
    component: OrdersDetailComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    InputTextModule,
    ButtonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [OrdersDetailComponent, OrdersListComponent],
})
export class OrderModule {}
