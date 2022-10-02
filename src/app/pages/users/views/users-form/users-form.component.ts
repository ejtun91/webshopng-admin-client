import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subject, takeUntil, timer } from 'rxjs';
import * as countriesLib from 'i18n-iso-countries';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';

declare const require: (arg0: string) => countriesLib.LocaleData;

@Component({
  selector: 'angular-workspace-users-form',
  templateUrl: './users-form.component.html',
  styles: [],
})
export class UsersFormComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentCategoryId!: string;
  endsubs$: Subject<any> = new Subject();
  countries: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initUserForm();
    this._getCountries();
    this._checkEditMode();
  }

  private _initUserForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      isAdmin: [false],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: [''],
    });
  }

  private _getCountries() {
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
    this.countries = Object.entries(
      countriesLib.getNames('en', { select: 'official' })
    ).map((entry) => {
      return {
        id: entry[0],
        name: entry[1],
      };
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const user: User = {
      id: this.currentCategoryId,
      name: this.userForm?.['name'].value,
      isAdmin: this.userForm?.['isAdmin'].value,
      email: this.userForm?.['email'].value,
      phone: this.userForm?.['phone'].value,
      password: this.userForm?.['password'].value,
      street: this.userForm?.['street'].value,
      city: this.userForm?.['city'].value,
      apartment: this.userForm?.['apartment'].value,
      country: this.userForm?.['country'].value,
      zip: this.userForm?.['zip'].value,
    };
    if (this.editMode) {
      this._updateUser(user);
    } else {
      this._addUser(user);
    }
  }

  private _updateUser(user: User) {
    this.usersService.updateUser(user).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User is updated',
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
          detail: 'User is not updated!',
        });
      },
    });
  }

  private _checkEditMode() {
    this.route.params.pipe(takeUntil(this.endsubs$)).subscribe((params) => {
      if (params?.['id']) {
        this.editMode = true;
        this.currentCategoryId = params?.['id'];
        this.usersService.getUser(params?.['id']).subscribe((user) => {
          this.userForm?.['name'].setValue(user?.name);
          this.userForm?.['email'].setValue(user?.email);
          this.userForm?.['isAdmin'].setValue(user?.isAdmin);
          this.userForm?.['street'].setValue(user?.street);
          this.userForm?.['apartment'].setValue(user?.apartment);
          this.userForm?.['zip'].setValue(user?.zip);
          this.userForm?.['city'].setValue(user?.city);
          this.userForm?.['country'].setValue(user?.country);
          this.userForm?.['password'].setValidators([]);
          this.userForm?.['password'].updateValueAndValidity();
        });
      }
    });
  }

  private _addUser(user: User) {
    this.usersService.createUser(user).subscribe({
      next: (user: User) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `User ${user.name} is created`,
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
          detail: 'User is not created!',
        });
      },
    });
  }

  get userForm() {
    return this.form.controls;
  }

  ngOnDestroy(): void {
    this.endsubs$.next(null);
    this.endsubs$.complete();
  }
}
