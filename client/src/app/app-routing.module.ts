import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/Auth/login/login.component';
import { RegisterComponent } from './Pages/Auth/register/register.component';
import { MainComponent } from './Pages/Unprotected/main/main.component';
import { HomeComponent } from './Pages/Protected/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    title: 'Main Page'
  },
  {
    path: 'sign-in',
    component: LoginComponent,
    title: 'Login Page'
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register Page'
  },
  {
    path: 'home',
    component:HomeComponent,
    title: 'Home Page'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
