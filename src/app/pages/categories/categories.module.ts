import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesFormComponent } from './views/categories-form/categories-form.component';
import { SharedModule } from '../../shared/shared.module';
import { CategoriesListComponent } from './views/categories-list/categories-list.component';

export const routes: Routes = [
  {
    path: '',
    component: CategoriesListComponent,
  },
  {
    path: 'form',
    component: CategoriesFormComponent,
  },
  {
    path: 'form/:id',
    component: CategoriesFormComponent,
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
  declarations: [CategoriesFormComponent, CategoriesListComponent],
})
export class CategoriesModule {}
