import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/Auth/login/login.component';
import { RegisterComponent } from './Pages/Auth/register/register.component';
import { MainComponent } from './Pages/Unprotected/main/main.component';
import { HomeComponent } from './Pages/Protected/home/home.component';
import { AddProductComponent } from './Pages/Protected/add-product/add-product.component';
import { ViewProductsComponent } from './Pages/Protected/view-products/view-products.component';
import { UpdateProductComponent } from './Pages/Protected/update-product/update-product.component';
import { DeleteProductComponent } from './Pages/Protected/delete-product/delete-product.component';
import { OrderListsComponent } from './Pages/Protected/order-lists/order-lists.component';
import { AdminHomeComponent } from './Pages/Admin/admin-home/admin-home.component';
import { AddCategoryComponent } from './Pages/Admin/add-category/add-category.component';
import { ViewCategoryComponent } from './Pages/Admin/view-category/view-category.component';
import { UpdateCategoryComponent } from './Pages/Admin/update-category/update-category.component';
import { DeleteCategoryComponent } from './Pages/Admin/delete-category/delete-category.component';
import { CustomerHomeComponent } from './Pages/Protected/Customer/customer-home/customer-home.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    title: 'Main'
  },
  {
    path: 'sign-in',
    component: LoginComponent,
    title: 'Login'
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register'
  },
  {
    path: 'home',
    component:HomeComponent,
    title: 'Home',
    children: [
      {
        path: 'add-product',
        component: AddProductComponent,
        title: 'Add Product'
      },
      {
        path: 'view-products',
        component: ViewProductsComponent,
        title: 'View Products'
      },
      {
        path: 'view-products/update/:id',
        component: UpdateProductComponent,
        title: 'Update Product'
      },
      {
        path: 'view-products/delete/:id',
        component: DeleteProductComponent,
        title: 'Delete Product'
      },
      {
        path: 'oder-lists',
        component: OrderListsComponent,
        title: 'Order Lists'
      },
    ]
  },
  {
    path: 'admin',
    component: AdminHomeComponent,
    children: [
      {
        path: 'add-category',
        component: AddCategoryComponent,
        title: 'Add Category'
      },
      {
        path: '',
        component: ViewCategoryComponent,
        title: 'View Category'
      },
      {
        path: 'view-categories/update/:id',
        component: UpdateCategoryComponent,
        title: 'Update Category'
      },
      {
        path: 'view-categories/delete/:id',
        component: DeleteCategoryComponent,
        title: 'Delete Category'
      },
    ]
  },
  {
    path: 'customer',
    component: CustomerHomeComponent,

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
