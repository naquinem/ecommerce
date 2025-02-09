import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/Auth/login/login.component';
import { RegisterComponent } from './Pages/Auth/register/register.component';
import { NavbarComponent } from './Pages/Components/navbar/navbar.component';
import { FooterComponent } from './Pages/Components/footer/footer.component';
import { HomeComponent } from './Pages/Protected/home/home.component';
import { MainNavbarComponent } from './Pages/Components/main-navbar/main-navbar.component';
import { MainComponent } from './Pages/Unprotected/main/main.component';
import { HomeNavbarComponent } from './Pages/Components/home-navbar/home-navbar.component';
import { AddProductComponent } from './Pages/Protected/add-product/add-product.component';
import { AuthenticationInterceptor } from './Services/authentication.interceptor';
import { ViewProductsComponent } from './Pages/Protected/view-products/view-products.component';
import { DeleteProductComponent } from './Pages/Protected/delete-product/delete-product.component';
import { UpdateProductComponent } from './Pages/Protected/update-product/update-product.component';
import { CustomerCartComponent } from './Pages/Protected/Customer/customer-cart/customer-cart.component';
import { CustomerOrderComponent } from './Pages/Protected/Customer/customer-order/customer-order.component';
import { CustomerHomeComponent } from './Pages/Protected/Customer/customer-home/customer-home.component';
import { OrderListsComponent } from './Pages/Protected/order-lists/order-lists.component';
import { AdminHomeComponent } from './Pages/Admin/admin-home/admin-home.component';
import { CategoryComponent } from './Pages/Admin/category/category.component';
import { AdminNavbarComponent } from './Pages/Admin/admin-navbar/admin-navbar.component';
import { ViewCategoryComponent } from './Pages/Admin/view-category/view-category.component';
import { AddCategoryComponent } from './Pages/Admin/add-category/add-category.component';
import { UpdateCategoryComponent } from './Pages/Admin/update-category/update-category.component';
import { DeleteCategoryComponent } from './Pages/Admin/delete-category/delete-category.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    MainNavbarComponent,
    MainComponent,
    HomeNavbarComponent,
    AddProductComponent,
    ViewProductsComponent,
    DeleteProductComponent,
    UpdateProductComponent,
    UpdateCategoryComponent,
    DeleteCategoryComponent,
    CustomerCartComponent,
    CustomerOrderComponent,
    CustomerHomeComponent,
    OrderListsComponent,
    AdminHomeComponent,
    CategoryComponent,
    AdminNavbarComponent,
    ViewCategoryComponent,
    AddCategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
