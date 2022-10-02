import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil, timer } from 'rxjs';
import { Category } from '../../categories/models/category.model';
import { Product } from '../models/product.model';
import { CategoriesService } from '../../categories/services/categories.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [],
})
export class ProductsFormComponent implements OnInit {
  editMode = false;
  form!: FormGroup;
  isSubmitted = false;
  categories: Category[] = [];
  imageDisplay!: string | ArrayBuffer;
  currentProductId!: string;
  endsubs$: Subject<any> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private productService: ProductsService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [false],
    });
  }

  private _getCategories() {
    this.categoriesService
      .getCategories()
      .pipe(takeUntil(this.endsubs$))
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  private _addProduct(productData: FormData) {
    this.productService.createProduct(productData).subscribe({
      next: (product: Product) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Product ${product.name} is created!`,
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Product is not created!',
        });
      },
    });
  }

  private _updateProduct(productFormData: FormData) {
    this.productService
      .updateProduct(productFormData, this.currentProductId)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Product  is update!`,
          });
          timer(2000)
            .toPromise()
            .then(() => {
              this.location.back();
            });
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Product is not updated!',
          });
        },
      });
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params?.['id']) {
        this.editMode = true;
        this.currentProductId = params?.['id'];
        this.productService
          .getProduct(params?.['id'])
          .pipe(takeUntil(this.endsubs$))
          .subscribe((product) => {
            this.productForm?.['name'].setValue(product.name);
            this.productForm?.['category'].setValue(product?.category?.id);
            this.productForm?.['brand'].setValue(product.brand);
            this.productForm?.['price'].setValue(product.price);
            this.productForm?.['countInStock'].setValue(product.countInStock);
            this.productForm?.['isFeatured'].setValue(product.isFeatured);
            this.productForm?.['description'].setValue(product.description);
            this.productForm?.['richDescription'].setValue(
              product.richDescription
            );
            this.imageDisplay = product.image!;
            this.productForm?.['image'].setValidators([]);
            this.productForm?.['image'].updateValueAndValidity();
          });
      }
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;

    const productFormData = new FormData();
    Object.keys(this.productForm).map((key) => {
      productFormData.append(key, this.productForm[key].value);
    });

    if (this.editMode) {
      this._updateProduct(productFormData);
    } else {
      this._addProduct(productFormData);
    }
  }
  onCancel() {}

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image')?.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result!;
      };
      fileReader.readAsDataURL(file);
    }
  }

  get productForm() {
    return this.form.controls;
  }

  ngOnDestroy(): void {
    this.endsubs$.next(null);
    this.endsubs$.complete();
  }
}
