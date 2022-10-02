import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ShellComponent } from './shared/shell/shell.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EditorModule } from 'primeng/editor';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxStripeModule } from 'ngx-stripe';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesService } from './pages/categories/services/categories.service';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './pages/users/users.module';
import { JwtInterceptor } from './pages/users/services/jwt.interceptor';

@NgModule({
  declarations: [AppComponent, ShellComponent, SidebarComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    AppRoutingModule,
    EditorModule,
    UsersModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    NgxStripeModule.forRoot(
      'pk_test_51JeM2XJkQtS6tNOvmFbbTzKssWBcHhXPogQKmih8RtEzw6MZczDMecUnhSkJ84RMOPYdSOl1D5Ddt2Al6z2joIpT00INC2kkfm'
    ),
  ],
  providers: [
    CategoriesService,
    MessageService,
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
