import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/Auth/login/login.component';
import { RegisterComponent } from './Pages/Auth/register/register.component';
import { MainComponent } from './Pages/Unprotected/main/main.component';
import { HomeComponent } from './Pages/Protected/home/home.component';
import { AddCategoryComponent } from './Pages/Protected/add-category/add-category.component';
import { AddProductComponent } from './Pages/Protected/add-product/add-product.component';

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
        path: 'add-category',
        component: AddCategoryComponent,
        title: 'Add Category'
      },
      {
        path: 'add-product',
        component: AddProductComponent,
        title: 'Add Product'
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
