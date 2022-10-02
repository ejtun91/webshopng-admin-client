import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PaginatorModule } from 'primeng/paginator';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

const UX_MODULES = [
  ButtonModule,
  ToastModule,
  BadgeModule,
  CheckboxModule,
  InputNumberModule,
  RatingModule,
  DropdownModule,
  InputTextModule,
  InputMaskModule,
  CardModule,
  ToolbarModule,
  TableModule,
  ConfirmDialogModule,
  ColorPickerModule,
  InputTextareaModule,
  InputSwitchModule,
  EditorModule,
  PaginatorModule,
  TagModule,
  FieldsetModule,
];

@NgModule({
  imports: [CommonModule, ...UX_MODULES, RouterModule],
  exports: [...UX_MODULES],
  declarations: [],
  providers: [],
})
export class SharedModule {}
