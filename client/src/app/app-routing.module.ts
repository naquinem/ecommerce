import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/Auth/login/login.component';
import { RegisterComponent } from './Pages/Auth/register/register.component';

const routes: Routes = [
  {
    path: 'sign-in',
    component: LoginComponent,
    title: 'Login Page'
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register Page'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
