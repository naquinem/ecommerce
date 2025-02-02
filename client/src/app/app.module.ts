import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
