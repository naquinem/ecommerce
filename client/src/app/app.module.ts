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
import { AddCategoryComponent } from './Pages/Protected/add-category/add-category.component';
import { AuthenticationInterceptor } from './Services/authentication.interceptor';



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
    AddCategoryComponent
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
